import { PrismaClient } from "@prisma/client"
import { type RecipeSeedData, recipesSeed } from "./seedData/recipes"
import { type UserSeedData, usersSeed } from "./seedData/users"
import { IngredientSeedData, ingredients } from "./seedData/ingredients"

export const prisma = new PrismaClient()

const seedIngredients = async (ingredients: IngredientSeedData[]) => {
  const data = ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
  }))

  // then create ingredients
  await prisma.ingredient.createMany({
    data,
  })
}

const deleteSeeds = async () => {
  // deletions must happen in order:
  // instructions -> recipeIngredients -> ingredients -> recipes -> users
  await prisma.instruction.deleteMany({})
  await prisma.recipeIngredient.deleteMany({})
  await prisma.ingredient.deleteMany({})
  await prisma.recipe.deleteMany({})
  await prisma.user.deleteMany({})
}

const seedRecipe = async (recipes: RecipeSeedData[]) => {
  // base recipes, without nested relations
  const recipesData = recipes.map(
    ({ id, name, prepTimeMins, cookTimeMins, authorId }) => ({
      id,
      name,
      authorId,
      prepTimeMins,
      cookTimeMins,
    })
  )

  // all nested recipeIngredients
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

  // all nested recipe instructions
  const instructionsData = recipes
    .map(({ id, instructions }) =>
      instructions.map((instruction, order) => ({
        recipeId: id,
        text: instruction,
        order,
      }))
    )
    .flat()

  // first create all recipes without nested relations
  await prisma.recipe.createMany({ data: recipesData })
  // then create recipeIngredients, and connect to recipes
  await prisma.recipeIngredient.createMany({ data: recipeIngredientsData })
  // then create recipe instructions and connect to recipes
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
  await deleteSeeds()
  await seedUsers(usersSeed)
  await seedIngredients(ingredients)
  await seedRecipe(recipesSeed)
}

void runSeeds()
