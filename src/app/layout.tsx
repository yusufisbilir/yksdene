import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReduxProvider } from '@/providers/ReduxProvider'
import { ExamTimerProvider } from '@/providers/ExamTimerProvider'
import { PomodoroTimerProvider } from '@/providers/PomodoroTimerProvider'
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
          {process.env.NODE_ENV === 'production' && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
          <ReduxProvider>
            <PomodoroTimerProvider>
              <ExamTimerProvider>
                <main className="main">
                  {/* Web */}
                  <Sidebar />
                  {/* Mobile */}
                  <Header />
                  <section className="root_layout_children_wrapper">{children}</section>
                </main>
                <Toaster />
              </ExamTimerProvider>
            </PomodoroTimerProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
