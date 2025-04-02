import { TYT_COEFFICENTS_2024 } from '@/constants/examPoints'
import { BASE_POINTS_2024 } from '@/constants/examPoints'

interface CalculateTYTScoresParams {
  turkishNet: number
  mathNet: number
  scienceNet: number
  socialStudiesNet: number
  grade: number
  isGraduated: boolean
}

interface CalculateAYTScoresParams {
  turkishNet: number
  mathNet: number
  scienceNet: number
  socialStudiesNet: number
  aytMathNet: number
  aytPhysicsNet: number
  aytChemistryNet: number
  aytBiologyNet: number
  aytLiteratureNet: number
  aytHistory1Net: number
  aytGeography1Net: number
  aytHistory2Net: number
  aytGeography2Net: number
  aytPhilosophyNet: number
  aytReligionNet: number
  grade: number
  isGraduated: boolean
}

export function calculateTYTScores(params: CalculateTYTScoresParams): {
  rawScore: number
  placementScore: number
} {
  const { turkishNet, mathNet, scienceNet, socialStudiesNet, grade, isGraduated } = params
  const graduationCoefficient = isGraduated ? 0.5 : 1
  const diplomaContribution = 0.6 * grade * graduationCoefficient
  const rawScore =
    BASE_POINTS_2024.TYT +
    TYT_COEFFICENTS_2024.TURKCE * turkishNet +
    TYT_COEFFICENTS_2024.SOSYAL * socialStudiesNet +
    TYT_COEFFICENTS_2024.MATEMATIK * mathNet +
    TYT_COEFFICENTS_2024.FEN * scienceNet
  const placementScore = rawScore + diplomaContribution

  return {
    rawScore: parseFloat(rawScore.toFixed(3)),
    placementScore: parseFloat(placementScore.toFixed(3)),
  }
}

// Calculate AYT scores
export function calculateAYTScores(params: CalculateAYTScoresParams): {
  sayRawScore: number
  sayPlacementScore: number
  eaRawScore: number
  eaPlacementScore: number
  sozRawScore: number
  sozPlacementScore: number
} {
  const {
    turkishNet,
    mathNet,
    scienceNet,
    socialStudiesNet,
    aytMathNet,
    aytPhysicsNet,
    aytChemistryNet,
    aytBiologyNet,
    aytLiteratureNet,
    aytHistory1Net,
    aytGeography1Net,
    aytHistory2Net,
    aytGeography2Net,
    aytPhilosophyNet,
    aytReligionNet,
    grade,
    isGraduated,
  } = params

  const graduationCoefficient = isGraduated ? 0.5 : 1
  const diplomaContribution = 0.6 * grade * graduationCoefficient

  const sayRawScore =
    BASE_POINTS_2024.SAY +
    1.11 * turkishNet +
    1.12 * socialStudiesNet +
    1.11 * mathNet +
    1.2 * scienceNet +
    3.19 * aytMathNet +
    2.43 * aytPhysicsNet +
    3.07 * aytChemistryNet +
    2.51 * aytBiologyNet

  const eaRawScore =
    BASE_POINTS_2024.EA +
    1.14 * turkishNet +
    1.15 * socialStudiesNet +
    1.15 * mathNet +
    1.23 * scienceNet +
    3.28 * aytMathNet +
    2.83 * aytLiteratureNet +
    2.38 * aytHistory1Net +
    2.54 * aytGeography1Net

  const sozRawScore =
    BASE_POINTS_2024.SOZ +
    1.23 * turkishNet +
    1.24 * socialStudiesNet +
    1.24 * mathNet +
    1.33 * scienceNet +
    3.06 * aytLiteratureNet +
    2.57 * aytHistory1Net +
    2.74 * aytGeography1Net +
    3.16 * aytHistory2Net +
    2.82 * aytGeography2Net +
    3.85 * aytPhilosophyNet +
    3.13 * aytReligionNet

  const sayPlacementScore = sayRawScore + diplomaContribution
  const eaPlacementScore = eaRawScore + diplomaContribution
  const sozPlacementScore = sozRawScore + diplomaContribution

  return {
    sayRawScore: parseFloat(sayRawScore.toFixed(3)),
    sayPlacementScore: parseFloat(sayPlacementScore.toFixed(3)),
    eaRawScore: parseFloat(eaRawScore.toFixed(3)),
    eaPlacementScore: parseFloat(eaPlacementScore.toFixed(3)),
    sozRawScore: parseFloat(sozRawScore.toFixed(3)),
    sozPlacementScore: parseFloat(sozPlacementScore.toFixed(3)),
  }
}

