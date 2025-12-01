import { setRequestLocale } from 'next-intl/server';

import NotFound from '@/components/NotFound';
import type { Locale } from '@/i18n/routing';

// Note that `app/[locale]/[...rest]/page.tsx` is necessary for this page to render.
export default async function NotFoundPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NotFound lng={locale} />;
}
