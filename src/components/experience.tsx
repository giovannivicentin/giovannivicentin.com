import { BriefcaseIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

const experiences = ['sams', 'talst'] as const
const stacks = ['0', '1', '2', '3', '4', '5']

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

export function Experience() {
  const t = useTranslations('workExperience')

  return (
    <section
      id="experience"
      className="flex w-full flex-col space-y-8 bg-muted px-4 py-12 md:px-12"
    >
      <h2
        className={`${merriweather.variable} text-center font-serif text-3xl font-semibold md:text-4xl`}
      >
        {t('title')}
      </h2>
      <div className="space-y-8">
        {experiences.map((experience) => (
          <Card
            key={experience}
            className="border shadow-sm dark:border-neutral-700"
          >
            <CardContent className="p-6">
              <div className="flex items-start">
                <BriefcaseIcon className="mr-4 mt-1 h-6 w-6" />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-sans text-xl font-semibold">
                        {t(`${experience}.title`)}
                      </h3>
                      <p className="text-pretty text-base font-semibold text-primary/85">
                        {t(`${experience}.company`)}
                      </p>
                    </div>
                    <span className="text-base font-medium text-muted-foreground">
                      {t(`${experience}.period`)}
                    </span>
                  </div>
                  <p className="mb-4 max-w-7xl font-sans font-medium text-muted-foreground md:text-lg">
                    {t(`${experience}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stacks.map((stack) => (
                      <Badge
                        key={stack}
                        variant="secondary"
                        className="text-sm md:text-base"
                      >
                        {t(`${experience}.stack.${stack}`)}
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
