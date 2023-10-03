import { type Prisma } from "@prisma/client"
import { type Session } from "next-auth"
import { z } from "zod"
import { publicProcedure } from "~/server/middleware/trpc"
import prisma from "~/server/external/prisma"

// This is the controller
export const mutationExample = {
  mutationExample: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
      try {
        return service({ text: input.text, ctx })
      } catch (err) {
        console.log(err)
        throw err
      }
    }),
}

type MutationArgs = {
  text: string
  ctx: { session: Session | null }
}

async function service({ text, ctx }: MutationArgs) {
  if (ctx.session) {
  }

  return true
}
