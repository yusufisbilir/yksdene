'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { tick } from '@/store/slices/pomodoro.slice'

export function PomodoroTimer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { isRunning } = useAppSelector((state) => state.pomodoro)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick())
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, dispatch])

  return <>{children}</>
}
