import { AddExamForm } from '@/components/features/netTakip/AddExamForm'
import { ExamResultsList } from '@/components/features/netTakip/ExamResultsList'
import Header from '@/components/features/netTakip/Header'

export default function NetTakipPage() {
  return (
    <article className="space-y-6 panel">
      <Header />
      {<AddExamForm />}
      <ExamResultsList />
    </article>
  )
}
