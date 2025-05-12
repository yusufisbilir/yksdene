import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'
import { createGroupSchema } from '@/types/groups.types'

export async function GET(request: NextRequest) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const { searchParams } = new URL(req.url)
      const type = searchParams.get('type') || 'my'

      if (type === 'my') {
        const groups = await groupService.getMyGroups()
        return NextResponse.json({ results: groups })
      } else {
        const groups = await groupService.getPublicGroups()
        return NextResponse.json({ results: groups })
      }
    } catch (error) {
      return handleApiError(error)
    }
  })
}

export async function POST(request: NextRequest) {
  return apiRequestValidator.withValidation(
    request,
    createGroupSchema,
    async (req, userId, validatedData) => {
      try {
        const { name, description, isPublic, joinCode } = validatedData

        const group = await groupService.createGroup(
          name,
          description || null,
          isPublic !== undefined ? isPublic : true,
          joinCode || null,
        )

        return NextResponse.json({ result: group })
      } catch (error) {
        return handleApiError(error)
      }
    },
    {
      limit: 10,
      windowMs: 60 * 1000,
    },
  )
}
