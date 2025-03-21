'use server'

import {
  ExamAttempt,
  ExamAttemptInsert,
  ExamAttemptView,
  ExamAttemptWithResults,
  SubjectResultInsert,
} from '@/types/db.types'
import { createClerkSupabaseClientSsr } from '../server'

// Exam Attempts
async function createExamAttempt(examAttempt: ExamAttemptInsert): Promise<ExamAttempt> {
  const client = await createClerkSupabaseClientSsr()
  const { data, error } = await client.from('exam_attempts').insert(examAttempt).select().single()

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
  const client = await createClerkSupabaseClientSsr()
  // 1. Create exam attempt
  const examAttemptData = await createExamAttempt(examAttempt)

  // 2. Create subject results
  const subjectResultsToInsert = subjectResults.map((result) => ({
    ...result,
    exam_attempt_id: examAttemptData.id,
  }))

  const { data: subjectResultsData, error: subjectResultsError } = await client
    .from('subject_results')
    .insert(subjectResultsToInsert)
    .select()

  if (subjectResultsError) {
    // Rollback by deleting the exam attempt
    await client.from('exam_attempts').delete().eq('id', examAttemptData.id)
    throw subjectResultsError.message ?? 'Create subject results get error'
  }

  return {
    examAttempt: examAttemptData,
    subjectResults: subjectResultsData,
  }
}

export async function getExamAttemptViews(): Promise<ExamAttemptView[]> {
  const client = await createClerkSupabaseClientSsr()
  const { data, error } = await client
    .from('exam_attempt_view')
    .select('*')
    .order('attempt_date', { ascending: false })

  if (error) throw error.message ?? 'Get exam attempt views get error'
  return data
}

export async function deleteExamAttempt(id: string): Promise<ExamAttempt[] | null> {
  const client = await createClerkSupabaseClientSsr()
  const { data, error } = await client.from('exam_attempts').delete().eq('id', id)
  if (error) throw error.message ?? 'Delete exam attempt get error'

  return data
}
