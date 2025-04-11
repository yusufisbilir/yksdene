'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetExamAttemptStatisticsQuery } from '@/features/examAttempt.slice'
import AverageResultsView from './ui/AverageResultsView'

const AverageResults = () => {
  const { data: examAttemptStats } = useGetExamAttemptStatisticsQuery()

  if (!examAttemptStats) {
    return <PageLoader />
  }

  return <AverageResultsView examAttemptStats={examAttemptStats} />
}

export default AverageResults
