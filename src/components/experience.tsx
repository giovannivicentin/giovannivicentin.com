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
      className="flex min-h-[70vh] w-full flex-col justify-center space-y-8 bg-muted px-4 py-8 md:px-12 md:py-0 3xl:space-x-12"
    >
      <h2
        className={`${merriweather.variable} text-center font-serif text-3xl font-semibold md:text-4xl 3xl:text-5xl 4xl:text-6xl`}
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
                <BriefcaseIcon className="mr-4 mt-1 h-6 w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8" />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-sans text-xl font-semibold 3xl:text-xl 4xl:text-2xl">
                        {t(`${experience}.title`)}
                      </h4>
                      <p className="text-pretty text-base font-semibold text-primary/85 3xl:text-lg 4xl:text-xl">
                        {t(`${experience}.company`)}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground md:text-base 3xl:text-lg 4xl:text-xl">
                      {t(`${experience}.period`)}
                    </span>
                  </div>
                  <p className="mb-4 max-w-7xl font-sans font-medium text-muted-foreground md:text-lg 3xl:text-xl 4xl:text-2xl">
                    {t(`${experience}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stacks.map((stack) => (
                      <Badge
                        key={stack}
                        variant="secondary"
                        className="text-sm md:text-base 3xl:text-lg 4xl:text-xl"
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
