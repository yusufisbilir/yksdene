import GroupDetails from '@/components/features/groups/GroupDetails'

export default async function GroupPage({ params }: { params: { id: string } }) {
  return (
    <div className="panel">
      <GroupDetails groupId={params.id} />
    </div>
  )
}
