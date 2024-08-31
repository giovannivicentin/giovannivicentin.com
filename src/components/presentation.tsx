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
      className="mb-32 mt-16 flex w-full flex-col items-center justify-between gap-8 px-4 md:mb-64 md:mt-24 md:flex-row md:gap-0 md:px-12"
    >
      <div className="space-y-4">
        <h1
          className={`${merriweather.variable} font-serif text-4xl font-bold md:text-5xl`}
        >
          {title}
        </h1>
        <p className="max-w-md font-medium md:max-w-xl md:text-lg">
          {description}
        </p>
        <div className="flex items-center gap-4">
          <Button
            className="text-center text-base font-semibold"
            onClick={() => handleSmoothScroll('#contact')}
          >
            {contactMe}
          </Button>
          <Button
            className="text-center text-base font-semibold"
            variant="outline"
            onClick={() => handleSmoothScroll('#projects')}
          >
            {viewProjects}
          </Button>
        </div>
      </div>
      <Image
        src="/images/profile/image.png"
        alt="@giovannivicentin"
        width={512}
        height={512}
        priority
        className="rounded-full dark:grayscale md:h-96 md:w-96"
      />
    </section>
  )
}

export default Presentation
