'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LocalSwitcher } from './local-switcher'
import { ModeToggle } from './mode-toggle'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

export function Navbar() {
  return (
    <nav className="z-10">
      <div className="hidden items-center justify-between md:flex">
        <ul className="mr-2 items-center gap-4 md:flex">
          <li className="cursor-pointer hover:underline">Projects</li>
          <li className="cursor-pointer hover:underline">
            <HoverCard>
              <HoverCardTrigger>Contact</HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-2">
                <Button variant="default">
                  <Link
                    href="https://github.com/giovannivicentin"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile of Giovanni Vicentin"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Image
                      src="/icons/github.svg"
                      alt="GitHub icon"
                      width={15}
                      height={15}
                      className="h-6 w-6 invert dark:invert-0 md:h-5 md:w-5"
                    />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline">
                  <Link
                    href="https://www.linkedin.com/in/giovannivicentin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile of Giovanni Vicentin"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Image
                      src="/icons/linkedin.svg"
                      alt="LinkedIn icon"
                      width={15}
                      height={15}
                      className="h-6 w-6 dark:invert md:h-5 md:w-5"
                    />
                    LinkedIn
                  </Link>
                </Button>
              </HoverCardContent>
            </HoverCard>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link href="/resume/giovanni-vicentin-resume.pdf">Resume</Link>
          </li>
        </ul>
        <ModeToggle />
        <LocalSwitcher />
      </div>
      <div className="flex items-center justify-end md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center justify-start gap-8 pt-20 text-xl">
            <Link
              href="/projects"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/icons/code.svg"
                height={20}
                width={20}
                alt="code icon"
                className="h-6 w-6 dark:invert md:h-5 md:w-5"
              />
              Projects
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/icons/contact.svg"
                height={20}
                width={20}
                alt="contact icon"
                className="h-6 w-6 dark:invert md:h-5 md:w-5"
              />
              Contact
            </Link>
            <Link
              href="/resume/giovanni-vicentin-resume.pdf"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/icons/resume.svg"
                height={20}
                width={20}
                alt="resume icon"
                className="h-6 w-6 dark:invert md:h-5 md:w-5"
              />
              Resume
            </Link>
            <div className="flex gap-1">
              <ModeToggle />
              <LocalSwitcher />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
