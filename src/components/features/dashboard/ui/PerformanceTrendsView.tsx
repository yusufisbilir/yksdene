import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { examTemplates } from '@/constants/db.constants'
import { ExamCategoryStatistics } from '@/types'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

const PerformanceTrendsView = ({
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
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" tick={false} />
                  <YAxis width={40} tick={{ fontSize: 12 }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Line
                    type="monotone"
                    dataKey="net_score"
                    name="Net Puan"
                    stroke="var(--color-net_score)"
                    strokeWidth={2}
                    label={{
                      position: 'top',
                      fill: 'var(--color-net_score)',
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

export default PerformanceTrendsView
