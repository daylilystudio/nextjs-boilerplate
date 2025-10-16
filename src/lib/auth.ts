import { getServerSession } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // next-auth 預設不完全信任第三方 OAuth 提供者回傳的「信箱已驗證」狀態。所以要手動更新
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile: any;
    }) {
      if (
        account?.provider === "google" &&
        profile?.email_verified === true &&
        user.emailVerified === null
      ) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: profile.email_verified },
        });
      }
      return true;
    },
    async session({ session, user }: { session: any; user: any }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // production necessary
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getSession() {
  return await getServerSession(authOptions);
}
