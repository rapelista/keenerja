import { initTRPC } from '@trpc/server';
import type { Context } from '../context';

const t = initTRPC.context<Context>().create({});

/**
 * Public procedure that does not require authentication
 * Anyone can call this procedure
 */
export const publicProcedure = t.procedure;

/**
 * Base router creator
 */
export const createTRPCRouter = t.router;

/**
 * Middleware that logs all requests
 */
const loggingMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();

  console.log(`🔄 tRPC: ${type} ${path} - started`);

  const result = await next();

  const durationMs = Date.now() - start;

  if (result.ok) {
    console.log(`✅ tRPC: ${type} ${path} - completed in ${durationMs}ms`);
  } else {
    console.log(`❌ tRPC: ${type} ${path} - failed in ${durationMs}ms`);
  }

  return result;
});

/**
 * Public procedure with logging
 */
export const publicProcedureWithLogging =
  publicProcedure.use(loggingMiddleware);
