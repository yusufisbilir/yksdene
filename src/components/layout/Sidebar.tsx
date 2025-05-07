'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getNavbarRoutes, getRouteName, RouteValue } from '@/constants/routes'
import { UserMenu } from './UserMenu'

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path: RouteValue) => {
    // Eğer path bir fonksiyon ise, doğrudan false döndür
    if (typeof path !== 'string') {
      return false
    }

    // String path kontrolleri
    if (path === '/') {
      return pathname === '/'
    }
    if (path === '/denemelerim') {
      return pathname === '/denemelerim' || pathname.startsWith('/denemelerim?')
    }
    if (path === '/deneme') {
      return pathname === '/deneme' || pathname.startsWith('/deneme/')
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className="sidebar">
      <Link href="/" className="sidebar_brand">
        YKS Dene
      </Link>

      <div className="sidebar_links">
        {getNavbarRoutes().map(({ key, value }) => (
          <Link
            key={key}
            href={value}
            className={cn(
              'sidebar_link',
              isActive(value) ? 'sidebar_link_active' : 'sidebar_link_inactive',
            )}
            suppressHydrationWarning
          >
            {getRouteName(value)}
          </Link>
        ))}
      </div>

      <UserMenu />
    </nav>
  )
}

export default Sidebar
