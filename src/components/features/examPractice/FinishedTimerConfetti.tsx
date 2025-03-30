'use client'
import { useAppSelector } from '@/hooks/useRedux'
import useWindowSize from '@/hooks/useWindowSize'
import React from 'react'
import ReactConfetti from 'react-confetti'

const FinishedTimerConfetti = () => {
  const timerState = useAppSelector((state) => state.timer)
  const { width, height } = useWindowSize()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    let audio: HTMLAudioElement | undefined

    if (typeof window !== 'undefined' && timerState.isFinished) {
      audio = new Audio('/sounds/end_notification.wav')

      audio.load()
      const playSound = async () => {
        try {
          await audio?.play()
        } catch (error) {
          console.log('Audio playback failed:', error)
        }
      }

      playSound()
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [timerState.isFinished])

  if (!isMounted || !timerState.isFinished) return null

  return (
    <div className="z-50">
      <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.2}
        initialVelocityY={20}
      />
    </div>
  )
}

export default FinishedTimerConfetti
