import { type MeasurementUnit } from "@prisma/client"
import { SEED_USER_UUID } from "./users"
import { SALT, GARLIC, ONION, WATER } from "./ingredients"

export interface RecipeSeedData {
  id: string
  name: string
  ingredients: {
    id: string
    name: string
    qty: number
    unit: MeasurementUnit
  }[]
  instructions: string[]
  authorId: string
  prepTimeMins?: number
  cookTimeMins?: number
}

export const recipesSeed: RecipeSeedData[] = [
  {
    id: "RECIPE_0001",
    name: "My first recipe",
    ingredients: [
      {
        ...SALT,
        qty: 10,
        unit: "GRAM" as MeasurementUnit,
      },
      { ...WATER, qty: 1000, unit: "ML" as MeasurementUnit },
    ],
    instructions: ["First instruction", "Second instruction"],
    authorId: `${SEED_USER_UUID}1`,
    prepTimeMins: 10,
    cookTimeMins: 30,
  },
  {
    id: "RECIPE_0002",
    name: "Another recipe",
    ingredients: [
      {
        ...ONION,
        qty: 0.5,
        unit: "CUP" as MeasurementUnit,
      },
      {
        ...GARLIC,
        qty: 10,
        unit: "GRAM" as MeasurementUnit,
      },
    ],
    instructions: ["First instruction", "Second instruction"],
    authorId: `${SEED_USER_UUID}1`,
  },
  {
    id: "RECIPE_0003",
    name: "Spaghetti Bologogo",
    ingredients: [
      {
        ...ONION,
        qty: 0.5,
        unit: "CUP" as MeasurementUnit,
      },
      {
        ...GARLIC,
        qty: 10,
        unit: "GRAM" as MeasurementUnit,
      },
    ],
    instructions: ["First instruction", "Second instruction"],
    authorId: `${SEED_USER_UUID}2`,
  },
]
