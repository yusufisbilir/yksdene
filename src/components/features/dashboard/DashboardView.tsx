import StatisticsCards from './StatisticsCards'
import PerformanceTrends from './PerformanceTrends'
import QuestionAnalysis from './QuestionAnalysis'
import { ExamResultsList } from '../denemelerim/ExamResultsList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LastYKSRanking from './LastYKSRanking'
import { ExamCategoryStatistics, YksRanking } from '@/types'

interface DashboardViewProps {
  examAttemptStats: ExamCategoryStatistics
  yksRanking: YksRanking[]
}

const DashboardView = ({ examAttemptStats, yksRanking }: DashboardViewProps) => {
  return (
    <article className="space-y-6 px-2 sm:px-4 md:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">👑 Başarı Tablosu</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Ortalama Netler</CardTitle>
        </CardHeader>
        <CardContent>
          <StatisticsCards examAttemptStats={examAttemptStats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Son YKS Sıralaması</CardTitle>
        </CardHeader>
        <CardContent>
          <LastYKSRanking yksRanking={yksRanking} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Denemelerim</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <ExamResultsList />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Performans Takibi</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceTrends examAttemptStats={examAttemptStats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Soru Analizleri</CardTitle>
        </CardHeader>
        <CardContent>
          <QuestionAnalysis examAttemptStats={examAttemptStats} />
        </CardContent>
      </Card>
    </article>
  )
}

export default DashboardView
