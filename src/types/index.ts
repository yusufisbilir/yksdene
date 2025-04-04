import { Tables, TablesInsert, TablesUpdate } from './supabase.types'

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
