'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface ExamAttemptContextType {
  isAddingExamAttempt: boolean
  setIsAddingExamAttempt: (value: boolean) => void
}

const ExamContext = createContext<ExamAttemptContextType | undefined>(undefined)

export function ExamAttemptContextProvider({ children }: { children: ReactNode }) {
  const [isAddingExamAttempt, setIsAddingExamAttempt] = useState(false)

  return (
    <ExamContext.Provider value={{ isAddingExamAttempt, setIsAddingExamAttempt }}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExamAttemptContext() {
  const context = useContext(ExamContext)
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return context
}
