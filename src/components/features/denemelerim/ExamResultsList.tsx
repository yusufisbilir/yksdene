'use client'

import { useGetExamAttemptViewQuery } from '@/features/exam_attempt_view.slice'
import PageLoader from '@/components/shared/PageLoader'
import ExamResultTable from '@/components/features/denemelerim/ExamResultTable'
import EmptyExamAttempt from '@/components/features/denemelerim/EmptyExamAttempt'

export function ExamResultsList() {
  const { data: results, isLoading: isLoadingExamAttemptViews } = useGetExamAttemptViewQuery()

  if (isLoadingExamAttemptViews) {
    return <PageLoader />
  }

  if (results?.length === 0) <EmptyExamAttempt />

  return <ExamResultTable results={results ?? []} />
}
