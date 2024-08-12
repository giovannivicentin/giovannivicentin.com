import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

export function Navbar() {
  return (
    <nav>
      <ul className="mr-2 flex items-center gap-4">
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
                    width={16}
                    height={16}
                    className="h-4 w-4 invert dark:invert-0"
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
                    width={16}
                    height={16}
                    className="h-4 w-4 dark:invert"
                  />
                  LinkedIn
                </Link>
              </Button>
            </HoverCardContent>
          </HoverCard>
        </li>
        <li className="cursor-pointer hover:underline">Resume</li>
      </ul>
    </nav>
  )
}
