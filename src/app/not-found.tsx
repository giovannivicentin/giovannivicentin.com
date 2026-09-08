import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { displayName } from '@/lib/portfolio'

export default async function NotFound() {
  const locale = await getLocale()
  const { NotFoundPage: t } = (await import(`../../messages/${locale}.json`))
    .default

  return (
    <main className="site-frame section-pad not-found">
      <Link className="wordmark" href="/">
        <span className="brand-symbol" aria-hidden="true">
          gv_
        </span>
        <span>{displayName}</span>
      </Link>
      <p className="eyebrow">404</p>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
      <Link className="not-found-back" href="/">
        {t.back} ↗
      </Link>
    </main>
  )
}
