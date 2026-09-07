import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    'pt-BR': 'https://giovannivicentin.com/br',
    'en-US': 'https://giovannivicentin.com/en',
    'es-ES': 'https://giovannivicentin.com/es',
  }
  return Object.values(languages).map((url) => ({
    url,
    alternates: { languages },
  }))
}
