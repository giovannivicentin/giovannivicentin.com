import { useTranslations } from 'next-intl'
import { Project } from './project'

export function Projects() {
  const p = useTranslations('ProjectSection')

  const projects = ['frankMetalicas', 'tecnojund', 'megazord'] as const
  return (
    <section
      id="projects"
      className="grid w-full grid-cols-1 gap-8 bg-muted p-8 py-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Project
          key={project}
          title={p(`${project}.title`)}
          description={p(`${project}.description`)}
          imgSrc={p(`${project}.imgSrc`)}
          imgAlt={p(`${project}.imgAlt`)}
          href={p(`${project}.href`)}
          github={p(`${project}.github`)}
          expandedDescription={p(`${project}.expandedDescription`)}
          videoPath={p(`${project}.videoPath`)}
        />
      ))}
    </section>
  )
}
