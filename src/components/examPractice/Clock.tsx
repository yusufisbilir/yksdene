'use client'

import Image from 'next/image'
import useClock from '@/hooks/useClock'
import { useEffect, useState } from 'react'
import { EXAM } from '@/constants/constants'
import { useTimer } from '@/contexts/TimerContext'

const Clock = () => {
  const { state: timer } = useTimer()

  const [customTime, setCustomTime] = useState(new Date(2025, 2, 11, 10, 0, 0))

  const { timing, reset } = useClock({
    customTime: customTime,
    stopped: !timer.isRunning || timer.seconds + timer.minutes === 0,
  })

  useEffect(() => {
    if (!timer.isDirty) reset()
  }, [timer.isDirty])

  useEffect(() => {
    setCustomTime(EXAM[timer.selectedExam as EXAM]?.time)
  }, [timer.selectedExam])

  return (
    <div className="analog_timer_container">
      <Image
        src={'/analogTimeAssets/hour_body.svg'}
        alt="Hour Body"
        width={400}
        height={400}
        priority
        className="z-0"
      />
      <div
        className={`analog_timer_hour_hand`}
        style={{ transform: timing.updateHours.transform }}
      ></div>
      <div
        className={`analog_timer_minute_hand`}
        style={{ transform: timing.updateMinutes.transform }}
      ></div>
      <div
        className={`analog_timer_second_hand`}
        style={{ transform: timing.updateSeconds.transform }}
      ></div>
      <div className={`analog_timer_center_circle`}></div>
    </div>
  )
}

export default Clock
