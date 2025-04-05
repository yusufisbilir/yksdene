import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptStatisticsService } from '@/services/exam_attempt_statistics.service'
import { apiRequestValidator } from '../../../services/requestValidator.service'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const results = await examAttemptStatisticsService.getExamAttemptStatistics()
      return NextResponse.json({ results })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
