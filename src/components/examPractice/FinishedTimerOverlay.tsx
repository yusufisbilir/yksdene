'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useTimer } from '@/context/TimerContext'

const FinishedTimerOverlay = () => {
  const { dispatch } = useTimer()

  return (
    <div className="absolute top-1 left-1 bottom-1 right-1 z-50 backdrop-blur-sm rounded-xl">
      <div className="flex h-full flex-col items-center justify-center text-white gap-3">
        <h2 className="text-4xl font-bold text-black">Tebrikler!</h2>
        <p className="text-xl text-black">Deneme Süresi Tamamlandı</p>
        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium cursor-pointer"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Sıfırla
        </Button>
      </div>
    </div>
  )
}

export default FinishedTimerOverlay
