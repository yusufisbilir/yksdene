'use server'

import { createClient } from '@/lib/supabase/server'
import {
  ExamAttempt,
  ExamAttemptInsert,
  ExamAttemptView,
  ExamAttemptWithResults,
  SubjectResultInsert,
} from '@/types/db.types'

// Exam Attempts
async function createExamAttempt(examAttempt: ExamAttemptInsert): Promise<ExamAttempt> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('exam_attempts').insert(examAttempt).select().single()

  if (error) throw error.message ?? 'Create exam attempt get error'
  return data
}

export async function createExamAttemptWithResults({
  examAttempt,
  subjectResults,
}: {
  examAttempt: ExamAttemptInsert
  subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
}): Promise<ExamAttemptWithResults> {
  const supabase = await createClient()

  // 1. Create exam attempt
  const examAttemptData = await createExamAttempt(examAttempt)

  // 2. Create subject results
  const subjectResultsToInsert = subjectResults.map((result) => ({
    ...result,
    exam_attempt_id: examAttemptData.id,
  }))

  const { data: subjectResultsData, error: subjectResultsError } = await supabase
    .from('subject_results')
    .insert(subjectResultsToInsert)
    .select()

  if (subjectResultsError) {
    // Rollback by deleting the exam attempt
    await supabase.from('exam_attempts').delete().eq('id', examAttemptData.id)
    throw subjectResultsError.message ?? 'Create subject results get error'
  }

  return {
    examAttempt: examAttemptData,
    subjectResults: subjectResultsData,
  }
}

export async function getExamAttemptViews(): Promise<ExamAttemptView[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('exam_attempt_view')
    .select('*')
    .order('attempt_date', { ascending: false })

  if (error) throw error.message ?? 'Get exam attempt views get error'
  return data
}

export async function deleteExamAttempt(id: string): Promise<ExamAttempt[] | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('exam_attempts').delete().eq('id', id)
  if (error) throw error.message ?? 'Delete exam attempt get error'

  return data
}
