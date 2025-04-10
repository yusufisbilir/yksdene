import { examAttemptService } from '@/services/examAttempt.service'
import { yksRankingService } from '@/services/yksRanking.service'
import { ExamCategoryStatistics, YksRanking } from '@/types'
import { YKSRankingProvider, ProcessedRankingData } from './yksRanking/YKSRankingProvider'

export class DashboardDataProvider {
  static async getStats(): Promise<{
    examAttemptStats: ExamCategoryStatistics
    hasStats: boolean
    yksRankingData: ProcessedRankingData
  }> {
    const examAttemptStats = await examAttemptService.getExamAttemptStatistics()
    const hasStats = Object.keys(examAttemptStats).length > 0
    const yksRankingRaw = await yksRankingService.getYKSRanking()
    const yksRankingData = YKSRankingProvider.processRankingData(yksRankingRaw)

    return { examAttemptStats, hasStats, yksRankingData }
  }
}
