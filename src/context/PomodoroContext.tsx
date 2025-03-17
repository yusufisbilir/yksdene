'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface PomodoroSettings {
  pomodoroTime: number
  shortBreakTime: number
  longBreakTime: number
  longBreakInterval: number
}

interface PomodoroState extends PomodoroSettings {
  minutes: number
  seconds: number
  isRunning: boolean
  currentMode: 'pomodoro' | 'shortBreak' | 'longBreak'
  completedPomodoros: number
}

type PomodoroAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'SET_MODE'; payload: 'pomodoro' | 'shortBreak' | 'longBreak' }
  | { type: 'UPDATE_SETTINGS'; payload: PomodoroSettings }

const defaultSettings: PomodoroSettings = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 10,
  longBreakInterval: 4,
}

function getInitialMinutes(
  mode: 'pomodoro' | 'shortBreak' | 'longBreak',
  settings: PomodoroSettings,
): number {
  switch (mode) {
    case 'pomodoro':
      return settings.pomodoroTime
    case 'shortBreak':
      return settings.shortBreakTime
    case 'longBreak':
      return settings.longBreakTime
  }
}

function pomodoroReducer(state: PomodoroState, action: PomodoroAction): PomodoroState {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isRunning: true,
      }

    case 'PAUSE':
      return {
        ...state,
        isRunning: false,
      }

    case 'RESET':
      return {
        ...state,
        minutes: getInitialMinutes(state.currentMode, state),
        seconds: 0,
        isRunning: false,
      }

    case 'TICK':
      if (!state.isRunning) return state
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 }
      } else if (state.minutes > 0) {
        return { ...state, minutes: state.minutes - 1, seconds: 59 }
      } else {
        const newCompletedPomodoros =
          state.currentMode === 'pomodoro' ? state.completedPomodoros + 1 : state.completedPomodoros

        const shouldTakeLongBreak = newCompletedPomodoros % state.longBreakInterval === 0
        const nextMode =
          state.currentMode === 'pomodoro'
            ? shouldTakeLongBreak
              ? 'longBreak'
              : 'shortBreak'
            : 'pomodoro'

        return {
          ...state,
          isRunning: false,
          currentMode: nextMode,
          minutes: getInitialMinutes(nextMode, state),
          seconds: 0,
          completedPomodoros: newCompletedPomodoros,
        }
      }

    case 'SET_MODE':
      return {
        ...state,
        currentMode: action.payload,
        minutes: getInitialMinutes(action.payload, state),
        seconds: 0,
        isRunning: false,
      }

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        ...action.payload,
        minutes: getInitialMinutes(state.currentMode, action.payload),
        seconds: 0,
        isRunning: false,
      }

    default:
      return state
  }
}

interface PomodoroContextType {
  state: PomodoroState
  dispatch: React.Dispatch<PomodoroAction>
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [settings] = useLocalStorage('pomodoroSettings', defaultSettings)

  const initialState: PomodoroState = {
    ...settings,
    minutes: settings.pomodoroTime,
    seconds: 0,
    isRunning: false,
    currentMode: 'pomodoro',
    completedPomodoros: 0,
  }

  const [state, dispatch] = useReducer(pomodoroReducer, initialState)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [state.isRunning])

  return <PomodoroContext.Provider value={{ state, dispatch }}>{children}</PomodoroContext.Provider>
}

export function usePomodoro() {
  const context = useContext(PomodoroContext)
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider')
  }
  return context
}
