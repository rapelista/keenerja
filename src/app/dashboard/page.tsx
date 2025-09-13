"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { signOut } from "~/lib/auth-client";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <Button
        onClick={async (e) => {
          e.preventDefault();

          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in");
              },
            },
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
