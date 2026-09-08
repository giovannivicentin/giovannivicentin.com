import { headers } from 'next/headers'
import { displayName, locales, type Locale } from '@/lib/portfolio'
import './[locale]/globals.css'

export default async function NotFound() {
  // The locale middleware also covers unknown paths below /br, /en and /es.
  const requestedLocale = (await headers()).get('x-next-intl-locale')
  const locale = locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : 'br'
  const { NotFoundPage: t } = (await import(`../../messages/${locale}.json`))
    .default

  return (
    <html lang={locale === 'br' ? 'pt-BR' : locale} className="dark">
      <body>
        <main className="site-frame section-pad not-found">
          <a className="wordmark" href={`/${locale}`}>
            <span className="brand-symbol" aria-hidden="true">
              gv_
            </span>
            <span>{displayName}</span>
          </a>
          <p className="eyebrow">404</p>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
          <a className="not-found-back" href={`/${locale}`}>
            {t.back} ↗
          </a>
        </main>
      </body>
    </html>
  )
}
