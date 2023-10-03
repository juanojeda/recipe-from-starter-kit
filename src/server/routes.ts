import { createTRPCRouter } from "~/server/middleware/trpc"
import { getRecipesByAuthor } from "~/server/features/getRecipesByAuthor"

export const appRouter = createTRPCRouter({
  ...getRecipesByAuthor,
})

export type AppRouter = typeof appRouter
