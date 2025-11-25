import Link from 'next/link';
import { Suspense } from 'react';

import LangSwitcher from '@/components/LangSwitcher';
import Contact from '@/components/Modal/Contact';
import Profile from '@/components/Profile';
import { MODAL_PARAM } from '@/utils/const';

async function ContactModal({
  modal,
}: {
  modal: Promise<string | string[] | undefined>;
}) {
  'use cache: private';
  const modalValue = await modal;
  if (modalValue !== 'contact') return null;
  return <Contact />;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const modal = searchParams.then((sp) => sp[MODAL_PARAM]);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Suspense>
          <Profile />
        </Suspense>
        <Link
          href={`/?${MODAL_PARAM}=contact`}
          className="text-blue-600 hover:underline self-center"
        >
          Contact Me
        </Link>
        <Suspense>
          <ContactModal modal={modal} />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <LangSwitcher />
      </footer>
    </div>
  );
}
