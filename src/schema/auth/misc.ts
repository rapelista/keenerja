import { z } from 'zod';

export const emailPasswordSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type EmailPassword = z.infer<typeof emailPasswordSchema>;
