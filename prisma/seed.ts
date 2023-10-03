import { PrismaClient } from "@prisma/client"
import { type RecipeSeedData, recipesSeed } from "./seedData/recipes"
import { type UserSeedData, usersSeed } from "./seedData/users"

export const prisma = new PrismaClient()

const seedRecipe = async (recipes: RecipeSeedData[]) => {
  await Promise.all(
    recipes.map(async (recipe) => {
      const dbRecipe = await prisma.recipe.upsert({
        where: {
          name: recipe.name,
        },
        create: {
          name: recipe.name,
          instructions: recipe.instructions,
          authorId: recipe.authorId,
        },
        update: {
          name: recipe.name,
          instructions: recipe.instructions,
        },
      })

      await Promise.all(
        recipe.ingredients.map(async (seedIngredient) => {
          const dbIngredient = await prisma.ingredient.upsert({
            where: {
              name: seedIngredient.name,
            },
            create: {
              name: seedIngredient.name,
            },
            update: {
              name: seedIngredient.name,
            },
          })

          const dbRecipeIngredient = await prisma.recipeIngredient.upsert({
            where: {
              recipeIngredientId: {
                recipeId: dbRecipe.id,
                ingredientId: dbIngredient.id,
              },
            },
            create: {
              recipeId: dbRecipe.id,
              ingredientId: dbIngredient.id,
              measurementQty: seedIngredient.qty,
              measurementUnit: seedIngredient.unit,
            },
            update: {
              measurementQty: seedIngredient.qty,
              measurementUnit: seedIngredient.unit,
            },
          })

          return dbRecipeIngredient
        })
      )
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
