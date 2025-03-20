'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import { LogIn, User } from 'lucide-react'
import { useState } from 'react'

const LoginDialog = () => {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  async function handleGoogleLogin() {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${getURL()}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="flex items-center justify-center">
          <User className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Giriş Yap</DialogTitle>
          <DialogDescription>
            Netlerini takip et, sıralamalarda yarış. YKS çalışmayı eğlenceli hale getir. 🎉
          </DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          className="flex items-center gap-2 justify-center"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <LogIn className="w-4 h-4" />
          {isLoading ? 'Giriş yapılıyor...' : 'Google ile Giriş Yap'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
