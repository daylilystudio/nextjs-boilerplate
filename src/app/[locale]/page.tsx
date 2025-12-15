import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Contact from '@/components/Contact';
import LangSwitcher from '@/components/LangSwitcher';
import LoginButton from '@/components/LoginButton';
import Profile from '@/components/Profile';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-xs flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Suspense fallback={<div className='h-8'/>}>
          <Profile locale={locale}/>
        </Suspense>
        <LoginButton />
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <LangSwitcher />
      </footer>
    </div>
  );
}
