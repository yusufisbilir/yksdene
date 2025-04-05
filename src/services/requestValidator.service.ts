import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { UnauthorizedError } from '@/utils/errors'
import { ZodSchema } from 'zod'
import { zodErrorHandler } from '@/utils/validationErrors'

// Types for API handlers
type ValidatedRequestHandler<T> = (
  req: NextRequest,
  userId: string,
  validatedData: T,
) => Promise<NextResponse>

type RequestHandler = (req: NextRequest, userId: string) => Promise<NextResponse>

// Types for service handlers
type ServiceWithAuthHandler<T> = (userId: string) => Promise<T>
type AdminServiceHandler<T> = () => Promise<T>

/**
 * Validates request with authentication and optional Zod schema
 */
export const apiRequestValidator = {
  /**
   * API-level: Validates authentication only
   */
  withAuth(request: NextRequest, handler: RequestHandler): Promise<NextResponse> {
    return this._processRequest(request, handler)
  },

  /**
   * API-level: Validates authentication and request body with Zod schema
   */
  withValidation<T>(
    request: NextRequest,
    schema: ZodSchema<T>,
    handler: ValidatedRequestHandler<T>,
  ): Promise<NextResponse> {
    return this._processRequest(request, async (req, userId) => {
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
    })
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
  async _processRequest(request: NextRequest, handler: RequestHandler): Promise<NextResponse> {
    try {
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
