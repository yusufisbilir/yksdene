import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { TimerProvider } from '@/contexts/TimerContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YKStimer - YKS Deneme Takip',
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
        <TimerProvider>
          <Header />
          <main className="root_layout_children_wrapper">{children}</main>
        </TimerProvider>
      </body>
    </html>
  )
}
