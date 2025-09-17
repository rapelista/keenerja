import { z } from 'zod';
import { emailPasswordSchema } from './misc';

export const signInEmailPasswordSchema = emailPasswordSchema;

export type SignInEmailPassword = z.infer<typeof signInEmailPasswordSchema>;
