import { initTRPC, TRPCError } from '@trpc/server';

import { headers } from 'next/headers';
import { auth } from '~/lib/auth';
import { Session } from '~/lib/auth/config';

interface Context {
  session: Session | null;
  headers: Headers;
}

const t = initTRPC.context<Context>().create({});

export const router = t.router;

/**
 * Public procedure that does not require authentication
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure that requires authentication
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: ctx.session,
      headers: ctx.headers,
    },
  });
});

/**
 * Create context for tRPC
 */
export async function createTRPCContext(): Promise<Context> {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  return {
    session,
    headers: headersList,
  };
}
