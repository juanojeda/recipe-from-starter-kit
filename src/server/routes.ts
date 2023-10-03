import { createTRPCRouter } from "~/server/middleware/trpc"
import { mutationExample } from "~/server/features/mutationExample"
import { protectedExample } from "~/server/features/protectedExample"
import { queryExample } from "~/server/features/queryExample"

export const appRouter = createTRPCRouter({
  ...queryExample,
  ...mutationExample,
  ...protectedExample,
})

export type AppRouter = typeof appRouter
