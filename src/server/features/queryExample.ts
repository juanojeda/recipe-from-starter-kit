import { publicProcedure } from "~/server/middleware/trpc"
import prisma from "~/server/external/prisma"

// The controller
export const queryExample = {
  queryExample: publicProcedure.query(() => {
    try {
      return service()
    } catch (err) {
      console.log(err)
      throw err
    }
  }),
}

async function service() {
  const googleAuthConfigured: boolean = process.env.GOOGLE_CLIENT_ID
    ? true
    : false

  const countPosts = await prisma.post.count()
  const countUsers = await prisma.user.count()
  const countUsersWithPosts = await prisma.user.count({
    where: {
      posts: {
        some: {
          authorId: {
            not: null,
          },
        },
      },
    },
  })

  return {
    authorCount: countUsersWithPosts,
    postCount: countPosts,
    userCount: countUsers,
    googleAuthenticationConfigured: googleAuthConfigured,
  }
}
