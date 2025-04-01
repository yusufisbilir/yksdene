import { z } from 'zod'

export const deleteExamAttemptSchema = z.object({
  id: z.string().uuid().min(1, 'ID is required'),
})

export const createExamAttemptSchema = z.object({
  examAttempt: z.object({
    exam_template_id: z.string().min(1, 'Template ID is required'),
    name: z.string().min(1, 'Exam name is required'),
    date: z.string().min(1, 'Date is required'),
    user_id: z.string().optional(),
  }),
  subjectResults: z
    .array(
      z.object({
        subject_id: z.string().min(1, 'Subject ID is required'),
        correct_count: z.number().min(0, "Correct count can't be less than 0"),
        incorrect_count: z.number().min(0, "Incorrect count can't be less than 0"),
        blank_count: z.number().min(0, "Blank count can't be less than 0").optional(),
      }),
    )
    .min(1, 'At least one subject result is required'),
})

export type DeleteExamAttemptInput = z.infer<typeof deleteExamAttemptSchema>
export type CreateExamAttemptInput = z.infer<typeof createExamAttemptSchema>
