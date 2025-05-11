import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'

export async function GET(request: NextRequest, { params }: { params: { groupId: string } }) {
  const { groupId } = await params

  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const group = await groupService.getGroupById(groupId)
      return NextResponse.json({ result: group })
    } catch (error) {
      return handleApiError(error)
    }
  })
}

export async function PATCH(request: NextRequest, { params }: { params: { groupId: string } }) {
  const { groupId } = params

  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const body = await req.json()
      const { name, description, isPublic, joinCode } = body

      const groupData = {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(isPublic !== undefined && { is_public: isPublic }),
        ...(joinCode !== undefined && { join_code: joinCode }),
      }

      const updatedGroup = await groupService.updateGroup(groupId, groupData)
      return NextResponse.json({ result: updatedGroup })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
