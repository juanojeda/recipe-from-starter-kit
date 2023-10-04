import { createTRPCRouter } from "~/server/middleware/trpc"
import { getRecipesByAuthor } from "~/server/features/getRecipesByAuthor"
import { createRecipeForAuthor } from "~/server/features/createRecipeForAuthor"

export const appRouter = createTRPCRouter({
  ...getRecipesByAuthor,
  ...createRecipeForAuthor,
})

export type AppRouter = typeof appRouter
