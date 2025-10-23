import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/util/Prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * Runs on every sign-in attempt.
     * Ensures the user exists in the Prisma DB.
     */
    async signIn({ user }) {
      try {
        const existingUser = await prisma.users.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.users.create({
            data: {
              email: user.email!,
              name: user.name!,
              password: "", // placeholder, since Google auth
            },
          });
        }

        return true;
      } catch (error) {
        console.error("❌ signIn error:", error);
        return false;
      }
    },

    /**
     * Attaches Prisma user ID to the JWT token.
     */
    async jwt({ token, user }) {
      try {
        // Run only when user logs in
        if (user) {
          let dbUser = await prisma.users.findUnique({
            where: { email: user.email! },
            select: { id: true },
          });

          // Create user if not found (edge case)
          if (!dbUser) {
            dbUser = await prisma.users.create({
              data: {
                email: user.email!,
                name: user.name!,
                password: "",
              },
              select: { id: true },
            });
          }

          token.id = String(dbUser.id); // ✅ your real Prisma user ID
        }

        return token;
      } catch (error) {
        console.error("❌ jwt callback error:", error);
        return token;
      }
    },

    /**
     * Exposes the ID from JWT to the client session.
     */
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = Number(token.id);
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Default NextAuth route handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
