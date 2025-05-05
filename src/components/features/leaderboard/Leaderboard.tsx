'use client'
import React from 'react'
import LeaderBoardView from './LeaderBoardView'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetLeaderboardQuery } from '@/features/examAttempt.slice'

export default function Leaderboard() {
  const { data: leaderboardData, isLoading, error } = useGetLeaderboardQuery()

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Skeleton className="h-10 w-[250px] mx-auto" />
            <Skeleton className="h-4 w-[300px] mx-auto" />
            <div className="space-y-2 mt-5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-red-500">
          {error instanceof Error ? error.message : 'Veriler yüklenirken bir hata oluştu.'}
        </CardContent>
      </Card>
    )
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Henüz liderlik sıralaması verileri bulunmuyor.
        </CardContent>
      </Card>
    )
  }

  return <LeaderBoardView leaderboardData={leaderboardData} />
}
