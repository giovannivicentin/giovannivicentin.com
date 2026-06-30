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
      className="mt-8 flex min-h-[calc(100vh-64px)] items-center justify-center py-8 md:mt-0 md:min-h-[calc(100vh-72px)]"
    >
      <div className="3xl:justify-around flex w-full flex-col items-center justify-between gap-8 px-4 md:flex-row md:gap-4 md:px-12">
        <div className="space-y-4">
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
            sizes="(min-width: 768px) 512px, 192px"
            className="dark:shadow-muted h-48 w-48 rounded-full object-cover shadow-md md:h-[512px] md:w-[512px] dark:grayscale"
          />
        </div>
      </div>
    </section>
  )
}

export default Presentation
