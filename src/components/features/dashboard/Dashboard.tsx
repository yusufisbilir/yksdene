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
  const { examAttemptStats, hasStats } = await DashboardDataProvider.getExamAttemptStats()
  const { yksRanking } = await DashboardDataProvider.getYKSRanking()

  if (!hasStats) {
    return <EmptyDashboard />
  }

  return <DashboardView examAttemptStats={examAttemptStats} yksRanking={yksRanking} />
}

export default Dashboard
