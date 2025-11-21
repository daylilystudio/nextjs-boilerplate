import { MetadataRoute } from 'next';

import { SITE_URL } from '@/utils/const';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/', // 禁止爬取 /admin/ 路徑
      },
      {
        userAgent: 'Googlebot', // 專門給 Googlebot 的規則
        allow: '/',
        disallow: '/private/', // Googlebot 不應爬取 /private/
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
