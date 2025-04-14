'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import LastRankingChangeView from './ui/LastRankingChangeView'
import { processYKSRanking } from '@/utils/processYKSRanking'

export default function LastRankingChange() {
  const { data: yksRanking } = useGetYKSRankingQuery()

  const { latestResult, tytChange, sayChange, eaChange, sozChange } = processYKSRanking(
    yksRanking ?? [],
  )

  if (!yksRanking || !latestResult) {
    return <PageLoader />
  }

  return (
    <LastRankingChangeView
      latestResult={latestResult}
      tytChange={tytChange}
      sayChange={sayChange}
      eaChange={eaChange}
      sozChange={sozChange}
    />
  )
}
