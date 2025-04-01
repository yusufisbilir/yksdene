import { subjects } from '@/constants/db.constants'

export const calculateExamResults = (
  subjectResults: {
    subject_id: string
    correct_count: number
    incorrect_count: number
  }[],
) => {
  return subjectResults.reduce(
    (acc, subject) => {
      const subjectTemplate = subjects?.find((s) => s.id === subject.subject_id)
      const questionCount = subjectTemplate?.question_count || 0
      return {
        correct: acc.correct + subject.correct_count,
        incorrect: acc.incorrect + subject.incorrect_count,
        blank: acc.blank + (questionCount - subject.correct_count - subject.incorrect_count),
        net: acc.net + (subject.correct_count - subject.incorrect_count * 0.25),
      }
    },
    { correct: 0, incorrect: 0, blank: 0, net: 0 },
  )
}
