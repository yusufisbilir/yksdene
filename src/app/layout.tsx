import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReduxProvider } from '@/providers/redux-provider'
import { ExamTimer } from '@/providers/exam-timer'
import { AuthProvider } from '@/providers/auth-provider'
import { PomodoroTimer } from '@/providers/pomodoro-timer'

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
    <html lang="tr">
      <body className={`${inter.className} root_layout_container`}>
        <Analytics />
        <SpeedInsights />
        <ReduxProvider>
          <AuthProvider>
            <PomodoroTimer>
              <ExamTimer>
                <Header />
                <main className="root_layout_children_wrapper">{children}</main>
              </ExamTimer>
            </PomodoroTimer>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
