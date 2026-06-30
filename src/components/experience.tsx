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
      className="bg-muted 3xl:space-x-12 flex min-h-[70vh] w-full flex-col justify-center space-y-8 px-4 py-8 md:px-12 md:py-0"
    >
      <h2
        className={`${merriweather.variable} 3xl:text-5xl 4xl:text-6xl text-center font-serif text-3xl font-semibold md:text-4xl`}
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
                <BriefcaseIcon className="3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 mt-1 mr-4 h-6 w-6" />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h2 className="3xl:text-xl 4xl:text-2xl font-sans text-xl font-semibold">
                        {t(`${experience}.title`)}
                      </h2>
                      <p className="text-primary/85 3xl:text-lg 4xl:text-xl text-base font-semibold text-pretty">
                        {t(`${experience}.company`)}
                      </p>
                    </div>
                    <span className="text-muted-foreground 3xl:text-lg 4xl:text-xl text-sm font-medium md:text-base">
                      {t(`${experience}.period`)}
                    </span>
                  </div>
                  <p className="text-muted-foreground 3xl:text-xl 4xl:text-2xl mb-4 max-w-7xl font-sans font-medium md:text-lg">
                    {t(`${experience}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stacks.map((stack) => (
                      <Badge
                        key={stack}
                        variant="secondary"
                        className="3xl:text-lg 4xl:text-xl text-sm md:text-base"
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
