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
} from 'recharts'

const LastYKSRanking = () => {
  const { data: results, isLoading: isLoadingYKSRanking } = useGetYKSRankingQuery()

  if (isLoadingYKSRanking) {
    return <PageLoader />
  }
  const lineChartData = () => {
    if (!results || results.length === 0) return []

    // Sonuçları tarihe göre sırala, en eskiden en yeniye doğru
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
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart
                data={lineChartData()}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
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
                  dataKey="TYT"
                  name="TYT Sıralaması"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="SAY"
                  name="SAY Sıralaması"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="EA"
                  name="EA Sıralaması"
                  stroke="#ffc658"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="SOZ"
                  name="SOZ Sıralaması"
                  stroke="#ff8042"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
