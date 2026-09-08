import { locales, type Locale } from './portfolio'

// Both language controls share the same persistent preference.
export function rememberLanguage(locale: Locale) {
  if (!locales.includes(locale)) return
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
}
