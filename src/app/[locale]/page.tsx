import { Project } from '@/components/project'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BriefcaseIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'
import Image from 'next/image'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

const workExperience = [
  {
    title: 'Software Engineer',
    company: "Sam's Club",
    period: '2024 - Present',
    stack: ['React', 'Node.js', 'GraphQL', 'GCP', 'VTEX IO', '...'],
    description:
      'Led development of scalable web applications, improving performance by 40%.',
  },
  {
    title: 'Software Developer',
    company: 'Talst Contabilidade',
    period: '2022 - 2024',
    stack: ['NestJS', 'Node.js', 'React', 'Python', 'MySQL', '...'],
    description:
      'Developed and maintained multiple client-facing applications.',
  },
]

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
          <p className="max-w-md md:max-w-xl">{t('description')}</p>
          <div className="flex items-center gap-4">
            <Button>Contact Me</Button>
            <Button variant="outline">View Projects</Button>
          </div>
        </div>
        <Image
          src="/profile/image.png"
          alt="@giovannivicentin"
          width={1600}
          height={1600}
          priority
          className="-z-10 rounded-full dark:grayscale md:h-96 md:w-96"
        />
      </div>
      <section className="grid w-full grid-cols-1 gap-8 bg-muted p-8 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="flex w-full flex-col items-center justify-center space-y-8 bg-background px-4 py-8 md:px-12">
        <h2
          className={`${merriweather.variable} text-center font-serif text-3xl font-bold md:text-4xl`}
        >
          Skills & Technologies
        </h2>
        <div className="flex max-w-6xl flex-wrap items-center justify-center gap-2 px-2">
          {[
            'JavaScript',
            'TypeScript',
            'GraphQL',
            'Node.js',
            'React',
            'Next.js',
            'SQL',
            'VTEX IO',
            'React Native',
            'Python',
            'Jest',
            'Vitest',
            'Scrum',
            'Git',
            'Docker',
            'Kubernetes',
            'Bitbucket',
            'Vite',
            'Google Analytics',
            'Axios',
            'Sass',
            'Tailwind',
            'Zod',
            'Styled-Components',
            'Shadcn/ui',
            'Radix UI',
            'Postgres',
            'MySQL',
            'MongoDB',
            'SQLite',
          ].map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1 text-lg"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>
      <section
        id="experience"
        className="flex w-full flex-col space-y-8 bg-muted px-4 py-8 md:px-12"
      >
        <h2
          className={`${merriweather.variable} text-center font-serif text-3xl font-bold md:text-4xl`}
        >
          Work Experience
        </h2>
        <div className="space-y-8">
          {workExperience.map((job, index) => (
            <Card
              key={index}
              className="border shadow-sm dark:border-neutral-700"
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <BriefcaseIcon className="mr-4 mt-1 h-6 w-6" />
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p>{job.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {job.period}
                      </span>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.stack.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full bg-background px-4 py-8 md:px-12">
        <h2
          className={`${merriweather.variable} font-serif text-3xl font-bold md:text-4xl`}
        >
          Get in touch
        </h2>
      </section>
    </main>
  )
}
