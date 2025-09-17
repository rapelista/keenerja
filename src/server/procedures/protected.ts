import { TRPCError } from '@trpc/server';
import { publicProcedure, createTRPCRouter } from './public';

/**
 * Protected procedure that requires authentication
 * Throws UNAUTHORIZED error if user is not authenticated
 */
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      session: ctx.session,
      headers: ctx.headers,
    },
  });
});

/**
 * Re-export router creator for convenience
 */
export { createTRPCRouter };
