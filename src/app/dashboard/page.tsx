"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { signOut } from "~/lib/auth-client";
import { trpc } from "~/lib/trpc";

export default function Page() {
  const router = useRouter();
  const { data } = useQuery(trpc.greeting.queryOptions());

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
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
