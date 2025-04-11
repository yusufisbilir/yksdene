'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetProfileQuery } from '@/features/profile.slice'
import DashboardProfileView from './ui/DashboardProfileView'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'

export default function DashboardProfile() {
  const { data: profile } = useGetProfileQuery()
  const { data: yksRanking } = useGetYKSRankingQuery()

  if (!profile || !yksRanking) {
    return <PageLoader />
  }

  return <DashboardProfileView profile={profile} yksRanking={yksRanking?.[0]} />
}
