'use cache: private';

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/lib/auth';

import LoginButton from '../LoginButton';

export default async function Profile() {
  const session = await getSession();
  const t = await getTranslations();

  return (
    <>
      {session && (
        <div className="flex items-center gap-3 h-8">
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
      <LoginButton isLogin={!!session} />
    </>
  );
}
