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
  return (
    <section id="contact" className="w-full bg-background px-4 py-12 md:px-12">
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
  )
}

export default Contact
