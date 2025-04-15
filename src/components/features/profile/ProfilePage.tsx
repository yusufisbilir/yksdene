'use client'

import { UserProfile } from '@clerk/nextjs'
import { FileChartColumn } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import ProfileTargets from './ProfileTargets'

export function ProfilePage() {
  return (
    <UserProfile>
      <UserProfile.Page
        label="Üniversite Hedefi"
        labelIcon={<FileChartColumn className="w-4 h-4" />}
        url={ROUTES.CLERK_TARGETS}
      >
        <ProfileTargets />
      </UserProfile.Page>
    </UserProfile>
  )
}
