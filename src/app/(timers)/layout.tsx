'use client'

import ExamSelect from '@/components/ExamSelect'
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
    <section className="timers_layout_container">
      {state.isFinished && <FinishedTimerOverlay />}
      <ExamSelect />
      {children}
      <TimerActions />
    </section>
  )
}
