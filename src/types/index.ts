import { z } from 'zod'
import { Enums, Tables, TablesInsert, TablesUpdate } from './supabase.types'

// Exam Attempts
export type ExamAttempt = Tables<'exam_attempts'>
export type ExamAttemptInsert = TablesInsert<'exam_attempts'>
export type ExamAttemptUpdate = TablesUpdate<'exam_attempts'>
export type ExamAttemptView = Tables<'exam_attempt_view'>

// Exam Templates
export type ExamTemplate = Tables<'exam_templates'>
export type ExamTemplateInsert = TablesInsert<'exam_templates'>
export type ExamTemplateUpdate = TablesUpdate<'exam_templates'>

// Profiles
export type Profile = Tables<'profiles'>
export type ProfileInsert = TablesInsert<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>

// Subjects
export type Subject = Tables<'subjects'>
export type SubjectInsert = TablesInsert<'subjects'>
export type SubjectUpdate = TablesUpdate<'subjects'>

// Subject Results
export type SubjectResult = Tables<'subject_results'>
export type SubjectResultInsert = TablesInsert<'subject_results'>
export type SubjectResultUpdate = TablesUpdate<'subject_results'>

// YKS Rankings
export type YksRanking = Tables<'yks_rankings'>
export type YksRankingInsert = TablesInsert<'yks_rankings'>
export type YksRankingUpdate = TablesUpdate<'yks_rankings'>

export type ProfilesUniversityProgramView = Tables<'profiles_university_programs_view'>

export type YksRankingInsertWithoutId = Omit<YksRankingInsert, 'id'>

export type UniversityProgram = Tables<'university_programs'>

// Leaderboard
export type LeaderBoard = Tables<'leaderboard_view'>

// Exam category
export type ExamCategory = Enums<'exam_category'>

export const Exam = {
  tyt: 'tyt',
  ayt: 'ayt',
} as const

export type Exam = (typeof Exam)[keyof typeof Exam]

export interface ClockRotations {
  updateSeconds: { transform: string }
  updateMinutes: { transform: string }
  updateHours: { transform: string }
}

// Statistics
export type ExamCategoryStatistics = {
  [key in ExamTemplate['id']]: {
    totalAttempts: number
    totalNetScore: number
    averageNetScore: number
    performanceTrend: {
      date: string
      net_score: number
      correct: number
      incorrect: number
      blank: number
    }[]
  }
}

export const updateProfileSchema = z.object({
  obp: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), { message: 'OBP geçerli bir sayı olmalıdır' })
    .refine((val) => parseFloat(val) >= 50 && parseFloat(val) <= 100, {
      message: 'OBP 50-100 arasında olmalıdır',
    }),
  graduated: z.boolean().default(false),
  university_program: z.string().optional(),
})

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>

export interface LastExamResults {
  TYT?: ExamAttemptView & { subjectResults: SubjectResult[] }
  AYT_Sayisal?: ExamAttemptView & { subjectResults: SubjectResult[] }
  AYT_EsitAgirlik?: ExamAttemptView & { subjectResults: SubjectResult[] }
  AYT_Sozel?: ExamAttemptView & { subjectResults: SubjectResult[] }
  TYT_id?: string
  AYT_id?: string
}

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

interface Ranking {
  ham: number
  ham_sir: number
  yer: number
  yer_sir: number
}

export interface YKSRankingTable {
  tyt: Ranking
  say: Ranking
  ea: Ranking
  soz: Ranking
}
