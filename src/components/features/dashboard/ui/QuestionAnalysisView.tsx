import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { examTemplates } from '@/constants/db.constants'
import { ExamCategoryStatistics } from '@/types'
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
  Legend,
} from 'recharts'

const QuestionAnalysisView = ({
  examAttemptStats,
}: {
  examAttemptStats: ExamCategoryStatistics
}) => {
  return (
    <div className="w-full space-y-4">
      {Object.entries(examAttemptStats).map(([templateId, stats]: [string, any]) => {
        const template = examTemplates.find((t) => t.id === templateId)
        const chartData = [...stats.performanceTrend].reverse().map((trend: any) => ({
          date: new Date(trend.date).toLocaleDateString('tr-TR'),
          correct: trend.correct,
          incorrect: trend.incorrect,
          blank: trend.blank,
        }))

        return (
          <Card key={templateId} className="col-span-1">
            <CardHeader>
              <CardTitle>{template?.name} Soru Analizi</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  correct: {
                    label: 'Doğru',
                    color: '#22c55e',
                  },
                  incorrect: {
                    label: 'Yanlış',
                    color: '#ef4444',
                  },
                  blank: {
                    label: 'Boş',
                    color: '#eab308',
                  },
                }}
                className="h-[250px] w-full"
              >
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 25 }}>
                  <XAxis dataKey="date" tick={false} />
                  <YAxis width={40} tick={{ fontSize: 12 }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Line
                    type="monotone"
                    dataKey="correct"
                    name="Doğru"
                    stroke="var(--color-correct)"
                    strokeWidth={2}
                    label={{
                      position: 'top',
                      fill: 'var(--color-correct)',
                      fontSize: 10,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="incorrect"
                    name="Yanlış"
                    stroke="var(--color-incorrect)"
                    strokeWidth={2}
                    label={{
                      position: 'top',
                      fill: 'var(--color-incorrect)',
                      fontSize: 10,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="blank"
                    name="Boş"
                    stroke="var(--color-blank)"
                    strokeWidth={2}
                    label={{
                      position: 'top',
                      fill: 'var(--color-blank)',
                      fontSize: 10,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default QuestionAnalysisView
