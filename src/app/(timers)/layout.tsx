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
    <section className="flex flex-col gap-y-6 w-full max-w-xl mx-auto bg-white shadow-lg border border-orange-200 rounded-xl p-6 relative">
      {state.isFinished && <FinishedTimerOverlay />}
      <ExamSelect />
      {children}
      <TimerActions />
    </section>
  )
}
