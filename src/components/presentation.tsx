'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Merriweather } from 'next/font/google'
import Image from 'next/image'
import { useCallback, useState } from 'react'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

interface PresentationProps {
  title: string
  description: string
  contactMe: string
  viewProjects: string
}

const Presentation: React.FC<PresentationProps> = ({
  title,
  description,
  contactMe,
  viewProjects,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleSmoothScroll = useCallback((sectionId: string) => {
    const section = document.querySelector(sectionId)
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
  }, [])

  return (
    <section
      id="presentation"
      className="min-h-[calc(100vh-48px)] w-full py-8 md:flex md:min-h-[calc(100vh-56px)] md:flex-col md:items-center md:justify-center md:py-0 md:pb-[30vh]"
    >
      <div className="flex w-full flex-col items-center justify-between gap-8 px-4 md:flex-row md:gap-4 md:px-12 3xl:justify-around">
        <div className="space-y-4">
          <h1
            className={`${merriweather.variable} font-serif text-4xl font-bold md:text-5xl 3xl:text-6xl 4xl:text-7xl`}
          >
            {title}
          </h1>
          <p className="max-w-md font-medium md:max-w-xl md:text-lg 3xl:text-xl 4xl:text-2xl">
            {description.split(/`([^`]+)`/g).map((chunk, i) =>
              i % 2 ? (
                <code
                  key={i}
                  className="rounded bg-muted p-1 font-mono text-xs md:text-sm"
                >
                  {chunk}
                </code>
              ) : (
                chunk
              ),
            )}
          </p>
          <div className="flex items-center gap-4">
            <Button
              className="text-center text-base font-semibold 3xl:text-lg 4xl:text-xl"
              onClick={() => handleSmoothScroll('#contact')}
            >
              {contactMe}
            </Button>
            <Button
              className="text-center text-base font-semibold 3xl:text-lg 4xl:text-xl"
              variant="outline"
              onClick={() => handleSmoothScroll('#projects')}
            >
              {viewProjects}
            </Button>
          </div>
        </div>
        <div className="relative min-w-[12rem]">
          {!isImageLoaded && (
            <Skeleton className="absolute inset-0 rounded-full" />
          )}
          <Image
            src="/images/profile/original.webp"
            alt="@giovannivicentin"
            width={512}
            height={512}
            priority
            className={`min-w-[12rem] rounded-full shadow-md transition-opacity duration-500 dark:shadow-muted dark:grayscale ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </div>
    </section>
  )
}

export default Presentation
