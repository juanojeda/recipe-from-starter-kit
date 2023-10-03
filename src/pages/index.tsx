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

type DBSummaryData = {
  userCount: number
  authorCount: number
  postCount: number
}

const AuthorisedView = ({ user, allPosts }: ProtectedExampleReturnType) => {
  return (
    <>
      <div>
        {user ? (
          <p>You have {user.posts.length} posts.</p>
        ) : (
          // eslint-disable-next-line react/no-unescaped-entities
          <div>You aren't currently a user in our database.</div>
        )}
      </div>
      <div>
        <h4>Posts</h4>
        {[...allPosts].reverse().map(({ title, author, id }) => (
          <div key={id}>
            {title} - {author ? author.name : `anonymous`}
          </div>
        ))}
      </div>
    </>
  )
}

const formatDbSummaryData = ({
  userCount,
  postCount,
  authorCount,
}: DBSummaryData) =>
  `There are ${userCount} users, ${authorCount} authors and ${postCount} posts.`

const Home: NextPage = () => {
  const { data: sessionData } = useSession()
  const { refetch: refetchDbSummary, ...dbSummary } =
    api.queryExample.useQuery()
  const { refetch: refetchSecret, ...secret } = api.protectedExample.useQuery()
  const mutationExample = api.mutationExample.useMutation()
  const googleAuthConfigured: boolean = dbSummary.data
    ? dbSummary.data.googleAuthenticationConfigured
    : false

  const [postText, setPostText] = React.useState<string>("")

  const handlePostTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value)
  }

  const handleMutateButton = () => {
    mutationExample.mutate({ text: postText })
  }

  React.useEffect(() => {
    setPostText("")
    void refetchDbSummary()
    void refetchSecret()
  }, [mutationExample.isSuccess, refetchSecret, refetchDbSummary])

  return (
    <>
      <Head>
        <title>Next template</title>
        <meta name="description" content="Next Template app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1>Hello world</h1>
          <div className="flex h-20 flex-col items-center gap-2">
            <p>
              {sessionData?.user
                ? `Welcome ${sessionData.user.name} (${sessionData.user.email})`
                : "You are unauthenticated. Sign in to see the posts."}
            </p>

            {googleAuthConfigured ? (
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
            )}

            <h4>Database summary</h4>
            <div>
              {dbSummary.data
                ? formatDbSummaryData(dbSummary.data)
                : "Loading tRPC query..."}
            </div>

            <div className="flex w-full gap-1">
              <Input
                onChange={handlePostTextChange}
                className="bg-card"
                type="text"
                placeholder="Write a post..."
                value={postText}
              />
              <Button
                className={buttonVariants({ variant: "secondary" })}
                onClick={handleMutateButton}
              >
                Submit
              </Button>
            </div>

            {secret.isSuccess && (
              <AuthorisedView
                user={secret.data.user}
                allPosts={secret.data.allPosts}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
