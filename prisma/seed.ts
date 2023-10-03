import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

async function runSeeds() {
  // Seed your data

  const SEED_USER_UUID = "my-unique-user-uuid"
  const SEED_POST_UUID = "my-unique-post-uuid"

  const seedUser1 = {
    id: `${SEED_USER_UUID}1`,
    email: "seed.user1@everest.engineering",
    name: "Seedy McSeedface",
  }

  const seedUser2 = {
    id: `${SEED_USER_UUID}2`,
    email: "seed.user2@everest.engineering",
    name: "Seeden Seedgal",
  }

  const seedPost = {
    id: SEED_POST_UUID,
    title: "Creating a a seed post",
    authorId: seedUser1.id,
  }

  await prisma.user.upsert({
    where: { id: seedUser1.id },
    create: seedUser1,
    update: seedUser1,
  })

  await prisma.user.upsert({
    where: { id: seedUser2.id },
    create: seedUser2,
    update: seedUser2,
  })

  await prisma.post.upsert({
    where: { id: seedPost.id },
    create: seedPost,
    update: seedPost,
  })
}

void runSeeds()
