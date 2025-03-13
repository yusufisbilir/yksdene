'use client'
import Clock from '@/components/examPractice/Clock'
import ExamSelect from '@/components/examPractice/ExamSelect'
import FinishedTimerConfetti from '@/components/examPractice/FinishedTimerConfetti'
import FinishedTimerOverlay from '@/components/examPractice/FinishedTimerOverlay'
import TimerActions from '@/components/examPractice/TimerActions'
import { Button } from '@/components/ui/button'
import { useTimer } from '@/contexts/TimerContext'
import { useLocalStorage } from 'usehooks-ts'

const Page = () => {
  const { state } = useTimer()
  const [infoBoxVisibilities, setInfoBoxVisibilities] = useLocalStorage('infoBoxVisibilities', {
    exampPractice: true,
  })

  return (
    <section className="flex flex-col gap-y-2 my-4">
      {state.isFinished && <FinishedTimerConfetti />}
      {infoBoxVisibilities.exampPractice && (
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
          <Button
            className="max-w-fit self-end"
            onClick={() => setInfoBoxVisibilities((prev) => ({ ...prev, exampPractice: false }))}
          >
            Anladım Hocam, Hallederiz
          </Button>
        </div>
      )}
      <div className="centered_card_container z-40">
        {state.isFinished && <FinishedTimerOverlay />}
        <ExamSelect />
        <Clock />
        <TimerActions />
      </div>
    </section>
  )
}

export default Page
