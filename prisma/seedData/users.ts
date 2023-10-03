export interface UserSeedData {
  id: string
  email: string
  name: string
}

export const SEED_USER_UUID = "my-unique-user-uuid"
export const usersSeed: UserSeedData[] = [
  {
    id: `${SEED_USER_UUID}1`,
    email: "seed.user1@everest.engineering",
    name: "Seedy McSeedface",
  },
  {
    id: `${SEED_USER_UUID}2`,
    email: "seed.user2@everest.engineering",
    name: "Seeden Seedgal",
  },
]
