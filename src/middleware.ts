import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ROUTES } from './constants/routes'

const isPublicRoute = createRouteMatcher(['/api/webhooks(.*)', '/sign-in(.*)', '/sign-up(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  const { userId } = await auth()

  // Protect admin routes
  if (isAdminRoute(req)) {
    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      const homeURL = new URL(ROUTES.HOME, req.url)
      return NextResponse.redirect(homeURL)
    }
  }

  // Protect API routes
  if (req.nextUrl.pathname.startsWith('/api/') && !userId && !isPublicRoute(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/(api|trpc)(.*)'],
}
