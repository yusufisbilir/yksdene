import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/utils/handleApiError'
import { apiRequestValidator } from '@/services/requestValidator.service'
import { groupService } from '@/services/group.service'

export async function POST(request: NextRequest, { params }: { params: { groupId: string } }) {
  return apiRequestValidator.withAuth(request, async (req, userId) => {
    try {
      const groupId = params.groupId
      const body = await req.json()
      const { targetUserId, role } = body

      if (!targetUserId || !role) {
        return NextResponse.json({ error: 'Kullanıcı ID ve rol gerekli' }, { status: 400 })
      }

      if (role !== 'admin' && role !== 'member') {
        return NextResponse.json(
          { error: 'Geçersiz rol. "admin" veya "member" olabilir' },
          { status: 400 },
        )
      }

      const updatedMember = await groupService.updateGroupRole(groupId, targetUserId, role)
      return NextResponse.json({ result: updatedMember })
    } catch (error) {
      return handleApiError(error)
    }
  })
}
