// This component comes from an open PR in the shadcn/ui repo.

import React from "react"
import { type NextPage } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { api } from "~/server/api"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { MeasurementUnit } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

interface IngredientLine {
  id: string
  name: string
  amount: number
  unit: MeasurementUnit
}

const NewRecipe: NextPage = () => {

  const [ingredients, setIngredients] = React.useState<IngredientLine[]>([]);

  const addIngredientLine = (e: React.SyntheticEvent): void => {
    setIngredients(ingredients => [...ingredients, {
      id: crypto.randomUUID(),
      name: "",
      amount: 0,
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

  React.useEffect(() => {
    console.log(ingredients)
  }, [ingredients])

  const handleUpdateIngredientUnitForId = (ingredientId: string) => (unit: MeasurementUnit): void => {
    const baseIngredient = ingredients.find(({ id }) => id === ingredientId)
    const propertyToUpdate = "unit";

    console.log("UPDATING SELECT...", ingredientId, unit)

    if (!baseIngredient) {
      throw new Error("Ingredient to update was not found")
    }

    const newIngredient = { ...baseIngredient, [propertyToUpdate]: unit }

    updateIngredient(newIngredient)
  }

  return (
    <>
      <Head>
        <title>New Recipe</title>
        <meta name="description" content="My Recipes" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        </div>

        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Create a recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="recipeName">Name</Label>
                  <Input id="recipeName" placeholder="Name your recipe" />
                </div>

                <h4>Ingredients</h4>

                <Button onClick={addIngredientLine}>Add ingredient +</Button>

                {
                  ingredients.map(({ id, unit, amount, name }) => (
                    <div key={id} className="flex flex-row space-x-1.5">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`ingredientName--${id}`}>Ingredient</Label>
                        <Input id={`ingredientName--${id}`} placeholder="Eg. Onions" onChange={handleUpdateIngredient("name")} data-ingredient-id={id} value={name} />
                      </div>
                      <div className="flex flex-col flex-1 space-y-1.5">
                        <Label htmlFor={`ingredientAmount--${id}`}>Amount</Label>
                        <Input id={`ingredientAmount--${id}`} placeholder="100" data-ingredient-id={id} onChange={handleUpdateIngredient("amount")} value={amount} />
                      </div>
                      <div className="flex flex-col flex-1 space-y-1.5">
                        <Label htmlFor={`ingredientUnit--${id}`}>Unit</Label>
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


              </div>
            </form>
          </CardContent>
        </Card>

      </main>

    </>
  )
}

export default NewRecipe
