import { z } from 'zod';
import { createUserSchema } from '~/schema/users';
import { createTRPCRouter, protectedProcedure } from '../procedures';
import { UserService } from '../services';
import {
  paginationSchema,
  searchSchema,
  updateProfileSchema,
  userFilterSchema,
} from '../validators';

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

  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      return UserService.createUser(input);
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
