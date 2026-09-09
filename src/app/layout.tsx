import { displayName } from '@/lib/portfolio'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ExperienceProvider } from '@/components/motion/experience-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { getLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import 'lenis/dist/lenis.css'

const siteUrl = new URL('https://giovannivicentin.com')

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
})
const mono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

const localeMetadata = {
  br: {
    title: `${displayName} — Engenheiro de Software · Frontend`,
    description: `${displayName}: engenheiro de software com foco em frontend web, React e Next.js. No Itaú Unibanco, com experiência em backend, Carrefour e Sam’s Club Brasil.`,
    locale: 'pt_BR',
  },
  en: {
    title: `${displayName} — Software Engineer · Frontend`,
    description: `${displayName}: software engineer focused on web frontend, React, and Next.js. At Itaú Unibanco, with backend experience and a background at Carrefour and Sam’s Club Brazil.`,
    locale: 'en_US',
  },
  es: {
    title: `${displayName} — Ingeniero de Software · Frontend`,
    description: `${displayName}: ingeniero de software enfocado en frontend web, React y Next.js. En Itaú Unibanco, con experiencia en backend, Carrefour y Sam’s Club Brasil.`,
    locale: 'es_ES',
  },
} satisfies Record<
  string,
  { title: string; description: string; locale: string }
>

type SupportedLocale = keyof typeof localeMetadata

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale in localeMetadata
}

const keywords = [
  displayName,
  'engenheiro de software Brasil',
  'desenvolvedor de software Brasil',
  'desenvolvedor full stack Brasil',
  'desenvolvedor Next.js Brasil',
  'desenvolvedor React Brasil',
  'desenvolvedor TypeScript Brasil',
  'engenheiro de software São Paulo',
  'portfólio desenvolvedor',
  'software engineer Brazil',
  'Brazilian software engineer',
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'Shadcn UI',
  'JavaScript',
  'Python',
  'web development',
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const selectedLocale = isSupportedLocale(locale) ? locale : 'br'
  const selectedMetadata = localeMetadata[selectedLocale]
  const canonicalPath = '/'

  return {
    title: selectedMetadata.title,
    description: selectedMetadata.description,
    authors: { name: displayName, url: siteUrl },
    creator: displayName,
    metadataBase: siteUrl,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      title: selectedMetadata.title,
      description: selectedMetadata.description,
      siteName: displayName,
      locale: selectedMetadata.locale,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: selectedMetadata.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@gibasvicentin',
      creator: '@gibasvicentin',
      title: selectedMetadata.title,
      description: selectedMetadata.description,
      images: ['/opengraph-image'],
    },
    category: 'Software Engineering',
    keywords,
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
}

const langMap: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es-ES',
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const locale = await getLocale()
  const selectedLang = langMap[locale]

  return (
    <html lang={selectedLang} className="dark">
      <body className={`${geist.variable} ${mono.variable}`}>
        <NextIntlClientProvider>
          <ExperienceProvider>
            <Header />
            {children}
            <Footer />
          </ExperienceProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
