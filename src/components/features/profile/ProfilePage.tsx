'use client'

import { UserProfile } from '@clerk/nextjs'
import { FileChartColumn } from 'lucide-react'
import ProfileUpdateOptions from './ProfileUpdateOptions'
import { ROUTES } from '@/constants/routes'

export function ProfilePage() {
  return (
    <UserProfile>
      <UserProfile.Page
        label="YKS OBP"
        labelIcon={<FileChartColumn className="w-4 h-4" />}
        url={ROUTES.YKS_OBP}
      >
        <ProfileUpdateOptions />
      </UserProfile.Page>
    </UserProfile>
  )
}
