import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptService } from '@/services/exam_attempt.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await examAttemptService.createExamAttemptWithResults(body)
    return NextResponse.json({ result }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 })
    }

    await examAttemptService.deleteExamAttempt(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
