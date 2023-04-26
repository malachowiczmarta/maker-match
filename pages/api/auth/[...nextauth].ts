import NextAuth, { Account, Profile } from "next-auth";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    {
      id: "customProvider",
      name: "CustomProvider",
      type: "oauth",
      // @ts-ignore
      scope: "read:user, user:email",
    },
  ],

  callbacks: {
    // @ts-ignore
    async signIn(profile: Profile | undefined, account: Account | null) {
      if (account?.provider === "github") {
        const res = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.accessToken}`,
          },
        });
        const emails = await res.json();
        if (!emails || emails.length === 0) {
          return;
        }
        const sortedEmails = emails.sort(
          (a: any, b: any) => b.primary - a.primary
        );
        profile ? (profile.email = sortedEmails[0].email) : null;
      }
    },
  },

  adapter: PrismaAdapter(prisma),
});
