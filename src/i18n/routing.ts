import { defineRouting } from 'next-intl/routing';

export const locales = ['zh-TW', 'en'];
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
