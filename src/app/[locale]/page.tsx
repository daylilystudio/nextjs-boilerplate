import { Suspense } from 'react';

import Contact from '@/components/Contact';
import FacebookLikeButton from '@/components/FacebookLikeButton';
import LangSwitcher from '@/components/LangSwitcher';
import LoginButton from '@/components/LoginButton';
import Profile from '@/components/Profile';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Suspense>
          <Profile />
        </Suspense>
        <LoginButton />
        <Suspense>
          <Contact />
        </Suspense>
        <FacebookLikeButton />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <LangSwitcher />
      </footer>
    </div>
  );
}
