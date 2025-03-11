'use client'

import { TimerState } from '@/reducers/timerReducer'
import Image from 'next/image'
import HourBody from '@/public/analogTimeAssets/hour_body.svg'
import useClock from '@/hooks/useClock'
import { useEffect, useState } from 'react'

const AnalogTimer = ({ timer }: { timer: TimerState }) => {
  const [customTime, setCustomTime] = useState(new Date(2025, 2, 11, 10, 0, 0))

  const { timing, reset } = useClock({
    customTime: customTime,
    stopped: !timer.isRunning,
  })

  useEffect(() => {
    if (!timer.isDirty) reset()
  }, [timer.isDirty])

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Saatin arka planı */}
      <Image src={HourBody} alt="Hour Body" width={400} height={400} priority className="z-0" />
      <div
        className={`absolute bottom-1/2 left-1/2 z-10 w-2 h-20 origin-bottom bg-black -translate-x-1`}
        style={{ transform: timing.updateHours.transform }}
      ></div>
      <div
        className={`absolute bottom-1/2 left-1/2 z-10 w-2 h-32 origin-bottom bg-black -translate-x-1`}
        style={{ transform: timing.updateMinutes.transform }}
      ></div>
      <div
        className={`absolute bottom-1/2 left-1/2 z-30 w-1 h-40 origin-bottom bg-red-800 rounded-full -translate-x-0.5`}
        style={{ transform: timing.updateSeconds.transform }}
      ></div>
      <div className={`absolute z-40 w-4 h-4 rounded-full bg-black`}></div>
    </div>
  )
}

export default AnalogTimer
