import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptStatisticsService } from '@/services/exam_attempt_statistics.service'

export async function GET(_request: NextRequest) {
  try {
    const results = await examAttemptStatisticsService.getExamAttemptStatistics()
    return NextResponse.json({ results })
  } catch (error) {
    return handleApiError(error)
  }
}
