import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.email('Invalid email format'),
  emailVerified: z.boolean(),
  image: z.url('Invalid image URL').or(z.literal('')),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
