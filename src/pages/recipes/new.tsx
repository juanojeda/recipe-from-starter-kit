// This component comes from an open PR in the shadcn/ui repo.

import React from "react"
import { type NextPage } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { api } from "~/server/api"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { MeasurementUnit } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { CreateRecipeForAuthorInput } from "~/server/features/createRecipeForAuthor"
import Link from "next/link"

interface IngredientLine {
  id: string
  name: string
  qty: string
  unit: MeasurementUnit
}

const formatIngredientsInput = (ingredients: IngredientLine[]): CreateRecipeForAuthorInput['ingredients'] => {
  return ingredients.map(({ qty, ...ingredient }) => ({ ...ingredient, qty: Number.parseFloat(qty) }))
}

const NewRecipe: NextPage = () => {

  // TODO: add loading, error, success handline
  const { mutate: createRecipe, isLoading, isError, isSuccess, failureReason } = api.createRecipeForAuthor.useMutation()
  const [recipeName, setRecipeName] = React.useState<string>("")
  const [ingredients, setIngredients] = React.useState<IngredientLine[]>([])

  const handleCreateRecipe = () => {
    createRecipe({
      name: recipeName,
      ingredients: formatIngredientsInput(ingredients)
    })
  }

  const addIngredientLine = (e: React.SyntheticEvent): void => {
    setIngredients(ingredients => [...ingredients, {
      id: crypto.randomUUID(),
      name: "",
      qty: "0",
      unit: "GRAM"
    }])

    e.preventDefault()
  }

  // function to update ingredient line
  const updateIngredient = (newIngredient: IngredientLine): void => {
    const ingredientToUpdateIndex = ingredients.findIndex(({ id }) => id === newIngredient.id)

    if (ingredientToUpdateIndex === -1) {
      throw new Error("Ingredient id does not exist");
    }

    const ingredientsBefore = ingredients.slice(0, ingredientToUpdateIndex)
    const ingredientsAfter = ingredients.slice(ingredientToUpdateIndex + 1)

    setIngredients([...ingredientsBefore, newIngredient, ...ingredientsAfter])
  }

  const handleUpdateIngredient = (propertyToUpdate: keyof IngredientLine) => ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const ingredientId = currentTarget.dataset['ingredientId']
    const baseIngredient = ingredients.find(({ id }) => id === ingredientId)

    if (!baseIngredient) {
      throw new Error("Ingredient to update was not found")
    }

    const newIngredient = { ...baseIngredient, [propertyToUpdate]: currentTarget.value }

    updateIngredient(newIngredient)
  }

  const handleUpdateIngredientUnitForId = (ingredientId: string) => (unit: MeasurementUnit): void => {
    const baseIngredient = ingredients.find(({ id }) => id === ingredientId)
    const propertyToUpdate = "unit";

    if (!baseIngredient) {
      throw new Error("Ingredient to update was not found")
    }

    const newIngredient = { ...baseIngredient, [propertyToUpdate]: unit }

    updateIngredient(newIngredient)
  }

  const handleUpdateRecipeName = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setRecipeName(currentTarget.value)
  }

  return (
    <>
      <Head>
        <title>New Recipe</title>
        <meta name="description" content="My Recipes" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen flex-col items-center pt-4">

        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Create a recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              {isLoading && <span>Loading...</span>}
              {isError && <span>Error!</span>}
              {isSuccess && <span>Saved!</span>}
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="recipeName">Name</Label>
                  <Input id="recipeName" placeholder="Name your recipe" value={recipeName} onChange={handleUpdateRecipeName} />
                </div>

                <h4>Ingredients</h4>
                {
                  ingredients.map(({ id, unit, qty, name }) => (
                    <div key={id} className="flex flex-row space-x-1.5">
                      <div className="flex flex-col space-y-1.5">
                        <Label className="typography-body-muted" htmlFor={`ingredientName--${id}`}>Ingredient</Label>
                        <Input id={`ingredientName--${id}`} placeholder="Eg. Onions" onChange={handleUpdateIngredient("name")} data-ingredient-id={id} value={name} />
                      </div>
                      <div className="flex flex-col flex-1 space-y-1.5">
                        <Label className="typography-body-muted" htmlFor={`ingredientQty--${id}`}>Qty</Label>
                        <Input id={`ingredientQty--${id}`} placeholder="100" data-ingredient-id={id} onChange={handleUpdateIngredient("qty")} value={qty} type="number" />
                      </div>
                      <div className="flex flex-col flex-1 space-y-1.5">
                        <Label className="typography-body-muted" htmlFor={`ingredientUnit--${id}`}>Unit</Label>
                        <Select value={unit} onValueChange={handleUpdateIngredientUnitForId(id)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              Object.keys(MeasurementUnit).map(unitKey => (
                                <SelectItem key={unitKey} value={unitKey}>{unitKey}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))
                }

                <Button variant="outline" onClick={addIngredientLine}>Add ingredient +</Button>



              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/">
                Cancel
              </Link>
            </Button>
            <Button onClick={handleCreateRecipe}>Save Recipe</Button>
          </CardFooter>
        </Card>

      </main>

    </>
  )
}

export default NewRecipe
