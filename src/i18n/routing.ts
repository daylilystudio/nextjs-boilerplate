import { defineRouting } from 'next-intl/routing';

export enum Locale {
  ZH_TW = 'zh-TW',
  EN = 'en',
}
export const locales = [Locale.ZH_TW, Locale.EN];
export const defaultLocale = Locale.ZH_TW;
export const localePrefix = 'as-needed';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
