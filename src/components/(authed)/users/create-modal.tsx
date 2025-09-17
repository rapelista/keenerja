import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircleIcon, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { trpc } from '~/lib/trpc';
import { createUserSchema } from '~/server/validators';

export function CreateUserModal({
  className,
  onClose,
  onSuccess,
}: {
  className?: string;
  onClose?: () => void;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

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

          onSuccess?.();
          onClose?.();
        },
      });
    },
  });

  return (
    <div className={className}>
      <AlertDialogContent>
        {isError ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Failed to create user</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        ) : null}

        <AlertDialogHeader>
          <AlertDialogTitle>Create User</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new user to the system. All fields marked with * are required.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {
            // Debug: Show form state
            <pre>{JSON.stringify(form.state.values, null, 2)}</pre>
          }
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

          <form.Field
            name="email"
            validators={{
              onChange: createUserSchema.shape.email,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
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
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="emailVerified">
            {(field) => (
              <div className="flex items-center space-x-2">
                <Input
                  id={field.name}
                  name={field.name}
                  type="checkbox"
                  onBlur={field.handleBlur}
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor={field.name}>Email verified</Label>
              </div>
            )}
          </form.Field>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose} disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 width={16} height={16} /> : 'Create User'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </div>
  );
}
