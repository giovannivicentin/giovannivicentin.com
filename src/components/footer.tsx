import { useLocale, useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { displayName, links, locales } from '@/lib/portfolio'
import { languageNames, languageTags, localePaths } from '@/lib/site'
export function Footer() {
  const t = useTranslations('Portfolio')
  const locale = useLocale()
  return (
    <footer className="site-frame site-footer">
      <div>
        <span>
          © {new Date().getFullYear()} {displayName}
        </span>
        <p>{t('built')}</p>
        <nav aria-label={t('language')} className="footer-languages">
          {locales.map((value) => (
            <a
              key={value}
              href={localePaths[value]}
              hrefLang={languageTags[value]}
              lang={languageTags[value]}
              aria-current={value === locale ? 'page' : undefined}
            >
              {languageNames[value]}
            </a>
          ))}
        </nav>
      </div>
      <nav aria-label={t('career')}>
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn{' '}
          <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <a href={links.resume} target="_blank" rel="noreferrer">
          {t('resume')}{' '}
          <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </nav>
    </footer>
  )
}
