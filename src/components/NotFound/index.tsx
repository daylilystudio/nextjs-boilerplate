import Link from 'next/link';

import type { Locale } from '@/i18n/routing';

const translations = {
  'zh-TW': {
    notFound: '找不到頁面',
    backToHome: '返回首頁',
  },
  en: {
    notFound: 'Page not found',
    backToHome: 'Back to Home',
  },
} as const;

export default function NotFound({ lng }: { lng: Locale }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-xl">{translations?.[lng]?.notFound}</p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
      >
        {translations[lng].backToHome}
      </Link>
    </div>
  );
}
