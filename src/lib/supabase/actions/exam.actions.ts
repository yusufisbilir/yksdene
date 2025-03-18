'use server'

import { createClient } from '@/lib/supabase/server'
import { ExamTemplate, Subject } from '@/types/db.types'

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
    throw new Error(error instanceof Error ? error.message : 'select exam_templates get error')
  }
}

export async function getSubjects(examTemplateId: string): Promise<Subject[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('exam_template_id', examTemplateId)
      .order('display_order')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Server API Error:', error)
    throw new Error(error instanceof Error ? error.message : 'select subjects get error')
  }
}
