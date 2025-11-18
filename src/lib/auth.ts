import { getServerSession, type AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@/generated/prisma';
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account'
        }
      }
    }),
  ],
  callbacks: {
    // next-auth 預設不完全信任第三方 OAuth 提供者回傳的「信箱已驗證」狀態。所以要手動更新
    async signIn({ user, account, profile }) {
      if (
        account?.provider === 'google' &&
        (profile as { email_verified: boolean })?.email_verified === true &&
        'emailVerified' in user &&
        user.emailVerified === null
      ) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: true },
        });
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as { id: string }).id = user.id;
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
