'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'
import { RankingStat, YKSRankingProvider } from './YKSRankingProvider'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import PageLoader from '@/components/shared/PageLoader'

interface RankingChartProps {
  dataKey: string
  label: string
  color: string
  stats: RankingStat
  chartData: Array<Record<string, any>>
}

export const RankingChart = ({ dataKey, label, color, stats, chartData }: RankingChartProps) => {
  return (
    <div style={{ width: '100%', height: 300 }} className="mb-4">
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) => value.toLocaleString('tr-TR')}
            domain={['dataMax', 'dataMin']}
            reversed={true}
          />
          <Tooltip
            formatter={(value) => value.toLocaleString('tr-TR')}
            labelFormatter={(label) => `Tarih: ${label}`}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            name={`${label} Sıralaması`}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          {stats.best && stats.bestIndex >= 0 && (
            <ReferenceDot
              x={chartData[stats.bestIndex].date}
              y={stats.best}
              r={8}
              fill={color}
              stroke="none"
              fillOpacity={0.6}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const RankingCharts = () => {
  const { data: yksRanking } = useGetYKSRankingQuery()

  const { chartData, tytStats, sayStats, eaStats, sozStats } =
    YKSRankingProvider.processRankingData(yksRanking ?? [])

  if (!yksRanking) {
    return <PageLoader />
  }

  return (
    <Tabs defaultValue="tyt" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="tyt">TYT</TabsTrigger>
        <TabsTrigger value="say">SAY</TabsTrigger>
        <TabsTrigger value="ea">EA</TabsTrigger>
        <TabsTrigger value="soz">SOZ</TabsTrigger>
      </TabsList>

      <TabsContent value="tyt" className="mt-0">
        <RankingChart
          dataKey="TYT"
          label="TYT"
          color="#8884d8"
          stats={tytStats}
          chartData={chartData}
        />
        <div className="text-xs mt-2">
          <p>• En iyi TYT sıralaması: {tytStats.best?.toLocaleString() || 'Veri yok'}</p>
        </div>
      </TabsContent>

      <TabsContent value="say" className="mt-0">
        <RankingChart
          dataKey="SAY"
          label="Sayısal"
          color="#82ca9d"
          stats={sayStats}
          chartData={chartData}
        />
        <div className="text-xs mt-2">
          <p>• En iyi SAY sıralaması: {sayStats.best?.toLocaleString() || 'Veri yok'}</p>
        </div>
      </TabsContent>

      <TabsContent value="ea" className="mt-0">
        <RankingChart
          dataKey="EA"
          label="Eşit Ağırlık"
          color="#ffc658"
          stats={eaStats}
          chartData={chartData}
        />
        <div className="text-xs mt-2">
          <p>• En iyi EA sıralaması: {eaStats.best?.toLocaleString() || 'Veri yok'}</p>
        </div>
      </TabsContent>

      <TabsContent value="soz" className="mt-0">
        <RankingChart
          dataKey="SOZ"
          label="Sözel"
          color="#ff8042"
          stats={sozStats}
          chartData={chartData}
        />
        <div className="text-xs mt-2">
          <p>• En iyi SOZ sıralaması: {sozStats.best?.toLocaleString() || 'Veri yok'}</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
