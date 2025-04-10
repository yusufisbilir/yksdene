import { examAttemptService } from '@/services/examAttempt.service'
import { yksRankingService } from '@/services/yksRanking.service'
import { ExamCategoryStatistics, YksRanking } from '@/types'

export class DashboardDataProvider {
  static async getStats(): Promise<{
    examAttemptStats: ExamCategoryStatistics
    hasStats: boolean
    yksRanking: YksRanking[]
  }> {
    const examAttemptStats = await examAttemptService.getExamAttemptStatistics()
    const hasStats = Object.keys(examAttemptStats).length > 0
    const yksRanking = await yksRankingService.getYKSRanking()

    return { examAttemptStats, hasStats, yksRanking }
  }
}
