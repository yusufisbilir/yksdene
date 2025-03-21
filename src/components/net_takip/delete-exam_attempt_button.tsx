'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useDeleteExamAttemptMutation } from '@/store/services/exam.api'

interface DeleteExamAttemptButtonProps {
  attempt_id: string
}

const DeleteExamAttemptButton = ({ attempt_id }: DeleteExamAttemptButtonProps) => {
  const [deleteExamAttempt] = useDeleteExamAttemptMutation()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => deleteExamAttempt(attempt_id)}
      className="flex items-center justify-center"
    >
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  )
}

export default DeleteExamAttemptButton
