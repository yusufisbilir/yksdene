import React from 'react'
import { Metadata } from 'next'
import { SuspenseProvider } from '@/components/shared/SuspenseProvider'

export const metadata: Metadata = {
  title: 'Zirvedekiler | YKS Dene',
  description: 'YKS Dene platformunda en çok deneme çözen öğrencilerin sıralaması',
}

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <SuspenseProvider>{children}</SuspenseProvider>
}
