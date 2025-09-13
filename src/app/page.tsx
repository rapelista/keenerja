import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main>
      <div>Hello world!</div>

      <Button asChild>
        <Link href="/sign-in">Try Now</Link>
      </Button>
    </main>
  );
}
