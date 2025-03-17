'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { start, pause, reset } from '@/store/slices/timer.slice'

const TimerActions = () => {
  const isRunning = useAppSelector((state) => state.timer.isRunning)
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center gap-4">
      {!isRunning ? (
        <Button
          onClick={() => dispatch(start())}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium cursor-pointer"
        >
          Başlat
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(pause())}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium cursor-pointer"
        >
          Duraklat
        </Button>
      )}
      <Button
        onClick={() => dispatch(reset())}
        variant="outline"
        className="border-orange-300 text-orange-600 hover:bg-orange-50 font-medium cursor-pointer"
      >
        Sıfırla
      </Button>
    </div>
  )
}

export default TimerActions
