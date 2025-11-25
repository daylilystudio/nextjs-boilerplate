import Link from 'next/link';
import { Suspense } from 'react';

import LangSwitcher from '@/components/LangSwitcher';
import Contact from '@/components/Modal/Contact';
import Profile from '@/components/Profile';
import { MODAL_PARAM } from '@/utils/const';

export default async function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Suspense>
          <Profile />
        </Suspense>
        <Link
          href={`/?${MODAL_PARAM}=modal-contact`}
          className="text-blue-600 hover:underline self-center"
        >
          Contact Me
        </Link>
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
