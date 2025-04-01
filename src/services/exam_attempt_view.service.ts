import { UnauthorizedError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'
import { ExamAttemptView } from '@/types'

export const examAttemptViewService = {
  async getExamAttemptView(): Promise<ExamAttemptView[]> {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase
      .from('exam_attempt_view')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },
}
