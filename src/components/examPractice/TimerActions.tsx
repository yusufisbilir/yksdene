'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useTimer } from '@/contexts/TimerContext'

const TimerActions = () => {
  const { state, dispatch } = useTimer()

  return (
    <div className="flex justify-center gap-4">
      {!state.isRunning ? (
        <Button
          onClick={() => dispatch({ type: 'START' })}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium cursor-pointer"
        >
          Başlat
        </Button>
      ) : (
        <Button
          onClick={() => dispatch({ type: 'PAUSE' })}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium cursor-pointer"
        >
          Duraklat
        </Button>
      )}
      <Button
        onClick={() => dispatch({ type: 'RESET' })}
        variant="outline"
        className="border-orange-300 text-orange-600 hover:bg-orange-50 font-medium cursor-pointer"
      >
        Sıfırla
      </Button>
    </div>
  )
}

export default TimerActions
