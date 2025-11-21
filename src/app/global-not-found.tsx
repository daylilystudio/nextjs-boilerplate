import './globals.css';

import { SITE_URL } from '@/utils/const';

// 此頁放在 [locale] 裡會無法找到自訂 404 頁面
// 無法使用語系，因為此頁在 locale 路由之外
export default function RootNotFound() {
  return (
    <html>
      <body>
        <div className="font-sans flex flex-col items-center justify-center min-h-screen gap-5">
          <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>404</h1>
          <p style={{ fontSize: '1.125rem' }}>找不到頁面</p>
          <div>
            {/* 用 next/link 會停滯在此頁，故改用 <a> */}
            <a
              className="text-gray-400 hover:text-blue-500 transition-colors"
              href={SITE_URL}
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
