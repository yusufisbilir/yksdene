import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
      <body className={`${inter.className} min-h-screen bg-orange-50`}>
        <main className="container mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  )
}
