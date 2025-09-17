import { z } from 'zod';
import { emailPasswordSchema } from './misc';

export const signUpEmailPasswordSchema = emailPasswordSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type SignUpEmailPassword = z.infer<typeof signUpEmailPasswordSchema>;
