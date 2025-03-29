import { AppError, UnauthorizedError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { auth } from '@clerk/nextjs/server'
import { ExamAttemptInsert, SubjectResultInsert } from '@/types/db.types'

export const examAttemptService = {
  async deleteExamAttempt(id: string) {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase.from('exam_attempts').delete().eq('id', id)

    if (error) throw error
    return data || []
  },

  async _createExamAttempt(examAttempt: ExamAttemptInsert) {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase
      .from('exam_attempts')
      .insert(examAttempt)
      .select()
      .single()

    if (error) throw error
    return data || []
  },

  async createExamAttemptWithResults({
    examAttempt,
    subjectResults,
  }: {
    examAttempt: ExamAttemptInsert
    subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
  }) {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const supabase = await supabaseServerClient()

    // create exam attempt
    const examAttemptData = await this._createExamAttempt(examAttempt)

    // inject subjects
    const subjectResultsToInsert = subjectResults.map((result) => ({
      ...result,
      exam_attempt_id: examAttemptData.id,
    }))

    // insert subject results
    const { error: subjectResultsError } = await supabase
      .from('subject_results')
      .insert(subjectResultsToInsert)
      .select()

    // Rollback by deleting the exam attempt
    if (subjectResultsError) {
      await supabase.from('exam_attempts').delete().eq('id', examAttemptData.id)
      throw new AppError('Create subject results get error', 400)
    }
  },
}
