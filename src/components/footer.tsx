import { Github, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-6 text-center text-sm text-muted-foreground">
      <div className="container flex items-center justify-between">
        &copy; {currentYear} Giovanni Vicentin. All rights reserved.
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="sr-only">GitHub Link</span>
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn Link</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
