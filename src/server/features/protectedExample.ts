import { type Prisma } from "@prisma/client"
import { protectedProcedure } from "~/server/middleware/trpc"
import prisma from "../external/prisma"

type User = {
  email: string
  id: string
  name: string
}
type UserSession = {
  session: {
    user: User
  }
}

// The controller
export const protectedExample = {
  protectedExample: protectedProcedure.query(
    ({ ctx }: { ctx: UserSession }) => {
      try {
        return service(ctx.session.user)
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  ),
}

async function service({ email }: User) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  return {
    user,
  }
}
export type ProtectedExampleReturnType = Prisma.PromiseReturnType<
  typeof service
>
