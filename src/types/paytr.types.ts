export interface PaytrPaymentRequest {
  amount: number
  userEmail: string
  userName: string
  userAddress: string
  userPhone: string
  basketItems: [string, string, number][] // [product name, price, quantity]
  orderId?: string // Optional, if the order has its own ID
}

export interface PaytrTokenResponse {
  status: string
  token?: string
  iframe_url?: string
  reason?: string
}

export interface PaytrCallbackData {
  merchant_oid: string
  status: string
  total_amount: string
  hash: string
  payment_type?: string
  payment_amount?: string
  installment_count?: string
  currency?: string
  test_mode?: string
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  amount: number
  payment_id?: string
  created_at: string
  updated_at: string
}
