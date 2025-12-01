import './globals.css';

import { Metadata } from 'next';

import { SITE_URL, zenMaruGothic } from '@/utils/const';

// 處理 「連語系都無法辨識」 或 「根路徑錯誤」 的情況
// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives an invalid value as the `[locale]` param and calls `notFound()`.

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html className={`${zenMaruGothic.variable} antialiased`}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center">
          <h2 className="text-4xl font-bold">404</h2>
          <p className="text-xl">Page not found</p>
          <a
            href={SITE_URL}
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
          >
            Back to Home
          </a>
        </div>
      </body>
    </html>
  );
}
