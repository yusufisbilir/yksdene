import { ClockRotations } from '@/types'
import { useState, useEffect } from 'react'

type ReturnType = {
  clockRotations: ClockRotations
}

type IProps = {
  startDate: Date
  endDate: Date
}

const useDailyExamTimer = ({ startDate, endDate }: IProps): ReturnType => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [clockRotations, setClockRotations] = useState<ClockRotations>({
    updateSeconds: { transform: 'rotate(0deg)' },
    updateMinutes: { transform: 'rotate(0deg)' },
    updateHours: { transform: 'rotate(0deg)' },
  })

  useEffect(() => {
    setCurrentTime(new Date())

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let updatedTime = currentTime
    if (currentTime < startDate) {
      updatedTime = startDate
    }
    if (currentTime > endDate) {
      updatedTime = endDate
    }

    setClockRotations({
      updateSeconds: { transform: `rotate(${updatedTime.getSeconds() * 6}deg)` },
      updateMinutes: { transform: `rotate(${updatedTime.getMinutes() * 6}deg)` },
      updateHours: {
        transform: `rotate(${updatedTime.getHours() * 30 + updatedTime.getMinutes() / 2}deg)`,
      },
    })
  }, [currentTime, startDate, endDate])

  return { clockRotations }
}

export default useDailyExamTimer
