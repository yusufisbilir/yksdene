import { Suspense } from 'react'
import DashboardSkeletonView from './ui/DashboardSkeletonView'
import DashboardView from './ui/DashboardView'
import EmptyDashboardView from './ui/EmptyDashboardView'
import { examAttemptService } from '@/services/examAttempt.service'

const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeletonView />}>
      <DashboardContainer />
    </Suspense>
  )
}

const DashboardContainer = async () => {
  const hasExamAttempts = await examAttemptService.hasExamAttempts()

  if (!hasExamAttempts) {
    return <EmptyDashboardView />
  }

  return <DashboardView />
}

export default Dashboard
