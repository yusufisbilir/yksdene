import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReduxProvider } from '@/providers/redux-provider'
import { ExamTimer } from '@/providers/exam-timer'
import { PomodoroTimer } from '@/providers/pomodoro-timer'
import { Toaster } from '@/components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { trTR } from '@clerk/localizations'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YKS Dene',
  description: 'YKS hazırlık sürecinizi etkili bir şekilde yönetin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={trTR}>
      <html lang="tr">
        <body className={`${inter.className} root_layout_container`}>
          <Analytics />
          <SpeedInsights />
          <ReduxProvider>
            <PomodoroTimer>
              <ExamTimer>
                <main className="main">
                  {/* Web */}
                  <Sidebar />
                  {/* Mobile */}
                  <Header />
                  <section className="root_layout_children_wrapper">{children}</section>
                </main>
                <Toaster />
              </ExamTimer>
            </PomodoroTimer>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
