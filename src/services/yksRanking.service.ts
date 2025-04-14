import {
  LastExamResults,
  SubjectResult,
  YksRanking,
  YksRankingInsertWithoutId,
  YKSRankingTable,
} from '@/types'
import { examAttemptService } from '@/services/examAttempt.service'
import { profileService } from './profile.service'
import { apiRequestValidator } from './requestValidator.service'
import { supabaseServerClient } from '@/lib/supabaseServerClient'

const BASE_POINTS_2024 = {
  TYT: 144.945,
  SAY: 133.284,
  EA: 132.283,
  SOZ: 130.358,
}

const TYT_COEFFICENTS_2024 = {
  TURKCE: 2.90845,
  MATEMATIK: 2.9255,
  SOSYAL: 2.93675,
  FEN: 3.1482,
}

const AYT_SAY_COEFFICENTS_2024 = {
  TURKCE: 1.1067,
  MATEMATIK: 1.113175,
  SOSYAL: 1.11745,
  FEN: 1.1979,
  AYT_MATEMATIK: 3.189375,
  AYT_FIZIK: 2.42635714286,
  AYT_KIMYA: 3.07407692308,
  AYT_BIYOLOJI: 2.50923076923,
}

const AYT_EA_COEFFICENTS_2024 = {
  TURKCE: 1.1389,
  MATEMATIK: 1.145575,
  SOSYAL: 1.14995,
  FEN: 1.23275,
  AYT_MATEMATIK: 3.282175,
  AYT_EDEBIYAT: 2.83175,
  AYT_TARIH1: 2.377,
  AYT_COGRAFYA1: 2.5365,
}

const AYT_SOZ_COEFFICENTS_2024 = {
  TURKCE: 1.23205,
  MATEMATIK: 1.23925,
  SOSYAL: 1.24405,
  FEN: 1.3336,
  AYT_EDEBIYAT: 3.06333333333,
  AYT_TARIH1: 2.5715,
  AYT_COGRAFYA1: 2.744,
  AYT_TARIH2: 3.16009090909,
  AYT_COGRAFYA2: 2.82045454545,
  AYT_FELSEFE: 3.85041666667,
  AYT_DIN: 3.131,
}

interface RankingRange {
  tyt: number
  say: number
  soz: number
  ea: number
  range: number
}

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

type getYKSRankTableDataProps = {
  grade: number
  isGraduated: boolean
  tyt: {
    turkishNet: number
    mathNet: number
    scienceNet: number
    socialStudiesNet: number
  }
  ayt: {
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
  }
  TYT_id?: string
  AYT_id?: string
}

type ScoreType = 'tyt' | 'say' | 'soz' | 'ea'

// TYT Subject IDs
const tytTurkishId = 'ce164057-c0fb-4770-9951-bff7b6089537'
const tytMathId = '58017200-0ff0-4aad-9f37-f5235989dc67'
const tytPhysicsId = 'b4835e2c-cb12-4f58-9405-daada69fb473'
const tytChemistryId = '18400b98-faeb-4f7b-bc87-5f8d798e0e6b'
const tytBiologyId = '441fd0c8-dbea-4141-a89a-048e6330a1e4'
const tytHistoryId = 'fbb509ba-431d-400f-bde4-c0f64c2c1508'
const tytGeographyId = 'b07f1bcc-2422-47e4-b56b-a5d1f413b0f7'
const tytPhilosophyId = '8c22c4e2-8fa0-4d68-9dbd-6a423588de60'
const tytReligionId = '6a897488-1ca9-407c-93ba-6ad502496448'

