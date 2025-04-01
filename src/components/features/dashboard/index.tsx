'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { examTemplates } from '@/constants/db.constants'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { ExamCategoryStatistics } from '@/types'

const index = ({ examTemplateStats }: { examTemplateStats: ExamCategoryStatistics }) => {
  return (
    <Card className="container mx-auto p-6 space-y-6 my-6">
      <h1 className="text-3xl font-bold tracking-tight">👑 Başarı Tablosu</h1>

      {/* Overall Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(examTemplateStats).map(([templateId, stats]) => {
          const template = examTemplates.find((t) => t.id === templateId)
          return (
            <Card key={templateId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{template?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageNetScore.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">{stats.totalAttempts} deneme</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance Trends */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(examTemplateStats).map(([templateId, stats]) => {
          const template = examTemplates.find((t) => t.id === templateId)
          const chartData = stats.performanceTrend.map((trend) => ({
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
                  className="h-[300px]"
                >
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis width={60} />
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

      {/* Detailed Question Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(examTemplateStats).map(([templateId, stats]) => {
          const template = examTemplates.find((t) => t.id === templateId)
          const chartData = stats.performanceTrend.map((trend) => ({
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
    </Card>
  )
}

export default index
