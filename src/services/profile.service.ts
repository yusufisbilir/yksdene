import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { Profile, ProfilesUniversityProgramView, ProfileUpdate } from '@/types'
import { apiRequestValidator } from './requestValidator.service'

export const profileService = {
  async getProfile(): Promise<Profile | null> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

      if (error) throw error
      return data
    })
  },

  async updateProfile(profileData: ProfileUpdate): Promise<Profile> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase
        .from('profiles')
        .update({
          obp: profileData.obp,
          graduated: profileData.graduated,
          university_program: profileData.university_program,
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    })
  },

  async getProfileWithUniversityProgram(): Promise<ProfilesUniversityProgramView | null> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase
        .from('profiles_university_programs_view')
        .select('*')
        .eq('profile_id', userId)
        .single()
      if (error) throw error
      return data
    })
  },

  async getIsPremium(): Promise<boolean> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data?.is_premium ?? false
    })
  },
}
