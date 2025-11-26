import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { cookies } from 'next/headers';
import { type AuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
          prompt: 'select_account',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt', // 用 JWT 就不用去 database 請求資料
  },
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
    // JWT Callback: 當使用 JWT 策略時，將 user.id 放入 token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Session Callback: 支援 JWT 和 Database 兩種策略
    async session({ session, token, user }) {
      if (session.user) {
        // 如果是 JWT 策略，ID 在 token 中
        if (token && token.id) {
          (session.user as { id: string }).id = token.id as string;
        }
        // 如果是 Database 策略，ID 在 user 中
        else if (user && user.id) {
          (session.user as { id: string }).id = user.id;
        }
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
