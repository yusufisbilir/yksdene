import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { TimerProvider } from '@/context/timer-context'
import { Analytics } from '@vercel/analytics/react'
import { PomodoroProvider } from '@/context/pomodoro-context'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AuthProvider } from '@/context/auth-context'

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
        <AuthProvider>
          <TimerProvider>
            <PomodoroProvider>
              <Header />
              <main className="root_layout_children_wrapper">{children}</main>
            </PomodoroProvider>
          </TimerProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
