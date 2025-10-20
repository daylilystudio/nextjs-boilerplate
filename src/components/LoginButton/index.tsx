"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginButton({isLogin} : {isLogin: boolean}) {
  return (
    <button onClick={isLogin ? () => signOut() : () => signIn("google")} className="px-8 cursor-pointer rounded-full transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium h-12 w-full">
      {isLogin ? '登出' : '使用 Google 登入'}
    </button>
  );
}
