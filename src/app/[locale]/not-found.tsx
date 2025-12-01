import { getLocale, setRequestLocale } from 'next-intl/server';

import NotFound from '@/components/NotFound';
import { type Locale } from '@/i18n/routing';

// Note that `app/[locale]/[...rest]/page.tsx` is necessary for this page to render.
export default async function NotFoundPage() {
  // Use getLocale() since not-found.tsx doesn't receive params
  const locale = (await getLocale()) as Locale;

  setRequestLocale(locale);

  return <NotFound lng={locale} />;
}
