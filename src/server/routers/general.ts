import { publicProcedure, createTRPCRouter } from '../procedures';

/**
 * General/public router - handles public procedures and health checks
 */
export const generalRouter = createTRPCRouter({
  // Health check / greeting (public)
  greeting: publicProcedure.query(() => {
    return {
      message: 'Hello from tRPC v11!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }),

  // Server health check (public)
  health: publicProcedure.query(() => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }),
});
