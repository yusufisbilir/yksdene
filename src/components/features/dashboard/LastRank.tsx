'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import React from 'react'
import LastRankView from './ui/LastRankView'
import { YKSRankingProvider } from './YKSRankingProvider'

const LastRank = () => {
  const { data: yksRanking } = useGetYKSRankingQuery()

  const { latestResult } = YKSRankingProvider.processRankingData(yksRanking ?? [])

  if (!yksRanking || !latestResult) {
    return <PageLoader />
  }

  return <LastRankView latestResult={latestResult} />
}

export default LastRank
