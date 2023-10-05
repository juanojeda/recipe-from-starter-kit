import { MeasurementUnit } from "@prisma/client"
import { type Session } from "next-auth"
import { z } from "zod"
import { publicProcedure } from "~/server/middleware/trpc"
import prisma from "~/server/external/prisma"

const createRecipeForAuthorInputValidator = z.object({
  name: z.string().nonempty(),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        qty: z.number(),
        unit: z.nativeEnum(MeasurementUnit),
      })
    )
    .nonempty(),
})

export type CreateRecipeForAuthorInput = z.infer<
  typeof createRecipeForAuthorInputValidator
>

// This is the controller
export const createRecipeForAuthor = {
  createRecipeForAuthor: publicProcedure
    .input(createRecipeForAuthorInputValidator)
    .mutation(({ input, ctx }) => {
      try {
        return service({ recipe: input, ctx })
      } catch (err) {
        console.log(err)
        throw err
      }
    }),
}

type MutationArgs = {
  recipe: CreateRecipeForAuthorInput
  ctx: { session: Session | null }
}

async function service({ recipe, ctx }: MutationArgs) {
  if (!ctx.session) {
    throw new Error("Unauthenticated user")
  }

  const recipePayload = await prisma.recipe.create({
    data: {
      name: recipe.name,
      author: {
        connectOrCreate: {
          where: {
            email: ctx.session.user.email,
          },
          create: {
            email: ctx.session.user.email,
            name: ctx.session.user.name,
          },
        },
      },
      ingredients: {
        create: recipe.ingredients.map(({ name, qty, unit }) => ({
          measurementQty: qty,
          measurementUnit: unit,
          ingredient: {
            connectOrCreate: {
              where: {
                name: name.toLocaleLowerCase(),
              },
              create: {
                name: name.toLocaleLowerCase(),
              },
            },
          },
        })),
      },
    },
  })

  return recipePayload.id
}
