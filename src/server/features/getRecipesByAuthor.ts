import { publicProcedure } from "~/server/middleware/trpc"
import prisma from "~/server/external/prisma"
import { z } from "zod"

// The controller
export const getRecipesByAuthor = {
  getRecipesByAuthor: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
      })
    )
    .query(({ input }) => {
      try {
        return service({ authorId: input.authorId })
      } catch (err) {
        console.log(err)
        throw err
      }
    }),
}

interface GetRecipesByAuthorArgs {
  authorId: string
}

async function service({ authorId }: GetRecipesByAuthorArgs) {
  return prisma.recipe.findMany({
    where: {
      authorId,
    },
    select: {
      id: true,
      name: true,
      updatedAt: true,
      cookTimeMins: true,
      prepTimeMins: true,
    },
  })
}
