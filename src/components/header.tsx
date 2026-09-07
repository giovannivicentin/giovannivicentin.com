import { useTranslations } from 'next-intl'
import { sections } from '@/lib/portfolio'
import { LocalSwitcher } from './local-switcher'
import { CommandPalette } from './command-palette'

export function Header() {
  const t = useTranslations('Portfolio')
  return (
    <>
      <a className="skip-link" href="#main">
        {t('skip')}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="wordmark"
            href="#presentation"
            aria-label="Giovanni Vicentin"
          >
            <span className="brand-symbol" aria-hidden="true">
              gv<span>_</span>
            </span>
            <span className="brand-name">Giovanni Vicentin</span>
          </a>
          <nav aria-label={t('navigation')} className="desktop-nav">
            {sections.map((section) => (
              <a key={section} href={`#${section}`}>
                {t(section)}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <LocalSwitcher />
            <CommandPalette />
          </div>
        </div>
      </header>
    </>
  )
}
