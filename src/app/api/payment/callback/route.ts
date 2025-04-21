import { PaytrCallbackData } from '@/types/paytr.types'
import { NextRequest } from 'next/server'
import { paymentService } from '@/services/payment.service'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const callbackData: PaytrCallbackData = {
      merchant_oid: formData.get('merchant_oid') as string,
      status: formData.get('status') as string,
      total_amount: formData.get('total_amount') as string,
      hash: formData.get('hash') as string,
      payment_type: formData.get('payment_type') as string | undefined,
      payment_amount: formData.get('payment_amount') as string | undefined,
      installment_count: formData.get('installment_count') as string | undefined,
      currency: formData.get('currency') as string | undefined,
      test_mode: formData.get('test_mode') as string | undefined,
    }
    console.log('callbackData', callbackData)
    try {
      await paymentService.handlePaymentCallback(callbackData)
      return new Response('OK')
    } catch (error: any) {
      console.error('PayTR callback processing error:', error.message)
      return new Response(`PAYTR notification failed: ${error.message}`, { status: 400 })
    }
  } catch (error) {
    console.error('PayTR callback error:', error)
    return new Response('PAYTR notification failed', { status: 500 })
  }
}
