import { TYT_COEFFICENTS_2024 } from '@/constants/examPoints'
import { BASE_POINTS_2024 } from '@/constants/examPoints'

interface CalculateTYTScoresParams {
  turkishNet: number
  mathNet: number
  scienceNet: number
  socialStudiesNet: number
  grade: number
  isGraduated: boolean // Applies a coefficient if the student is a graduate
}

export function calculateTYTScores(params: CalculateTYTScoresParams): {
  rawScore: number
  placementScore: number
} {
  const { turkishNet, mathNet, scienceNet, socialStudiesNet, grade, isGraduated } = params

  // Graduation coefficient (0.5 for graduates, 1 for current-year students)
  const graduationCoefficient = isGraduated ? 0.5 : 1

  // Diploma grade contribution (0.6 × diplomaGrade × coefficient)
  const diplomaContribution = 0.6 * grade * graduationCoefficient

  // 2024 TYT Raw Score Calculation (formula from official sources)
  const rawScore =
    BASE_POINTS_2024.TYT +
    TYT_COEFFICENTS_2024.TURKCE * turkishNet +
    TYT_COEFFICENTS_2024.SOSYAL * socialStudiesNet +
    TYT_COEFFICENTS_2024.MATEMATIK * mathNet +
    TYT_COEFFICENTS_2024.FEN * scienceNet

  // Final placement score (raw score + diploma contribution)
  const placementScore = rawScore + diplomaContribution

  return {
    rawScore: parseFloat(rawScore.toFixed(3)), // Rounds to 3 decimal places
    placementScore: parseFloat(placementScore.toFixed(3)),
  }
}
