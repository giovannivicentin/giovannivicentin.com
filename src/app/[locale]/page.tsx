import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
    </main>
  )
}
