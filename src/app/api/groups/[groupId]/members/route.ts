import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'

export async function GET(request: NextRequest, { params }: { params: { groupId: string } }) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const groupId = params.groupId
      const members = await groupService.getGroupMembers(groupId)
      return NextResponse.json({ results: members })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
