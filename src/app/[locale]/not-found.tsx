'use client';

import { useTranslations } from 'next-intl';

import NotFound from '@/components/NotFound';

// Note that `app/[locale]/[...rest]/page.tsx` is necessary for this page to render.
export default function NotFoundPage() {
  const t = useTranslations('common');

  return (
    <NotFound
      notFoundText={t('not_found')}
      backToHomeText={t('back_to_home')}
    />
  );
}
