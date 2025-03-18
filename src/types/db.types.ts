import { Tables, TablesInsert, TablesUpdate } from './supabase.types'

type ExamTemplate = Tables<'exam_templates'>
type ExamAttempt = Tables<'exam_attempts'>
type SubjectResult = Tables<'subject_results'>
type Subject = Tables<'subjects'>
type ExamResult = Tables<'exam_results_view'>

type ExamAttemptInsert = TablesInsert<'exam_attempts'>
type SubjectResultInsert = TablesInsert<'subject_results'>
type ExamTemplateInsert = TablesInsert<'exam_templates'>
type SubjectInsert = TablesInsert<'subjects'>

type ExamTemplateUpdate = TablesUpdate<'exam_templates'>
type ExamAttemptUpdate = TablesUpdate<'exam_attempts'>
type SubjectResultUpdate = TablesUpdate<'subject_results'>
type SubjectUpdate = TablesUpdate<'subjects'>

type ExamStatistics = {
  total_attempts: number
  average_net_score: number
  best_attempt: {
    exam_name: string
    date: string
    net_score: number
  }
  subject_performance: Array<{
    subject_name: string
    average_net_score: number
    trend: 'up' | 'down' | 'stable'
  }>
}

type SubjectTrend = {
  subject_name: string
  data: Array<{
    date: string
    exam_attempt_id: string
    net_score: number
  }>
}

type ExamAttemptWithResults = {
  examAttempt: ExamAttempt
  subjectResults: SubjectResult[]
}

export type {
  ExamTemplate,
  ExamAttempt,
  SubjectResult,
  Subject,
  ExamResult,
  ExamAttemptInsert,
  SubjectResultInsert,
  ExamTemplateInsert,
  SubjectInsert,
  ExamTemplateUpdate,
  ExamAttemptUpdate,
  SubjectResultUpdate,
  SubjectUpdate,
  ExamStatistics,
  SubjectTrend,
  ExamAttemptWithResults,
}
