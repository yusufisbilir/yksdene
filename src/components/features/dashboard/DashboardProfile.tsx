'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetProfileQuery } from '@/features/profile.slice'
import DashboardProfileView from './ui/DashboardProfileView'

export default function DashboardProfile() {
  const { data: profile } = useGetProfileQuery()

  if (!profile) {
    return <PageLoader />
  }

  return <DashboardProfileView profile={profile} />
}
