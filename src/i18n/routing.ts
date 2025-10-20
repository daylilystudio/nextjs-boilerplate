import { defineRouting } from 'next-intl/routing';

export const locales = ['zh-TW', 'en'];
export const defaultLocale = locales[0];
export const localePrefix = 'as-needed';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
