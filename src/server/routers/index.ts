import { createTRPCRouter } from '../procedures';
import { generalRouter } from './general';
import { userRouter } from './users';

/**
 * Main tRPC router
 * Combines all sub-routers into a single router
 */
export const appRouter = createTRPCRouter({
  // General/public routes
  general: generalRouter,

  // User-related routes
  users: userRouter,

  // Legacy routes for backward compatibility (temporary)
  greeting: generalRouter.greeting,
  profile: userRouter.profile,
  updateProfile: userRouter.updateProfile,
});

export type AppRouter = typeof appRouter;
