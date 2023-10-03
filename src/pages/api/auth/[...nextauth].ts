import NextAuth from "next-auth"
import { authOptions } from "~/server/external/auth"

export default NextAuth(authOptions)
