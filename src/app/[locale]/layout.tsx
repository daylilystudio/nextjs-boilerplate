'use cache';
import '../globals.css';

import { GoogleTagManager } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import {
  getMessages,
  getTimeZone,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

// import FacebookSDK from '@/components/FacebookSDK';
import { NextIntlProvider } from '@/components/NextIntlProvider';
import { routing } from '@/i18n/routing';
import { SITE_URL, zenMaruGothic } from '@/utils/const';

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return {
    metadataBase: SITE_URL,
    title: t('title'),
    description: t('description'),
    openGraph: {
      locale,
      type: 'website',
      url: SITE_URL,
      title: t('title'),
      siteName: t('title'),
      description: t('description'),
      Images: {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: t('title'),
      },
    },
  };
}

// 解決 cacheComponents 啟用時，locale 無法正確產生靜態頁面的問題
// https://github.com/aurorascharff/next-intl-cache-components
// https://aurorascharff.no/posts/implementing-nextjs-16-use-cache-with-next-intl-internationalization/
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html suppressHydrationWarning lang={locale} className={`${zenMaruGothic.variable} antialiased`}>
      <body suppressHydrationWarning>
        {/* TO DO: Replace with your GTM ID */}
        <GoogleTagManager gtmId="GTM-XXXXXX" />
        <NextIntlProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}