type ScoreType = 'tyt' | 'say' | 'soz' | 'ea'
type RankingResult = number | string

interface RankingRange {
  tyt: number
  say: number
  soz: number
  ea: number
  range: number
}

// Placement ranking calculation function
function getPlacementRankRanges(score: number): RankingRange | null {
  if (score < 115) return null

  if (score >= 550) return { tyt: 59, say: 162, soz: 3, ea: 5, range: 550 }
  if (score >= 530) return { tyt: 3017, say: 2271, soz: 31, ea: 80, range: 530 }
  if (score >= 510) return { tyt: 12996, say: 7029, soz: 142, ea: 340, range: 510 }
  if (score >= 490) return { tyt: 29976, say: 14673, soz: 476, ea: 940, range: 490 }
  if (score >= 470) return { tyt: 53253, say: 25274, soz: 1292, ea: 1992, range: 470 }
  if (score >= 450) return { tyt: 82281, say: 38578, soz: 3424, ea: 4269, range: 450 }
  if (score >= 430) return { tyt: 118095, say: 54307, soz: 8952, ea: 11111, range: 430 }
  if (score >= 410) return { tyt: 163769, say: 72418, soz: 21706, ea: 24612, range: 410 }
  if (score >= 390) return { tyt: 223427, say: 93485, soz: 45376, ea: 46809, range: 390 }
  if (score >= 370) return { tyt: 304035, say: 118001, soz: 83547, ea: 79522, range: 370 }
  if (score >= 350) return { tyt: 412255, say: 148110, soz: 139921, ea: 126223, range: 350 }
  if (score >= 330) return { tyt: 560622, say: 185681, soz: 219810, ea: 191807, range: 330 }
  if (score >= 310) return { tyt: 761711, say: 234882, soz: 328161, ea: 287762, range: 310 }
  if (score >= 290) return { tyt: 1017130, say: 300531, soz: 471676, ea: 422338, range: 290 }
  if (score >= 270) return { tyt: 1318668, say: 392302, soz: 652313, ea: 601868, range: 270 }
  if (score >= 250) return { tyt: 1652661, say: 531055, soz: 860119, ea: 831379, range: 250 }
  if (score >= 230) return { tyt: 2011925, say: 746123, soz: 1068917, ea: 1104426, range: 230 }
  if (score >= 210) return { tyt: 2377153, say: 1000554, soz: 1247074, ea: 1385617, range: 210 }
  if (score >= 190) return { tyt: 2377153, say: 1208531, soz: 1368579, ea: 1610447, range: 190 }
  if (score >= 170) return { tyt: 2749663, say: 1300183, soz: 1418232, ea: 1697303, range: 170 }
  if (score >= 150) return { tyt: 2755201, say: 1306920, soz: 1423773, ea: 1703735, range: 150 }
  if (score >= 130) return { tyt: 2755276, say: 1307007, soz: 1423849, ea: 1703833, range: 130 }
  if (score >= 115) return { tyt: 2755277, say: 1307007, soz: 1423849, ea: 1703833, range: 115 }

  return null
}