// AYT Subject IDs
const aytMathScientificId = 'ef4a20d5-b3c7-4942-90f4-78f4c7dc7eca'
const aytMathEqualWeightId = '80221e43-18c3-4573-8b85-ce8946a40d5a'
const aytPhysicsId = '0888bbac-dafd-48e1-a500-69a3366758e3'
const aytChemistryId = '0563701e-d3ac-45f8-98fd-33eb57d65957'
const aytBiologyId = '78697ab9-b0cf-4bb6-ad91-d99928555168'
const aytLiteratureEqualWeightId = '79fd2f86-6ef6-4509-8edb-0a351572af4a'
const aytLiteratureVerbalId = '3e094f1d-79c3-4b83-b9c3-5f704ed8900c'
const aytHistory1EqualWeightId = '570b09a7-cae9-41fe-ba2c-5cda0f56c91b'
const aytHistory1VerbalId = '80253263-9278-4dc4-9065-bf88589f5854'
const aytGeography1EqualWeightId = '409f2a31-3572-442a-86eb-22b9e2628edf'
const aytGeography1VerbalId = '949c9c11-bb12-4941-9db7-1be437e072f3'
const aytHistory2Id = 'e7bf9c65-0e9a-47a7-b1c6-6b21035e3d9a'
const aytGeography2Id = '7bbc8221-a156-4da2-bf6b-bd24f4954150'
const aytPhilosophyId = 'a62143b7-8ddf-45fb-80e0-f24c79cdb59d'
const aytReligionId = 'b4765b3e-b009-483a-b1e8-b5c7433ed2cc'

