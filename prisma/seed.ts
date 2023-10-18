import { PrismaClient } from "@prisma/client"
import { type RecipeSeedData, recipesSeed } from "./seedData/recipes"
import { type UserSeedData, usersSeed } from "./seedData/users"
import { IngredientSeedData, ingredients } from "./seedData/ingredients"

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

const mapIngredientsSeedToRecipeIngredients = (
  ingredients: RecipeSeedData["ingredients"],
  recipeId: string
) => {
  return {
    connectOrCreate: ingredients.map((ingredient) => ({
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
              id: ingredient.id,
            },
            create: {
              id: ingredient.id,
              name: ingredient.name,
            },
          },
        },
      },
    })),
  }
}

const seedIngredients = async (ingredients: IngredientSeedData[]) => {
  const data = ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
  }))
  await prisma.ingredient.createMany({
    data,
  })
}

const seedRecipe = async (recipes: RecipeSeedData[]) => {
  const recipesData = recipes.map(
    ({ id, name, prepTimeMins, cookTimeMins, authorId }) => ({
      id,
      name,
      authorId,
      prepTimeMins,
      cookTimeMins,
    })
  )

  const recipeIngredientsData = recipes
    .map(({ id, ingredients }) =>
      ingredients.map((ingredient) => ({
        recipeId: id,
        ingredientId: ingredient.id,
        measurementQty: ingredient.qty,
        measurementUnit: ingredient.unit,
      }))
    )
    .flat()

  const instructionsData = recipes
    .map(({ id, instructions }) =>
      instructions.map((instruction, order) => ({
        recipeId: id,
        text: instruction,
        order,
      }))
    )
    .flat()

  await prisma.recipe.createMany({ data: recipesData })
  await prisma.recipeIngredient.createMany({ data: recipeIngredientsData })
  await prisma.instruction.createMany({ data: instructionsData })
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
  await seedIngredients(ingredients)
  await seedRecipe(recipesSeed)
}

void runSeeds()
