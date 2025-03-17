'use client'

import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  return (
    <div className="centered_card_container flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Oops! Bir hata oluştu</h1>
        <p className="text-muted-foreground">
          {error || 'Giriş yaparken beklenmeyen bir hata oluştu.'}
        </p>
      </div>
      <div className="flex flex-col w-full gap-3">
        <Button variant="outline" onClick={() => router.push('/')}>
          Ana Sayfaya Dön
        </Button>
        <Button onClick={() => router.back()}>Giriş Ekranına Geri Dön</Button>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] flex-col items-center justify-center">
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  )
}
