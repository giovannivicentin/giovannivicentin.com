import { useTranslations } from 'next-intl'
import { Project } from './project'

export function Projects() {
  const t = useTranslations('ProjectSection')

  const projects = ['frankMetalicas', 'tecnojund', 'megazord'] as const
  return (
    <section
      id="projects"
      className="grid w-full grid-cols-1 gap-8 bg-muted p-8 py-12 sm:grid-cols-2 lg:grid-cols-3"
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
