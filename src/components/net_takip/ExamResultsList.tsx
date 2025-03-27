import { ExamResultCard } from './exam-result-card'
import { ExamAttemptView } from './types'

interface ExamResultsListProps {
  results: ExamAttemptView[]
}

export function ExamResultsList({ results }: ExamResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/10 min-h-[200px]">
        <h3 className="mb-2 text-xl font-medium">İlk Sınav Sonucunu ekle</h3>
        <p className="text-muted-foreground">
          "Deneme Ekle" butonuna tıkla. Bakalım kaç net çektin. 😎
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <ExamResultCard key={result.attempt_id || ''} {...result} />
      ))}
    </div>
  )
}
