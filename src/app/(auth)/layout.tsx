import { SignedIn, SignedOut } from '@clerk/nextjs'
import { ROUTES } from '@/constants/routes' // routes sabitlerinizin olduğu dosyayı import edin
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>{redirect(ROUTES.LOGIN)}</SignedOut>
    </>
  )
}

export default Layout
