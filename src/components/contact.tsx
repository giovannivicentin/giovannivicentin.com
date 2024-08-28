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
    <section id="contact" className="w-full bg-background px-4 py-12 md:px-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2
            className={`${merriweather.variable} md:font-4xl font-serif text-3xl font-semibold`}
          >
            {t('title')}
          </h2>
          <p className="font-sans text-base font-medium text-muted-foreground md:text-lg">
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
              <CardTitle>{t('email')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-base font-medium text-muted-foreground md:text-lg">
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
