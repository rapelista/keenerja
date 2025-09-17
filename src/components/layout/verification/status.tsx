'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { authMutations } from '~/lib/mutations/auth';
import { authQueries } from '~/lib/queries/auth';

export function VerificationStatus() {
  const { data } = useQuery(authQueries.me());
  const { mutate, isPending } = useMutation({
    ...authMutations.verification(),
    onSuccess: () => {
      toast.success('Verification email sent. Please check your inbox.');
    },
  });

  const isUnverified = data?.user.emailVerified === false;

  const handleVerification = () => {
    if (isUnverified && data?.user.email) {
      mutate({ email: data.user.email });
    }
  };

  return isUnverified ? (
    <Alert className="flex items-center justify-between">
      <div>
        <AlertTitle>Your email is not verified</AlertTitle>
        <AlertDescription className="flex justify-between">
          Please verify your email to unlock features.
        </AlertDescription>
      </div>

      <Button onClick={handleVerification} disabled={isPending}>
        Verify
      </Button>
    </Alert>
  ) : null;
}
