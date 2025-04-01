import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptService } from '@/services/exam_attempt.service'
import { createExamAttemptSchema, deleteExamAttemptSchema } from '@/types/examAttempt.schema'
import { validateRequest } from '@/utils/validationErrors'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validasyon
    const validation = validateRequest(body, createExamAttemptSchema)
    if ('response' in validation) {
      return validation.response
    }

    const result = await examAttemptService.createExamAttemptWithResults(validation.data)
    return NextResponse.json({ result }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()

    // Validasyon
    const validation = validateRequest(body, deleteExamAttemptSchema)
    if ('response' in validation) {
      return validation.response
    }

    await examAttemptService.deleteExamAttempt(validation.data.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
