import { headers } from 'next/headers';
import { auth } from '~/lib/auth';
import { Session } from '~/lib/auth/config';

export interface Context {
  session: Session | null;
  headers: Headers;
}

/**
 * Create context for tRPC
 * This function is called for every tRPC request
 */
export async function createTRPCContext(): Promise<Context> {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  return {
    session,
    headers: headersList,
  };
}
