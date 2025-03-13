'use client'
import Clock from '@/components/examPractice/Clock'
import ExamSelect from '@/components/examPractice/ExamSelect'
import FinishedTimerConfetti from '@/components/examPractice/FinishedTimerConfetti'
import FinishedTimerOverlay from '@/components/examPractice/FinishedTimerOverlay'
import TimerActions from '@/components/examPractice/TimerActions'
import { useTimer } from '@/contexts/TimerContext'

const Page = () => {
  const { state } = useTimer()

  return (
    <>
      {state.isFinished && <FinishedTimerConfetti />}
      <section className="centered_card_container z-40">
        {state.isFinished && <FinishedTimerOverlay />}
        <ExamSelect />
        <Clock />
        <TimerActions />
      </section>
    </>
  )
}

export default Page
