import { z } from 'zod'

export const examFormSchema = z.object({
  examTemplate: z.string().min(1, 'Deneme türü seçiniz'),
  examName: z.string().min(1, 'Deneme adı gereklidir'),
  examDate: z.string().min(1, 'Tarih seçiniz'),
  subjectResults: z.array(
    z.object({
      subject_id: z.string(),
      correct_count: z.number().min(0, "0'dan küçük olamaz"),
      incorrect_count: z.number().min(0, "0'dan küçük olamaz"),
    }),
  ),
})

export type ExamFormValues = z.infer<typeof examFormSchema>

export interface ExamTemplate {
  id: string
  name: string
}

export interface Subject {
  id: string
  name: string
  question_count: number
}

export interface ExamAttemptView {
  attempt_id: string | null
  attempt_name: string | null
  attempt_date: string | null
  total_correct: number | null
  total_incorrect: number | null
  total_blank: number | null
  net_score: number | null
}
