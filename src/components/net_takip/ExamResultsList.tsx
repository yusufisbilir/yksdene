import { ExamResultCard } from './ExamResultCard'
import { ExamAttemptView } from './types'

interface ExamResultsListProps {
  results: ExamAttemptView[]
}

export function ExamResultsList({ results }: ExamResultsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <ExamResultCard key={result.attempt_id || ''} {...result} />
      ))}
    </div>
  )
}
