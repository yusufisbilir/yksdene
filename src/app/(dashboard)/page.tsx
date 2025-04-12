import Dashboard from '@/components/features/dashboard/Dashboard'
import PublicDashboardView from '@/components/features/dashboard/ui/PublicDashboardView'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return <PublicDashboardView />
  }

  return <Dashboard />
}
