'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { Loader2 } from 'lucide-react'

export default function OAuthPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(ROUTES.HOME)
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <h1 className="text-2xl font-semibold">Giriş başarılı!</h1>
        <p className="text-muted-foreground">Yönlendiriliyorsunuz...</p>
      </div>
    </div>
  )
}
