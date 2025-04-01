import StatisticsCards from './StatisticsCards'
import PerformanceTrends from './PerformanceTrends'
import QuestionAnalysis from './QuestionAnalysis'
import { EmptyDashboard } from './EmptyDashboard'
import { examAttemptStatisticsService } from '@/services/exam_attempt_statistics.service'
import { ExamResultsList } from '../denemelerim/ExamResultsList'

const Dashboard = async () => {
  const examTemplateStats = await examAttemptStatisticsService.getExamAttemptStatistics()
  const hasStats = Object.keys(examTemplateStats).length > 0

  if (!hasStats) {
    return <EmptyDashboard />
  }

  return (
    <article className="space-y-4 panel">
      <h1 className="text-3xl font-bold tracking-tight">👑 Başarı Tablosu</h1>
      <ExamResultsList />
      <StatisticsCards examTemplateStats={examTemplateStats} />
      <PerformanceTrends examTemplateStats={examTemplateStats} />
      <QuestionAnalysis examTemplateStats={examTemplateStats} />
    </article>
  )
}

export default Dashboard
