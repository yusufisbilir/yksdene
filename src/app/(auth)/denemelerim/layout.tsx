import { SuspenseProvider } from '@/components/shared/SuspenseProvider'
import { ExamAttemptContextProvider } from '@/contexts/ExamAttemptContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseProvider>
      <ExamAttemptContextProvider>{children}</ExamAttemptContextProvider>
    </SuspenseProvider>
  )
}
