import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'

export async function POST(request: NextRequest, { params }: { params: { groupId: string } }) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const groupId = params.groupId
      await groupService.leaveGroup(groupId)
      return NextResponse.json({ success: true })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
