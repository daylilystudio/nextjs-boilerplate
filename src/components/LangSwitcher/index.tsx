'use client';

import { useLocale } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';

import { Link, usePathname } from '@/i18n/navigation';
import { Locale, locales } from '@/i18n/routing';

const localesMap: { [key in Locale]: string } = {
  [Locale.ZH_TW]: '繁體中文',
  [Locale.EN]: 'English',
};

export default function LangSwitcher({className}: {className?: string}) {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          {currentLocale === locale ? (
            <span className="cursor-default" aria-current="page">
              {localesMap[locale]}
            </span>
          ) : (
            <Link
              href={pathname}
              className="hover:underline opacity-60"
              locale={locale}
            >
              {localesMap[locale]}
            </Link>
          )}
          {index < locales.length - 1 && <span>|</span>}
        </Fragment>
      ))}
    </div>
  );
}
