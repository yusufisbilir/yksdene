import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { lastExamResultsService } from '@/services/last_exam_results.service'

export async function GET(_request: NextRequest) {
  try {
    const result = await lastExamResultsService.getLastExamResults()
    return NextResponse.json({ result })
  } catch (error) {
    return handleApiError(error)
  }
}
