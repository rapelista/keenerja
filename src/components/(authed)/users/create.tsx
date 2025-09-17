'use client';

import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircleIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { trpc } from '~/lib/trpc';
import { createUserSchema } from '~/schema/users';

export function UserCreate({ children }: React.PropsWithChildren) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending, isError, error } = useMutation(
    trpc.users.create.mutationOptions(),
  );

  const form = useForm({
    /**
     * Default form values.
     */
    defaultValues: {
      name: '',
      email: '',
      emailVerified: false,
      image: '',
    },

    /**
     * Validation logic and schema.
     */
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: createUserSchema,
    },

    onSubmit: ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.users.list.queryKey(),
          });

          form.reset();

          setIsOpen(false);
        },
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create User</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new user to the system. All fields marked with * are required.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isError ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Failed to create user</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {process.env.NODE_ENV === 'development' ? (
            <form.Subscribe>
              {({ values }) => <pre>{JSON.stringify(values, null, 2)}</pre>}
            </form.Subscribe>
          ) : null}

          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Name *</Label>

                <Input
                  id="name"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter user's full name"
                  aria-invalid={field.state.meta.errors.length > 0}
                />

                {!field.state.meta.isValid && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.map((e) => e?.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email *</Label>
                <Input
                  id="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter user's email address"
                  aria-invalid={field.state.meta.errors.length > 0}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.map((e) => e?.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="image">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Profile Image URL (Optional)</Label>
                <Input
                  id="image"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.map((e) => e?.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="emailVerified">
            {(field) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-verified"
                  name={field.name}
                  onBlur={field.handleBlur}
                  checked={field.state.value}
                  onCheckedChange={(e) => field.handleChange(!!e)}
                />

                <Label htmlFor="email-verified">Email verified</Label>
              </div>
            )}
          </form.Field>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 width={16} height={16} /> : 'Create User'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
