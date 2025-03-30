'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { examTemplates } from '@/constants/db.constants'
import { ExamCategoryStatistics } from '@/types/db.types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface QuestionAnalysisProps {
  examTemplateStats: ExamCategoryStatistics
}

const QuestionAnalysis = ({ examTemplateStats }: QuestionAnalysisProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(examTemplateStats).map(([templateId, stats]: [string, any]) => {
        const template = examTemplates.find((t) => t.id === templateId)
        const chartData = stats.performanceTrend.map((trend: any) => ({
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
                className="h-[300px]"
              >
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis width={60} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="correct"
                    stroke="var(--color-correct)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="incorrect"
                    stroke="var(--color-incorrect)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="blank"
                    stroke="var(--color-blank)"
                    strokeWidth={2}
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

export default QuestionAnalysis
