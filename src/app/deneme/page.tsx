import ExamPracticeClock from '@/components/features/examPractice/ExamPracticeClock'
import ExamSelect from '@/components/features/examPractice/ExamSelect'
import FinishedTimerConfetti from '@/components/features/examPractice/FinishedTimerConfetti'
import FinishedTimerOverlay from '@/components/features/examPractice/FinishedTimerOverlay'
import ExamPracticeInfo from '@/components/features/examPractice/InfoBox'
import TimerActions from '@/components/features/examPractice/TimerActions'

const Page = () => {
  return (
    <article className="flex flex-col gap-y-2">
      <FinishedTimerConfetti />
      <ExamPracticeInfo />
      <div className="z-40 card">
        <FinishedTimerOverlay />
        <ExamSelect />
        <ExamPracticeClock />
        <TimerActions />
      </div>
    </article>
  )
}

export default Page
