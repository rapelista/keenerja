'use client';

import { mutationOptions } from '@tanstack/react-query';
import { signOut } from '../auth/client';

export const authMutations = {
  signOut: () =>
    mutationOptions({
      mutationFn: async () => {
        await signOut();
      },
    }),
};
