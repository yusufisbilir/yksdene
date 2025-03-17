import { createClient } from '../client'
import { redirect } from 'next/navigation'

export const signOut = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
