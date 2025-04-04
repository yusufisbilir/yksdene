import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { profileService } from '@/services/profile.service'

export async function GET(_request: NextRequest) {
  try {
    const result = await profileService.getProfile()
    return NextResponse.json({ result })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profileData = await request.json()
    const result = await profileService.updateProfile(profileData)
    return NextResponse.json({ result })
  } catch (error) {
    return handleApiError(error)
  }
}
