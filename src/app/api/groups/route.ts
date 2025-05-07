import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'

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
  console.log('here')
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const body = await req.json()
      const { name, description, isPublic, joinCode } = body

      if (!name) {
        return NextResponse.json({ error: 'Grup adı gerekli' }, { status: 400 })
      }

      const group = await groupService.createGroup(
        name,
        description || null,
        isPublic || true,
        joinCode || null,
      )

      return NextResponse.json({ result: group })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
