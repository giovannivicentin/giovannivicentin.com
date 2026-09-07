'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { locales } from '@/lib/portfolio'
export function LocalSwitcher() {
  const locale = useLocale()
  const t = useTranslations('Portfolio')
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <select
      className="locale-select"
      value={locale}
      aria-label={t('language')}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value
        startTransition(() =>
          router.replace(`/${next}${window.location.hash}`, { scroll: false }),
        )
      }}
    >
      {locales.map((value) => (
        <option key={value} value={value}>
          {value === 'br' ? 'PT' : value.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
