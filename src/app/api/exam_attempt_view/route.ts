import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { examAttemptService } from '@/services/examAttempt.service'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const results = await examAttemptService.getExamAttemptView()
      return NextResponse.json({ results })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
