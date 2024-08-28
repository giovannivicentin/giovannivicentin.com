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
      className="flex w-full flex-col items-center justify-center space-y-8 bg-background px-4 py-12 md:px-12"
    >
      <h2
        className={`${merriweather.variable} text-center font-serif text-3xl font-semibold md:text-4xl`}
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
          <Badge key={skill} variant="secondary" className="px-3 py-1 text-lg">
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  )
}
