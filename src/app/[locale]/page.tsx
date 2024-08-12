import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <main className="container flex flex-col items-center justify-between">
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="max-w-md">{t('description')}</p>
          <div className="flex gap-4">
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
          className="h-96 w-96 rounded-full object-cover"
          style={{ aspectRatio: '384/384', objectFit: 'cover' }}
        />
      </div>
    </main>
  )
}
