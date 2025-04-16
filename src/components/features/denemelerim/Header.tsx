'use client'
import { Button } from '@/components/ui/button'
import { useExamAttemptContext } from '@/contexts/ExamAttemptContext'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
  const { isAddingExamAttempt, setIsAddingExamAttempt } = useExamAttemptContext()
  const searchParams = useSearchParams()
  const addExamAttemptParam = searchParams.get('ekle') === 'true'

  useEffect(() => {
    if (addExamAttemptParam) {
      setIsAddingExamAttempt(true)
    }
  }, [addExamAttemptParam, setIsAddingExamAttempt])

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-bold sm:text-3xl">⏰ Denemelerim</h1>
      <Button onClick={() => setIsAddingExamAttempt(!isAddingExamAttempt)}>
        {isAddingExamAttempt ? 'İptal' : '+ Deneme Ekle'}
      </Button>
    </div>
  )
}

export default Header
