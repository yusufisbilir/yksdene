'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export default function OdemeBasariliPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Ödeme Başarılı!</h1>
        <p className="text-muted-foreground mb-6">
          Ödemeniz başarıyla tamamlandı. YKS Dene Premium Üyeliğiniz aktif edildi.
          {orderId && <span className="block mt-2">Sipariş Numarası: {orderId}</span>}
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <p className="text-amber-800 text-sm">
            <strong>Önemli:</strong> Premium hesabınız aktif edilmiştir. Tüm özelliklere
            erişebilirsiniz. Herhangi bir sorun yaşarsanız, lütfen destek ekibimizle iletişime
            geçin.
          </p>
        </div>
      </Card>
    </div>
  )
}
