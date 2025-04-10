import StatisticsCards from './StatisticsCards'
import PerformanceTrends from './PerformanceTrends'
import QuestionAnalysis from './QuestionAnalysis'
import { ExamResultsList } from '../denemelerim/ExamResultsList'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ExamCategoryStatistics } from '@/types'
import { ProcessedRankingData } from './yksRanking/YKSRankingProvider'
import { RankingChangeCardsGrid } from './yksRanking/RankingChangeCards'
import { RankingTable, RankingFooter } from './yksRanking/RankingTable'
import { RankingCharts } from './yksRanking/RankingCharts'

interface DashboardViewProps {
  examAttemptStats: ExamCategoryStatistics
  yksRankingData: ProcessedRankingData
}

const DashboardView = ({ examAttemptStats, yksRankingData }: DashboardViewProps) => {
  const {
    latestResult,
    previousResult,
    tytChange,
    sayChange,
    eaChange,
    sozChange,
    chartData,
    tytStats,
    sayStats,
    eaStats,
    sozStats,
  } = yksRankingData

  return (
    <article className="space-y-6 px-2 sm:px-4 md:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">👑 Başarı Tablosu</h1>

      {/* YKS Ranking Change Cards */}
      {previousResult && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">YKS Başarısı</CardTitle>
          </CardHeader>
          <CardContent>
            <RankingChangeCardsGrid
              latestResult={latestResult}
              tytChange={tytChange}
              sayChange={sayChange}
              eaChange={eaChange}
              sozChange={sozChange}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              * Yeni eklediğiniz TYT ve AYT denemenize göre hesaplanmıştır.
            </p>
          </CardFooter>
        </Card>
      )}

      {/* YKS Ranking Table */}
      {latestResult && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">YKS Sıralaması</CardTitle>
          </CardHeader>
          <CardContent>
            <RankingTable latestResult={latestResult} />
            <RankingFooter latestResult={latestResult} />
          </CardContent>
        </Card>
      )}

      {/* YKS Ranking Charts */}
      {latestResult && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">YKS Sıralama Gelişimi</CardTitle>
          </CardHeader>
          <CardContent>
            <RankingCharts
              chartData={chartData}
              tytStats={tytStats}
              sayStats={sayStats}
              eaStats={eaStats}
              sozStats={sozStats}
            />
          </CardContent>
        </Card>
      )}

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
          <StatisticsCards examAttemptStats={examAttemptStats} />
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
