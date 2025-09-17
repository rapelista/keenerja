'use client';

import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { authQueries } from '~/lib/queries/auth';

export function VerificationStatus() {
  const { data } = useQuery(authQueries.me());

  const isUnverified = data ? data.user.emailVerified : true;

  return !isUnverified ? (
    <Alert className="flex items-center justify-between">
      <div>
        <AlertTitle>Your email is not verified</AlertTitle>
        <AlertDescription className="flex justify-between">
          Please verify your email to unlock features.
        </AlertDescription>
      </div>

      <Button>Verify</Button>
    </Alert>
  ) : null;
}
