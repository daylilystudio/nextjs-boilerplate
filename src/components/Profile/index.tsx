'use cache: private';
// 個人資訊似乎還沒有快取功能：
// https://github.com/vercel/next.js/issues/85672

import Image from 'next/image';
import {Locale} from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/lib/auth';

export default async function Profile({locale}: {locale: Locale}) {
  const session = await getSession();
  const t = await getTranslations({
    locale,
    namespace: 'home'
  });

  return (
    <div className="flex items-center gap-3 h-8">
      {session && (
        <>
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={session?.user?.image || ''}
            alt={session?.user?.name || ''}
          />
          {t('greet') + session?.user?.email}
        </>
      )}
    </div>
  );
}
