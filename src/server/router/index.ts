import { publicProcedure, router } from "~/configs/trpc";
import { db } from "~/db/drizzle";
import { user } from "~/db/schema";

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
  user: publicProcedure.query(async () => {
    const users = await db.select().from(user).limit(10);

    return {
      data: users,
    };
  }),
});

export type AppRouter = typeof appRouter;
