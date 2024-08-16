import Image from 'next/image'
import Link from 'next/link'
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
      <CardFooter>
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          View Project
        </Link>
      </CardFooter>
    </Card>
  )
}
