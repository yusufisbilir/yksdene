import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptService } from '@/services/exam_attempt.service'

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    await examAttemptService.deleteExamAttempt(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
