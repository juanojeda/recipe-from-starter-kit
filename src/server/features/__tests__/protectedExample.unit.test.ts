import type { Session } from "next-auth"
import { expect, test } from "@jest/globals"
import { createTRPCRouter } from "~/server/middleware/trpc"
import { protectedExample } from "~/server/features/protectedExample"
import { prismaMock } from "~/server/external/__mocks__/prisma"

describe("protectedExample", () => {
  test("Should throw error for unauthed users", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      id: "testUserId",
      name: "Basil Brush",
      email: "basil@brush.com",
      createdAt: new Date(),
      emailVerified: null,
      role: "USER",
      image: null,
    })

    const mockedPosts = [
      {
        id: "postId",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        title: "A fake post",
        authorId: "testUserId",
        author: {
          id: "testUserId",
          createdAt: new Date(),
          email: "basil@brush.com",
          emailVerified: null,
          image: null,
          name: "Basil Brush",
          role: "USER",
        },
      },
    ]

    prismaMock.post.findMany.mockResolvedValue(mockedPosts)

    const caller = createTRPCRouter({
      ...protectedExample,
    }).createCaller({ session: null })

    await expect(caller.protectedExample()).rejects.toThrow("UNAUTHORIZED")
  })

  test("Should return the user object from the db, and all posts from the db", async () => {
    const VALID_SESSION: Session = {
      expires: new Date().toISOString(),
      user: { id: "testUserId", name: "Basil Brush", email: "basil@brush.com" },
    }
    const caller = createTRPCRouter({
      ...protectedExample,
    }).createCaller({ session: VALID_SESSION })

    expect(await caller.protectedExample()).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({ id: "testUserId" }),
        allPosts: [
          expect.objectContaining({
            author: expect.objectContaining({ name: "Basil Brush" }),
          }),
        ],
      })
    )
  })
})
