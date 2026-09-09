import type { Locale } from './portfolio'

// Production redirects the apex domain to www; canonical URLs must match it.
export const siteUrl = 'https://www.giovannivicentin.com'
export const localePaths = { br: '/pt', en: '/en', es: '/es' } as const
export const languageTags = { br: 'pt-BR', en: 'en-US', es: 'es-ES' } as const
export const languageNames = {
  br: 'Português',
  en: 'English',
  es: 'Español',
} as const
export const languageAlternates = {
  'pt-BR': `${siteUrl}/pt`,
  en: `${siteUrl}/en`,
  es: `${siteUrl}/es`,
  'x-default': `${siteUrl}/`,
}

export function localizedUrl(locale: Locale) {
  return `${siteUrl}${localePaths[locale]}`
}
