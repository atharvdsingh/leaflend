import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler= NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // JWT callback
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.id = user.id; // store user id in token
      return token;
    },
    // Session callback
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) session.user.id = token.id as string; // typecast to string
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  
})



export { handler as GET, handler as POST };
