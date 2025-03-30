import { SuspenseProvider } from '@/components/shared/SuspenseProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SuspenseProvider>{children}</SuspenseProvider>
}
