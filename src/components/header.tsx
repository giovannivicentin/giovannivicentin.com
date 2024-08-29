import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { LocalSwitcher } from './local-switcher'
import { ModeToggle } from './mode-toggle'
import { Navbar } from './navbar'

export function Header() {
  const h = useTranslations('Header')
  const t = useTranslations('Navigation')

  return (
    <header className="fixed z-40 flex w-full items-center justify-between bg-background/90 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-transparent hover:dark:brightness-75"
      >
        <Image
          src="/images/logos/white-icon.svg"
          alt={h('logoAlt')}
          width={24}
          height={24}
          className="h-6 w-6 text-primary invert dark:invert-0"
        />
        <span className="hidden text-lg font-semibold md:block">
          Giovanni Vicentin
        </span>
      </Link>
      <Navbar
        projects={t('projects')}
        contact={t('contact')}
        github={t('github')}
        linkedin={t('linkedin')}
        resume={t('resume')}
      >
        <ModeToggle />
        <LocalSwitcher />
      </Navbar>
    </header>
  )
}
