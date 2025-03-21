import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { ExamAttemptView } from './types'
import DeleteExamAttemptButton from './delete-exam_attempt_button'

export function ExamResultCard({
  attempt_name,
  attempt_date,
  total_correct,
  total_incorrect,
  total_blank,
  net_score,
  attempt_id,
}: ExamAttemptView) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="text-lg">{attempt_name || 'İsimsiz Deneme'}</CardTitle>
        {attempt_id && <DeleteExamAttemptButton attempt_id={attempt_id} />}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tarih:</span>
            {attempt_date && (
              <span>{format(new Date(attempt_date), 'dd MMMM yyyy', { locale: tr })}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Doğru:</span>
            <span className="text-green-600">{total_correct || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Yanlış:</span>
            <span className="text-red-600">{total_incorrect || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Boş:</span>
            <span className="text-yellow-600">{total_blank || 0}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Net:</span>
            <span className={(net_score || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
              {(net_score || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
