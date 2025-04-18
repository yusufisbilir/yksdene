import { NextRequest, NextResponse } from 'next/server'
import { PaytrPaymentRequest } from '@/types/paytr.types'
import { paymentService } from '@/services/payment.service'
import { apiRequestValidator } from '@/services/requestValidator.service'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PaytrPaymentRequest

    const result = await paymentService.createPaymentWithAuth(body)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Ödeme işlemi hatası:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Ödeme oluşturulamadı',
      },
      { status: error.statusCode || 500 },
    )
  }
}
