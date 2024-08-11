import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import { LocalSwitcher } from './local-switcher'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="flex items-center justify-between bg-background px-4 py-3 md:px-6 md:py-4">
      <Link href="/" className="group flex items-center gap-2">
        <Briefcase className="h-6 w-6 text-primary group-hover:text-muted-foreground" />
        <span className="text-lg font-semibold group-hover:text-muted-foreground">
          Giovanni Vicentin
        </span>
      </Link>

      <div className="flex items-center">
        <nav>
          <ul className="mr-2 flex items-center gap-4">
            <li className="cursor-pointer hover:underline">Projects</li>
            <li className="cursor-pointer hover:underline">Contact</li>
            <li className="cursor-pointer hover:underline">Resume</li>
          </ul>
        </nav>
        <ModeToggle />
        <LocalSwitcher />
      </div>
    </header>
  )
}
