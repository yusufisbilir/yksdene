'use client'

import ExamSelect from '@/components/ExamSelect'
import FinishedTimerConfetti from '@/components/FinishedTimerConfetti'
import FinishedTimerOverlay from '@/components/FinishedTimerOverlay'
import TimerActions from '@/components/TimerActions'
import { useTimer } from '@/contexts/TimerContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { state } = useTimer()

  return (
    <>
      {state.isFinished && <FinishedTimerConfetti />}
      <section className="timers_layout_container z-40">
        {state.isFinished && <FinishedTimerOverlay />}
        <ExamSelect />
        {children}
        <TimerActions />
      </section>
    </>
  )
}
