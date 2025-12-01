import { setRequestLocale } from 'next-intl/server';

import NotFound from '@/components/NotFound';
import { type Locale, locales } from '@/i18n/routing';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Note that `app/[locale]/[...rest]/page.tsx` is necessary for this page to render.
export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NotFound lng={locale} />;
}
