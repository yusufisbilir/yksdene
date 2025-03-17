'use client'

import useClock from '@/hooks/useClock'
import { useEffect, useState } from 'react'
import { useTimer } from '@/context/TimerContext'
import getExamStartEndTimes from '@/utils/getExamStartEndTimes'
import AnalogClock from '../shared/AnalogClock'

const ExamPracticeClock = () => {
  const { state: timer } = useTimer()

  const [customTime, setCustomTime] = useState(new Date(2025, 2, 11, 10, 0, 0))

  const { clockRotations, reset } = useClock({
    customTime: customTime,
    stopped: !timer.isRunning || timer.seconds + timer.minutes === 0,
  })

  useEffect(() => {
    const handleReset = () => {
      if (!timer.isDirty) reset()
    }
    handleReset()
  }, [timer.isDirty, reset])

  useEffect(() => {
    const [hours, minutes] = getExamStartEndTimes(timer.selectedExam).start.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    setCustomTime(date)
  }, [timer.selectedExam])

  return <AnalogClock clockRotations={clockRotations} />
}

export default ExamPracticeClock
