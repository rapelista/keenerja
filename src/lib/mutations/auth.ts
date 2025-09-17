'use client';

import { mutationOptions } from '@tanstack/react-query';
import { SignInEmailPassword } from '~/schema/auth/sign-in';
import { SignUpEmailPassword } from '~/schema/auth/sign-up';
import { signIn, signOut, signUp } from '../auth/client';

export const authMutations = {
  signIn: {
    email: () =>
      mutationOptions({
        mutationFn: async (payload: SignInEmailPassword) => {
          const { error } = await signIn.email(payload);
          if (error) throw error;
        },
      }),
  },

  signUp: {
    email: () =>
      mutationOptions({
        mutationFn: async (payload: SignUpEmailPassword) => {
          const { error } = await signUp.email(payload);
          if (error) throw error;
        },
      }),
  },

  signOut: () =>
    mutationOptions({
      mutationFn: async () => {
        await signOut();
      },
    }),
};
