'use client'

import useClock from '@/hooks/useClock'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/useRedux'
import getExamStartEndTimes from '@/utils/getExamStartEndTimes'
import AnalogClock from '@/components/shared/AnalogClock'

const ExamPracticeClock = () => {
  const timerState = useAppSelector((state) => state.timer)

  const [customTime, setCustomTime] = useState(new Date(2025, 2, 11, 10, 0, 0))

  const { clockRotations, reset } = useClock({
    customTime: customTime,
    stopped: !timerState.isRunning || timerState.seconds + timerState.minutes === 0,
  })

  useEffect(() => {
    const handleReset = () => {
      if (!timerState.isDirty) reset()
    }
    handleReset()
  }, [timerState.isDirty, reset])

  useEffect(() => {
    const [hours, minutes] = getExamStartEndTimes(timerState.selectedExam)
      .start.split(':')
      .map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    setCustomTime(date)
  }, [timerState.selectedExam])

  return <AnalogClock clockRotations={clockRotations} />
}

export default ExamPracticeClock
