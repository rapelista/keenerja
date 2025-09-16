'use client';

import { useQuery } from '@tanstack/react-query';
import { trpc } from '~/lib/trpc';

export function UsersTable() {
  const { data } = useQuery(trpc.users.queryOptions());

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
