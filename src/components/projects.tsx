import { useTranslations } from 'next-intl'
import { Project } from './project'

export function Projects() {
  const t = useTranslations('ProjectSection')

  const projects = ['frankMetalicas', 'tecnojund', 'betterFit'] as const
  return (
    <section
      id="projects"
      className="grid min-h-[50vh] w-full grid-cols-1 gap-8 bg-muted p-8 py-8 sm:grid-cols-2 lg:grid-cols-3 3xl:py-12"
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
