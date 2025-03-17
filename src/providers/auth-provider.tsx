'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAppDispatch } from '@/hooks/useRedux'
import { setUser } from '@/store/slices/auth.slice'
import { initializeAuth } from '@/store/slices/auth.slice'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Initialize auth state
    dispatch(initializeAuth())

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      dispatch(setUser(session?.user ?? null))
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch, router, supabase])

  return <>{children}</>
}
