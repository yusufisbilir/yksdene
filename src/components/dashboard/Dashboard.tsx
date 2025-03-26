import { Card } from '@/components/ui/card'
import { calculateExamTemplateStatistics } from '@/lib/supabase/actions/exam.actions'
import StatisticsCards from './StatisticsCards'
import PerformanceTrends from './PerformanceTrends'
import QuestionAnalysis from './QuestionAnalysis'
import { EmptyDashboard } from './EmptyDashboard'

const Dashboard = async () => {
  const examTemplateStats = await calculateExamTemplateStatistics()
  const hasStats = Object.keys(examTemplateStats).length > 0

  if (!hasStats) {
    return <EmptyDashboard />
  }

  return (
    <Card className="container mx-auto p-6 space-y-6 my-6">
      <h1 className="text-3xl font-bold tracking-tight">Sınav Performans Paneli</h1>
      <StatisticsCards examTemplateStats={examTemplateStats} />
      <PerformanceTrends examTemplateStats={examTemplateStats} />
      <QuestionAnalysis examTemplateStats={examTemplateStats} />
    </Card>
  )
}

export default Dashboard
