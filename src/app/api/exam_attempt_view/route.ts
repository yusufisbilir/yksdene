import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptViewService } from '@/services/exam_attempt_view.service'
import { apiRequestValidator } from '../../../services/request-validator.service'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const results = await examAttemptViewService.getExamAttemptView()
      return NextResponse.json({ results })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
