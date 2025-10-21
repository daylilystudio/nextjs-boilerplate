import { AuthFetchAuthSession, AuthFetchUserAttributes } from "@/utils/amplify";
import { getTranslations } from "next-intl/server";
// import Link from "next/link";
// 在 multi-zones 環境下，用 Link 連主專案，會有這個錯誤跟一堆404錯誤
// Failed to fetch RSC payload for http://localhost:3000/zh-TW/auth/signin?redirect=%2Fevents%2Fname1. Falling back to browser navigation. TypeError: e[o] is not a function
// issue: https://github.com/vercel/next.js/issues/40481

export default async function Auth({path}:{path?:string}) {
  const session = await AuthFetchAuthSession();
  const attr = await AuthFetchUserAttributes();
  const isSignIn = session?.tokens?.accessToken;
  const email = attr?.email;
  const url = `${process.env.NEXT_PUBLIC_STORE}/auth/${isSignIn ? 'signout' : 'signin'}?redirect=%2Fevents%2F${path ? path : ''}`;
  const t = await getTranslations();
  return (
    <>
      {email && <h2 className="text-xl font-bold">{email}</h2>}
      <a href={url} className="flex items-center justify-center px-8 rounded-full transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium h-12 w-full">{isSignIn ? t('common.signout') : t('common.signin')}</a>
    </>
  );
}
