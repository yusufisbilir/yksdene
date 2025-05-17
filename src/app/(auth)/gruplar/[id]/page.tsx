'use client'
import GroupDetails from '@/components/features/groups/GroupDetails'
import GroupLeaderboard from '@/components/features/groups/GroupLeaderboard'
import { useParams } from 'next/navigation'

export default function GroupPage() {
  const params = useParams()
  const groupId = params?.id as string

  return (
    <div className="panel space-y-8">
      <GroupDetails />
      <GroupLeaderboard groupId={groupId} />
    </div>
  )
}
