import { UnauthorizedError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'
import { Profile, ProfileFormValues } from '@/types'

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

  async updateProfile(profileData: ProfileFormValues): Promise<Profile> {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()
    const { data, error } = await supabase
      .from('profiles')
      .update({
        obp: profileData.obp,
        graduated: profileData.graduated,
      })
      .eq('id', userId.toString())
      .select()
      .single()

    if (error) throw error
    return data
  },
}
