'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { examTemplates } from '@/constants/db.constants'
import { ExamCategoryStatistics } from '@/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const PerformanceTrends = ({ examAttemptStats }: { examAttemptStats: ExamCategoryStatistics }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {Object.entries(examAttemptStats).map(([templateId, stats]: [string, any]) => {
        const template = examTemplates.find((t) => t.id === templateId)
        const chartData = stats.performanceTrend.map((trend: any) => ({
          date: new Date(trend.date).toLocaleDateString('tr-TR'),
          net_score: trend.net_score,
          correct: trend.correct,
          incorrect: trend.incorrect,
          blank: trend.blank,
        }))

        return (
          <Card key={templateId} className="col-span-1">
            <CardHeader>
              <CardTitle>{template?.name} Performans Grafiği</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  net_score: {
                    label: 'Net Puan',
                    color: '#3b82f6',
                  },
                }}
                className="h-[250px] w-full"
              >
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" tick={false} />
                  <YAxis width={40} tick={{ fontSize: 12 }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="net_score"
                    stroke="var(--color-net_score)"
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

export default PerformanceTrends
