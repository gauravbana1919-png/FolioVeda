import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://folioin.dev';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/p/*', '/styles', '/resume', '/onboarding', '/hub'],
        disallow: ['/api/*', '/dashboard'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
