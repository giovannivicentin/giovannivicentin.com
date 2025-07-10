import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Giovanni Vicentin Portfolio - Software Engineer',
  description:
    'Explore the professional portfolio of Giovanni Vicentin. Discover his projects, skills, and career path.',
  authors: { name: 'Giovanni Vicentin', url: 'https://giovannivicentin.com' },
  generator: 'Next.js, React, Tailwind, Node, Vercel, Google Fonts',
  metadataBase: new URL('https://giovannivicentin.com'),
  creator: 'Giovanni Vicentin',
  openGraph: {
    type: 'website',
    url: 'https://www.giovannivicentin.com',
    title: 'Giovanni Vicentin Portfolio - Software Engineer',
    description:
      'Explore the professional portfolio of Giovanni Vicentin. Discover his projects, skills, and career trajectory.',
    siteName: 'Giovanni Vicentin Portfolio - Software Engineer',
    images: [
      {
        url: '/images/projects/portfolio.png',
      },
    ],
  },
  robots: 'index, follow',
  twitter: {
    card: 'summary_large_image',
    site: '@gibasvicentin',
    creator: '@gibasvicentin',
    title: 'Giovanni Vicentin - Software Engineer',
    description:
      'Explore the professional portfolio of Giovanni Vicentin. Discover his projects, skills, and career path.',
    images: '/images/projects/portfolio.png',
  },
  category: 'Software Engineering',
  keywords: [
    'Giovanni Vicentin',
    'portfolio',
    'professional portfolio',
    'software engineer',
    'software developer',
    'full stack developer',
    'front-end developer',
    'back-end developer',
    'Next.js',
    'React',
    'Tailwind CSS',
    'projects',
    'Node.js',
    'networking',
    'JavaScript',
    'Python',
    'TypeScript',
    'HTML',
    'CSS',
    'SASS',
    'Docker',
    'Java',
    'Kubernetes',
    'CI/CD',
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Jira',
    'Confluence',
    'Slack',
    'Trello',
    'VS Code',
    'IntelliJ IDEA',
    'PyCharm',
    'WebStorm',
    'Visual Studio',
    'programming',
    'coding',
    'algorithms',
    'data structures',
    'computer science',
    'software architecture',
    'software development',
    'software design',
    'software testing',
    'software deployment',
    'software maintenance',
    'software documentation',
    'software development tools',
    'software development frameworks',
    'software development libraries',
    'software development languages',
    'software development technologies',
    'web development',
    'mobile app development',
    'UI/UX design',
    'cloud computing',
    'AWS',
    'Azure',
    'Google Cloud',
    'artificial intelligence',
    'API development',
    'agile methodology',
    'freelance software developer',
    'react developer',
    'node.js developer',
    'software engineer jobs',
    'tech stack',
    'GitHub portfolio',
    'SQL developer',
    'remote software developer',
    'entry level software developer',
    'software developer tools',
    'open source projects',
    'programming tutorials',
    'software engineering principles',
    'software development life cycle',
    'Brazilian software developer',
    'Brazilian software engineer',
    'São Paulo software development',
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
  params: { locale: string }
}

const langMap: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es-ES',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const selectedLang = langMap[locale]
  return (
    <html lang={selectedLang} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={`${inter.variable} mx-auto flex min-h-screen flex-col font-sans`}
          >
            <Header />
            <div className="mt-7 md:mt-[4.5rem]">{children}</div>
            <Toaster />
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
