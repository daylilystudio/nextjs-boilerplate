import { defineRouting } from 'next-intl/routing';

export enum Locale {
  ZH_TW = 'zh-TW',
  EN = 'en',
}
export const locales = [Locale.ZH_TW, Locale.EN];
export const defaultLocale = locales[0];
export const localePrefix = 'as-needed';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
