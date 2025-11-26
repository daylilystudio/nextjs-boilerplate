'use cache';
import '../globals.css';

import { AppProgressProvider } from '@bprogress/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Zen_Maru_Gothic } from 'next/font/google';
import {
  getMessages,
  getTimeZone,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

// import FacebookSDK from '@/components/FacebookSDK';
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
    facebook: {
      appId: 'FB_APP_ID',
      admins: 'FB_ADMINS',
    },
    other: {
      'p:domain_verify': 'PINTEREST_VERIFY',
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
        {/* TO DO: Replace with your GTM ID */}
        <GoogleTagManager gtmId="GTM-XXXXXX" />
        {/* TO DO: Replace with your Facebook App ID */}
        {/* <FacebookSDK /> */}
        <NextIntlProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          <AppProgressProvider
            height="4px"
            color="#37ccd4"
            options={{ showSpinner: false }}
            shallowRouting
          >
            {children}
          </AppProgressProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
