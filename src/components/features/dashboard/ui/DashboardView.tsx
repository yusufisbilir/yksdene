import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import DashboardProfile from '../DashboardProfile'

const LastRankingChange = dynamic(() => import('../LastRankingChange'))
const LastRank = dynamic(() => import('../LastRank'))
const RankingCharts = dynamic(() => import('../RankingCharts').then((mod) => mod.RankingCharts))
const ExamResultsList = dynamic(() =>
  import('../../denemelerim/ExamResultsList').then((mod) => mod.ExamResultsList),
)
const AverageResults = dynamic(() => import('../AverageResults'))
const PerformanceTrends = dynamic(() => import('../PerformanceTrends'))
const QuestionAnalysis = dynamic(() => import('../QuestionAnalysis'))

export default function DashboardView() {
  return (
    <article className="px-0 space-y-6 sm:px-4 md:px-6">
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
