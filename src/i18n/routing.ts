import { defineRouting } from 'next-intl/routing';

export const locales = ['zh-TW', 'en'] as const;
export type Locale = (typeof locales)[number];
export const localesMap: { [key: string]: string } = {
  'zh-TW': '繁體中文',
  en: 'English',
};
export const defaultLocale = locales[0];
export const localePrefix = 'as-needed';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
