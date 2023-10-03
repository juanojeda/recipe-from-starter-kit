// This component comes from an open PR in the shadcn/ui repo.

import React from "react"
import { type NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { api } from "~/server/api"
import { Button, buttonVariants } from "~/components/ui/button"
import { type ProtectedExampleReturnType } from "~/server/features/protectedExample"
import { Input } from "~/components/ui/input"

const Home: NextPage = () => {
  const { data: sessionData } = useSession()
  const { data: recipesData } = api.getRecipesByAuthor.useQuery({ authorId: 'my-unique-user-uuid1' })

  console.log(recipesData)


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

            <h3>Your recipes</h3>

            <ul>
              {
                recipesData?.map(({ name, id, prepTime, cookTime }) => (
                  <li key={id}><strong>{name}</strong>
                    {
                      prepTime && <>- Prep time: {prepTime}</>
                    }
                    {cookTime && <>- Cook time: {cookTime}</>}
                  </li>
                ))
              }
            </ul>

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
