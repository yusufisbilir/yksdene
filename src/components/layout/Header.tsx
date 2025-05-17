'use client'

import Link from 'next/link'
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
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { UserMenu } from './UserMenu'
import { getNavbarRoutes, getRouteName, ROUTES, RouteValue } from '@/constants/routes'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Header = () => {
  const pathname = usePathname()

  const isActive = (path: RouteValue) => {
    // Eğer path bir fonksiyon ise, doğrudan false döndür
    if (typeof path !== 'string') {
      return false
    }

    return pathname === path
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="header">
      <Link href="/" className="header_brand">
        YKS Dene
      </Link>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center text-gray-500"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
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
          <div className="px-4 header_links">
            {getNavbarRoutes().map(({ key, value }) => (
              <Link
                key={key}
                href={value}
                className={cn(
                  'header_link',
                  isActive(value) ? 'header_link_active' : 'header_link_inactive',
                )}
                suppressHydrationWarning
                onClick={() => setIsOpen(false)}
              >
                {getRouteName(value)}
              </Link>
            ))}
          </div>
          <DrawerFooter>
            <UserMenu />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  )
}

export default Header
