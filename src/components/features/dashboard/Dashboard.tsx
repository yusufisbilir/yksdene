import { Suspense } from 'react'
import { DashboardDataProvider } from './DashboardDataProvider'
import DashboardSkeleton from './DashboardSkeleton'
import DashboardView from './DashboardView'
import { EmptyDashboard } from './EmptyDashboard'

const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContainer />
    </Suspense>
  )
}

const DashboardContainer = async () => {
  const { hasExamAttempts } = await DashboardDataProvider.getStats()

  if (!hasExamAttempts) {
    return <EmptyDashboard />
  }

  return <DashboardView />
}

export default Dashboard
