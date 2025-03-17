'use client'

import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Oops! Bir hata oluştu</h1>
        <p className="text-muted-foreground">
          {error || 'Giriş yaparken beklenmeyen bir hata oluştu.'}
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => router.push('/')}>
          Ana Sayfaya Dön
        </Button>
        <Button onClick={() => router.back()}>Geri Dön</Button>
      </div>
    </div>
  )
}
