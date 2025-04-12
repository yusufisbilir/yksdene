import { Suspense } from 'react'
import { DashboardDataProvider } from './DashboardDataProvider'
import DashboardSkeletonView from './ui/DashboardSkeletonView'
import DashboardView from './ui/DashboardView'
import EmptyDashboardView from './ui/EmptyDashboardView'

const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeletonView />}>
      <DashboardContainer />
    </Suspense>
  )
}

const DashboardContainer = async () => {
  const hasExamAttempts = await DashboardDataProvider.getHasExamAttempts()

  if (!hasExamAttempts) {
    return <EmptyDashboardView />
  }

  return <DashboardView />
}

export default Dashboard
