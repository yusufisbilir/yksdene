'use client'
import Clock from '@/components/examPractice/Clock'
import ExamSelect from '@/components/examPractice/ExamSelect'
import FinishedTimerConfetti from '@/components/examPractice/FinishedTimerConfetti'
import FinishedTimerOverlay from '@/components/examPractice/FinishedTimerOverlay'
import { Button } from '@/components/ui/button'
import { useTimer } from '@/contexts/TimerContext'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const Page = () => {
  const { state } = useTimer()
  const [isMounted, setIsMounted] = useState(false)
  const [isVisibleDailyExamPractice, setIsVisibleDailyExamPractice] = useLocalStorage(
    'isVisibleDailyExamPractice',
    true,
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-2 my-4">
      {state.isFinished && <FinishedTimerConfetti />}
      {isVisibleDailyExamPractice && (
        <div className="centered_card_container gap-y-2">
          <h1 className="font-semibold">Gerçek Sınav Deneyimi</h1>
          <p>Her sabah 10:15&apos;te başlar. Başarılar dilerim ❤️</p>
          <Button
            className="max-w-fit self-end"
            onClick={() => setIsVisibleDailyExamPractice(false)}
          >
            Anladım Hocam, Hallederiz
          </Button>
        </div>
      )}
      <div className="centered_card_container z-40">
        {state.isFinished && <FinishedTimerOverlay />}
        <ExamSelect />
        <Clock />
      </div>
    </section>
  )
}

export default Page
