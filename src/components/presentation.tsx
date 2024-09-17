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
      className="min-h-screen w-full py-8 md:flex md:flex-col md:items-center md:justify-center md:py-0 md:pb-[30vh]"
    >
      <div className="flex w-full flex-col items-center justify-between gap-8 px-4 md:flex-row md:gap-4 md:px-12 3xl:justify-around">
        <div className="space-y-4">
          <h1
            className={`${merriweather.variable} font-serif text-4xl font-bold md:text-5xl 3xl:text-6xl 4xl:text-7xl`}
          >
            {title}
          </h1>
          <p className="max-w-md font-medium md:max-w-xl md:text-lg 3xl:text-xl 4xl:text-2xl">
            {description}
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
        <Image
          src="/images/profile/original.png"
          alt="@giovannivicentin"
          loader={({ src }) => src}
          width={512}
          height={512}
          priority
          className="min-w-[12rem] rounded-full shadow-md dark:shadow-muted dark:grayscale"
          blurDataURL="/images/profile/image-blur.png"
          placeholder="blur"
        />
      </div>
    </section>
  )
}

export default Presentation
