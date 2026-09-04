'use client'

import { Button } from '@/components/ui/button'
import { Merriweather } from 'next/font/google'
import Image from 'next/image'
import { useCallback } from 'react'

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
      className="mt-8 flex min-h-[calc(100vh-64px)] scroll-mt-20 items-center justify-center px-4 py-12 sm:px-6 md:mt-0 md:py-16 lg:min-h-[calc(100vh-72px)] lg:px-12"
    >
      <div className="3xl:justify-around flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-col gap-4">
          <h1
            className={`${merriweather.variable} 3xl:text-6xl 4xl:text-7xl font-serif text-4xl font-bold md:text-5xl`}
          >
            {title}
          </h1>
          <p className="3xl:text-xl 4xl:text-2xl max-w-md font-medium md:max-w-xl md:text-lg">
            {description.split(/`([^`]+)`/g).map((chunk, i) =>
              i % 2 ? (
                <code
                  key={i}
                  className="bg-muted rounded p-1 font-mono text-xs md:text-sm"
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
              className="3xl:text-lg 4xl:text-xl text-center text-base font-semibold"
              onClick={() => handleSmoothScroll('#contact')}
            >
              {contactMe}
            </Button>
            <Button
              className="3xl:text-lg 4xl:text-xl text-center text-base font-semibold"
              variant="outline"
              onClick={() => handleSmoothScroll('#projects')}
            >
              {viewProjects}
            </Button>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/profile/original.webp"
            alt="Giovanni Vicentin"
            width={512}
            height={512}
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 512px, (min-width: 1024px) 416px, (min-width: 768px) 320px, (min-width: 640px) 256px, 192px"
            className="dark:shadow-muted size-48 rounded-full object-cover shadow-md sm:size-64 md:size-80 lg:size-[26rem] xl:size-[32rem] dark:grayscale"
          />
        </div>
      </div>
    </section>
  )
}

export default Presentation
