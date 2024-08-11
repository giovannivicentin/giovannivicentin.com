import { Github, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-6 text-center text-sm text-muted-foreground">
      <div className="container flex items-center justify-between">
        &copy; {currentYear} Giovanni Vicentin. All rights reserved.
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/giovannivicentin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile of Giovanni Vicentin"
          >
            <span className="sr-only">GitHub Link</span>
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/giovannivicentin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile of Giovanni Vicentin"
          >
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn Link</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
