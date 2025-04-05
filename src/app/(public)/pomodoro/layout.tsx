import { SuspenseProvider } from '@/components/shared/SuspenseProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseProvider>
      <article className="centered_panel">{children}</article>
    </SuspenseProvider>
  )
}
