import { currentUser } from '@clerk/nextjs/server'
import { ROUTES } from '@/constants/routes'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()

  if (!user) {
    redirect(ROUTES.HOME)
  }

  return <>{children}</>
}

export default Layout
