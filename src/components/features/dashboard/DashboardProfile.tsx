'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetProfileWithUniversityProgramQuery } from '@/features/profile.slice'
import DashboardProfileView from './ui/DashboardProfileView'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import { ProfilesUniversityProgramView, YksRanking } from '@/types'

export default function DashboardProfile() {
  const { data: yksRanking } = useGetYKSRankingQuery()
  const { data: profileWithUniversityProgram } = useGetProfileWithUniversityProgramQuery()

  console.log(profileWithUniversityProgram)

  const getLastRanking = (
    profileWithUniversityProgram: ProfilesUniversityProgramView,
    yksRanking: YksRanking[],
  ): number | null => {
    const examCategory = profileWithUniversityProgram.category
    const lastRanking = yksRanking?.[0]

    switch (examCategory) {
      case 'say':
        return lastRanking?.say_placement_rank ?? null
      case 'soz':
        return lastRanking?.soz_placement_rank ?? null
      case 'ea':
        return lastRanking?.ea_placement_rank ?? null
      case 'tyt':
        return lastRanking?.tyt_placement_rank ?? null
      default:
        return null
    }
  }

  const getLastScore = (
    profileWithUniversityProgram: ProfilesUniversityProgramView,
    yksRanking: YksRanking[],
  ): number | null => {
    const examCategory = profileWithUniversityProgram.category
    const lastRanking = yksRanking?.[0]

    switch (examCategory) {
      case 'say':
        return lastRanking?.say_placement_score ?? null
      case 'soz':
        return lastRanking?.soz_placement_score ?? null
      case 'ea':
        return lastRanking?.ea_placement_score ?? null
      case 'tyt':
        return lastRanking?.tyt_placement_score ?? null
      default:
        return null
    }
  }

  if (!profileWithUniversityProgram || !yksRanking) {
    return <PageLoader />
  }

  return (
    <DashboardProfileView
      profileWithUniversityProgram={profileWithUniversityProgram}
      lastRanking={getLastRanking(profileWithUniversityProgram, yksRanking)}
      lastScore={getLastScore(profileWithUniversityProgram, yksRanking)}
      isSuccess={
        (getLastRanking(profileWithUniversityProgram, yksRanking) ?? 0) <=
        (profileWithUniversityProgram?.rank ?? 0)
      }
    />
  )
}
