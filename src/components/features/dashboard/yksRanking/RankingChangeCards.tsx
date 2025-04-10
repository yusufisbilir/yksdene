'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react'
import { RankingChange } from './YKSRankingProvider'

interface RankingChangeCardProps {
  title: string
  currentRank: number
  change: RankingChange
  color: string
}

export const RankingChangeCard = ({
  title,
  currentRank,
  change,
  color,
}: RankingChangeCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="border-l-4 h-full" style={{ borderColor: color }}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-md">{title}</h3>
            <div
              className={`flex items-center font-medium text-xs ${
                change.isPositive
                  ? 'text-green-600'
                  : change.value === 0
                  ? 'text-gray-500'
                  : 'text-red-600'
              }`}
            >
              {change.value > 0 ? (
                <>
                  {change.isPositive ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  )}
                  {change.percentage.toFixed(1)}%
                </>
              ) : (
                <MinusIcon className="h-4 w-4" />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold">{currentRank.toLocaleString()}</p>
            {change.value > 0 && (
              <div className="mt-3 rounded-md py-1 px-2 bg-gray-50">
                <p
                  className={`font-medium text-xl ${
                    change.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {change.isPositive
                    ? `${change.value.toLocaleString()} kişinin önüne geçtin! 👏`
                    : `${change.value.toLocaleString()} kişi senin önüne geçti.`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

interface RankingChangeCardsGridProps {
  latestResult: any
  tytChange: RankingChange
  sayChange: RankingChange
  eaChange: RankingChange
  sozChange: RankingChange
}

export const RankingChangeCardsGrid = ({
  latestResult,
  tytChange,
  sayChange,
  eaChange,
  sozChange,
}: RankingChangeCardsGridProps) => {
  if (!latestResult) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <RankingChangeCard
        title="TYT Sıralaması"
        currentRank={latestResult?.tyt_placement_rank || 0}
        change={tytChange}
        color="#8884d8"
      />
      <RankingChangeCard
        title="SAY Sıralaması"
        currentRank={latestResult?.say_placement_rank || 0}
        change={sayChange}
        color="#82ca9d"
      />
      <RankingChangeCard
        title="EA Sıralaması"
        currentRank={latestResult?.ea_placement_rank || 0}
        change={eaChange}
        color="#ffc658"
      />
      <RankingChangeCard
        title="SOZ Sıralaması"
        currentRank={latestResult?.soz_placement_rank || 0}
        change={sozChange}
        color="#ff8042"
      />
    </div>
  )
}
