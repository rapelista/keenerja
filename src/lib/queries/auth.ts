import { queryOptions } from '@tanstack/react-query';
import { getSession } from '~/lib/auth/client';

export const authQueries = {
  me: () =>
    queryOptions({
      queryKey: ['AUTH_ME'],
      queryFn: async () => {
        const { data, error } = await getSession();
        if (error) throw error;
        return data;
      },
    }),

  organizations: () => ({
    queryKey: ['AUTH_ME_ORGANIZATIONS'],
    queryFn: async () => {
      return {
        data: [
          {
            name: 'Acme Inc',
            plan: 'Enterprise',
          },
          {
            name: 'Acme Corp.',
            plan: 'Startup',
          },
          {
            name: 'Evil Corp.',
            plan: 'Free',
          },
        ],
      };
    },
  }),
};
