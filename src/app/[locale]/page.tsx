import { ContactForm } from '@/components/contactForm'
import Presentation from '@/components/presentation'
import { Projects } from '@/components/projects'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BriefcaseIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'

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

  return (
    <main className="flex flex-col items-center justify-between">
      <Presentation
        title={t('title')}
        description={t('description')}
        contactMe={t('contactMe')}
        viewProjects={t('viewProjects')}
      />
      <Projects />
      <section
        id="skills"
        className="flex w-full flex-col items-center justify-center space-y-8 bg-background px-4 py-12 md:px-12"
      >
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
        className="flex w-full flex-col space-y-8 bg-muted px-4 py-12 md:px-12"
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
      <section
        id="contact"
        className="w-full bg-background px-4 py-12 md:px-12"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2
              className={`${merriweather.variable} font-serif text-3xl font-bold md:text-4xl`}
            >
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              I&rsquo;d love to hear from you! Feel free to reach out with any
              questions or inquiries.
            </p>
            <ContactForm />
          </div>
          <div className="flex flex-col gap-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  giovannifvicentin@gmail.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
