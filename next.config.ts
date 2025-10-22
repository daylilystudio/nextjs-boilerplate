import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  basePath: '/events',
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'cdn.readmoo.tw',
      },
    ],
  },
  // 使用重導將根目錄轉向 basePath (跟主專案無關，給此專案domain用)
  async redirects() {
    return [
      {
        source: '/',
        destination: '/events',
        basePath: false, // 告訴 Next.js 這個重新導向規則*不要*套用 basePath
        permanent: false, // false (307) 或 true (308) 均可
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
