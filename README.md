# YKS Dene - Enterprise-Grade Exam Preparation Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=flat-square&logo=vercel)](https://vercel.com/)

[yksdene.com](https://yksdene.com)

## Project Summary

**YKS Dene** is a comprehensive performance monitoring and analysis platform built on the Next.js 15 App Router architecture, developed for students preparing for university entrance exams. This application aims to increase exam success by detecting deficiencies in students' study processes with a data-driven approach and offering personalized solutions.

## Technical Architecture

### Server-Side Rendering (SSR) Approach

I positioned Next.js App Router's SSR/RSC (React Server Components) structure at the center of the project. This choice provides:

- **SEO Optimization**: Pages searchable by search engines as static content
- **Initial Load Performance**: Lower TTFB (Time To First Byte) and LCP (Largest Contentful Paint) times
- **Security Advantage**: Sensitive operations performed on the server side

To support the SSR approach, I integrated the Supabase SSR module. I optimized the balance between client-side state and server-side data fetching using React Query.

### Project Structure

```
src/
├── app/            # Next.js App Router routes and page components
├── components/     # UI components organized with atomic design principles
├── contexts/       # React contexts accessible throughout the application
├── features/       # Domain-driven modules for functional features
├── hooks/          # Custom React hooks
├── lib/            # Third-party library configurations
├── providers/      # Application providers
├── services/       # Connection services to external APIs and data sources
├── store/          # Redux Toolkit based state management
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

The project's code architecture is based on domain-driven design and separation of concerns principles. Keeping related code parts in the same folder and modular organization significantly increases code maintenance and extensibility.

### State Management Strategy

While preferring Redux Toolkit for central state management, I used React's own Context API for more local and UI-focused states. This hybrid approach:

- **Performance**: Minimizes unnecessary renders
- **Developer Experience**: Speeds up debug processes with Redux DevTools
- **Maintenance**: Ensures related states are encapsulated at the correct levels

API calls made with RTK Query improve user experience by providing automatic cache management and optimistic updates.

## Security and Authorization

### Auth Architecture

Industry standard Clerk is used for authentication. This choice provides:

- **JWTs & Session Management**: Modern and secure authentication
- **Multi-tenancy**: Role-based access controls for different user types
- **Social Login Integration**: OAuth 2.0 supported social media logins

### Route Protection and Access Controls

```typescript
// src/middleware.ts
// Using Next.js Middleware for Route protection
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
```

This middleware manages user authentication and authorization from a central point. This prevents code duplication and ensures security policies are applied consistently.

### API Security

- **CORS Configuration**: Restricted access for whitelisted origins
- **HTTP-only Cookies**: Protection against XSS attacks
- **Content Security Policy**: Blocking inline scripts and style injections

## Rate Limiting and Protection Mechanisms

A rate limiting system developed using Edge Middleware includes the following protection layers:

- **IP Based Throttling**: Limiting excessive number of requests from the same IP address
- **API Endpoint Protection**: Special limit definitions for sensitive endpoints
- **Token Bucket Algorithm**: For fair and flexible rate limiting

This approach provides protection against DDoS attacks while not affecting normal user behaviors.

## Performance Optimizations

### Static/Dynamic Balancing

With hybrid rendering offered by Next.js:

- **Static Pages**: Content that rarely changes is cached with ISR (Incremental Static Regeneration)
- **Dynamic Pages**: SSR is used for personalized content
- **Route Segment Config**: Optimum rendering strategy for each page

### Frontend Optimizations

- **Component Lazy Loading**: React.lazy and dynamic imports for large components
- **Image Optimization**: Automatic WebP/AVIF formats and responsive image serving with next/image
- **Bundle Size Management**: Bundle content monitor with webpack-bundle-analyzer

### Data Access Strategies

- **SWR Patterns**: Up-to-date data and fast UI with Stale-while-revalidate approach
- **Pagination and Windowing**: Efficient display techniques for large data sets
- **Prefetching**: Pre-loading data for possible user paths

## Technologies Used

### Frontend Core

- **Next.js 15**: Modern React architecture with App Router
- **TypeScript**: End-to-end type safety
- **Tailwind CSS**: Low bundle size with Utility-first and JIT compiler
- **Radix UI**: Accessible and fully customizable component primitives

### State and Data Management

- **Redux Toolkit**: Typed and immutable global state
- **Zod**: Runtime type validation
- **React Hook Form**: Performance-focused form management
- **Recharts**: SVG-based, responsive data visualization

### DevOps and Infrastructure

- **Vercel**: Edge Network CDN and automatic deployment
- **Vercel Analytics & Speed Insights**: Real user metrics
- **Supabase**: PostgreSQL database and Serverless functions
