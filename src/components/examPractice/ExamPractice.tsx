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

const ExamPractice = () => {
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
    <article className="flex flex-col gap-y-2">
      {timerState.isFinished && <FinishedTimerConfetti />}
      {isVisibleExamPractice && (
        <div className="card gap-y-2">
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
          <Button className="self-end max-w-fit" onClick={() => setIsVisibleExamPractice(false)}>
            Anladım Hocam, Hallederiz
          </Button>
        </div>
      )}
      <div className="z-40 card">
        {timerState.isFinished && <FinishedTimerOverlay />}
        <ExamSelect />
        <ExamPracticeClock />
        <TimerActions />
      </div>
    </article>
  )
}

export default ExamPractice
