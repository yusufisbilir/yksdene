'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { EXAM } from '@/constants/constants'

export interface TimerState {
  selectedExam: EXAM
  minutes: number
  seconds: number
  isRunning: boolean
  customMinutes: string
  isDirty: boolean
}

export type TimerAction =
  | { type: 'SET_EXAM'; payload: EXAM }
  | { type: 'SET_CUSTOM_MINUTES'; payload: string }
  | { type: 'TICK' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SET_MODE'; payload: TimerMode }

export const initialState: TimerState = {
  selectedExam: 'TYT',
  minutes: EXAM.TYT.duration,
  seconds: 0,
  isRunning: false,
  customMinutes: '',
  isDirty: false,
}

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'SET_EXAM':
      return {
        ...state,
        selectedExam: action.payload,
        minutes: action.payload !== 'Custom' ? EXAM[action.payload].duration : state.minutes,
        seconds: 0,
        isDirty: false,
      }

    case 'SET_CUSTOM_MINUTES':
      return {
        ...state,
        customMinutes: action.payload,
        minutes: state.selectedExam === 'Custom' ? parseInt(action.payload) || 0 : state.minutes,
        seconds: 0,
        isDirty: false,
      }

    case 'TICK':
      if (!state.isRunning) return state
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 }
      } else if (state.minutes > 0) {
        return { ...state, minutes: state.minutes - 1, seconds: 59 }
      } else {
        return { ...state, isRunning: false }
      }

    case 'START':
      return {
        ...state,
        isRunning: state.minutes > 0 || state.seconds > 0,
        isDirty: true,
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
        minutes:
          state.selectedExam === 'Custom'
            ? parseInt(state.customMinutes) || 0
            : EXAM[state.selectedExam].duration,
        seconds: 0,
        isDirty: false,
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
