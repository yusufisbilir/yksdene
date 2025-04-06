'use client'

import PageLoader from '@/components/shared/PageLoader'
import ExamResultTable from '@/components/features/denemelerim/ExamResultTable'
import EmptyExamAttempt from '@/components/features/denemelerim/EmptyExamAttempt'
import { useGetExamAttemptViewQuery } from '@/features/examAttempt.slice'

export function ExamResultsList() {
  const { data: results, isLoading: isLoadingExamAttemptViews } = useGetExamAttemptViewQuery()

  if (isLoadingExamAttemptViews) {
    return <PageLoader />
  }

  if (results?.length === 0) <EmptyExamAttempt />

  return <ExamResultTable results={results ?? []} />
}
