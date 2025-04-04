import { supabaseAdminClient } from '@/lib/supabaseAdminClient'
import { Profile } from '@/types'

interface UserExamCounts {
  [userId: string]: {
    TYT: number
    AYT_Sayisal: number
    AYT_EsitAgirlik: number
    AYT_Sozel: number
    // Add other categories if needed
  }
}

export const adminService = {
  async getAllUsers(): Promise<Profile[]> {
    const supabase = supabaseAdminClient

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      throw new Error('Failed to fetch users')
    }
    return data || []
  },

  async getExamCountsPerUser(): Promise<UserExamCounts> {
    const supabase = supabaseAdminClient
    const { data, error } = await supabase
      .from('exam_attempt_view')
      .select('user_id, exam_category')

    if (error) {
      console.error('Error fetching exam counts:', error)
      throw new Error('Failed to fetch exam counts')
    }

    const counts: UserExamCounts = {}
    if (data) {
      for (const attempt of data) {
        if (!counts[attempt.user_id]) {
          counts[attempt.user_id] = {
            TYT: 0,
            AYT_Sayisal: 0,
            AYT_EsitAgirlik: 0,
            AYT_Sozel: 0,
          }
        }
        if (
          attempt.exam_category &&
          counts[attempt.user_id][attempt.exam_category as keyof UserExamCounts[string]]
        ) {
          counts[attempt.user_id][attempt.exam_category as keyof UserExamCounts[string]]++
        }
      }
    }
    return counts
  },

  // Add other admin-specific data fetching functions here later
  // e.g., getExamCountsPerUser()
}
