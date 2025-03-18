import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import pomodoroReducer from './slices/pomodoro.slice'
import timerReducer from './slices/timer.slice'
import { examApi } from './services/examApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pomodoro: pomodoroReducer,
    timer: timerReducer,
    [examApi.reducerPath]: examApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(examApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
