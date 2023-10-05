import { publicProcedure } from "~/server/middleware/trpc"
import prisma from "~/server/external/prisma"
import { z } from "zod"
import { Unarray } from "~/utils/typeUtils"

// The controller
export const getRecipeById = {
  getRecipeById: publicProcedure.input(z.string()).query(({ input }) => {
    try {
      return service(input)
    } catch (err) {
      console.log(err)
      throw err
    }
  }),
}

const fetchRecipe = async (id: string) => {
  const dbRecipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      ingredients: {
        select: {
          id: true,
          measurementUnit: true,
          measurementQty: true,
          ingredient: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!dbRecipe) {
    throw new Error("No recipe found;")
  }

  return dbRecipe
}

type FetchedRecipe = Awaited<ReturnType<typeof fetchRecipe>>
type FetchedRecipeIngredientsList = FetchedRecipe["ingredients"]
type FetchedIngredient = Unarray<FetchedRecipeIngredientsList>

const formatIngredient = ({ ingredient, ...rest }: FetchedIngredient) => ({
  name: ingredient.name,
  ...rest,
})

async function service(id: string) {
  const dbRecipe = await fetchRecipe(id)

  return {
    ...dbRecipe,
    ingredients: dbRecipe.ingredients.map(formatIngredient),
  }
}
