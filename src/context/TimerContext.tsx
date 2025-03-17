'use client'

import { Exam } from '@/types'
import getExamDuration from '@/utils/getExamDuration'
import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

export interface TimerState {
  selectedExam: Exam
  minutes: number
  seconds: number
  isRunning: boolean
  isDirty: boolean
  isFinished: boolean
}

export type TimerAction =
  | { type: 'SET_EXAM'; payload: Exam }
  | { type: 'TICK' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SET_FINISHED'; payload: boolean }

export const initialState: TimerState = {
  selectedExam: 'tyt',
  minutes: getExamDuration('tyt'),
  seconds: 0,
  isRunning: false,
  isDirty: false,
  isFinished: false,
}

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'SET_EXAM':
      return {
        ...state,
        selectedExam: action.payload,
        minutes: getExamDuration(action.payload),
        seconds: 0,
        isDirty: false,
        isFinished: false,
      }

    case 'TICK':
      if (!state.isRunning) return state
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 }
      } else if (state.minutes > 0) {
        return { ...state, minutes: state.minutes - 1, seconds: 59 }
      } else {
        return { ...state, isRunning: false, isFinished: true }
      }

    case 'START':
      return {
        ...state,
        isRunning: state.minutes > 0 || state.seconds > 0,
        isDirty: true,
        isFinished: false,
      }

    case 'PAUSE':
      return {
        ...state,
        isRunning: false,
      }

    case 'RESET':
      return {
        ...state,
        isRunning: false,
        minutes: getExamDuration(state.selectedExam),
        seconds: 0,
        isDirty: false,
        isFinished: false,
      }

    case 'SET_FINISHED':
      return {
        ...state,
        isFinished: action.payload,
      }

    default:
      return state
  }
}

interface TimerContextType {
  state: TimerState
  dispatch: React.Dispatch<TimerAction>
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(timerReducer, initialState)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [state.isRunning])

  return <TimerContext.Provider value={{ state, dispatch }}>{children}</TimerContext.Provider>
}

export function useTimer() {
  const context = useContext(TimerContext)
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider')
  }
  return context
}
