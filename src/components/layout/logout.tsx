'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { authMutations } from '~/lib/mutations/auth';
import { useLogoutModal } from '~/stores/logout-modal';

export function Logout() {
  const router = useRouter();

  const isOpen = useLogoutModal((state) => state.isOpen);
  const closeLogoutModal = useLogoutModal((state) => state.close);
  const openLogoutModal = useLogoutModal((state) => state.open);

  const { mutate, isPending } = useMutation({
    ...authMutations.signOut(),
    onSuccess: () => {
      closeLogoutModal();
      router.push('/sign-in');
    },
  });

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => (open ? openLogoutModal() : closeLogoutModal())}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Logging out will end your current session. You will need to sign in
            again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
