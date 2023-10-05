import React from "react"
import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "~/server/api"

const RecipeDetail: NextPage = () => {
  const { query } = useRouter()

  const { data: recipeData } = api.getRecipeById.useQuery(query.id as string, {
    enabled: !!query.id,
  })

  if (!recipeData) return null

  const { ingredients, name: recipeName } = recipeData

  return (
    <>
      <Head>
        <title>Recipe - {recipeName}</title>
        <meta name="description" content="My Recipes" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Link href="/">Back</Link>
      <h1>{recipeName}</h1>

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map(({ id, name, measurementQty, measurementUnit }) => (
          <li key={id}>
            {measurementQty} {measurementUnit} {name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default RecipeDetail
