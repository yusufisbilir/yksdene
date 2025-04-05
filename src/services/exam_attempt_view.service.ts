import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { ExamAttemptView } from '@/types'
import { apiRequestValidator } from './requestValidator.service'

export const examAttemptViewService = {
  async getExamAttemptView(): Promise<ExamAttemptView[]> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase
        .from('exam_attempt_view')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    })
  },
}
