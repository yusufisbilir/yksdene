import { ProfilePage } from '@/components/features/profile/ProfilePage'

export const metadata = {
  title: 'Profil - YKS Dene',
  description: 'YKS Dene kullanıcı profili',
}

export default async function Profile() {
  return (
    <article className="flex items-center justify-center min-h-full">
      <ProfilePage />
    </article>
  )
}
