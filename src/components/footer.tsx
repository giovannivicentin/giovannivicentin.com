import { useTranslations } from 'next-intl'
import { displayName, links } from '@/lib/portfolio'
export function Footer() {
  const t = useTranslations('Portfolio')
  return (
    <footer className="site-frame site-footer">
      <div>
        <span>
          © {new Date().getFullYear()} {displayName}
        </span>
        <p>{t('built')}</p>
      </div>
      <nav aria-label={t('career')}>
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={links.resume} target="_blank" rel="noreferrer">
          {t('resume')} ↗
        </a>
      </nav>
    </footer>
  )
}
