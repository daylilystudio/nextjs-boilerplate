import { MetadataRoute } from 'next';

import { siteUrl } from './sitemap';

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
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
