'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'

const Header = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  const NavLinks = () => (
    <>
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
    </>
  )

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 flex-shrink-0">
          YKS Timer
        </Link>
        {/* mobile nav */}
        <div className="sm:hidden">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-orange-500">YKS Timer</DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant="ghost" className="absolute right-4 top-4">
                      ✕
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <nav className="flex flex-col space-y-4 p-4">
                <NavLinks />
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
        {/* Lg nav */}
        <nav className="hidden sm:flex space-x-8">
          <NavLinks />
        </nav>
      </div>
    </header>
  )
}

export default Header
