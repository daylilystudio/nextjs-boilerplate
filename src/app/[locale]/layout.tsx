import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getMessages, getTimeZone, getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlProvider } from "@/components/NextIntlProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({params}:{params: Promise<{ locale: string }>;}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'common'});
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      url: 'https://example.com',
      title: t('title'),
      description: t('description'),
      Images: {
        url: 'https://example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: t('title'),
      },
    }
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlProvider locale={locale} messages={messages} timeZone={timeZone}>
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}
