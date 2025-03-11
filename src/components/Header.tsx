'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

const Header = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 flex-shrink-0">
          YKS Timer
        </Link>
        <nav className="hidden sm:flex space-x-8">
          <Link
            href={ROUTES.EXAMPRACTICE}
            className={`${
              isActive(ROUTES.EXAMPRACTICE)
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-900'
            } px-3 py-2 text-sm font-medium transition-colors`}
          >
            Deneme
          </Link>
          <Link
            href={ROUTES.DAILYEXAMPRACTICE}
            className={`${
              isActive(ROUTES.DAILYEXAMPRACTICE)
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-900'
            } px-3 py-2 text-sm font-medium transition-colors`}
          >
            Günlük Deneme
          </Link>
          <Link
            href={ROUTES.TIMER}
            className={`${
              isActive(ROUTES.TIMER)
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-900'
            } px-3 py-2 text-sm font-medium transition-colors`}
          >
            Sayaç
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
