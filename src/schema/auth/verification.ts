import { z } from 'zod';
import { emailPasswordSchema } from './misc';

export const verificationEmailSchema = emailPasswordSchema.pick({
  email: true,
});

export type VerificationEmail = z.infer<typeof verificationEmailSchema>;
