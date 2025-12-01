import { getTranslations } from 'next-intl/server';

import NotFound from '@/components/NotFound';

// Note that `app/[locale]/[...rest]/page.tsx` is necessary for this page to render.
export default async function NotFoundPage() {
  const t = await getTranslations('common');

  return (
    <NotFound
      notFoundText={t('not_found')}
      backToHomeText={t('back_to_home')}
    />
  );
}
