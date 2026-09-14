import { headers } from 'next/headers'
import type { Locale } from './portfolio'
import { localizedUrl, siteUrl } from './site'

export async function canonicalUrl(locale: Locale) {
  // Read the public path captured before localized URLs are rewritten to /.
  const pathname = (await headers()).get('x-portfolio-pathname')
  return pathname === '/' ? `${siteUrl}/` : localizedUrl(locale)
}
