'use client'

import { YksRanking } from '@/types'
import { YKSRankingProvider } from './YKSRankingProvider'
import { RankingChangeCardsGrid } from './RankingChangeCards'
import { RankingTable, RankingFooter } from './RankingTable'
import { RankingCharts } from './RankingCharts'

interface LastYKSRankingProps {
  yksRanking: YksRanking[]
}

const LastYKSRanking = ({ yksRanking }: LastYKSRankingProps) => {
  if (!yksRanking || yksRanking.length === 0) {
    return <div className="text-center py-8">Henüz YKS sıralaması hesaplanmamış.</div>
  }

  const {
    chartData,
    tytStats,
    sayStats,
    eaStats,
    sozStats,
    latestResult,
    previousResult,
    tytChange,
    sayChange,
    eaChange,
    sozChange,
  } = YKSRankingProvider.processRankingData(yksRanking)

  return (
    <div className="space-y-6">
      {previousResult && (
        <RankingChangeCardsGrid
          latestResult={latestResult}
          tytChange={tytChange}
          sayChange={sayChange}
          eaChange={eaChange}
          sozChange={sozChange}
        />
      )}

      <RankingTable latestResult={latestResult} />

      <RankingCharts
        chartData={chartData}
        tytStats={tytStats}
        sayStats={sayStats}
        eaStats={eaStats}
        sozStats={sozStats}
      />

      <RankingFooter latestResult={latestResult} />
    </div>
  )
}

export default LastYKSRanking
