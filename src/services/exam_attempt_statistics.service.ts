import { UnauthorizedError } from '@/utils/errors'
import { auth } from '@clerk/nextjs/server'
import { examAttemptViewService } from './exam_attempt_view.service'
import { examTemplates } from '@/constants/db.constants'
import { ExamCategoryStatistics, ExamTemplate } from '@/types/db.types'

export const examAttemptStatisticsService = {
  async getExamAttemptStatistics(): Promise<ExamCategoryStatistics> {
    const { userId } = await auth()
    if (!userId) throw new UnauthorizedError('Yetkisiz erişim')

    const attempts = await examAttemptViewService.getExamAttemptView()

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
      stats.performanceTrend.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    })

    return statsByTemplate
  },
}
