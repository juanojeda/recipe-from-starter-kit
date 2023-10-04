// This component comes from an open PR in the shadcn/ui repo.

import React from "react"
import { type NextPage } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { api } from "~/server/api"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import Link from "next/link"

const Home: NextPage = () => {
  const { data: sessionData } = useSession()
  const { data: recipesData } = api.getRecipesByAuthor.useQuery({ authorId: 'my-unique-user-uuid1' })

  return (
    <>
      <Head>
        <title>My Recipes</title>
        <meta name="description" content="My Recipes" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1>My Recipes</h1>
          <div className="flex h-20 flex-col items-center gap-2">
            <p>
              {sessionData?.user
                ? `Welcome ${sessionData.user.name} (${sessionData.user.email})`
                : "You are unauthenticated. Sign in to see the posts."}
            </p>

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

            {/* {googleAuthConfigured ? (
              sessionData?.user ? (
                // Example of styling a non-button element as a button. Using the asChild property will pass the button styles onto the child element
                // see https://www.radix-ui.com/primitives/docs/utilities/slot#usage
                <Button asChild>
                  <Link href="/api/auth/signout">Sign out</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/api/auth/signin">Sign in with Google</Link>
                </Button>
              )
            ) : (
              <p>
                Google Authentication is not correctly configured. Please check
                your .env file.
              </p>
            )} */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
