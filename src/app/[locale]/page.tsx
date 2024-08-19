import { Project } from '@/components/project'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'
import Image from 'next/image'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

export default function Home() {
  const t = useTranslations('HomePage')
  const p = useTranslations('ProjectSection')

  const projects = ['frankMetalicas', 'tecnojund', 'megazord'] as const

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="mb-32 mt-16 flex w-full flex-col items-center justify-between gap-8 px-4 md:mb-52 md:mt-24 md:flex-row md:gap-0 md:px-12">
        <div className="space-y-4">
          <h1
            className={`${merriweather.variable} font-serif text-4xl font-bold md:text-5xl`}
          >
            {t('title')}
          </h1>
          <p className="max-w-md">{t('description')}</p>
          <div className="flex items-center gap-4">
            <Button>Contact Me</Button>
            <Button variant="outline">View Projects</Button>
          </div>
        </div>
        <Image
          src="/profile/sass.png"
          alt="@giovannivicentin"
          width={1600}
          height={1600}
          priority
          className="-z-10 rounded-full dark:grayscale md:h-96 md:w-96"
        />
      </div>
      <section className="grid w-full grid-cols-1 gap-8 bg-neutral-900 p-8 dark:bg-muted sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Project
            key={project}
            title={p(`${project}.title`)}
            description={p(`${project}.description`)}
            imgSrc={p(`${project}.imgSrc`)}
            imgAlt={p(`${project}.imgAlt`)}
            href={p(`${project}.href`)}
          />
        ))}
      </section>
    </main>
  )
}
