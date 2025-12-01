import './globals.css';

import NotFound from '@/components/NotFound';
import { zenMaruGothic } from '@/utils/const';

// 處理 「連語系都無法辨識」 或 「根路徑錯誤」 的情況
// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${zenMaruGothic.variable} antialiased`}>
      <body>
        <NotFound lng="en" />
      </body>
    </html>
  );
}
