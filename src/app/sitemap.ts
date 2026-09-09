import type { MetadataRoute } from 'next'
import { locales } from '@/lib/portfolio'
import { languageAlternates, localizedUrl } from '@/lib/site'
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale),
    alternates: { languages: languageAlternates },
  }))
}
