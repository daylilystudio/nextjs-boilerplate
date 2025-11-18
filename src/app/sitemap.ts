import type { MetadataRoute } from 'next'

export const siteUrl = process.env.NEXTAUTH_URL;
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl!,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}