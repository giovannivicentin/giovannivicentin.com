import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
  const t = useTranslations('ProjectComponent')
  return (
    <Card className="relative mx-auto flex h-full max-w-[30rem] flex-col justify-between border shadow-sm hover:shadow dark:border-neutral-700 hover:dark:shadow-md 3xl:max-w-[34rem] 4xl:max-w-[38rem]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold 3xl:text-3xl 4xl:text-4xl">
          {title}
        </CardTitle>
        <CardDescription className="text-base font-medium 3xl:text-lg 4xl:text-xl">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={imgSrc}
                width="1920"
                height="1080"
                alt={imgAlt}
                priority
                className="aspect-video rounded-md border border-neutral-300 object-cover shadow-sm hover:animate-pulse hover:cursor-pointer dark:border-neutral-700 dark:grayscale dark:hover:animate-none hover:dark:grayscale-0"
              />
            </DialogTrigger>
            <DialogContent className="min-w-fit lg:min-w-[50rem]">
              <DialogHeader>
                <DialogTitle className="text-3xl font-semibold md:text-4xl 3xl:text-5xl 4xl:text-6xl">
                  {title}
                </DialogTitle>
                <DialogDescription className="text-base font-medium md:text-lg 3xl:text-xl 4xl:text-2xl">
                  {expandedDescription || description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full flex-col items-center space-y-4">
                <Video path={videoPath} photo={imgSrc} />
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                  >
                    <Button variant="ghost" size="icon">
                      <Image
                        src="/images/icons/link.svg"
                        height={20}
                        width={20}
                        alt={t('linkIcon')}
                        className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
                      />
                      <span className="sr-only">{t('externalLink')}</span>
                    </Button>
                  </Link>
                  <Link
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                  >
                    <Button variant="ghost" size="icon">
                      <Image
                        src="/images/icons/github.svg"
                        height={20}
                        width={20}
                        alt={t('githubIcon')}
                        className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
                      />
                      <span className="sr-only">{t('githubLink')}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="px-4 py-2 text-center font-semibold shadow-sm 3xl:text-lg 4xl:text-xl"
                >
                  {t('viewMore')}
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-fit lg:min-w-[50rem]">
                <DialogHeader>
                  <DialogTitle className="md:font-4xl text-3xl font-semibold">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-base font-medium md:text-lg 3xl:text-xl 4xl:text-2xl">
                    {expandedDescription || description}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full flex-col items-center space-y-4">
                  <Video path={videoPath} photo={imgSrc} />
                  <div className="flex items-center justify-center gap-4">
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                    >
                      <Button variant="ghost" size="icon">
                        <Image
                          src="/images/icons/link.svg"
                          height={20}
                          width={20}
                          alt={t('linkIcon')}
                          className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
                        />
                        <span className="sr-only">{t('externalLink')}</span>
                      </Button>
                    </Link>
                    <Link
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                    >
                      <Button variant="ghost" size="icon">
                        <Image
                          src="/images/icons/github.svg"
                          height={20}
                          width={20}
                          alt={t('githubIcon')}
                          className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
                        />
                        <span className="sr-only">{t('githubLink')}</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="flex">
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <Image
                    src="/images/icons/link.svg"
                    height={20}
                    width={20}
                    alt={t('linkIcon')}
                    className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
                  />
                  <span className="sr-only">{t('externalLink')}</span>
                </Button>
              </Link>
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-neutral-100 hover:shadow-sm dark:hover:bg-neutral-700"
                >
                  <Image
                    src="/images/icons/github.svg"
                    height={20}
                    width={20}
                    alt={t('githubIcon')}
                    className="h-5 w-5 text-primary hover:text-muted-foreground dark:invert 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7"
                  />
                  <span className="sr-only">{t('githubLink')}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
