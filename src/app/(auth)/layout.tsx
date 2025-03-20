import { ROUTES } from '@/constants/routes'
import { getUser } from '@/lib/supabase/actions/user.actions'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser()

  if (!user) {
    return redirect(ROUTES.LOGIN)
  }

  return <>{children}</>
}

export default Layout
