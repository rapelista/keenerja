'use client';

import { mutationOptions } from '@tanstack/react-query';
import { SignInEmailPassword } from '~/schema/sign-in';
import { signIn, signOut } from '../auth/client';

export const authMutations = {
  signOut: () =>
    mutationOptions({
      mutationFn: async () => {
        await signOut();
      },
    }),

  signIn: {
    email: () =>
      mutationOptions({
        mutationFn: async (payload: SignInEmailPassword) => {
          const { error } = await signIn.email(payload);
          if (error) throw error;
        },
      }),
  },
};
