'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useDeleteExamAttemptMutation } from '@/features/examAttempt.slice'

interface DeleteExamAttemptButtonProps {
  attempt_id: string
}

const DeleteExamAttemptButton = ({ attempt_id }: DeleteExamAttemptButtonProps) => {
  const [deleteExamAttempt, { isLoading: isLoadingDeleteExamAttempt }] =
    useDeleteExamAttemptMutation()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => deleteExamAttempt(attempt_id)}
      className="flex items-center justify-center"
      disabled={isLoadingDeleteExamAttempt}
    >
      {isLoadingDeleteExamAttempt ? (
        <Loader2 className="h-4 w-4 animate-spin text-destructive" />
      ) : (
        <Trash2 className="h-4 w-4 text-destructive" />
      )}
    </Button>
  )
}

export default DeleteExamAttemptButton
