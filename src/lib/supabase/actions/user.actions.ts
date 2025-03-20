import { createClient } from '../server'
import { redirect } from 'next/navigation'

export const signOut = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export const getUser = async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}
