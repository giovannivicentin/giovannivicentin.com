import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { locales, type Locale } from '@/lib/portfolio'

export default getRequestConfig(async () => {
  const requestHeaders = await headers()
  const routed = requestHeaders.get('x-portfolio-locale')
  const saved = (await cookies()).get('NEXT_LOCALE')?.value
  let locale: Locale = 'br'
  if (locales.includes(routed as Locale)) {
    locale = routed as Locale
  } else if (locales.includes(saved as Locale)) {
    locale = saved as Locale
  } else {
    const preferences = (requestHeaders.get('accept-language') ?? '')
      .split(',')
      .map((entry) => {
        const [tag, ...parameters] = entry.trim().toLowerCase().split(';')
        const quality = parameters.find((part) => part.trim().startsWith('q='))
        return {
          tag: tag.split('-')[0],
          quality: quality ? Number(quality.trim().slice(2)) : 1,
        }
      })
      .filter((entry) => entry.quality > 0 && entry.quality <= 1)
      .sort((a, b) => b.quality - a.quality)
    const preferred = preferences.find(({ tag }) =>
      ['pt', 'en', 'es'].includes(tag),
    )
    if (preferred)
      locale = preferred.tag === 'pt' ? 'br' : (preferred.tag as Locale)
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
