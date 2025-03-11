import ExamSelect from '@/components/ExamSelect'
import TimerActions from '@/components/TimerActions'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="flex flex-col gap-y-6 w-full max-w-xl mx-auto bg-white shadow-lg border border-orange-200 rounded-xl p-6">
      <ExamSelect />
      {children}
      <TimerActions />
    </section>
  )
}
