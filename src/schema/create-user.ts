import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email format'),
  emailVerified: z.boolean().optional().default(false),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
