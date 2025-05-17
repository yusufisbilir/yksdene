import { NextRequest, NextResponse } from 'next/server'
import { groupService } from '@/services/group.service'

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  if (!name) {
    return NextResponse.json({ available: false }, { status: 400 })
  }
  try {
    const result = await groupService.checkGroupName(name)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ available: false }, { status: 500 })
  }
}
