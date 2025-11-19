import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import LangSwitcher from '@/components/LangSwitcher';
import LoginButton from '@/components/LoginButton';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();
  const t = await getTranslations();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        {session && (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={session.user?.image}
                alt={session.user?.name || ''}
              />
            )}
            {t('home.greet') + session.user?.email}
          </div>
        )}
        <LoginButton isLogin={!!session} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <LangSwitcher />
      </footer>
    </div>
  );
}
