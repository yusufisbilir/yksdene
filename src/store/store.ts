import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from './slices/pomodoro.slice'
import timerReducer from './slices/timer.slice'
import { examApi } from './services/exam.api'
import { apiSlice } from '@/features/api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    timer: timerReducer,
    [examApi.reducerPath]: examApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(examApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
