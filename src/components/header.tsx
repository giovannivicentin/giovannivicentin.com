import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from './navbar'

export function Header() {
  return (
    <header className="fixed z-40 flex w-full items-center justify-between bg-background/90 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-transparent hover:dark:brightness-75"
      >
        <Image
          src="/logos/white.svg"
          alt="Logo of Giovanni Vicentin"
          width={24}
          height={24}
          className="h-6 w-6 text-primary invert-0 dark:invert"
        />
        <span className="hidden text-lg font-semibold md:block">
          Giovanni Vicentin
        </span>
      </Link>
      <Navbar />
    </header>
  )
}
