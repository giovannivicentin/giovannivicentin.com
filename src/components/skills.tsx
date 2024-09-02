import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'
import { Badge } from './ui/badge'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

export function Skills() {
  const t = useTranslations('skills')

  return (
    <section
      id="skills"
      className="flex min-h-[40vh] w-full flex-col items-center justify-center space-y-8 bg-background px-4 py-8 md:py-0"
    >
      <h2
        className={`${merriweather.variable} text-center font-serif text-3xl font-semibold md:text-4xl 3xl:text-5xl 4xl:text-6xl`}
      >
        {t('title')}
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
            className="px-3 py-1 text-lg 3xl:text-xl 4xl:text-2xl"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  )
}
