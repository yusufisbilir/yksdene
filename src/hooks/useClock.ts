import { useEffect, useState } from 'react'

interface Timing {
  updateSeconds: { transform: string }
  updateMinutes: { transform: string }
  updateHours: { transform: string }
}

const useClock = ({ customTime }: { customTime?: Date }): Timing => {
  const [currentTime, setCurrentTime] = useState<Date>(customTime ?? new Date())
  const [timing, setTiming] = useState<Timing>({
    updateSeconds: { transform: 'rotate(0deg)' },
    updateMinutes: { transform: 'rotate(0deg)' },
    updateHours: { transform: 'rotate(0deg)' },
  })

  const updateTime = (): void => {
    if (customTime) {
      setCurrentTime(new Date(currentTime.setSeconds(currentTime.getSeconds() + 1)))
      return
    }
    setCurrentTime(new Date())
  }

  useEffect(() => {
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
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

  return timing
}

export default useClock
