import { getLocale, getTranslations } from 'next-intl/server'
import { displayName, links, projects, type Locale } from '@/lib/portfolio'
import { languageTags, localizedUrl, siteUrl } from '@/lib/site'

export async function StructuredData() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('Portfolio')
  const p = await getTranslations('ProjectSection')
  const url = localizedUrl(locale)
  const personId = `${siteUrl}/#person`
  // Only describe facts and projects present on the page; no invented ratings.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: displayName,
        alternateName: 'Giovanni Vicentin',
        url: siteUrl,
        image: `${siteUrl}/images/profile/original.webp`,
        jobTitle: t('role'),
        description: t('intro', { name: displayName }),
        sameAs: [links.github, links.linkedin],
        worksFor: { '@type': 'Organization', name: 'Itaú Unibanco' },
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'Frontend',
          'WebView',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: `${displayName} — Portfolio`,
        publisher: { '@id': personId },
        inLanguage: Object.values(languageTags),
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: `${displayName} — ${t('heroRole')}`,
        inLanguage: languageTags[locale],
        mainEntity: { '@id': personId },
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#projects`,
        name: t('projectsTitle'),
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: p(`${project.id}.title`),
            description: p(`${project.id}.description`),
            url: project.demo,
            codeRepository: project.repository,
            image: `${siteUrl}${project.image}`,
            author: { '@id': personId },
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape HTML delimiters even if future content comes from a CMS.
        __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
      }}
    />
  )
}
