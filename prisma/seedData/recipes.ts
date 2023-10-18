import { type MeasurementUnit } from "@prisma/client"
import { SEED_USER_UUID } from "./users"

export interface RecipeSeedData {
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

const SALT = {
  id: "SALT",
  name: "salt",
}

const WATER = {
  id: "WATER",
  name: "water",
}

const ONION = {
  id: "ONION",
  name: "onion",
}

const GARLIC = {
  id: "GARLIC",
  name: "garlic",
}

export const recipesSeed: RecipeSeedData[] = [
  {
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
