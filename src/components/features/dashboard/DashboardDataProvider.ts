import { examAttemptService } from '@/services/examAttempt.service'

export class DashboardDataProvider {
  static async getHasExamAttempts(): Promise<boolean> {
    const examAttemptStats = await examAttemptService.getExamAttemptStatistics()
    const hasExamAttempts = Object.keys(examAttemptStats).length > 0

    return hasExamAttempts
  }
}
