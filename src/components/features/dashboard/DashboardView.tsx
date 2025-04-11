import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExamResultsList } from '../denemelerim/ExamResultsList'
import AverageResults from './AverageResults'
import LastRank from './LastRank'
import LastRankingChange from './LastRankingChange'
import PerformanceTrends from './PerformanceTrends'
import QuestionAnalysis from './QuestionAnalysis'
import { RankingCharts } from './RankingCharts'
import DashboardProfile from './DashboardProfile'

export default function DashboardView() {
  return (
    <article className="px-2 space-y-6 sm:px-4 md:px-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">👑 Başarı Tablosu</h1>

      <DashboardProfile />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">YKS Başarısı</CardTitle>
        </CardHeader>
        <CardContent>
          <LastRankingChange />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">YKS Sıralaması</CardTitle>
        </CardHeader>
        <CardContent>
          <LastRank />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">YKS Sıralama Gelişimi</CardTitle>
        </CardHeader>
        <CardContent>
          <RankingCharts />
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
          <CardTitle className="text-xl sm:text-2xl">Ortalama Netler</CardTitle>
        </CardHeader>
        <CardContent>
          <AverageResults />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Performans Takibi</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceTrends />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Soru Analizleri</CardTitle>
        </CardHeader>
        <CardContent>
          <QuestionAnalysis />
        </CardContent>
      </Card>
    </article>
  )
}
