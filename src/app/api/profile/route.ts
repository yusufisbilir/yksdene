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
