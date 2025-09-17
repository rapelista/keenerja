import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '~/db/drizzle';
import { schema } from '~/db/schemas';
import { sendEmail } from '~/lib/email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set('callbackURL', '/dashboard');

      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  },

  plugins: [nextCookies()],

  secret: process.env.AUTH_SECRET,
});

export type Session = typeof auth.$Infer.Session;
