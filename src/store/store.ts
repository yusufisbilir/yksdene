import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import pomodoroReducer from './slices/pomodoro.slice'
import timerReducer from './slices/timer.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pomodoro: pomodoroReducer,
    timer: timerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
