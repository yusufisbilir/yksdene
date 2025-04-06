import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for rate limiting
// In production, use Redis or another distributed cache
type RateLimitStore = {
  [key: string]: {
    count: number
    resetAt: number
  }
}

const store: RateLimitStore = {}

/**
 * Rate limiting service with sliding window algorithm
 */
export const rateLimiterService = {
  /**
   * Check if a request exceeds rate limits
   *
   * @param req The NextRequest object
   * @param limit Maximum number of requests in the window
   * @param windowMs Time window in milliseconds
   * @returns NextResponse if rate limit exceeded, undefined otherwise
   */
  async check(
    req: NextRequest,
    limit: number = 100,
    windowMs: number = 60 * 1000, // 1 minute default
  ): Promise<NextResponse | undefined> {
    // Get IP address as identifier from X-Forwarded-For header
    // or use a random ID if not available
    const forwardedFor = req.headers.get('x-forwarded-for')
    const identifier = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : 'unknown-' + Math.random().toString(36).substring(2, 15)
    const now = Date.now()

    // Create or get existing entry
    if (!store[identifier]) {
      store[identifier] = {
        count: 0,
        resetAt: now + windowMs,
      }
    }

    // Reset count if window has passed
    if (now > store[identifier].resetAt) {
      store[identifier].count = 0
      store[identifier].resetAt = now + windowMs
    }

    // Increment counter
    store[identifier].count++

    // Check if limit exceeded
    if (store[identifier].count > limit) {
      const retryAfter = Math.ceil((store[identifier].resetAt - now) / 1000)

      // Clean up old entries periodically to prevent memory leaks
      this._cleanup()

      return NextResponse.json(
        { error: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.' },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(store[identifier].resetAt / 1000).toString(),
          },
        },
      )
    }

    return undefined
  },

  /**
   * Clean up old entries to prevent memory leaks
   */
  _cleanup() {
    const now = Date.now()
    for (const ip in store) {
      if (now > store[ip].resetAt) {
        delete store[ip]
      }
    }
  },
}
