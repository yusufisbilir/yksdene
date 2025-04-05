import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { Profile, ProfileFormValues } from '@/types'
import { apiRequestValidator } from './request-validator.service'

export const profileService = {
  async getProfile(): Promise<Profile | null> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

      if (error) throw error
      return data
    })
  },

  async updateProfile(profileData: ProfileFormValues): Promise<Profile> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase
        .from('profiles')
        .update({
          obp: profileData.obp,
          graduated: profileData.graduated,
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    })
  },
}
