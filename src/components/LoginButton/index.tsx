'use client';

import { signIn, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function LoginButton({ isLogin }: { isLogin: boolean }) {
  const t = useTranslations();
  return (
    <button
      onClick={isLogin ? () => signOut() : () => signIn('google')}
      className="px-8 cursor-pointer rounded-full transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium h-12 w-full"
    >
      {isLogin ? t('common.signout') : `Google ${t('common.signin')}`}
    </button>
  );
}
