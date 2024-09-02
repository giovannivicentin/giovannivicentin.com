import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('Footer')

  return (
    <footer className="bg-muted py-6 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-between px-4 md:px-6">
        <p className="text-sm font-normal text-primary 3xl:text-base 4xl:text-lg">
          &copy; {currentYear} Giovanni Vicentin. {t('rightsReserved')}
        </p>
        <div className="flex items-center">
          <Link
            href="https://www.linkedin.com/in/giovannivicentin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile of Giovanni Vicentin"
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <Image
                src="/images/icons/linkedin.svg"
                height={20}
                width={20}
                alt={t('linkedinIcon')}
                className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
              />
              <span className="sr-only">{t('spanLinkedin')}</span>
            </Button>
          </Link>
          <Link
            href="https://github.com/giovannivicentin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile of Giovanni Vicentin"
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <Image
                src="/images/icons/github.svg"
                height={20}
                width={20}
                alt={t('githubIcon')}
                className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
              />
              <span className="sr-only">{t('spanGithub')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
