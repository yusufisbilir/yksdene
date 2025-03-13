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
import { useState } from 'react'

const Header = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  const [isOpen, setIsOpen] = useState(false)

  const handleNavLinkClick = () => {
    setIsOpen(false)
  }

  const NavLinks = () => (
    <>
      <Link
        href={ROUTES.EXAMPRACTICE}
        className={`${
          isActive(ROUTES.EXAMPRACTICE)
            ? 'text-orange-500 border-b-2 border-orange-500'
            : 'text-gray-500 hover:text-gray-900'
        } px-3 py-2 text-sm font-medium transition-colors`}
        onClick={handleNavLinkClick}
      >
        Deneme
      </Link>
      <Link
        href={ROUTES.POMODORO}
        className={`${
          isActive(ROUTES.POMODORO)
            ? 'text-orange-500 border-b-2 border-orange-500'
            : 'text-gray-500 hover:text-gray-900'
        } px-3 py-2 text-sm font-medium transition-colors`}
        onClick={handleNavLinkClick}
      >
        Pomodoro
      </Link>
      <Link
        href={ROUTES.DAILYEXAMPRACTICE}
        className={`text-gray-300 px-3 py-2 text-sm font-medium transition-colors cursor-not-allowed`}
        onClick={handleNavLinkClick}
      >
        Günlük Deneme (yakında)
      </Link>
    </>
  )

  return (
    <header className="bg-white shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 flex-shrink-0">
          YKS Dene
        </Link>
        {/* mobile nav */}
        <div className="sm:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-orange-500">YKS Dene</DrawerTitle>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="absolute right-4 top-4"
                      onClick={() => setIsOpen(false)}
                    >
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
