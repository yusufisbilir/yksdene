import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { yksRankingService } from '@/services/yksRanking.service'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const result = await yksRankingService.getYKSRanking()
      return NextResponse.json({ result })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
