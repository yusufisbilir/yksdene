'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES, RouteValue } from '@/constants/routes'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { UserMenu } from './UserMenu'
import { MobileUserMenu } from './MobileUserMenu'

const Header = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  const [isOpen, setIsOpen] = useState(false)

  const handleNavLinkClick = () => {
    setIsOpen(false)
  }

  const getRouteName = (route: RouteValue) => {
    switch (route) {
      case ROUTES.EXAMPRACTICE:
        return 'Deneme'
      case ROUTES.DAILYEXAMPRACTICE:
        return 'Günlük Deneme'
      case ROUTES.POMODORO:
        return 'Pomodoro'
      case ROUTES.NET_TAKIP:
        return 'Net Takip'
      case ROUTES.LOGIN:
        return 'Giriş'
      case ROUTES.HOME:
        return 'Anasayfa'
      default:
        // if route is not in ROUTES, this will throw an error
        const exhaustiveCheck: never = route
        return exhaustiveCheck
    }
  }

  const NavLinks = () => (
    <>
      {Object.entries(ROUTES)
        .filter(([key]) => key !== 'LOGIN')
        .map(([key, value]) => (
          <Link
            key={key}
            href={value}
            className={cn(isActive(value) ? 'header_nav_link_active' : 'header_nav_link_inactive')}
            onClick={handleNavLinkClick}
            suppressHydrationWarning
          >
            {getRouteName(value)}
          </Link>
        ))}
    </>
  )

  return (
    <header className="bg-white shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex justify-between h-16 items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 flex-shrink-0">
          YKS Dene
        </Link>
        {/* mobile nav */}
        <div className="lg:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 flex items-center justify-center"
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
              <DrawerFooter className="px-7">
                <MobileUserMenu />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        {/* Lg nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLinks />
          <div>
            <UserMenu />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
