'use client'

import ExamPracticeClock from '@/components/examPractice/ExamPracticeClock'
import ExamSelect from '@/components/examPractice/ExamSelect'
import FinishedTimerConfetti from '@/components/examPractice/FinishedTimerConfetti'
import FinishedTimerOverlay from '@/components/examPractice/FinishedTimerOverlay'
import TimerActions from '@/components/examPractice/TimerActions'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/useRedux'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const Page = () => {
  const timerState = useAppSelector((state) => state.timer)
  const [isMounted, setIsMounted] = useState(false)
  const [isVisibleExamPractice, setIsVisibleExamPractice] = useLocalStorage(
    'isVisibleExamPractice',
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
      {timerState.isFinished && <FinishedTimerConfetti />}
      {isVisibleExamPractice && (
        <div className="centered_card_container gap-y-2">
          <h1 className="font-semibold">İşte o saat 😱</h1>
          <p>
            Gerçek sınavda bu saate bakarak kalan süreni hesaplayacaksın.
            <br />
            Havalı kronometreler veya pomodoro uygulamaları yok.
            <br />
            Bitince bildirim sesi duyabilir ve biraz konfeti görebilirsin.
            <br />
            Başarılar dilerim ❤️
          </p>
          <Button className="max-w-fit self-end" onClick={() => setIsVisibleExamPractice(false)}>
            Anladım Hocam, Hallederiz
          </Button>
        </div>
      )}
      <div className="centered_card_container z-40">
        {timerState.isFinished && <FinishedTimerOverlay />}
        <ExamSelect />
        <ExamPracticeClock />
        <TimerActions />
      </div>
    </section>
  )
}

export default Page
