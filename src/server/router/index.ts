import { publicProcedure, router } from "~/configs/trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export type AppRouter = typeof appRouter;
