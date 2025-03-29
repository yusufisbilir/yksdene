import Dashboard from '@/components/features/dashboard/Dashboard'
import PublicDashboard from '@/components/features/dashboard/PublicDashboard'
import { auth } from '@clerk/nextjs/server'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    return <PublicDashboard />
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  )
}
