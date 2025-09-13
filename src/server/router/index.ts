import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "~/configs/trpc";
import { db } from "~/db/drizzle";
import { user } from "~/db/schema";

export const appRouter = router({
  // Public procedures
  greeting: publicProcedure.query(() => "hello tRPC v10!"),

  // Protected procedures that require authentication
  user: protectedProcedure.query(async () => {
    const users = await db.select().from(user).limit(10);

    return {
      data: users,
    };
  }),

  profile: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await db
      .select()
      .from(user)
      .where(eq(user.id, ctx.session.user.id))
      .limit(1);

    if (!currentUser.length) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return {
      data: currentUser[0],
    };
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await db
        .update(user)
        .set({
          name: input.name,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(user.id, ctx.session.user.id))
        .returning();

      return {
        data: updatedUser[0],
      };
    }),
});

export type AppRouter = typeof appRouter;
