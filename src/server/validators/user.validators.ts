import { z } from 'zod';

/**
 * User-related input validation schemas
 */

// User profile update
export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.email('Invalid email format').optional(),
  image: z.url('Invalid image URL').optional(),
});

// User creation (for admin)
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.email('Invalid email format'),
  emailVerified: z.boolean(),
  image: z.url('Invalid image URL').or(z.literal('')),
});

// User filter/search`
export const userFilterSchema = z.object({
  search: z.string().optional(),
  emailVerified: z.boolean().optional(),
  createdAfter: z.iso.datetime().optional(),
  createdBefore: z.iso.datetime().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserFilterInput = z.infer<typeof userFilterSchema>;
