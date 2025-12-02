'use client';

import { useLocale } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';

import { Link, usePathname } from '@/i18n/navigation';
import { Locale, locales } from '@/i18n/routing';

const localesMap: { [key in Locale]: string } = {
  [Locale.ZH_TW]: '繁體中文',
  [Locale.EN]: 'English',
};

export default function LangSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <Link
            href={pathname}
            className={
              currentLocale === locale
                ? 'cursor-default'
                : 'text-gray-400 hover:text-blue-500 transition-colors'
            }
            locale={locale}
          >
            {localesMap[locale]}
          </Link>
          {index < locales.length - 1 && <span>|</span>}
        </Fragment>
      ))}
    </div>
  );
}
