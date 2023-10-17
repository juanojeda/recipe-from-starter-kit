import { PrismaClient } from "@prisma/client"
import { type RecipeSeedData, recipesSeed } from "./seedData/recipes"
import { type UserSeedData, usersSeed } from "./seedData/users"

export const prisma = new PrismaClient()

const mapInstructionsSeedToInstructions = (
  instructions: string[],
  recipeId: string,
  method: "create" | "update"
) => ({
  [method === "create" ? "connectOrCreate" : "upsert"]: instructions.map(
    (instruction, i) => ({
      where: {
        recipeNthInstructionId: {
          recipeId,
          order: i,
        },
      },
      create: {
        order: i,
        text: instruction,
      },
      ...(method === "update"
        ? {
            update: {
              order: i,
              text: instruction,
            },
          }
        : {}),
    })
  ),
})

const seedRecipe = async (recipes: RecipeSeedData[]) => {
  await Promise.all(
    recipes.map(async (recipe, n) => {
      const recipeId = `${recipe.name.replaceAll(" ", "_")}__${n}`
      const dbRecipe = await prisma.recipe.upsert({
        where: {
          id: recipeId,
        },
        create: {
          id: recipeId,
          name: recipe.name,
          ingredients: {
            connectOrCreate: recipe.ingredients.map((ingredient) => {
              return {
                where: {
                  recipeIngredientId: {
                    ingredientId: ingredient.id,
                    recipeId,
                  },
                },
                create: {
                  measurementQty: ingredient.qty,
                  measurementUnit: ingredient.unit,
                  ingredient: {
                    connectOrCreate: {
                      where: {
                        name: ingredient.name,
                      },
                      create: {
                        id: ingredient.id,
                        name: ingredient.name,
                      },
                    },
                  },
                },
              }
            }),
          },
          instructions: mapInstructionsSeedToInstructions(
            recipe.instructions,
            recipeId,
            "create"
          ),
          authorId: recipe.authorId,
          prepTimeMins: recipe.prepTimeMins,
          cookTimeMins: recipe.cookTimeMins,
        },
        update: {
          name: recipe.name,
          instructions: mapInstructionsSeedToInstructions(
            recipe.instructions,
            recipeId,
            "update"
          ),
          prepTimeMins: recipe.prepTimeMins,
          cookTimeMins: recipe.cookTimeMins,
        },
      })
    })
  )
}

const seedUsers = async (users: UserSeedData[]) => {
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        where: { id: user.id },
        create: user,
        update: user,
      })
    })
  )
}

async function runSeeds() {
  await seedUsers(usersSeed)
  await seedRecipe(recipesSeed)
}

void runSeeds()
