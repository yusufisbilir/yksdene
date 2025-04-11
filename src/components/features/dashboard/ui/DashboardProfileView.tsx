import { Profile } from '@/types'

export default function DashboardProfileView({ profile }: { profile: Profile }) {
  return (
    <div>
      <h1>{profile?.name}</h1>
      <p>{profile.image_url}</p>
      <p>{profile.obp}</p>
      <p>{profile.username && `@${profile.username}`}</p>
    </div>
  )
}
