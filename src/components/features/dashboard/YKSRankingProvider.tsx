import { YksRanking } from '@/types'

export interface RankingStat {
  best: number | null
  worst: number | null
  bestIndex: number
  worstIndex: number
}

export interface RankingChange {
  value: number
  percentage: number
  isPositive: boolean
}

export interface ProcessedRankingData {
  chartData: Array<Record<string, any>>
  tytStats: RankingStat
  sayStats: RankingStat
  eaStats: RankingStat
  sozStats: RankingStat
  latestResult: YksRanking | null
  previousResult: YksRanking | null
  tytChange: RankingChange
  sayChange: RankingChange
  eaChange: RankingChange
  sozChange: RankingChange
}

export class YKSRankingProvider {
  static processRankingData(yksRanking: YksRanking[]): ProcessedRankingData {
    // Boş veri kontrolü
    if (!yksRanking || yksRanking.length === 0) {
      return this.getEmptyData()
    }

    const chartData = this.prepareChartData(yksRanking)

    // İstatistikleri hesapla
    const tytStats = this.findBestAndWorst(chartData, 'TYT')
    const sayStats = this.findBestAndWorst(chartData, 'SAY')
    const eaStats = this.findBestAndWorst(chartData, 'EA')
    const sozStats = this.findBestAndWorst(chartData, 'SOZ')

    // Son iki sınav sonucunu al
    const sortedResults = [...yksRanking].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    const latestResult = sortedResults[0] || null
    const previousResult = sortedResults[1] || null

    // Değişimleri hesapla
    const tytChange = this.calculateChange(
      latestResult?.tyt_placement_rank || 0,
      previousResult?.tyt_placement_rank || 0,
    )

    const sayChange = this.calculateChange(
      latestResult?.say_placement_rank || 0,
      previousResult?.say_placement_rank || 0,
    )

    const eaChange = this.calculateChange(
      latestResult?.ea_placement_rank || 0,
      previousResult?.ea_placement_rank || 0,
    )

    const sozChange = this.calculateChange(
      latestResult?.soz_placement_rank || 0,
      previousResult?.soz_placement_rank || 0,
    )

    return {
      chartData,
      tytStats,
      sayStats,
      eaStats,
      sozStats,
      latestResult,
      previousResult,
      tytChange,
      sayChange,
      eaChange,
      sozChange,
    }
  }

  private static getEmptyData(): ProcessedRankingData {
    const emptyStats = { best: null, worst: null, bestIndex: -1, worstIndex: -1 }
    const emptyChange = { value: 0, percentage: 0, isPositive: false }

    return {
      chartData: [],
      tytStats: emptyStats,
      sayStats: emptyStats,
      eaStats: emptyStats,
      sozStats: emptyStats,
      latestResult: null,
      previousResult: null,
      tytChange: emptyChange,
      sayChange: emptyChange,
      eaChange: emptyChange,
      sozChange: emptyChange,
    }
  }

  private static prepareChartData(yksRanking: YksRanking[]): Array<Record<string, any>> {
    const sortedResults = [...yksRanking].sort(
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

  private static findBestAndWorst(data: Array<Record<string, any>>, field: string): RankingStat {
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

  public static calculateChange(current: number, previous: number): RankingChange {
    if (!current || !previous) return { value: 0, percentage: 0, isPositive: false }

    const diff = previous - current
    const percentage = previous > 0 ? (Math.abs(diff) / previous) * 100 : 0

    return {
      value: Math.abs(diff),
      percentage: Math.round(percentage * 100) / 100,
      isPositive: diff > 0,
    }
  }
}
