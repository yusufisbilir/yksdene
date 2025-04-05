import { AppError } from '@/utils/errors'
import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { ExamAttemptInsert, SubjectResultInsert } from '@/types'
import { apiRequestValidator } from './requestValidator.service'

export const examAttemptService = {
  async deleteExamAttempt(id: string) {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase.from('exam_attempts').delete().eq('id', id)

      if (error) throw error
      return data || []
    })
  },

  async _createExamAttempt(examAttempt: ExamAttemptInsert) {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase
        .from('exam_attempts')
        .insert(examAttempt)
        .select()
        .single()

      if (error) throw error
      return data || []
    })
  },

  async createExamAttemptWithResults({
    examAttempt,
    subjectResults,
  }: {
    examAttempt: ExamAttemptInsert
    subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
  }) {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      // Ensure user_id is set to authenticated user
      const examAttemptWithUserId = {
        ...examAttempt,
        user_id: userId,
      }

      // create exam attempt
      const examAttemptData = await this._createExamAttempt(examAttemptWithUserId)

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
    })
  },
}
