import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'
import { ContactForm } from './contactForm'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

export function Contact() {
  const t = useTranslations('ContactSection')
  const f = useTranslations('ContactForm')

  return (
    <section
      id="contact"
      className="bg-background flex min-h-[50vh] w-full flex-col justify-center px-4 py-8 md:px-12 md:py-0"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2
            className={`${merriweather.variable} 3xl:text-5xl 4xl:text-6xl font-serif text-3xl font-semibold md:text-4xl`}
          >
            {t('title')}
          </h2>
          <p className="text-muted-foreground 3xl:text-xl 4xl:text-2xl mt-1 font-sans text-base font-medium md:text-lg">
            {t('description')}
          </p>
          <ContactForm
            validationSubject={f('validationSubject')}
            validationEmail={f('validationEmail')}
            validationMessage={f('validationMessage')}
            submitSuccess={f('submitSuccess')}
            submitError={f('submitError')}
            submitDescriptionError={f('submitDescriptionError')}
            unknownError={f('unknownError')}
            placeholderSubject={f('placeholderSubject')}
            placeholderEmail={f('placeholderEmail')}
            placeholderMessage={f('placeholderMessage')}
            submitButton={f('submitButton')}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="3xl:text-5xl 4xl:text-6xl font-sans text-3xl font-semibold md:text-4xl">
                {t('email')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground 3xl:text-xl 4xl:text-2xl font-sans text-base font-medium md:text-lg">
                {t('myEmail')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
