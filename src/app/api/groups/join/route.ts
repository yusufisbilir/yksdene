import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'

export async function POST(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const body = await req.json()
      const { groupId, joinCode } = body

      if (!groupId) {
        return NextResponse.json({ error: 'Grup ID gerekli' }, { status: 400 })
      }

      const membership = await groupService.joinGroup(groupId, joinCode)
      return NextResponse.json({ result: membership })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
