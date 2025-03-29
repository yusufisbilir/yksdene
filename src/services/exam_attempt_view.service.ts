import { UnauthorizedError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'

export const examAttemptViewService = {
  async getExamAttemptView() {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase
      .from('exam_attempt_view')
      .select('*')
      .order('attempt_date', { ascending: false })

    if (error) throw error
    return data || []
  },
}
