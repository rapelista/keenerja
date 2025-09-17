import { protectedProcedure, createTRPCRouter } from '../procedures';
import { UserService } from '../services';
import {
  updateProfileSchema,
  paginationSchema,
  userFilterSchema,
  searchSchema,
} from '../validators';
import { z } from 'zod';

/**
 * User router - handles all user-related procedures
 */
export const userRouter = createTRPCRouter({
  // Get paginated list of users (protected)
  list: protectedProcedure
    .input(
      z
        .object({
          ...paginationSchema.shape,
          ...userFilterSchema.shape,
          ...searchSchema.shape,
        })
        .partial(),
    )
    .query(async ({ input }) => {
      return UserService.getUsers(input);
    }),

  // Get current user profile (protected)
  profile: protectedProcedure.query(async ({ ctx }) => {
    return UserService.getUserById(ctx.session.user.id);
  }),

  // Get user by ID (protected)
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, 'User ID is required'),
      }),
    )
    .query(async ({ input }) => {
      return UserService.getUserById(input.id);
    }),

  // Update current user profile (protected)
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      return UserService.updateProfile(ctx.session.user.id, input);
    }),

  // Delete user (protected - admin only in future)
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, 'User ID is required'),
      }),
    )
    .mutation(async ({ input }) => {
      return UserService.deleteUser(input.id);
    }),
});
