import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { profileService } from '@/services/profile.service'
import { apiRequestValidator } from '../../../services/requestValidator.service'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const result = await profileService.getProfile()
      return NextResponse.json({ result })
    } catch (error) {
      return handleApiError(error)
    }
  })
}

export async function PUT(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const profileData = await req.json()
      const result = await profileService.updateProfile(profileData)
      return NextResponse.json({ result })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
