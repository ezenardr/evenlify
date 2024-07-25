// @ts-nocheck
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { database } from "@/database/databaseConnection";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { verify } from "argon2";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        // if (credentials?.email && credentials?.password) {
        const user = await database
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));
        if (!user)
          throw new Error(
            "There is no user with this email. Please Create an account",
          );
        try {
          const verifyPassword = await verify(
            user[0].password,
            credentials.password,
          );
          if (verifyPassword) {
            const { password, ...userWithoutPassword } = user[0];

            return userWithoutPassword;
          }
        } catch (e) {
          console.log(e);
        }
        // }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export default authOptions;
