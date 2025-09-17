import z from 'zod';

export const signInEmailPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type SignInEmailPassword = z.infer<typeof signInEmailPasswordSchema>;
