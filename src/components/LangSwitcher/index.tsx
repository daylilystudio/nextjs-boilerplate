'use client';

import { useLocale } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';

import { Link, usePathname } from '@/i18n/navigation';
import { locales, localesMap } from '@/i18n/routing';

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
