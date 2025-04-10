'use client'

import { YksRanking } from '@/types'

interface RankingTableProps {
  latestResult: YksRanking | null
}

export const RankingTable = ({ latestResult }: RankingTableProps) => {
  if (!latestResult) return null

  return (
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
            <td className="p-3">{latestResult.tyt_raw_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.tyt_raw_rank.toLocaleString()}</td>
            <td className="p-3">{latestResult.tyt_placement_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.tyt_placement_rank.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="p-3 font-medium">SAY</td>
            <td className="p-3">{latestResult.say_raw_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.say_raw_rank.toLocaleString()}</td>
            <td className="p-3">{latestResult.say_placement_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.say_placement_rank.toLocaleString()}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="p-3 font-medium">EA</td>
            <td className="p-3">{latestResult.ea_raw_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.ea_raw_rank.toLocaleString()}</td>
            <td className="p-3">{latestResult.ea_placement_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.ea_placement_rank.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="p-3 font-medium">SOZ</td>
            <td className="p-3">{latestResult.soz_raw_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.soz_raw_rank.toLocaleString()}</td>
            <td className="p-3">{latestResult.soz_placement_score.toLocaleString()}</td>
            <td className="p-3">{latestResult.soz_placement_rank.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const RankingFooter = ({ latestResult }: { latestResult: YksRanking | null }) => {
  if (!latestResult) return null

  return (
    <div className="mt-4 text-xs text-muted-foreground">
      <p>* 2024 YKS verileri kullanılarak son TYT ve AYT denemenize göre hesaplanmıştır.</p>
      <p>
        * Diploma Notu: {latestResult.obp || 80} puanı kullanılmıştır. Profil sayfasından obp
        puanını ve mezun durumunu değiştirebilirsin.
      </p>
    </div>
  )
}
