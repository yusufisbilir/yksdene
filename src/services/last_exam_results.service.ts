import { supabaseServerClient } from '@/lib/supabaseServerClient'
import { ExamAttemptView, SubjectResult } from '@/types'
import { examTemplates } from '@/constants/db.constants'
import { apiRequestValidator } from './request-validator.service'

export interface LastExamResults {
  TYT?: ExamAttemptView & { subjectResults: SubjectResult[] }
  AYT_Sayisal?: ExamAttemptView & { subjectResults: SubjectResult[] }
  AYT_EsitAgirlik?: ExamAttemptView & { subjectResults: SubjectResult[] }
  AYT_Sozel?: ExamAttemptView & { subjectResults: SubjectResult[] }
}

export const lastExamResultsService = {
  async getLastExamResults(): Promise<LastExamResults> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const results: LastExamResults = {}

      for (const template of examTemplates) {
        const { data: lastAttempt, error: attemptError } = await supabase
          .from('exam_attempt_view')
          .select('*')
          .eq('user_id', userId)
          .eq('exam_category', template.category)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (attemptError) {
          if (attemptError.code === 'PGRST116') {
            continue
          }
          throw attemptError
        }

        const { data: subjectResults, error: subjectError } = await supabase
          .from('subject_results')
          .select('*')
          .eq('user_id', userId)
          .eq('exam_attempt_id', lastAttempt.attempt_id)

        if (subjectError) throw subjectError

        results[template.category as keyof LastExamResults] = {
          ...lastAttempt,
          subjectResults: subjectResults.map((result) => ({
            ...result,
            category: template.category,
          })),
        }
      }

      return results
    })
  },
}
