"use client";

import { Button } from "~/components/ui/button";
import { signUp } from "~/lib/auth-client";

export default function Page() {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        alert("Registered!");

        const randomNumber = new Date().getTime();

        const result = await signUp.email({
          email: `user-${randomNumber}@gvstang.com`,
          name: `User ${randomNumber}`,
          password: "user@123",
        });

        console.log(result);
      }}
    >
      <h1>Register</h1>
      <Button type="submit">Register</Button>
    </form>
  );
}
