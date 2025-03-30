import Dashboard from '@/components/features/dashboard/Dashboard'
import PublicDashboard from '@/components/features/dashboard/PublicDashboard'
import { SuspenseProvider } from '@/components/shared/SuspenseProvider'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return <PublicDashboard />
  }

  return (
    <SuspenseProvider>
      <Dashboard />
    </SuspenseProvider>
  )
}
