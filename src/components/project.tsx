import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface ProjectProps {
  title: string
  description: string
  imgSrc: string
  imgAlt: string
  href: string
}

export function Project({
  title,
  description,
  imgSrc,
  imgAlt,
  href,
}: ProjectProps) {
  return (
    <Card className="mx-auto h-full max-w-[28rem]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={imgSrc}
          width="400"
          height="225"
          alt={imgAlt}
          className="rounded-md object-cover"
          style={{ aspectRatio: '400/225', objectFit: 'cover' }}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="px-4 py-2 text-sm shadow-sm transition-colors"
        >
          <Link href={href}>View Projects</Link>
        </Button>

        <Image
          src="/icons/github.svg"
          height={20}
          width={20}
          className="h-5 w-5 dark:invert"
          alt="Github icon"
        />
      </CardFooter>
    </Card>
  )
}
