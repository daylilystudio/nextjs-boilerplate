'use cache';
import '../globals.css';

import { Zen_Maru_Gothic } from 'next/font/google';
import {
  getMessages,
  getTimeZone,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { NextIntlProvider } from '@/components/NextIntlProvider';
import { locales } from '@/i18n/routing';
import { SITE_URL } from '@/utils/const';

const zenMaruGothic = Zen_Maru_Gothic({
  variable: '--font-zen-maru-gothic',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return {
    metadataBase: SITE_URL,
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      url: SITE_URL,
      title: t('title'),
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
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${zenMaruGothic.variable} antialiased`}
      >
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
