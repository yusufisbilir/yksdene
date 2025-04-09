'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceDot,
} from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const LastYKSRanking = () => {
  const { data: results, isLoading: isLoadingYKSRanking } = useGetYKSRankingQuery()

  if (isLoadingYKSRanking) {
    return <PageLoader />
  }

  const lineChartData = () => {
    if (!results || results.length === 0) return []

    const sortedResults = [...results].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )

    return sortedResults.map((result) => ({
      date: new Date(result.created_at).toLocaleDateString('tr-TR'),
      TYT: result.tyt_placement_rank || 0,
      SAY: result.say_placement_rank || 0,
      EA: result.ea_placement_rank || 0,
      SOZ: result.soz_placement_rank || 0,
    }))
  }

  const findBestAndWorst = (data: Array<Record<string, any>>, field: string) => {
    if (!data || data.length === 0)
      return { best: null, worst: null, bestIndex: -1, worstIndex: -1 }

    let bestRank = Infinity
    let worstRank = 0
    let bestIndex = -1
    let worstIndex = -1

    data.forEach((item: Record<string, any>, index: number) => {
      if (item[field] > 0) {
        if (item[field] < bestRank) {
          bestRank = item[field]
          bestIndex = index
        }
        if (item[field] > worstRank) {
          worstRank = item[field]
          worstIndex = index
        }
      }
    })

    return {
      best: bestRank === Infinity ? null : bestRank,
      worst: worstRank === 0 ? null : worstRank,
      bestIndex,
      worstIndex,
    }
  }

  const chartData = lineChartData()
  const tytStats = findBestAndWorst(chartData, 'TYT')
  const sayStats = findBestAndWorst(chartData, 'SAY')
  const eaStats = findBestAndWorst(chartData, 'EA')
  const sozStats = findBestAndWorst(chartData, 'SOZ')

  const renderSingleChart = (dataKey: string, label: string, color: string, stats: any) => {
    return (
      <div style={{ width: '100%', height: 300 }} className="mb-4">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => value.toLocaleString('tr-TR')}
              domain={['dataMax', 'dataMin']}
              label={{ value: 'Sıralama', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value) => value.toLocaleString('tr-TR')}
              labelFormatter={(label) => `Tarih: ${label}`}
            />
            <Legend />

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

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-3 text-left">Sınav</th>
              <th className="p-3 text-left">Ham Puan</th>
              <th className="p-3 text-left">Ham Sıralama</th>
              <th className="p-3 text-left">Yerleştirme Puanı</th>
              <th className="p-3 text-left">Yerleştirme Sıralama</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="p-3 font-medium">TYT</td>
              <td className="p-3">{results?.[0]?.tyt_raw_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.tyt_raw_rank.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.tyt_placement_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.tyt_placement_rank.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">SAY</td>
              <td className="p-3">{results?.[0]?.say_raw_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.say_raw_rank.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.say_placement_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.say_placement_rank.toLocaleString()}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-3 font-medium">EA</td>
              <td className="p-3">{results?.[0]?.ea_raw_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.ea_raw_rank.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.ea_placement_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.ea_placement_rank.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">SOZ</td>
              <td className="p-3">{results?.[0]?.soz_raw_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.soz_raw_rank.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.soz_placement_score.toLocaleString()}</td>
              <td className="p-3">{results?.[0]?.soz_placement_rank.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yerleştirme Sıralamaları Gelişimi</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tyt" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="tyt">TYT</TabsTrigger>
              <TabsTrigger value="say">SAY</TabsTrigger>
              <TabsTrigger value="ea">EA</TabsTrigger>
              <TabsTrigger value="soz">SOZ</TabsTrigger>
            </TabsList>

            <TabsContent value="tyt" className="mt-0">
              {renderSingleChart('TYT', 'TYT', '#8884d8', tytStats)}
              <div className="text-xs mt-2">
                <p>• En iyi TYT sıralaması: {tytStats.best?.toLocaleString() || 'Veri yok'}</p>
              </div>
            </TabsContent>

            <TabsContent value="say" className="mt-0">
              {renderSingleChart('SAY', 'Sayısal', '#82ca9d', sayStats)}
              <div className="text-xs mt-2">
                <p>• En iyi SAY sıralaması: {sayStats.best?.toLocaleString() || 'Veri yok'}</p>
              </div>
            </TabsContent>

            <TabsContent value="ea" className="mt-0">
              {renderSingleChart('EA', 'Eşit Ağırlık', '#ffc658', eaStats)}
              <div className="text-xs mt-2">
                <p>• En iyi EA sıralaması: {eaStats.best?.toLocaleString() || 'Veri yok'}</p>
              </div>
            </TabsContent>

            <TabsContent value="soz" className="mt-0">
              {renderSingleChart('SOZ', 'Sözel', '#ff8042', sozStats)}
              <div className="text-xs mt-2">
                <p>• En iyi SOZ sıralaması: {sozStats.best?.toLocaleString() || 'Veri yok'}</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>* 2024 YKS verileri kullanılarak son TYT ve AYT denemenize göre hesaplanmıştır.</p>
        <p>
          * Diploma Notu: {results?.[0]?.obp || 80} puanı kullanılmıştır. Profil sayfasından obp
          puanını ve mezun durumunu değiştirebilirsin.
        </p>
      </div>
    </div>
  )
}

export default LastYKSRanking
