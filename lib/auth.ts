import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  debug: true, // Production fix → debug: false
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.userId = user.id;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        return (
          profile?.email_verified && profile?.email?.endsWith("@example.com")
        );
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export const getSession = async () => {
  return await auth();
};
