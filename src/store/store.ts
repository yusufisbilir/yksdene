import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro.slice'
import timerReducer from '../features/timer.slice'
import { apiSlice } from '@/features/api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    timer: timerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
