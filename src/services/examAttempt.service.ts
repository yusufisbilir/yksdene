import { supabaseServerClient } from '@/lib/supabaseServerClient'
import {
  ExamAttemptInsert,
  ExamAttemptView,
  ExamCategoryStatistics,
  ExamTemplate,
  LastExamResults,
  LeaderBoard,
  SubjectResultInsert,
} from '@/types'
import { examTemplates } from '@/constants/db.constants'
import { apiRequestValidator } from './requestValidator.service'
import { AppError } from '@/utils/errors'

export const examAttemptService = {
  // Create
  async _createExamAttempt(examAttempt: ExamAttemptInsert) {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
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

  // src/services/examAttempt.service.ts
  async createExamAttemptWithResults({
    examAttempt,
    subjectResults,
  }: {
    examAttempt: ExamAttemptInsert
    subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
  }) {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
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

  // Delete
  async deleteExamAttempt(id: string) {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase.from('exam_attempts').delete().eq('id', id)

      if (error) throw error
      return data || []
    })
  },

  // Read
  async getLastExamResults(): Promise<LastExamResults> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
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

        if (template.category === 'TYT') {
          results.TYT_id = lastAttempt.attempt_id
        } else {
          results.AYT_id = lastAttempt.attempt_id
        }
      }

      return results
    })
  },

  async getExamAttemptView(): Promise<ExamAttemptView[]> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase
        .from('exam_attempt_view')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    })
  },

  async getExamAttemptStatistics(): Promise<ExamCategoryStatistics> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const attempts = await this.getExamAttemptView()

      if (attempts.length === 0) {
        return {}
      }

      // Group attempts by exam category
      const statsByTemplate = attempts.reduce((acc, attempt) => {
        const templateId = examTemplates.find(
          (t: ExamTemplate) => t.category === attempt.exam_category,
        )?.id
        if (!templateId) return acc

        if (!acc[templateId]) {
          acc[templateId] = {
            totalAttempts: 0,
            totalNetScore: 0,
            averageNetScore: 0,
            performanceTrend: [],
          }
        }

        acc[templateId].totalAttempts++
        acc[templateId].totalNetScore += attempt.net_score || 0

        // Add to performance trend
        acc[templateId].performanceTrend.push({
          date: attempt.attempt_date || '',
          net_score: attempt.net_score || 0,
          correct: attempt.total_correct || 0,
          incorrect: attempt.total_incorrect || 0,
          blank: attempt.total_blank || 0,
        })

        return acc
      }, {} as ExamCategoryStatistics)

      // Calculate averages and sort trends by date
      Object.keys(statsByTemplate).forEach((templateId) => {
        const stats = statsByTemplate[templateId]
        stats.averageNetScore = stats.totalNetScore / stats.totalAttempts
        stats.performanceTrend.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )
      })

      return statsByTemplate
    })
  },

  async getLeaderboardData(): Promise<LeaderBoard[]> {
    return await apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()

      const { data, error } = await supabase
        .from('leaderboard_view')
        .select('*')
        .order('total_exam_attempts', { ascending: false })
        .limit(10)

      console.log(data)

      if (error) throw error
      return data || []
    })
  },

  // utils
  async hasExamAttempts(): Promise<boolean> {
    const examAttemptStats = await this.getExamAttemptStatistics()
    return Object.keys(examAttemptStats).length > 0
  },
}
