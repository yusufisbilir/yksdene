'use server'

import { createClient } from '@/lib/supabase/server'
import { ExamTemplate } from '@/types/db.types'

export async function getExamTemplates(): Promise<ExamTemplate[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('exam_templates')
      .select('*')
      .order('category')
      .order('name')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Server API Error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.',
    )
  }
}
