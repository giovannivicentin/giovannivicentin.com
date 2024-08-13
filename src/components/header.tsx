import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from './navbar'

export function Header() {
  return (
    <header className="fixed flex w-full items-center justify-between bg-background px-4 py-3 md:px-6 md:py-4">
      <Link href="/" className="group flex items-center gap-2">
        <Briefcase className="h-6 w-6 text-primary group-hover:text-muted-foreground" />
        <span className="text-lg font-semibold group-hover:text-muted-foreground">
          Giovanni Vicentin
        </span>
      </Link>
      <Navbar />
    </header>
  )
}
