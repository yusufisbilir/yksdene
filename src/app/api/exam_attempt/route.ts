import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { examAttemptService } from '@/services/exam_attempt.service'
import { createExamAttemptSchema, deleteExamAttemptSchema } from '@/types/examAttempt.schema'
import { apiRequestValidator } from '@/services/request-validator.service'

// Rate limiting configuration for exam attempt endpoints
const rateLimitConfig = {
  limit: 20, // 20 requests
  windowMs: 60 * 1000, // per minute
}

export async function POST(request: NextRequest) {
  return apiRequestValidator.withValidation(
    request,
    createExamAttemptSchema,
    async (req, userId, validatedData) => {
      try {
        const result = await examAttemptService.createExamAttemptWithResults(validatedData)
        return NextResponse.json({ result }, { status: 201 })
      } catch (error) {
        return handleApiError(error)
      }
    },
    // More strict rate limiting for creating attempts
    { ...rateLimitConfig, limit: 10 },
  )
}

export async function DELETE(request: NextRequest) {
  return apiRequestValidator.withValidation(
    request,
    deleteExamAttemptSchema,
    async (req, userId, validatedData) => {
      try {
        await examAttemptService.deleteExamAttempt(validatedData.id)
        return NextResponse.json({ success: true })
      } catch (error) {
        return handleApiError(error)
      }
    },
  )
}
