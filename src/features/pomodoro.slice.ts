import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

const initialState: PomodoroState = {
  ...defaultSettings,
  minutes: defaultSettings.pomodoroTime,
  seconds: 0,
  isRunning: false,
  currentMode: 'pomodoro',
  completedPomodoros: 0,
}

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true
    },
    pause: (state) => {
      state.isRunning = false
    },
    reset: (state) => {
      state.minutes = getInitialMinutes(state.currentMode, state)
      state.seconds = 0
      state.isRunning = false
    },
    tick: (state) => {
      if (!state.isRunning) return
      if (state.seconds > 0) {
        state.seconds -= 1
      } else if (state.minutes > 0) {
        state.minutes -= 1
        state.seconds = 59
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

        state.isRunning = false
        state.currentMode = nextMode
        state.minutes = getInitialMinutes(nextMode, state)
        state.seconds = 0
        state.completedPomodoros = newCompletedPomodoros
      }
    },
    setMode: (state, action: PayloadAction<'pomodoro' | 'shortBreak' | 'longBreak'>) => {
      state.currentMode = action.payload
      state.minutes = getInitialMinutes(action.payload, state)
      state.seconds = 0
      state.isRunning = false
    },
    updateSettings: (state, action: PayloadAction<PomodoroSettings>) => {
      Object.assign(state, action.payload)
      state.minutes = getInitialMinutes(state.currentMode, action.payload)
      state.seconds = 0
      state.isRunning = false
    },
  },
})

export const { start, pause, reset, tick, setMode, updateSettings } = pomodoroSlice.actions
export default pomodoroSlice.reducer
