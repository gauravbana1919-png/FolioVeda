import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://folioin.dev';
  const lastModified = new Date();

  const publicRoutes = [
    '',
    '/styles',
    '/resume',
    '/portfolio/preview',
    '/onboarding',
    '/inspiration',
    '/hub',
    '/brand',
    '/security',
    '/legal/terms',
    '/legal/takedown',
    '/p/demo',
    '/p/Aarav%20Sharma',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/styles' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/styles' || route === '/resume' ? 0.9 : 0.7,
  }));
}
