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

export const recipesSeed: RecipeSeedData[] = [
  {
    name: "My first recipe",
    ingredients: [
      {
        id: "SALT",
        name: "salt",
        qty: 10,
        unit: "GRAM" as MeasurementUnit,
      },
      { name: "water", id: "WATER", qty: 1000, unit: "ML" as MeasurementUnit },
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
        id: "ONION",
        name: "onion",
        qty: 0.5,
        unit: "CUP" as MeasurementUnit,
      },
      {
        name: "garlic",
        id: "GARLIC",
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
        id: "ONION",
        name: "onion",
        qty: 0.5,
        unit: "CUP" as MeasurementUnit,
      },
      {
        name: "garlic",
        id: "GARLIC",
        qty: 10,
        unit: "GRAM" as MeasurementUnit,
      },
    ],
    instructions: ["First instruction", "Second instruction"],
    authorId: `${SEED_USER_UUID}2`,
  },
]
