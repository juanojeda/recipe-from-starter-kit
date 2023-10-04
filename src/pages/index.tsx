// This component comes from an open PR in the shadcn/ui repo.

import React from "react"
import { type NextPage } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { api } from "~/server/api"
import { Button } from "~/components/ui/button"
import Link from "next/link"

const Home: NextPage = () => {
  const { data: sessionData } = useSession()

  const { data: recipesData } = api.getRecipesByAuthor.useQuery({ email: sessionData?.user.email || "" })

  const isAuthedUser: boolean = !!sessionData && !!sessionData.user;

  return (
    <>
      <Head>
        <title>My Recipes</title>
        <meta name="description" content="My Recipes" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <div className="container flex flex-col items-center gap-12 px-4 pt-4 py-16 ">

          {isAuthedUser ? (
            <div className="w-full flex items-center justify-between">
              <div>Welcome back {sessionData?.user.name}</div>
              <Button variant="secondary" asChild>
                <Link href="/api/auth/signout">Sign out</Link>
              </Button>
            </div>
          ) : (
            <Button variant="secondary" asChild>
              <Link href="/api/auth/signin">Sign in with Google</Link>
            </Button>
          )}



          <h1>My Recipes</h1>
          <div className="flex flex-col items-center gap-2">

            <h2>Your recipes</h2>

            <Button asChild>
              <Link href="/recipes/new">Create a recipe</Link>
            </Button>

            {
              recipesData?.length ?
                <ul>
                  {
                    recipesData.map(({ name, id, prepTimeMins, cookTimeMins }) => (
                      <li key={id}><strong>{name}</strong>
                        {
                          prepTimeMins && <> - Prep time: {prepTimeMins}</>
                        }
                        {cookTimeMins && <> - Cook time: {cookTimeMins}</>}
                      </li>
                    ))
                  }
                </ul>
                : <div>You do not have recipes</div>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
