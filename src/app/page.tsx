import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Code2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { CopyEmailButton } from '@/components/copy-email-button'
import { Glow } from '@/components/glow'
import { HeroEntrance } from '@/components/motion/hero-entrance'
import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { ScrollPreview } from '@/components/motion/scroll-preview'
import { CompanyMarquee } from '@/components/company-marquee'
import { StructuredData } from '@/components/structured-data'
import { displayName, experiences, links, projects } from '@/lib/portfolio'

export default function Home() {
  const t = useTranslations('Portfolio')
  const p = useTranslations('ProjectSection')
  return (
    <main id="main" className="site-frame" tabIndex={-1}>
      <StructuredData />
      <HeroEntrance>
        <div className="eyebrow" data-hero-reveal="before">
          <span className="status-dot" />
          {t('heroRole')}
        </div>
        <h1>
          <span data-hero-title className="hero-title-gradient">
            {t('headline')}
          </span>{' '}
          <span data-hero-title className="hero-title-gradient">
            {t('headlineMuted')}
          </span>
        </h1>
        <p className="hero-intro" data-hero-reveal="after">
          {t('intro', { name: displayName })}
        </p>
        <div className="hero-actions" data-hero-reveal="after">
          <Magnetic>
            <Button asChild>
              <a href="#experience">
                {t('viewExperience')}
                <ArrowDown data-icon="inline-end" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="outline">
              <a href={links.resume} target="_blank" rel="noreferrer">
                {t('resume')}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </Magnetic>
        </div>
        <div className="hero-proof" data-hero-reveal="after">
          <CompanyMarquee label={t('companiesLabel')} />
        </div>
        <div className="hero-baseline">
          <span>{t('based')}</span>
          <span>
            React <span aria-hidden="true">/</span> Next.js{' '}
            <span aria-hidden="true">/</span> Node.js
          </span>
        </div>
      </HeroEntrance>

      <section
        id="experience"
        className="section-pad ruled-section"
        aria-labelledby="experience-title"
      >
        <Reveal className="section-heading">
          <p className="eyebrow">01 / {t('experience')}</p>
          <h2 id="experience-title" tabIndex={-1}>
            {t('experienceTitle')}
          </h2>
          <p>{t('experienceIntro')}</p>
        </Reveal>
        <div className="experience-list">
          {experiences.map((job) => (
            <Reveal
              as="article"
              key={job.id}
              className={`experience-row experience-${job.id}`}
            >
              <div className="experience-meta">
                <div className="experience-brand" aria-hidden="true">
                  {'logo' in job ? (
                    <span className="company-mark" data-company={job.id}>
                      <Image
                        src={job.logo}
                        alt=""
                        width={job.logoWidth}
                        height={job.logoHeight}
                      />
                    </span>
                  ) : (
                    <span className="company-monogram">T.</span>
                  )}
                  {job.id === 'carrefour' && (
                    <span
                      className="company-mark company-mark-wordmark"
                      data-company="sams"
                    >
                      <Image
                        src="/images/icons/sams-club.svg"
                        alt=""
                        width={160}
                        height={27}
                      />
                    </span>
                  )}
                </div>
                <h3>{job.company}</h3>
                <p>{t('role')}</p>
                <span className="mono">
                  {job.period}
                  {job.id === 'itau' ? ` — ${t('current')}` : ''}
                </span>
              </div>
              <div className="experience-detail">
                <h4>{t(`${job.id}Title`)}</h4>
                <p className="experience-summary">{t(`${job.id}Summary`)}</p>
                <dl className="experience-highlights">
                  {['primary', 'secondary', 'tertiary'].map((highlight) => (
                    <div key={highlight} className="experience-highlight">
                      <dt>
                        <span className="experience-value">
                          {t(`${job.id}Highlights.${highlight}.value`)}
                        </span>
                        <span className="experience-label">
                          {t(`${job.id}Highlights.${highlight}.label`)}
                        </span>
                      </dt>
                      <dd>
                        {t(`${job.id}Highlights.${highlight}.description`)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <details className="experience-more">
                  <summary>
                    <span className="experience-more-closed">
                      {t('experienceMore')}
                    </span>
                    <span className="experience-more-open">
                      {t('experienceLess')}
                    </span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <div className="experience-narrative">
                    {['overview', 'delivery', 'impact'].map((paragraph) => (
                      <p key={paragraph}>
                        {t.rich(`${job.id}Paragraphs.${paragraph}`, {
                          strong: (chunks) => <strong>{chunks}</strong>,
                        })}
                      </p>
                    ))}
                  </div>
                </details>
                <div className="stack-line">
                  {job.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="section-pad ruled-section"
        aria-labelledby="projects-title"
      >
        <Reveal className="section-heading">
          <p className="eyebrow">02 / {t('projects')}</p>
          <h2 id="projects-title" tabIndex={-1}>
            {t('projectsTitle')}
          </h2>
          <p>{t('projectsIntro')}</p>
        </Reveal>
        <div className="project-grid">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal key={project.id} delay={index * 0.07}>
              <Glow>
                <Card className="project-card">
                  <CardHeader>
                    <div className="project-number mono">
                      0{index + 1}
                      <ArrowUpRight aria-hidden="true" size={16} />
                    </div>
                    <CardTitle>
                      <h3>{p(`${project.id}.title`)}</h3>
                    </CardTitle>
                    <CardDescription>
                      {p(`${project.id}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t('openProject')}: ${p(`${project.id}.title`)}`}
                      className="project-preview"
                    >
                      <ScrollPreview>
                        <Image
                          src={project.image}
                          alt={p(`${project.id}.imgAlt`)}
                          width={960}
                          height={540}
                          sizes="(min-width: 1200px) 330px, (min-width: 1024px) 28vw, (min-width: 768px) 42vw, 88vw"
                        />
                      </ScrollPreview>
                    </a>
                    <p className="project-approach">
                      {p(`${project.id}.approach`)}
                    </p>
                    <div className="stack-line">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      {t('openProject')}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t('repository')}: ${p(`${project.id}.title`)}`}
                    >
                      <Code2 size={16} aria-hidden="true" />
                      <span>{t('repository')}</span>
                    </a>
                  </CardFooter>
                </Card>
              </Glow>
            </Reveal>
          ))}
        </div>
        <h3 className="other-title eyebrow">{t('otherProjects')}</h3>
        <div>
          {projects.slice(3).map((project) => (
            <Reveal as="article" key={project.id} className="compact-project">
              <h4>{p(`${project.id}.title`)}</h4>
              <p>{p(`${project.id}.description`)}</p>
              <div>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t('openProject')}: ${p(`${project.id}.title`)}`}
                >
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t('repository')}: ${p(`${project.id}.title`)}`}
                >
                  <Code2 size={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="section-pad ruled-section"
        aria-labelledby="about-title"
      >
        <Reveal className="section-heading">
          <p className="eyebrow">03 / {t('about')}</p>
          <h2 id="about-title" tabIndex={-1}>
            {t('aboutTitle')}
          </h2>
        </Reveal>
        <Reveal className="about-grid">
          <div className="about-person">
            <figure className="about-identity">
              <Image
                src="/images/profile/original.webp"
                alt={displayName}
                width={112}
                height={112}
                sizes="112px"
              />
              <figcaption>{displayName}</figcaption>
            </figure>
            <div className="about-copy">
              <p>{t('aboutBody')}</p>
              <p>{t('aboutApproach')}</p>
              <p>{t('aboutEngineering')}</p>
            </div>
          </div>
          <div id="skills" className="skill-list">
            {[
              [t('frontend'), t('skillFrontend')],
              [t('backend'), t('skillBackend')],
              [t('infrastructure'), t('skillInfrastructure')],
              [t('concepts'), t('skillConcepts')],
            ].map(([label, value]) => (
              <div key={label}>
                <h3>{label}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="contact"
        className="section-pad ruled-section contact-section"
        aria-labelledby="contact-title"
      >
        <Reveal className="section-heading">
          <p className="eyebrow">04 / {t('contact')}</p>
          <h2 id="contact-title" tabIndex={-1}>
            {t('contactTitle')}
          </h2>
          <p>{t('contactBody')}</p>
        </Reveal>
        <Reveal className="contact-actions">
          <Magnetic>
            <CopyEmailButton
              email={links.email}
              copyLabel={t('copy')}
              copiedLabel={t('copied')}
              errorLabel={t('copyError')}
            />
          </Magnetic>
          <Magnetic>
            <Button asChild variant="outline">
              <a href={`mailto:${links.email}`}>
                {t('send')}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </Magnetic>
          <Button asChild variant="ghost">
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              {t('linkedin')}
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </Reveal>
        <a className="email-address" href={`mailto:${links.email}`}>
          {links.email}
        </a>
      </section>
    </main>
  )
}
