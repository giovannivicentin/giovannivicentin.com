import { displayName } from '@/lib/portfolio'
import {
  siteUrl,
  languageAlternates,
  languageTags,
  localePaths,
} from '@/lib/site'
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
    title: 'Giovanni Vicentin | Engenheiro de Software React e Next.js',
    description:
      'Engenheiro de software no Itaú Unibanco, especializado em React, Next.js e TypeScript. Conheça minhas entregas, projetos e experiência no Carrefour e Sam’s Club.',
    locale: 'pt_BR',
  },
  en: {
    title: 'Giovanni Vicentin | React & Next.js Software Engineer',
    description:
      'Software engineer at Itaú Unibanco specializing in React, Next.js, and TypeScript. Explore my projects and experience at Carrefour and Sam’s Club Brazil.',
    locale: 'en_US',
  },
  es: {
    title: 'Giovanni Vicentin | Ingeniero de Software React y Next.js',
    description:
      'Ingeniero de software en Itaú Unibanco, especializado en React, Next.js y TypeScript. Explora mis proyectos y experiencia en Carrefour y Sam’s Club Brasil.',
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const selectedLocale = isSupportedLocale(locale) ? locale : 'br'
  const selectedMetadata = localeMetadata[selectedLocale]
  const canonicalPath = localePaths[selectedLocale]

  return {
    title: selectedMetadata.title,
    description: selectedMetadata.description,
    authors: { name: displayName, url: siteUrl },
    creator: displayName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      title: selectedMetadata.title,
      description: selectedMetadata.description,
      siteName: displayName,
      locale: selectedMetadata.locale,
      alternateLocale: Object.values(localeMetadata)
        .filter((entry) => entry !== selectedMetadata)
        .map((entry) => entry.locale),
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
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const locale = await getLocale()
  const selectedLang = languageTags[isSupportedLocale(locale) ? locale : 'br']

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
