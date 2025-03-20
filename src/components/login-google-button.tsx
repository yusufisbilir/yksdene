import React, { useState } from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getURL } from '@/utils/getGoogleAuthRedirectURL'

const LoginDialogButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  async function handleGoogleLogin() {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getURL(),
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
    <Button
      type="submit"
      className="flex items-center gap-2 justify-center w-full"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <LogIn className="w-4 h-4" />
      {isLoading ? 'Giriş yapılıyor...' : 'Google ile Giriş Yap'}
    </Button>
  )
}

export default LoginDialogButton
