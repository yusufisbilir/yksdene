import { AddExamForm } from '@/components/features/denemelerim/AddExamForm'
import { ExamResultsList } from '@/components/features/denemelerim/ExamResultsList'
import Header from '@/components/features/denemelerim/Header'

export default function NetTakipPage() {
  return (
    <article className="space-y-6 panel">
      <Header />
      <AddExamForm />
      <ExamResultsList />
    </article>
  )
}
