import { UnauthorizedError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'
import { Profile } from '@/types'

export const profileService = {
  async getProfile(): Promise<Profile | null> {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId.toString())
      .single()

    if (error) throw error
    return data
  },
}
