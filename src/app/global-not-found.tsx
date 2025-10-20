import { defaultLocale } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

// 這個頁面無法被翻譯，因為它在 locale 路由之外
export default async function RootNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <html lang={locale}>
      <body>
        <div style={{
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '4rem 2rem',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>{t('404.title')}</h1>
          <p style={{ fontSize: '1.125rem', marginTop: '1rem' }}>{t('404.description')}</p>
          <div style={{ marginTop: '2rem' }}>
            {/* 提供明確的語言連結 */}
            <Link href={locale!==defaultLocale ? `/${locale}`:`/`}>{t('backToHome')}</Link>
          </div>
        </div>
       </body>
     </html>
  );
}