import { useProgress } from '@bprogress/next';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { useRouter as useIntlRouter } from '@/i18n/navigation';

export function useProgressRouter() {
  const router = useIntlRouter();
  const { start } = useProgress();

  const push = (href: string, options?: NavigateOptions) => {
    start();
    router.push(href, options);
  };

  const replace = (href: string, options?: NavigateOptions) => {
    start();
    router.replace(href, options);
  };

  return { ...router, push, replace };
}
