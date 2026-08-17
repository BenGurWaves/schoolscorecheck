import { MetadataRoute } from 'next';
import { US_STATES, TOP_CITIES } from '@/lib/data/states';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://schoolscorecheck.calyvent.com';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const statePages = US_STATES.map((state) => ({
    url: `${baseUrl}/schools/${state.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const cityPages = TOP_CITIES.map((city) => ({
    url: `${baseUrl}/schools/${city.state.toLowerCase()}/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...statePages, ...cityPages];
}
