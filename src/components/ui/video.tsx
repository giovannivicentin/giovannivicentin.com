import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Video({ path, photo }: { path: string; photo: string }) {
  const t = useTranslations('VideoComponent')
  return (
    <video
      width="1920"
      height="1080"
      controls
      preload="none"
      className="aspect-video w-full rounded-md border dark:border-neutral-700"
    >
      <source src={path} type="video/mp4" />
      <Image src={photo} alt={t('fallbackAlt')} width="640" height="480" />
      <p>{t('videoNotSupported')}</p>
    </video>
  )
}
