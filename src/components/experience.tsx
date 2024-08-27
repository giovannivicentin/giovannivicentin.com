import { BriefcaseIcon } from 'lucide-react'
import { Merriweather } from 'next/font/google'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

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

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

export function Experience() {
  return (
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
  )
}
