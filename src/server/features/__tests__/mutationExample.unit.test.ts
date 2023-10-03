import { type Session } from "next-auth"
import { createTRPCRouter } from "~/server/middleware/trpc"
import { mutationExample } from "~/server/features/mutationExample"
import { prismaMock } from "~/server/external/__mocks__/prisma"

describe("mutationExample", () => {
  const input = {
    text: "Just a message to show how the mutation endpoint works",
  }

  describe("GIVEN an unauthenticated user", () => {
    prismaMock.post.create.mockResolvedValue({
      id: "123",
      createdAt: new Date(),
      published: false,
      updatedAt: new Date(),
      title: "Just a message to show how the mutation endpoint works",
      authorId: null,
    })

    test("Should return anonymous post", async () => {
      const caller = createTRPCRouter({
        ...mutationExample,
      }).createCaller({ session: null })

      expect(await caller.mutationExample(input)).toEqual(
        expect.objectContaining({
          title: input.text,
          authorId: null,
        })
      )
    })
  })

  describe("GIVEN an authenticated user", () => {
    test("Should return post with Author field", async () => {
      const caller = createTRPCRouter({
        ...mutationExample,
      }).createCaller({
        session: {
          user: {
            id: "123",
            name: "test user",
            email: "test@test.com",
          },
        } as Session,
      })

      prismaMock.post.create.mockResolvedValue({
        id: "123",
        createdAt: new Date(),
        published: false,
        updatedAt: new Date(),
        title: "Just a message to show how the mutation endpoint works",
        authorId: "123",
      })

      expect(await caller.mutationExample(input)).toEqual(
        expect.objectContaining({
          title: input.text,
          authorId: "123",
        })
      )
    })
  })
})
