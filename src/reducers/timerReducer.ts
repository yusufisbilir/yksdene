import { EXAM_TIMES } from '@/constants/constants'

export type TimerMode = 'digital' | 'analog'

export interface TimerState {
  selectedExam: keyof typeof EXAM_TIMES
  minutes: number
  seconds: number
  isRunning: boolean
  mode: TimerMode
  customMinutes: string
}

export type TimerAction =
  | { type: 'SET_EXAM'; payload: keyof typeof EXAM_TIMES }
  | { type: 'SET_CUSTOM_MINUTES'; payload: string }
  | { type: 'TICK' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SET_MODE'; payload: TimerMode }

export const initialState: TimerState = {
  selectedExam: 'Custom',
  minutes: 0,
  seconds: 0,
  isRunning: false,
  mode: 'digital',
  customMinutes: '',
}

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'SET_EXAM':
      return {
        ...state,
        selectedExam: action.payload,
        minutes: action.payload !== 'Custom' ? EXAM_TIMES[action.payload] : state.minutes,
        seconds: 0,
      }

    case 'SET_CUSTOM_MINUTES':
      return {
        ...state,
        customMinutes: action.payload,
        minutes: state.selectedExam === 'Custom' ? parseInt(action.payload) || 0 : state.minutes,
        seconds: 0,
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
            : EXAM_TIMES[state.selectedExam],
        seconds: 0,
      }

    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      }

    default:
      return state
  }
}
