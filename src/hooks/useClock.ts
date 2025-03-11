import { useEffect, useState } from 'react'

interface Timing {
  updateSeconds: { transform: string }
  updateMinutes: { transform: string }
  updateHours: { transform: string }
}

type ReturnType = {
  timing: Timing
  reset: () => void
}

type IUseClockProps = {
  customTime: Date
  stopped?: boolean
}

const useClock = ({ customTime, stopped }: IUseClockProps): ReturnType => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [timing, setTiming] = useState<Timing>({
    updateSeconds: { transform: 'rotate(0deg)' },
    updateMinutes: { transform: 'rotate(0deg)' },
    updateHours: { transform: 'rotate(0deg)' },
  })

  const updateTime = (): void => {
    setCurrentTime((prevState) => new Date(prevState.getTime() + 1000))
  }

  const reset = () => setCurrentTime(customTime)

  useEffect(() => {
    if (stopped) return
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [stopped])

  useEffect(() => {
    if (customTime) setCurrentTime(customTime)
  }, [customTime])

  useEffect(() => {
    setTiming({
      updateSeconds: { transform: `rotate(${currentTime.getSeconds() * 6}deg)` },
      updateMinutes: { transform: `rotate(${currentTime.getMinutes() * 6}deg)` },
      updateHours: {
        transform: `rotate(${currentTime.getHours() * 30 + currentTime.getMinutes() / 2}deg)`,
      },
    })
  }, [currentTime])

  return { timing, reset }
}

export default useClock
