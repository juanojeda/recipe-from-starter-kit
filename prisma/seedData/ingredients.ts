export interface IngredientSeedData {
  id: string
  name: string
}

export const SALT: IngredientSeedData = {
  id: "SALT",
  name: "salt",
}

export const WATER: IngredientSeedData = {
  id: "WATER",
  name: "water",
}

export const ONION: IngredientSeedData = {
  id: "ONION",
  name: "onion",
}

export const GARLIC: IngredientSeedData = {
  id: "GARLIC",
  name: "garlic",
}

export const ingredients = [SALT, WATER, ONION, GARLIC]
