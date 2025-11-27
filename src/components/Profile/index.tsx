'use cache: private';
// 個人資訊似乎還沒有快取功能：
// https://github.com/vercel/next.js/issues/85672

import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/lib/auth';

export default async function Profile() {
  cacheLife({ revalidate: 3600 });
  cacheTag('profile');
  const session = await getSession();
  const t = await getTranslations();

  return (
    <div className="flex items-center gap-3">
      {session && (
        <>
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={session?.user?.image || ''}
            alt={session?.user?.name || ''}
          />
          {t('home.greet') + session?.user?.email}
        </>
      )}
    </div>
  );
}
