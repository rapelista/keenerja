"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "~/lib/auth/client";

export default function Page() {
  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn.email({
            email: "user-1757784457625@gvstang.com",
            password: "user@123",
            callbackURL: "/dashboard",
          });
        }}
      >
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
