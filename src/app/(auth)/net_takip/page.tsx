'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AddExamForm } from '@/components/features/netTakip/AddExamForm'
import { ExamResultsList } from '@/components/features/netTakip/ExamResultsList'
import { useGetExamAttemptViewQuery } from '@/features/exam_attempt_view.slice'
import PageLoader from '@/components/shared/PageLoader'

export default function NetTakipPage() {
  const [isAddingExam, setIsAddingExam] = useState(false)
  const { data: examAttemptViews, isLoading: isLoadingExamAttemptViews } =
    useGetExamAttemptViewQuery()

  if (isLoadingExamAttemptViews) {
    return <PageLoader />
  }

  return (
    <article className="space-y-6 panel">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold sm:text-3xl">Denemelerim</h1>
        <Button onClick={() => setIsAddingExam(!isAddingExam)}>
          {isAddingExam ? 'İptal' : 'Deneme Ekle'}
        </Button>
      </div>

      {/* Add exam form */}
      {isAddingExam && <AddExamForm />}

      {/* Exam results list */}
      <ExamResultsList results={examAttemptViews || []} />
    </article>
  )
}
