import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { profileService } from '@/services/profile.service'
import { apiRequestValidator } from '@/services/requestValidator.service'

// Rate limiting configuration for profile endpoints
const rateLimitConfig = {
  limit: 30, // 30 requests
  windowMs: 60 * 1000, // per minute
}

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(
    request,
    async (req, userId) => {
      try {
        const result = await profileService.getProfileWithUniversityProgram()
        return NextResponse.json({ result })
      } catch (error) {
        return handleApiError(error)
      }
    },
    rateLimitConfig,
  )
}
