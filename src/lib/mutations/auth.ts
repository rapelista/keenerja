import { mutationOptions } from '@tanstack/react-query';
import { signOut } from '../auth';

export const authMutations = {
  signOut: () =>
    mutationOptions({
      mutationFn: async () => {
        await signOut();
      },
    }),
};
