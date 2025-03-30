'use client'

import { ReactNode } from 'react'
import { Suspense } from 'react'
import PageLoader from './PageLoader'

type SuspenseProviderProps = {
  children: ReactNode
  fallback?: ReactNode
}

export const SuspenseProvider = ({
  children,
  fallback = <PageLoader />,
}: SuspenseProviderProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
