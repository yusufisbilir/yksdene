'use client'

import PageLoader from '@/components/shared/PageLoader'
import { useGetYKSRankingQuery } from '@/features/examAttempt.slice'

const LastYKSRanking = () => {
  const { data: results, isLoading: isLoadingYKSRanking } = useGetYKSRankingQuery()

  if (isLoadingYKSRanking) {
    return <PageLoader />
  }

  return (
    <div className="space-y-4">
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
