import { NextResponse } from 'next/server'
import { ZodError, ZodSchema } from 'zod'
import { ValidationError } from './errors'

/**
 * Converts Zod validation errors to a standard format
 */
export function zodErrorHandler(error: ZodError) {
  return {
    success: false,
    message: 'Validation error',
    errors: error.format(),
  }
}

/**
 * Validates a request body with a Zod schema
 * @param body Request body
 * @param schema Zod schema
 * @returns Validated data or throws ValidationError
 */
export function validateBody<T>(body: unknown, schema: ZodSchema<T>) {
  const result = schema.safeParse(body)

  if (!result.success) {
    throw new ValidationError('Validation error')
  }

  return result.data
}

/**
 * Helper function for validation in HTTP APIs
 * @param body Request body
 * @param schema Zod schema
 * @returns NextResponse or validated data
 */
export function validateRequest<T>(
  body: unknown,
  schema: ZodSchema<T>,
): { response: NextResponse; data?: never } | { response?: never; data: T } {
  const result = schema.safeParse(body)

  if (!result.success) {
    return {
      response: NextResponse.json(zodErrorHandler(result.error), { status: 400 }),
    }
  }

  return { data: result.data }
}
