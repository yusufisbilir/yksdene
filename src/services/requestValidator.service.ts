import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { UnauthorizedError } from '@/utils/errors'
import { ZodError, ZodSchema } from 'zod'
import { rateLimiterService } from './rateLimiter'

function zodErrorHandler(error: ZodError) {
  return {
    success: false,
    message: 'Validation error',
    errors: error.format(),
  }
}

// Types for API handlers
type ValidatedRequestHandler<T> = (
  req: NextRequest,
  userId: string,
  validatedData: T,
) => Promise<NextResponse>

type RequestHandler = (req: NextRequest, userId: string) => Promise<NextResponse>

// Rate limit settings
type RateLimitOptions = {
  limit?: number
  windowMs?: number
  skipRateLimit?: boolean
}

// Default rate limit settings
const DEFAULT_RATE_LIMIT_OPTIONS: Required<RateLimitOptions> = {
  limit: 100, // 100 requests
  windowMs: 60 * 1000, // per minute
  skipRateLimit: false, // Rate limiting enabled by default
}

// Types for service handlers
type ServiceWithAuthHandler<T> = (userId: string) => Promise<T>
type AdminServiceHandler<T> = () => Promise<T>

/**
 * Validates request with authentication and optional Zod schema
 */
export const apiRequestValidator = {
  /**
   * API-level: Validates authentication only with optional rate limiting
   */
  withAuth(
    request: NextRequest,
    handler: RequestHandler,
    options: RateLimitOptions = {},
  ): Promise<NextResponse> {
    return this._processRequest(request, handler, options)
  },

  /**
   * API-level: Validates authentication and request body with Zod schema and optional rate limiting
   */
  withValidation<T>(
    request: NextRequest,
    schema: ZodSchema<T>,
    handler: ValidatedRequestHandler<T>,
    options: RateLimitOptions = {},
  ): Promise<NextResponse> {
    return this._processRequest(
      request,
      async (req, userId) => {
        try {
          const body = await req.json()
          const result = schema.safeParse(body)

          if (!result.success) {
            return NextResponse.json(zodErrorHandler(result.error), { status: 400 })
          }

          return await handler(req, userId, result.data)
        } catch (error) {
          console.error('API Validation Error:', error)
          return NextResponse.json({ error: 'İstek işlenirken hata oluştu' }, { status: 400 })
        }
      },
      options,
    )
  },

  /**
   * Service-level: Validates authentication for service methods
   */
  withServiceAuth<T>(handler: ServiceWithAuthHandler<T>): Promise<T> {
    return this._processServiceRequest(handler)
  },

  /**
   * Service-level: Validates admin authentication for admin service methods
   */
  withAdminAuth<T>(handler: AdminServiceHandler<T>): Promise<T> {
    return this._processAdminRequest(handler)
  },

  /**
   * Internal method to process API requests
   */
  async _processRequest(
    request: NextRequest,
    handler: RequestHandler,
    options: RateLimitOptions = {},
  ): Promise<NextResponse> {
    try {
      // Merge with default options
      const rateLimitOptions = { ...DEFAULT_RATE_LIMIT_OPTIONS, ...options }

      // Check rate limits if not skipped
      if (!rateLimitOptions.skipRateLimit) {
        const rateLimitResponse = await rateLimiterService.check(
          request,
          rateLimitOptions.limit,
          rateLimitOptions.windowMs,
        )

        // Return rate limit exceeded response if available
        if (rateLimitResponse) {
          return rateLimitResponse
        }
      }

      // Get authenticated user id
      const { userId } = await auth()

      // If no userId, throw unauthorized error
      if (!userId) {
        throw new UnauthorizedError('Yetkisiz erişim')
      }

      // Call the handler with request and userId
      return await handler(request, userId.toString())
    } catch (error) {
      console.error('API Auth Middleware Error:', error)

      if (error instanceof UnauthorizedError) {
        return NextResponse.json({ error: error.message }, { status: 401 })
      }

      return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
  },

  /**
   * Internal method to process service requests
   */
  async _processServiceRequest<T>(handler: ServiceWithAuthHandler<T>): Promise<T> {
    // Get authenticated user id
    const { userId } = await auth()

    // If no userId, throw unauthorized error
    if (!userId) {
      throw new UnauthorizedError('Yetkisiz erişim')
    }

    // Call the handler with userId
    return await handler(userId.toString())
  },

  /**
   * Internal method to process admin service requests
   */
  async _processAdminRequest<T>(handler: AdminServiceHandler<T>): Promise<T> {
    // Get authenticated user id
    const { userId } = await auth()

    // If no userId, throw unauthorized error
    if (!userId) {
      throw new UnauthorizedError('Yetkisiz erişim')
    }

    // Check if user is admin
    if (userId !== process.env.ADMIN_USER_ID) {
      throw new UnauthorizedError('Yönetici yetkisi gerekli')
    }

    // Call the handler
    return await handler()
  },
}
