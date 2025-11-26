'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function LoginButton() {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const isLogin = !!session;
  return (
    <button
      disabled={status === 'loading'}
      onClick={isLogin ? () => signOut() : () => signIn('google')}
      className="px-8 cursor-pointer rounded-full transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50 font-medium h-12 w-full"
    >
      {status === 'loading' ? (
        <svg
          className="mx-auto size-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : isLogin ? (
        t('common.signout')
      ) : (
        `Google ${t('common.signin')}`
      )}
    </button>
  );
}
