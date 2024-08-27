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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Video } from './ui/video'

interface ProjectProps {
  title: string
  description: string
  imgSrc: string
  imgAlt: string
  href: string
  github: string
  expandedDescription?: string
  videoPath: string
}

export function Project({
  title,
  description,
  imgSrc,
  imgAlt,
  href,
  github,
  videoPath,
  expandedDescription,
}: ProjectProps) {
  return (
    <Card className="relative mx-auto h-full max-w-[28rem] border shadow-sm hover:shadow dark:border-neutral-700 hover:dark:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Image
            src={imgSrc}
            width="400"
            height="225"
            alt={imgAlt}
            className="aspect-video rounded-md border border-neutral-300 object-cover shadow-sm hover:animate-pulse hover:cursor-pointer dark:border-neutral-700 dark:grayscale dark:hover:animate-none hover:dark:grayscale-0"
          />
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="px-4 py-2 text-sm shadow-sm">
              View More
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-fit lg:min-w-[50rem]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {expandedDescription || description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex w-full flex-col items-center space-y-4">
              <Video path={videoPath} photo={imgSrc} />
              <div className="flex items-center justify-center gap-4">
                <Link href={href}>
                  <Button variant="ghost" size="icon">
                    <Image
                      src="/icons/link.svg"
                      height={20}
                      width={20}
                      alt="External Link Icon"
                      className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert"
                    />
                    <span className="sr-only">External Link</span>
                  </Button>
                </Link>
                <Link href={github}>
                  <Button variant="ghost" size="icon">
                    <Image
                      src="/icons/github.svg"
                      height={20}
                      width={20}
                      alt="GitHub Icon"
                      className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert"
                    />
                    <span className="sr-only">GitHub Link</span>
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="relative flex items-center gap-1">
          <Link href={href}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <Image
                src="/icons/link.svg"
                height={20}
                width={20}
                alt="External Link Icon"
                className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert"
              />
              <span className="sr-only">External Link</span>
            </Button>
          </Link>
          <Link href={github}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-neutral-100 hover:shadow-sm dark:hover:bg-neutral-700"
            >
              <Image
                src="/icons/github.svg"
                height={20}
                width={20}
                alt="GitHub Icon"
                className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert"
              />
              <span className="sr-only">GitHub Link</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
