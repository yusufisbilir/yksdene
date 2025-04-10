import { Suspense } from 'react'
import { EmptyDashboard } from './EmptyDashboard'
import DashboardSkeleton from './DashboardSkeleton'
import { DashboardDataProvider } from './DashboardDataProvider'
import DashboardView from './DashboardView'

const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContainer />
    </Suspense>
  )
}

const DashboardContainer = async () => {
  const { examAttemptStats, hasStats, yksRankingData } = await DashboardDataProvider.getStats()

  if (!hasStats) {
    return <EmptyDashboard />
  }

  return <DashboardView examAttemptStats={examAttemptStats} yksRankingData={yksRankingData} />
}

export default Dashboard
