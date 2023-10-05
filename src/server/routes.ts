import { createTRPCRouter } from "~/server/middleware/trpc"
import { getRecipesByAuthor } from "~/server/features/getRecipesByAuthor"
import { getRecipeById } from "~/server/features/getRecipeById"
import { createRecipeForAuthor } from "~/server/features/createRecipeForAuthor"

export const appRouter = createTRPCRouter({
  ...getRecipesByAuthor,
  ...createRecipeForAuthor,
  ...getRecipeById,
})

export type AppRouter = typeof appRouter
