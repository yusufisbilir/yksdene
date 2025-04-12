'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import React from 'react'
import LastRankView from './ui/LastRankView'
import { processYKSRanking } from '@/utils/processYKSRanking'

const LastRank = () => {
  const { data: yksRanking } = useGetYKSRankingQuery()

  const { latestResult } = processYKSRanking(yksRanking ?? [])

  if (!yksRanking || !latestResult) {
    return <PageLoader />
  }

  return <LastRankView latestResult={latestResult} />
}

export default LastRank
