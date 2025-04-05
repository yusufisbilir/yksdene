import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { lastExamResultsService } from '@/services/last_exam_results.service'
import { apiRequestValidator } from '../../../services/requestValidator.service'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const result = await lastExamResultsService.getLastExamResults()
      return NextResponse.json({ result })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
