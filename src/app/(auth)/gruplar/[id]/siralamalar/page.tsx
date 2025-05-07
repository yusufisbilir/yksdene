import GroupLeaderboard from '@/components/features/groups/GroupLeaderboard'

interface GroupLeaderboardPageProps {
  params: {
    id: string
  }
}

export default function GroupLeaderboardPage({ params }: GroupLeaderboardPageProps) {
  return (
    <div className="panel">
      <GroupLeaderboard groupId={params.id} />
    </div>
  )
}
