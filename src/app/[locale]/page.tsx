import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Merriweather } from 'next/font/google'
import Image from 'next/image'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
})

export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="container mb-32 mt-16 flex w-full flex-col items-center justify-between gap-8 px-4 md:mb-52 md:mt-24 md:flex-row md:gap-0 md:px-6">
        <div className="space-y-4">
          <h1
            className={`${merriweather.variable} font-serif text-4xl font-bold`}
          >
            {t('title')}
          </h1>
          <p className="max-w-md">{t('description')}</p>
          <div className="flex items-center gap-4">
            <Button>Contact Me</Button>
            <Button variant="outline">View Projects</Button>
          </div>
        </div>
        <Image
          src="/profile/profile.png"
          alt="@giovannivicentin"
          width={384}
          height={384}
          priority
          className="rounded-full object-cover md:h-96 md:w-96"
          style={{ aspectRatio: '384/384', objectFit: 'cover' }}
        />
      </div>
    </main>
  )
}
