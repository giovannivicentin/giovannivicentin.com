'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface NavbarProps {
  projects: string
  contact: string
  github: string
  linkedin: string
  resume: string
  githubIcon: string
  linkedinIcon: string
  menuIcon: string
  codeIcon: string
  contactIcon: string
  resumeIcon: string
  children: React.ReactNode
}

export function Navbar({
  projects,
  contact,
  github,
  linkedin,
  resume,
  githubIcon,
  linkedinIcon,
  menuIcon,
  codeIcon,
  contactIcon,
  resumeIcon,
  children,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (sectionId: string) => {
    setIsOpen(false)
    const section = document.getElementById(sectionId)
    const offset = 80
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY
      const offsetPosition = sectionPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="text-lg font-medium 3xl:text-xl 4xl:text-2xl">
      <div className="hidden items-center justify-between md:flex">
        <ul className="mr-2 items-center gap-4 md:flex">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => handleClick('projects')}
            tabIndex={0}
          >
            {projects}
          </li>
          <li className="cursor-pointer hover:underline">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p tabIndex={0}>{contact}</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-2">
                <DropdownMenuItem asChild>
                  <Link
                    href="https://github.com/giovannivicentin"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile of Giovanni Vicentin"
                    className="group flex cursor-pointer items-center justify-center gap-2 bg-primary px-10 py-2 font-semibold text-primary-foreground hover:bg-primary/90 3xl:text-xl 4xl:text-2xl"
                  >
                    <Image
                      src="/images/icons/github.svg"
                      alt={githubIcon}
                      width={15}
                      height={15}
                      className="h-6 w-6 invert group-hover:invert-0 dark:invert-0 group-hover:dark:invert md:h-5 md:w-5 3xl:h-7 3xl:w-7"
                    />
                    {github}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="https://www.linkedin.com/in/giovannivicentin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile of Giovanni Vicentin"
                    className="flex cursor-pointer items-center gap-2 border border-input bg-background px-10 py-2 font-semibold hover:bg-accent hover:text-accent-foreground 3xl:text-xl 4xl:text-2xl"
                  >
                    <Image
                      src="/images/icons/linkedin.svg"
                      alt={linkedinIcon}
                      width={15}
                      height={15}
                      className="h-6 w-6 dark:invert md:h-5 md:w-5 3xl:h-7 3xl:w-7"
                    />
                    {linkedin}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link
              prefetch={true}
              target="_blank"
              rel="noopener noreferrer"
              href="/resume/giovanni-vicentin-resume.pdf"
            >
              {resume}
            </Link>
          </li>
        </ul>
        {children}
      </div>
      <div className="flex items-center justify-end text-lg font-medium md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Image
                src="/images/icons/menu.svg"
                alt={menuIcon}
                width={24}
                height={24}
                className="h-6 w-6 dark:invert"
              />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center justify-start gap-8 pt-20 text-xl font-medium">
            <Link
              onClick={() => handleClick('projects')}
              href={'#projects'}
              scroll={false}
              className="flex cursor-pointer items-center gap-2 hover:underline"
              tabIndex={0}
            >
              <Image
                src="/images/icons/code.svg"
                height={20}
                width={20}
                alt={codeIcon}
                className="h-6 w-6 dark:invert md:h-5 md:w-5"
              />
              {projects}
            </Link>
            <Link
              onClick={() => handleClick('contact')}
              href={'#contact'}
              scroll={false}
              className="flex cursor-pointer items-center gap-2 hover:underline"
              tabIndex={0}
            >
              <Image
                src="/images/icons/contact.svg"
                height={20}
                width={20}
                alt={contactIcon}
                className="h-6 w-6 dark:invert md:h-5 md:w-5"
              />
              {contact}
            </Link>
            <Link
              href="/resume/giovanni-vicentin-resume.pdf"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/images/icons/resume.svg"
                height={20}
                width={20}
                alt={resumeIcon}
                className="h-6 w-6 dark:invert md:h-5 md:w-5"
              />
              {resume}
            </Link>
            <div className="flex gap-1">{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
