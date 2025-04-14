'use client'

import { useGetExamAttemptStatisticsQuery } from '@/features/examAttempt.slice'
import PageLoader from '@/components/shared/PageLoader'
import QuestionAnalysisView from './ui/QuestionAnalysisView'

const QuestionAnalysis = () => {
  const { data: examAttemptStats } = useGetExamAttemptStatisticsQuery()

  if (!examAttemptStats) {
    return <PageLoader />
  }

  return <QuestionAnalysisView examAttemptStats={examAttemptStats} />
}

export default QuestionAnalysis
