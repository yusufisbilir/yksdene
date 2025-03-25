import Dashboard from '@/components/dashboard'
import { calculateExamTemplateStatistics } from '@/lib/supabase/actions/exam.actions'

export default async function Home() {
  const examTemplateStats = await calculateExamTemplateStatistics()

  return <Dashboard examTemplateStats={examTemplateStats} />
}
