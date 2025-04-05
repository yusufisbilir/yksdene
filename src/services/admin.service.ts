import { supabaseAdminClient } from '@/lib/supabaseAdminClient'
import { Profile } from '@/types'
import { apiRequestValidator } from './request-validator.service'

type TotalExamAttemptsPerUser = {
  [userId: string]: number
}

export const adminService = {
  async getAllUsers(): Promise<Profile[]> {
    return apiRequestValidator.withAdminAuth(async () => {
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
    })
  },

  async getTotalExamAttemptsPerUser(): Promise<TotalExamAttemptsPerUser> {
    return apiRequestValidator.withAdminAuth(async () => {
      const supabase = supabaseAdminClient
      const { data, error } = await supabase.from('exam_attempts').select('user_id')

      if (error) {
        console.error('Error fetching total exam attempts:', error)
        throw new Error('Failed to fetch total exam attempts')
      }

      const counts: TotalExamAttemptsPerUser = {}
      if (data) {
        for (const attempt of data) {
          const userId = attempt.user_id
          counts[userId] = (counts[userId] || 0) + 1
        }
      }
      return counts
    })
  },
}
