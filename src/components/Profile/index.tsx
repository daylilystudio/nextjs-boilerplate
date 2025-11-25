'use cache: private';

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { getIsLogin, getSession } from '@/lib/auth';

import LoginButton from '../LoginButton';

export default async function Profile() {
  const session = await getSession();
  const isLogin = await getIsLogin();
  const t = await getTranslations();

  return (
    <>
      {isLogin && (
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={session?.user?.image || ''}
            alt={session?.user?.name || ''}
          />
          {t('home.greet') + session?.user?.email}
        </div>
      )}
      <LoginButton isLogin={isLogin} />
    </>
  );
}
