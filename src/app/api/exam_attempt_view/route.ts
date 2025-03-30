import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptViewService } from '@/services/exam_attempt_view.service'

export async function GET(_request: NextRequest) {
  try {
    const results = await examAttemptViewService.getExamAttemptView()
    return NextResponse.json({ results })
  } catch (error) {
    return handleApiError(error)
  }
}
