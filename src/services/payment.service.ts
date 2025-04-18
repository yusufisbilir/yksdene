import { supabaseAdminClient } from '@/lib/supabaseAdminClient'
import { createPaytrToken, validateCallbackHash } from '@/lib/paytr'
import { PaytrCallbackData } from '@/types/paytr.types'
import { v4 as uuidv4 } from 'uuid'
import { apiRequestValidator } from './requestValidator.service'

export interface PaymentInsert {
  amount: number
  userEmail: string
  userName: string
  userAddress: string
  userPhone: string
  basketItems: any[]
  orderId?: string
}

export const paymentService = {
  /**
   * Create payment process - Requires authentication
   */
  createPayment(payment: PaymentInsert, userId: string) {
    return this._createPaymentInternal(payment, userId)
  },

  /**
   * Method called from within the service, requires authentication
   * This method enables payment creation for logged-in users
   */
  createPaymentWithAuth(payment: PaymentInsert) {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      return this._createPaymentInternal(payment, userId)
    })
  },

  /**
   * Process callback from PayTR - doesn't require authentication
   * security is ensured through hash validation
   */
  async handlePaymentCallback(callbackData: PaytrCallbackData) {
    return this._handlePaymentCallbackInternal(callbackData)
  },

  // Private internal implementations
  async _createPaymentInternal(payment: PaymentInsert, userId: string) {
    const { amount, userEmail, userName, userAddress, userPhone, basketItems, orderId } = payment
    console.log('payment', payment)

    // Create order ID - must be alphanumeric (no dashes or special characters)
    const generatedOrderId = orderId || uuidv4().replace(/-/g, '')

    // PayTR information
    const merchant_id = process.env.PAYTR_MERCHANT_ID!
    const merchant_key = process.env.PAYTR_MERCHANT_KEY!
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!

    // Order information
    const merchant_oid = generatedOrderId // alphanumeric order ID
    const user_ip = '127.0.0.1' // IP will need to be obtained from the API
    const email = userEmail
    const payment_amount = amount * 100 // PayTR expects 100 for 1.00 TL

    // Basket information - in JSON string format
    const user_basket = JSON.stringify(basketItems)

    // Test mode - activate test mode in development environment
    const test_mode = process.env.NODE_ENV === 'development' ? '1' : '0'

    // Callback URLs
    const merchant_ok_url = `${process.env.NEXT_PUBLIC_SITE_URL}/payment-successful`
    const merchant_fail_url = `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`

    // Other parameters
    const currency = 'TL'
    const no_installment = '0' // Installment option (0: active, 1: passive)
    const max_installment = '0' // Maximum number of installments
    const timeout_limit = '30' // Payment time (minutes)
    const debug_on = '1' // Debugging
    const lang = 'tr' // Language

    // Token creation
    const paytr_token = createPaytrToken({
      merchantId: merchant_id,
      merchantKey: merchant_key,
      merchantSalt: merchant_salt,
      merchantOid: merchant_oid,
      userIp: user_ip,
      email,
      paymentAmount: payment_amount,
      userBasket: user_basket,
      noInstallment: no_installment,
      maxInstallment: max_installment,
      currency,
      testMode: test_mode,
    })

    // Save order to Supabase
    const { error: orderInsertError } = await supabaseAdminClient.from('orders').insert({
      id: generatedOrderId,
      user_id: userId,
      status: 'pending',
      amount: amount,
      merchant_oid: merchant_oid,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      payment_details: {
        basket_items: basketItems,
        user_email: email,
        user_name: userName,
        user_address: userAddress,
        user_phone: userPhone,
        user_id: userId,
        merchant_oid: merchant_oid,
        date: new Date().toISOString(),
      },
    })

    if (orderInsertError) {
      throw new Error(`Order creation error: ${orderInsertError.message}`)
    }

    // Get order information with a separate query
    const { data: orderData, error: orderQueryError } = await supabaseAdminClient
      .from('orders')
      .select()
      .eq('id', generatedOrderId)
      .maybeSingle()

    if (orderQueryError) {
      throw new Error(`Could not retrieve order information: ${orderQueryError.message}`)
    }

    if (!orderData) {
      throw new Error(`Order not found (ID: ${generatedOrderId})`)
    }

    // Data to be sent to PayTR
    const postData = {
      merchant_id,
      user_ip,
      merchant_oid,
      email,
      payment_amount: payment_amount.toString(),
      paytr_token,
      user_basket,
      debug_on,
      no_installment,
      max_installment,
      user_name: userName,
      user_address: userAddress,
      user_phone: userPhone,
      merchant_ok_url,
      merchant_fail_url,
      timeout_limit,
      currency,
      test_mode,
      lang,
    }

    // Send request to PayTR API
    const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(postData),
    })

    const data = await response.json()

    if (data.status === 'success') {
      return {
        status: 'success',
        token: data.token,
        iframe_url: `https://www.paytr.com/odeme/guvenli/${data.token}`,
        order_id: orderData.id,
      }
    } else {
      // Cancel order in case of failure
      try {
        await supabaseAdminClient
          .from('orders')
          .update({ status: 'cancelled', updated_at: new Date().toISOString() })
          .eq('id', generatedOrderId)
      } catch (cancelError) {
        console.error('Order cancellation error:', cancelError)
      }

      throw new Error(data.reason || 'Could not obtain PayTR token')
    }
  },

  async _handlePaymentCallbackInternal(callbackData: PaytrCallbackData) {
    // Check required fields
    if (
      !callbackData.merchant_oid ||
      !callbackData.status ||
      !callbackData.total_amount ||
      !callbackData.hash
    ) {
      throw new Error('PayTR callback - missing parameters')
    }

    // PayTR information
    const merchant_key = process.env.PAYTR_MERCHANT_KEY!
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!

    // Hash validation (for security)
    const isValid = validateCallbackHash({
      merchantOid: callbackData.merchant_oid,
      merchantSalt: merchant_salt,
      status: callbackData.status,
      totalAmount: callbackData.total_amount,
      merchantKey: merchant_key,
      receivedHash: callbackData.hash,
    })

    // Validate hash value
    if (!isValid) {
      throw new Error('Hash validation failed')
    }

    // Find order
    const { data: order, error: orderError } = await supabaseAdminClient
      .from('orders')
      .select('*')
      .eq('merchant_oid', callbackData.merchant_oid)
      .single()

    if (orderError || !order) {
      throw new Error(`Order not found: ${callbackData.merchant_oid}`)
    }

    // Update order status
    let newStatus: 'paid' | 'failed'

    if (callbackData.status === 'success') {
      newStatus = 'paid'
      console.log(
        `Payment successful: Order No: ${callbackData.merchant_oid}, Amount: ${
          parseInt(callbackData.total_amount) / 100
        } TL`,
      )
    } else {
      newStatus = 'failed'
      console.log(`Payment failed: Order No: ${callbackData.merchant_oid}`)
    }

    // Update database
    const { error: updateError } = await supabaseAdminClient
      .from('orders')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
        payment_details: {
          ...((order.payment_details as object) || {}),
          callback_data: callbackData,
          payment_date: new Date().toISOString(),
        },
      })
      .eq('id', order.id)

    if (updateError) {
      throw new Error(`Order update error: ${updateError.message}`)
    }

    return { status: 'success' }
  },
}
