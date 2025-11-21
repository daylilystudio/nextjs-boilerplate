import '../globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import {
  getMessages,
  getTimeZone,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { NextIntlProvider } from '@/components/NextIntlProvider';
import { SITE_URL } from '@/utils/const';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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

export default async function RootLayout({
  modal,
  children,
  params,
}: Readonly<{
  modal: React.ReactNode;
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          {children}
          {modal}
        </NextIntlProvider>
      </body>
    </html>
  );
}
