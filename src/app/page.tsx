import Dashboard from '@/components/features/dashboard/Dashboard'
import PublicDashboard from '@/components/features/dashboard/PublicDashboard'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return <PublicDashboard />
  }

  return <Dashboard />
}
