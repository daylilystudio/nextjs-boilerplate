import { defaultLocale } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import "./globals.css";

// 這個頁面無法被翻譯，因為它在 locale 路由之外
export default async function RootNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <html lang={locale}>
      <body>
        <div className="font-sans flex flex-col items-center justify-center min-h-screen gap-5">
          <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>{t('404.title')}</h1>
          <p style={{ fontSize: '1.125rem' }}>{t('404.description')}</p>
          <div>
            {/* 提供明確的語言連結 */}
            <Link className='text-gray-400 hover:text-blue-500 transition-colors' href={locale!==defaultLocale ? `/${locale}`:`/`}>{t('backToHome')}</Link>
          </div>
        </div>
       </body>
     </html>
  );
}