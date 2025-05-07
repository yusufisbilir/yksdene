import GroupDetails from '@/components/features/groups/GroupDetails'

interface GroupPageProps {
  params: {
    id: string
  }
}

export default function GroupPage({ params }: GroupPageProps) {
  return (
    <div className="panel">
      <GroupDetails groupId={params.id} />
    </div>
  )
}
