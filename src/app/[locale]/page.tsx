import Contact from '@/components/contact'
import { Experience } from '@/components/experience'
import Presentation from '@/components/presentation'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Presentation')

  return (
    <main className="flex flex-col items-center justify-between">
      <Presentation
        title={t('title')}
        description={t('description')}
        contactMe={t('contactMe')}
        viewProjects={t('viewProjects')}
      />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  )
}
