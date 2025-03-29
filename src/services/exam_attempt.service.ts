import { UnauthorizedError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'

export const examAttemptService = {
  async deleteExamAttempt(id: string) {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase.from('exam_attempts').delete().eq('id', id)

    if (error) throw error
    return data || []
  },
}
