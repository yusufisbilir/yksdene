'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { reset } from '@/store/slices/timer.slice'

const FinishedTimerOverlay = () => {
  const timerState = useAppSelector((state) => state.timer)
  const dispatch = useAppDispatch()

  return (
    <div className="absolute top-1 left-1 bottom-1 right-1 z-50 backdrop-blur-sm rounded-xl">
      <div className="flex h-full flex-col items-center justify-center text-white gap-3">
        <h2 className="text-4xl font-bold text-black">Tebrikler!</h2>
        <p className="text-xl text-black">Deneme Süresi Tamamlandı</p>
        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium cursor-pointer"
          onClick={() => dispatch(reset())}
        >
          Sıfırla
        </Button>
      </div>
    </div>
  )
}

export default FinishedTimerOverlay
