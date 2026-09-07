export const links = {
  email: 'giovannifvicentin@gmail.com',
  github: 'https://github.com/giovannivicentin',
  linkedin: 'https://www.linkedin.com/in/giovannivicentin/',
  resume: '/resume/giovanni-vicentin-resume.pdf',
} as const
export const locales = ['br', 'en', 'es'] as const
export type Locale = (typeof locales)[number]
export const sections = ['experience', 'projects', 'about', 'contact'] as const
export const experiences = [
  {
    id: 'itau',
    company: 'Itaú Unibanco',
    period: '2026',
    stack: ['React', 'Next.js', 'Go', 'WebView', 'SDD'],
  },
  {
    id: 'carrefour',
    company: 'Carrefour / Sam’s Club',
    period: '2024 — 2026',
    stack: ['React', 'Node.js', 'GraphQL', 'VTEX IO'],
  },
] as const
export interface ProjectData {
  id: string
  image: string
  demo: string
  repository: string
  stack: readonly string[]
}
export const projects: readonly ProjectData[] = [
  {
    id: 'bigO',
    image: '/images/projects/big-o.png',
    demo: 'https://big-o.giovannivicentin.com',
    repository: 'https://github.com/giovannivicentin/big-O',
    stack: ['Next.js', 'TypeScript', 'Monaco'],
  },
  {
    id: 'ebookToAudiobook',
    image: '/images/projects/ebook-to-audiobook.png',
    demo: 'https://ebook-to-audiobook-rho.vercel.app',
    repository: 'https://github.com/giovannivicentin/ebook-to-audiobook',
    stack: ['React', 'TypeScript', 'PDF.js'],
  },
  {
    id: 'sorteiaFC',
    image: '/images/projects/sorteia-fc.png',
    demo: 'https://sorteiafc.giovannivicentin.com/',
    repository: 'https://github.com/giovannivicentin/fifa',
    stack: [],
  },
  {
    id: 'mindfulMinutes',
    image: '/images/projects/mindful-minutes.png',
    demo: 'https://mindful-minutes-zeta.vercel.app',
    repository: 'https://github.com/giovannivicentin/mindful-minutes',
    stack: [],
  },
  {
    id: 'megazord',
    image: '/images/projects/megazord.webp',
    demo: 'https://megazord-five.vercel.app',
    repository: 'https://github.com/giovannivicentin/megazord',
    stack: [],
  },
  {
    id: 'frankMetalicas',
    image: '/images/projects/fk-metalicas.png',
    demo: 'https://frankmetalicas.com',
    repository: 'https://github.com/giovannivicentin/fk_metalicas',
    stack: [],
  },
]
