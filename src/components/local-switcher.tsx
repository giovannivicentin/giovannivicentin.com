'use client'

import { ChevronDown, Globe2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { rememberLanguage } from '@/lib/language'
import { locales } from '@/lib/portfolio'
import { useScrollController } from './motion/experience-provider'

const languageNames = {
  br: 'Português',
  en: 'English',
  es: 'Español',
} as const

const languageCodes = {
  br: 'PT',
  en: 'EN',
  es: 'ES',
} as const

export function LocalSwitcher() {
  const locale = useLocale() as (typeof locales)[number]
  const t = useTranslations('Portfolio')
  const router = useRouter()
  const scroll = useScrollController()
  const [pending, startTransition] = useTransition()

  function changeLocale(next: string) {
    if (next === locale || !locales.includes(next as typeof locale)) return
    scroll.cancel()
    rememberLanguage(next as typeof locale)
    startTransition(() => router.refresh())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="locale-trigger"
          aria-label={t('language')}
          disabled={pending}
        >
          <Globe2 data-icon="inline-start" aria-hidden="true" />
          <span className="mono">{languageCodes[locale]}</span>
          <ChevronDown data-icon="inline-end" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="locale-menu">
        <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={locale} onValueChange={changeLocale}>
            {locales.map((value) => (
              <DropdownMenuRadioItem
                key={value}
                value={value}
                aria-label={languageNames[value]}
              >
                <span>{languageNames[value]}</span>
                <span className="locale-code mono" aria-hidden="true">
                  {languageCodes[value]}
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
