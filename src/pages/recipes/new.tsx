// This component comes from an open PR in the shadcn/ui repo.

import React, { useEffect } from "react"
import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import { MeasurementUnit } from "@prisma/client"
import { api } from "~/server/api"
import { type CreateRecipeForAuthorInput } from "~/server/features/createRecipeForAuthor"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { isNonEmptyArray } from "~/utils/typeUtils"

interface IngredientLine {
  name: string
  qty: string
  unit: MeasurementUnit
}

interface IngredientLineUI extends IngredientLine {
  id: string
}

type CreateRecipeForAuthorInputIngredients =
  CreateRecipeForAuthorInput["ingredients"]

const formatIngredientsInput = (
  ingredients: IngredientLineUI[]
): CreateRecipeForAuthorInputIngredients => {
  if (!isNonEmptyArray<IngredientLineUI>(ingredients)) {
    throw new Error("There are no ingredients")
  }

  return ingredients.map(({ id: _id, qty, ...ingredient }) => ({
    ...ingredient,
    qty: Number.parseFloat(qty),
  })) as CreateRecipeForAuthorInputIngredients
}

const NewRecipe: NextPage = () => {
  const router = useRouter()
  const {
    mutate: createRecipe,
    isLoading,
    isError,
    isSuccess,
  } = api.createRecipeForAuthor.useMutation()
  const [recipeName, setRecipeName] = React.useState<string>("")
  const [ingredients, setIngredients] = React.useState<IngredientLineUI[]>([])

  useEffect(() => {
    const timedRedirectAfterSave = (timeoutMs: number): void => {
      setTimeout(() => {
        void router.push("/") // redirect to home page
      }, timeoutMs)
    }
    if (isSuccess) {
      timedRedirectAfterSave(1000)
    }
  }, [isSuccess, router])

  const updateIngredient = (newIngredient: IngredientLineUI): void => {
    const ingredientToUpdateIndex = ingredients.findIndex(
      ({ id }) => id === newIngredient.id
    )

    if (ingredientToUpdateIndex === -1) {
      throw new Error("Ingredient id does not exist")
    }

    const ingredientsBefore = ingredients.slice(0, ingredientToUpdateIndex)
    const ingredientsAfter = ingredients.slice(ingredientToUpdateIndex + 1)

    setIngredients([...ingredientsBefore, newIngredient, ...ingredientsAfter])
  }

  const handleCreateRecipe = (e: React.SyntheticEvent): void => {
    createRecipe({
      name: recipeName,
      ingredients: formatIngredientsInput(ingredients),
    })

    e.preventDefault()
  }

  const handleAddIngredientLine = (e: React.SyntheticEvent): void => {
    setIngredients((ingredients) => [
      ...ingredients,
      {
        id: crypto.randomUUID(),
        name: "",
        qty: "0",
        unit: "GRAM",
      },
    ])

    e.preventDefault()
  }

  const buildNewIngredient = (
    ingredientId: string,
    value: string,
    propertyToUpdate: string
  ): IngredientLineUI => {
    const baseIngredient = ingredients.find(({ id }) => id === ingredientId)

    if (!baseIngredient) {
      throw new Error("Ingredient to update was not found")
    }

    return { ...baseIngredient, [propertyToUpdate]: value }
  }

  const handleUpdateIngredientFromString =
    (propertyToUpdate: keyof IngredientLineUI, ingredientId: string) =>
    (value: string): void => {
      const newIngredient = buildNewIngredient(
        ingredientId,
        value,
        propertyToUpdate
      )
      updateIngredient(newIngredient)
    }

  const handleUpdateIngredientFromEvent =
    (propertyToUpdate: keyof IngredientLineUI, ingredientId: string) =>
    ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
      const newIngredient = buildNewIngredient(
        ingredientId,
        currentTarget.value,
        propertyToUpdate
      )

      updateIngredient(newIngredient)
    }

  const handleUpdateRecipeName = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
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
                  <Input
                    id="recipeName"
                    placeholder="Name your recipe"
                    value={recipeName}
                    onChange={handleUpdateRecipeName}
                  />
                </div>

                <h4>Ingredients</h4>
                {ingredients.map(({ id, unit, qty, name }) => (
                  <div key={id} className="flex flex-row space-x-1.5">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        className="typography-body-muted"
                        htmlFor={`ingredientName--${id}`}
                      >
                        Ingredient
                      </Label>
                      <Input
                        id={`ingredientName--${id}`}
                        placeholder="Eg. Onions"
                        onChange={handleUpdateIngredientFromEvent("name", id)}
                        data-ingredient-id={id}
                        value={name}
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1.5">
                      <Label
                        className="typography-body-muted"
                        htmlFor={`ingredientQty--${id}`}
                      >
                        Qty
                      </Label>
                      <Input
                        id={`ingredientQty--${id}`}
                        placeholder="100"
                        data-ingredient-id={id}
                        onChange={handleUpdateIngredientFromEvent("qty", id)}
                        value={qty}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1.5">
                      <Label
                        className="typography-body-muted"
                        htmlFor={`ingredientUnit--${id}`}
                      >
                        Unit
                      </Label>
                      <Select
                        value={unit}
                        onValueChange={handleUpdateIngredientFromString(
                          "unit",
                          id
                        )}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(MeasurementUnit).map((unitKey) => (
                            <SelectItem key={unitKey} value={unitKey}>
                              {unitKey}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={handleAddIngredientLine}>
                  Add ingredient +
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/">Cancel</Link>
            </Button>
            <Button onClick={handleCreateRecipe}>Save Recipe</Button>
          </CardFooter>
        </Card>
      </main>
    </>
  )
}

export default NewRecipe
