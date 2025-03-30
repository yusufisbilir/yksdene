import { Exam } from '@/types'
import getExamDuration from '@/utils/getExamDuration'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TimerState {
  selectedExam: Exam
  minutes: number
  seconds: number
  isRunning: boolean
  isDirty: boolean
  isFinished: boolean
}

const initialState: TimerState = {
  selectedExam: 'tyt',
  minutes: getExamDuration('tyt'),
  seconds: 0,
  isRunning: false,
  isDirty: false,
  isFinished: false,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setExam: (state, action: PayloadAction<Exam>) => {
      state.selectedExam = action.payload
      state.minutes = getExamDuration(action.payload)
      state.seconds = 0
      state.isDirty = false
      state.isFinished = false
    },
    tick: (state) => {
      if (!state.isRunning) return
      if (state.seconds > 0) {
        state.seconds -= 1
      } else if (state.minutes > 0) {
        state.minutes -= 1
        state.seconds = 59
      } else {
        state.isRunning = false
        state.isFinished = true
      }
    },
    start: (state) => {
      state.isRunning = state.minutes > 0 || state.seconds > 0
      state.isDirty = true
      state.isFinished = false
    },
    pause: (state) => {
      state.isRunning = false
    },
    reset: (state) => {
      state.isRunning = false
      state.minutes = getExamDuration(state.selectedExam)
      state.seconds = 0
      state.isDirty = false
      state.isFinished = false
    },
    setFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload
    },
  },
})

export const { setExam, tick, start, pause, reset, setFinished } = timerSlice.actions
export default timerSlice.reducer
