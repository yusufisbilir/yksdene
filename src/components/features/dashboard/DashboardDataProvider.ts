import { examAttemptService } from '@/services/examAttempt.service'
import { yksRankingService } from '@/services/yksRanking.service'
import { ExamCategoryStatistics, YksRanking } from '@/types'

export class DashboardDataProvider {
  static async getExamAttemptStats(): Promise<{
    examAttemptStats: ExamCategoryStatistics
    hasStats: boolean
  }> {
    const examAttemptStats = await examAttemptService.getExamAttemptStatistics()
    const hasStats = Object.keys(examAttemptStats).length > 0

    return { examAttemptStats, hasStats }
  }

  static async getYKSRanking(): Promise<{
    yksRanking: YksRanking[]
  }> {
    const yksRanking = await yksRankingService.getYKSRanking()

    return { yksRanking: yksRanking ?? [] }
  }
}
