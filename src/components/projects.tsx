import { useTranslations } from 'next-intl'
import { Project } from './project'

export function Projects() {
  const t = useTranslations('ProjectSection')

  const projects = [
    'bigO',
    'ebookToAudiobook',
    'mindfulMinutes',
    'frankMetalicas',
    'megazord',
  ] as const
  return (
    <section
      id="projects"
      className="bg-muted grid min-h-[50vh] w-full scroll-mt-20 grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 md:px-12 md:py-16 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Project
          key={project}
          title={t(`${project}.title`)}
          description={t(`${project}.description`)}
          imgSrc={t(`${project}.imgSrc`)}
          imgAlt={t(`${project}.imgAlt`)}
          href={t(`${project}.href`)}
          github={t(`${project}.github`)}
          expandedDescription={t(`${project}.expandedDescription`)}
          videoPath={t(`${project}.videoPath`)}
        />
      ))}
    </section>
  )
}
