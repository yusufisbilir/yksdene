import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { examTemplates } from '@/constants/db.constants'
import { ExamCategoryStatistics } from '@/types'

interface StatisticsCardsProps {
  examTemplateStats: ExamCategoryStatistics
}

const StatisticsCards = ({ examTemplateStats }: StatisticsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(examTemplateStats).map(([templateId, stats]: [string, any]) => {
        const template = examTemplates.find((t) => t.id === templateId)
        return (
          <Card key={templateId}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{template?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {stats.averageNetScore.toFixed(2)}{' '}
                <span className="text-xs font-medium text-foreground">net</span>
              </p>
              <p className="text-xs text-muted-foreground">{stats.totalAttempts} deneme</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatisticsCards
