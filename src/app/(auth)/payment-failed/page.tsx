'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OdemeBasarisizPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const errorMessage = searchParams.get('message') || 'Ödeme işlemi tamamlanamadı.'

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Ödeme Başarısız</h1>
        <p className="text-muted-foreground mb-6">
          {errorMessage}
          {orderId && <span className="block mt-2">Sipariş Numarası: {orderId}</span>}
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>Bilgilendirme:</strong> Ödeme işleminiz sırasında bir sorun oluştu. Bu durum
            genellikle banka kaynaklı veya geçici bir sorundur. Kredi kartı limiti, 3D Secure
            doğrulaması veya banka sistemlerindeki geçici sorunlar nedeniyle olabilir.
          </p>
        </div>
      </Card>
    </div>
  )
}
