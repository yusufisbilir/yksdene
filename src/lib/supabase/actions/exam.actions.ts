'use server'

import { createClient } from '@/lib/supabase/server'
import {
  ExamAttempt,
  ExamAttemptInsert,
  ExamAttemptView,
  ExamAttemptWithResults,
  ExamTemplate,
  Subject,
  SubjectResultInsert,
} from '@/types/db.types'

async function createExamAttempt(examAttempt: ExamAttemptInsert): Promise<ExamAttempt> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('exam_attempts')
      .insert(examAttempt)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Server API Error:', error)
    throw new Error(error instanceof Error ? error.message : 'create exam attempt get error')
  }
}

export async function createExamAttemptWithResults({
  examAttempt,
  subjectResults,
}: {
  examAttempt: ExamAttemptInsert
  subjectResults: Omit<SubjectResultInsert, 'exam_attempt_id'>[]
}): Promise<ExamAttemptWithResults> {
  try {
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
      throw subjectResultsError
    }

    return {
      examAttempt: examAttemptData,
      subjectResults: subjectResultsData,
    }
  } catch (error) {
    console.error('Server API Error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'create exam attempt with results error',
    )
  }
}

export async function getExamAttemptViews(): Promise<ExamAttemptView[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('exam_attempt_view')
      .select('*')
      .order('attempt_date', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Server API Error:', error)
    throw new Error(error instanceof Error ? error.message : 'get exam attempt views error')
  }
}
