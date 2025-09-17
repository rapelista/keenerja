import { TRPCError } from '@trpc/server';

/**
 * Custom error classes for better error handling
 */

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, identifier?: string) {
    super(
      `${resource}${identifier ? ` with id "${identifier}"` : ''} not found`,
    );
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden access') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/**
 * Convert custom errors to tRPC errors
 */
export function toTRPCError(error: unknown): TRPCError {
  if (error instanceof ValidationError) {
    return new TRPCError({
      code: 'BAD_REQUEST',
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return new TRPCError({
      code: 'NOT_FOUND',
      message: error.message,
    });
  }

  if (error instanceof ConflictError) {
    return new TRPCError({
      code: 'CONFLICT',
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return new TRPCError({
      code: 'UNAUTHORIZED',
      message: error.message,
    });
  }

  if (error instanceof ForbiddenError) {
    return new TRPCError({
      code: 'FORBIDDEN',
      message: error.message,
    });
  }

  // If it's already a TRPCError, return as-is
  if (error instanceof TRPCError) {
    return error;
  }

  // For unknown errors, return internal server error
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  });
}
