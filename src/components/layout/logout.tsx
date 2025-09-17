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

  const { mutate, isPending } = useMutation({
    ...authMutations.signOut(),
    onSuccess: () => {
      router.push('/sign-in');
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={closeLogoutModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            velit, in ab delectus nesciunt pariatur animi amet ad architecto
            tempora est, veniam, fugiat dicta inventore alias officiis corrupti
            tenetur ipsum!
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
