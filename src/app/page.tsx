import Dashboard from '@/components/dashboard/Dashboard'
import PublicDashboard from '@/components/dashboard/PublicDashboard'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return <PublicDashboard />
  }

  return <Dashboard />
}
