import { useEffect, useState } from 'react'

const useTime = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [1000])

  return currentTime
}

export default useTime
