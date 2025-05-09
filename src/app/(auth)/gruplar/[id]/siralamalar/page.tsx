import GroupLeaderboard from '@/components/features/groups/GroupLeaderboard'

export default async function GroupLeaderboardPage({ params }: { params: { id: string } }) {
  return (
    <div className="panel">
      <GroupLeaderboard groupId={params.id} />
    </div>
  )
}
