import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-6 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-between px-4 md:px-6">
        <p className="text-sm font-normal">
          &copy; {currentYear} Giovanni Vicentin. All rights reserved.
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
                alt="LinkedIn Icon"
                className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert"
              />
              <span className="sr-only">LinkedIn Link</span>
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
                alt="GitHub Icon"
                className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert"
              />
              <span className="sr-only">GitHub Link</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
