'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getRouteName, ROUTES } from '@/constants/routes'
import { UserMenu } from './UserMenu'

const Sidebar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <nav className="sidebar">
      <Link href="/" className="sidebar_brand">
        YKS Dene
      </Link>

      <div className="sidebar_links">
        {Object.entries(ROUTES)
          .filter(([key]) => key !== 'LOGIN')
          .map(([key, value]) => (
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
