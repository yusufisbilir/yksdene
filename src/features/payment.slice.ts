import { API_ROUTES } from '@/constants/api.routes'
import { apiSlice } from './api/apiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface PaymentRequest {
  amount: number
  userEmail: string
  userName: string
  userAddress: string
  userPhone: string
  basketItems: [string, string, number][] // [product name, price, quantity]
  orderId?: string
}

export interface PaymentResponse {
  status: string
  token?: string
  iframe_url?: string
  order_id?: string
  message?: string
}

export const paymentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (paymentData) => ({
        url: API_ROUTES.CREATE_PAYMENT,
        method: 'POST',
        body: paymentData,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        const errorMessage =
          typeof response.data === 'object' && response.data !== null && 'message' in response.data
            ? (response.data as { message: string }).message
            : 'Ödeme işlemi başlatılamadı'

        return {
          status: 'error',
          message: errorMessage,
        }
      },
    }),
  }),
})

export const { useCreatePaymentMutation } = paymentSlice
