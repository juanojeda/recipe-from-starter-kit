import { publicProcedure } from "~/server/middleware/trpc"
import prisma from "~/server/external/prisma"
import { z } from "zod"

// The controller
export const getRecipesByAuthor = {
  getRecipesByAuthor: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(({ input }) => {
      try {
        return service({ email: input.email })
      } catch (err) {
        console.log(err)
        throw err
      }
    }),
}

interface GetRecipesByAuthorArgs {
  email: string
}

async function service({ email }: GetRecipesByAuthorArgs) {
  return prisma.recipe.findMany({
    where: {
      author: {
        email,
      },
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