export const yksRankingService = {
  _getPlacementRankRanges(score: number): RankingRange | null {
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
  },

  _getRawScoreRankRanges(score: number): RankingRange | null {
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
  },
  _calculateTYTScores(params: CalculateTYTScoresParams): {
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
  },
  _calculateAYTScores(params: CalculateAYTScoresParams) {
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
      AYT_SAY_COEFFICENTS_2024.TURKCE * turkishNet +
      AYT_SAY_COEFFICENTS_2024.SOSYAL * socialStudiesNet +
      AYT_SAY_COEFFICENTS_2024.MATEMATIK * mathNet +
      AYT_SAY_COEFFICENTS_2024.FEN * scienceNet +
      AYT_SAY_COEFFICENTS_2024.AYT_MATEMATIK * aytMathNet +
      AYT_SAY_COEFFICENTS_2024.AYT_FIZIK * aytPhysicsNet +
      AYT_SAY_COEFFICENTS_2024.AYT_KIMYA * aytChemistryNet +
      AYT_SAY_COEFFICENTS_2024.AYT_BIYOLOJI * aytBiologyNet

    const eaRawScore =
      BASE_POINTS_2024.EA +
      AYT_EA_COEFFICENTS_2024.TURKCE * turkishNet +
      AYT_EA_COEFFICENTS_2024.MATEMATIK * mathNet +
      AYT_EA_COEFFICENTS_2024.SOSYAL * socialStudiesNet +
      AYT_EA_COEFFICENTS_2024.FEN * scienceNet +
      AYT_EA_COEFFICENTS_2024.AYT_MATEMATIK * aytMathNet +
      AYT_EA_COEFFICENTS_2024.AYT_EDEBIYAT * aytLiteratureNet +
      AYT_EA_COEFFICENTS_2024.AYT_TARIH1 * aytHistory1Net +
      AYT_EA_COEFFICENTS_2024.AYT_COGRAFYA1 * aytGeography1Net

    const sozRawScore =
      BASE_POINTS_2024.SOZ +
      AYT_SOZ_COEFFICENTS_2024.TURKCE * turkishNet +
      AYT_SOZ_COEFFICENTS_2024.SOSYAL * socialStudiesNet +
      AYT_SOZ_COEFFICENTS_2024.MATEMATIK * mathNet +
      AYT_SOZ_COEFFICENTS_2024.FEN * scienceNet +
      AYT_SOZ_COEFFICENTS_2024.AYT_EDEBIYAT * aytLiteratureNet +
      AYT_SOZ_COEFFICENTS_2024.AYT_TARIH1 * aytHistory1Net +
      AYT_SOZ_COEFFICENTS_2024.AYT_COGRAFYA1 * aytGeography1Net +
      AYT_SOZ_COEFFICENTS_2024.AYT_TARIH2 * aytHistory2Net +
      AYT_SOZ_COEFFICENTS_2024.AYT_COGRAFYA2 * aytGeography2Net +
      AYT_SOZ_COEFFICENTS_2024.AYT_FELSEFE * aytPhilosophyNet +
      AYT_SOZ_COEFFICENTS_2024.AYT_DIN * aytReligionNet

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
  },
  _calculateYKSRanking(
    score: number,
    scoreType: ScoreType,
    rankingFunction: (score: number) => RankingRange | null,
  ): number {
    // Check if the score is valid
    const lowerRange = rankingFunction(score)
    if (!lowerRange) return 0

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
  },
  _calculateNetScores(
    lastExamResults: LastExamResults,
    obp: number,
    graduated: boolean,
  ): getYKSRankTableDataProps {
    // Helper function to calculate net scores for subjects
    const calculateNetScore = (examType: keyof LastExamResults, subjectIds: string | string[]) => {
      const results =
        lastExamResults?.[examType] && typeof lastExamResults[examType] !== 'string'
          ? lastExamResults[examType].subjectResults
          : []
      return (
        results.reduce((acc: number, result: SubjectResult) => {
          if (
            Array.isArray(subjectIds)
              ? subjectIds.includes(result.subject_id)
              : result.subject_id === subjectIds
          ) {
            return acc + result.correct_count - result.incorrect_count * 0.25
          }
          return acc
        }, 0) || 0
      )
    }

    // Calculate TYT nets
    const tytTurkishNet = calculateNetScore('TYT', tytTurkishId)
    const tytMathNet = calculateNetScore('TYT', tytMathId)
    const tytSocialNet = calculateNetScore('TYT', [
      tytHistoryId,
      tytGeographyId,
      tytReligionId,
      tytPhilosophyId,
    ])
    const tytScienceNet = calculateNetScore('TYT', [tytPhysicsId, tytChemistryId, tytBiologyId])

    // Calculate AYT nets
    const aytMathNet =
      calculateNetScore('AYT_Sayisal', aytMathScientificId) ||
      calculateNetScore('AYT_EsitAgirlik', aytMathEqualWeightId)

    const aytPhysicsNet = calculateNetScore('AYT_Sayisal', aytPhysicsId)
    const aytChemistryNet = calculateNetScore('AYT_Sayisal', aytChemistryId)
    const aytBiologyNet = calculateNetScore('AYT_Sayisal', aytBiologyId)

    const aytLiteratureNet =
      calculateNetScore('AYT_EsitAgirlik', aytLiteratureEqualWeightId) ||
      calculateNetScore('AYT_Sozel', aytLiteratureVerbalId)

    const aytHistory1Net =
      calculateNetScore('AYT_EsitAgirlik', aytHistory1EqualWeightId) ||
      calculateNetScore('AYT_Sozel', aytHistory1VerbalId)

    const aytGeography1Net =
      calculateNetScore('AYT_EsitAgirlik', aytGeography1EqualWeightId) ||
      calculateNetScore('AYT_Sozel', aytGeography1VerbalId)

    const aytHistory2Net = calculateNetScore('AYT_Sozel', aytHistory2Id)
    const aytGeography2Net = calculateNetScore('AYT_Sozel', aytGeography2Id)
    const aytPhilosophyNet = calculateNetScore('AYT_Sozel', aytPhilosophyId)
    const aytReligionNet = calculateNetScore('AYT_Sozel', aytReligionId)

    return {
      grade: obp,
      isGraduated: graduated,
      tyt: {
        turkishNet: tytTurkishNet || 0,
        mathNet: tytMathNet || 0,
        scienceNet: tytScienceNet || 0,
        socialStudiesNet: tytSocialNet || 0,
      },
      ayt: {
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
      },
      TYT_id: lastExamResults?.TYT_id,
      AYT_id: lastExamResults?.AYT_id,
    }
  },
  async _getYKSRankTableData(params: getYKSRankTableDataProps): Promise<YksRankingInsertWithoutId> {
    const ranking: YKSRankingTable = {
      tyt: {
        ham: 0,
        ham_sir: 0,
        yer: 0,
        yer_sir: 0,
      },
      say: {
        ham: 0,
        ham_sir: 0,
        yer: 0,
        yer_sir: 0,
      },
      ea: {
        ham: 0,
        ham_sir: 0,
        yer: 0,
        yer_sir: 0,
      },
      soz: {
        ham: 0,
        ham_sir: 0,
        yer: 0,
        yer_sir: 0,
      },
    }

    // TYT raw and placement scores
    const { rawScore: tytRaw, placementScore: tytPlacement } = this._calculateTYTScores({
      ...params.tyt,
      grade: params.grade,
      isGraduated: params.isGraduated,
    })

    ranking.tyt.ham = tytRaw
    ranking.tyt.yer = tytPlacement

    // TYT raw and placement rankings
    ranking.tyt.ham_sir = this._calculateYKSRanking(
      ranking.tyt.ham,
      'tyt',
      this._getRawScoreRankRanges,
    )
    ranking.tyt.yer_sir = this._calculateYKSRanking(
      ranking.tyt.yer,
      'tyt',
      this._getPlacementRankRanges,
    )

    // AYT raw and placement scores
    const {
      sayRawScore,
      sayPlacementScore,
      eaRawScore,
      eaPlacementScore,
      sozRawScore,
      sozPlacementScore,
    } = this._calculateAYTScores({
      ...params.ayt,
      turkishNet: params.tyt.turkishNet,
      mathNet: params.tyt.mathNet,
      scienceNet: params.tyt.scienceNet,
      socialStudiesNet: params.tyt.socialStudiesNet,
      grade: params.grade,
      isGraduated: params.isGraduated,
    })
    ranking.say.ham = sayRawScore
    ranking.say.yer = sayPlacementScore
    ranking.ea.ham = eaRawScore
    ranking.ea.yer = eaPlacementScore
    ranking.soz.ham = sozRawScore
    ranking.soz.yer = sozPlacementScore

    // AYT raw and placement rankings
    ranking.say.ham_sir = this._calculateYKSRanking(
      ranking.say.ham,
      'say',
      this._getRawScoreRankRanges,
    )
    ranking.say.yer_sir = this._calculateYKSRanking(
      ranking.say.yer,
      'say',
      this._getPlacementRankRanges,
    )
    ranking.ea.ham_sir = this._calculateYKSRanking(
      ranking.ea.ham,
      'ea',
      this._getRawScoreRankRanges,
    )
    ranking.ea.yer_sir = this._calculateYKSRanking(
      ranking.ea.yer,
      'ea',
      this._getPlacementRankRanges,
    )
    ranking.soz.ham_sir = this._calculateYKSRanking(
      ranking.soz.ham,
      'soz',
      this._getRawScoreRankRanges,
    )
    ranking.soz.yer_sir = this._calculateYKSRanking(
      ranking.soz.yer,
      'soz',
      this._getPlacementRankRanges,
    )

    return {
      tyt_exam_attempt_id: params.TYT_id ?? null,
      ayt_exam_attempt_id: params.AYT_id ?? null,
      graduated: params.isGraduated,
      obp: params.grade,
      tyt_raw_score: ranking.tyt.ham,
      tyt_raw_rank: ranking.tyt.ham_sir,
      tyt_placement_score: ranking.tyt.yer,
      tyt_placement_rank: ranking.tyt.yer_sir,
      say_raw_score: ranking.say.ham,
      say_raw_rank: ranking.say.ham_sir,
      say_placement_score: ranking.say.yer,
      say_placement_rank: ranking.say.yer_sir,
      ea_raw_score: ranking.ea.ham,
      ea_raw_rank: ranking.ea.ham_sir,
      ea_placement_score: ranking.ea.yer,
      ea_placement_rank: ranking.ea.yer_sir,
      soz_raw_score: ranking.soz.ham,
      soz_raw_rank: ranking.soz.ham_sir,
      soz_placement_score: ranking.soz.yer,
      soz_placement_rank: ranking.soz.yer_sir,
    }
  },
  async _prepareYKSRanking(): Promise<YksRankingInsertWithoutId> {
    const lastExamResults = await examAttemptService.getLastExamResults()
    const profile = await profileService.getProfile()
    const calculatedScores = this._calculateNetScores(
      lastExamResults,
      profile?.obp ?? 80,
      profile?.graduated ?? false,
    )
    const YKSRanking = await this._getYKSRankTableData(calculatedScores)
    return YKSRanking
  },
  // run this function after saved new exam attempt
  async calculateAndsaveYKSRanking() {
    apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const preparedData = await this._prepareYKSRanking()

      const { data, error } = await supabase.from('yks_rankings').insert(preparedData)

      if (error) throw error
      return data
    })
  },

  // read yks ranking table
  async getYKSRanking(): Promise<YksRanking[]> {
    return apiRequestValidator.withServiceAuth(async (userId) => {
      const supabase = await supabaseServerClient()
      const { data, error } = await supabase
        .from('yks_rankings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    })
  },
}
