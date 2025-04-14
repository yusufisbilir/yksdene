'use client'

import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import { processYKSRanking } from '@/utils/processYKSRanking'
import PageLoader from '@/components/shared/PageLoader'
import RankingChartsView from './ui/RankingChartsView'

export const RankingCharts = () => {
  const { data: yksRanking } = useGetYKSRankingQuery()

  const { chartData, tytStats, sayStats, eaStats, sozStats } = processYKSRanking(yksRanking ?? [])

  if (!yksRanking) {
    return <PageLoader />
  }

  return (
    <RankingChartsView
      chartData={chartData}
      tytStats={tytStats}
      sayStats={sayStats}
      eaStats={eaStats}
      sozStats={sozStats}
    />
  )
}
