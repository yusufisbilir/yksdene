import { AppError } from '@/utils/errors'
import { NextResponse } from 'next/server'

export function handleApiError(error: any) {
  console.error('API Hatası:', error)

  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode })
  }

  return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
}