// Raw score ranking calculation function
function getRawScoreRankRanges(score: number): RankingRange | null {
  if (score < 100) return null

  if (score >= 500) return { tyt: 1, say: 1, soz: 1, ea: 1, range: 500 }
  if (score >= 480) return { tyt: 986, say: 1069, soz: 20, ea: 36, range: 480 }
  if (score >= 460) return { tyt: 8234, say: 4750, soz: 119, ea: 211, range: 460 }
  if (score >= 440) return { tyt: 23564, say: 11529, soz: 400, ea: 703, range: 440 }
  if (score >= 420) return { tyt: 45685, say: 21345, soz: 1083, ea: 1630, range: 420 }
  if (score >= 400) return { tyt: 74365, say: 34156, soz: 3088, ea: 269, range: 400 }
  if (score >= 380) return { tyt: 110048, say: 49575, soz: 8722, ea: 8084, range: 380 }
  if (score >= 360) return { tyt: 156162, say: 67370, soz: 21721, ea: 19423, range: 360 }
  if (score >= 340) return { tyt: 216563, say: 88385, soz: 46571, ea: 39621, range: 340 }
  if (score >= 320) return { tyt: 300825, say: 112870, soz: 86742, ea: 71063, range: 320 }
  if (score >= 300) return { tyt: 417417, say: 142684, soz: 147193, ea: 116952, range: 300 }
  if (score >= 280) return { tyt: 585243, say: 180424, soz: 234001, ea: 184104, range: 280 }
  if (score >= 260) return { tyt: 821185, say: 230040, soz: 353014, ea: 285679, range: 260 }
  if (score >= 240) return { tyt: 1118205, say: 297460, soz: 511134, ea: 432666, range: 240 }
  if (score >= 220) return { tyt: 1461314, say: 394384, soz: 711504, ea: 635607, range: 220 }
  if (score >= 200) return { tyt: 1825318, say: 549385, soz: 937848, ea: 903984, range: 200 }
  if (score >= 180) return { tyt: 2202319, say: 814732, soz: 1152096, ea: 1218069, range: 180 }
  if (score >= 160) return { tyt: 2550017, say: 1105934, soz: 1315055, ea: 1508650, range: 160 }
  if (score >= 140) return { tyt: 2736068, say: 1281163, soz: 1404667, ea: 1679335, range: 140 }
  if (score >= 120) return { tyt: 2754938, say: 1306785, soz: 1423444, ea: 1703533, range: 120 }
  if (score >= 100) return { tyt: 2755277, say: 1307007, soz: 1423849, ea: 1703833, range: 100 }

  return null
}

// Ranking calculation function (interpolation logic)
function calculateRanking(
  score: number,
  scoreType: ScoreType,
  rankingFunction: (score: number) => RankingRange | null,
): RankingResult {
  // Check if the score is valid
  const lowerRange = rankingFunction(score)
  if (!lowerRange) return '-'

  // For the upper range, take a different score (20 points above)
  const upperRange = rankingFunction(score + 20)

  // If there is no upper range (we are at the highest score range), return the lower range value
  if (!upperRange) return lowerRange[scoreType]

  // Interpolation between two limits
  const difference = lowerRange[scoreType] - upperRange[scoreType]
  const slope = difference / 20
  const interpolation = (score - lowerRange.range) * slope

  // Round the result
  return Math.round(lowerRange[scoreType] - interpolation)
}

// Raw rankings calculation functions
export function calculateTytRawRanking(score: number): RankingResult {
  return calculateRanking(score, 'tyt', getRawScoreRankRanges)
}

export function calculateSayRawRanking(score: number): RankingResult {
  return calculateRanking(score, 'say', getRawScoreRankRanges)
}

export function calculateSozRawRanking(score: number): RankingResult {
  return calculateRanking(score, 'soz', getRawScoreRankRanges)
}

export function calculateEaRawRanking(score: number): RankingResult {
  return calculateRanking(score, 'ea', getRawScoreRankRanges)
}

// Placement rankings calculation functions
export function calculateTytPlacementRanking(score: number): RankingResult {
  return calculateRanking(score, 'tyt', getPlacementRankRanges)
}

export function calculateSayPlacementRanking(score: number): RankingResult {
  return calculateRanking(score, 'say', getPlacementRankRanges)
}

export function calculateSozPlacementRanking(score: number): RankingResult {
  return calculateRanking(score, 'soz', getPlacementRankRanges)
}

export function calculateEaPlacementRanking(score: number): RankingResult {
  return calculateRanking(score, 'ea', getPlacementRankRanges)
}
