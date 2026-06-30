import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const siteUrl = new URL('https://giovannivicentin.com')

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const localeMetadata = {
  br: {
    title: 'Giovanni Vicentin - Engenheiro de Software no Brasil',
    description:
      'Portfólio de Giovanni Vicentin, engenheiro de software brasileiro especializado em Next.js, React, TypeScript, Node.js e experiências web rápidas.',
    locale: 'pt_BR',
  },
  en: {
    title: 'Giovanni Vicentin - Software Engineer',
    description:
      'Portfolio of Giovanni Vicentin, a Brazilian software engineer focused on Next.js, React, TypeScript, Node.js, and fast web experiences.',
    locale: 'en_US',
  },
  es: {
    title: 'Giovanni Vicentin - Ingeniero de Software',
    description:
      'Portafolio de Giovanni Vicentin, ingeniero de software brasileño especializado en Next.js, React, TypeScript, Node.js y experiencias web rápidas.',
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
  'Giovanni Vicentin',
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const selectedLocale = isSupportedLocale(locale) ? locale : 'br'
  const selectedMetadata = localeMetadata[selectedLocale]
  const canonicalPath = `/${selectedLocale}`

  return {
    title: selectedMetadata.title,
    description: selectedMetadata.description,
    authors: { name: 'Giovanni Vicentin', url: siteUrl },
    creator: 'Giovanni Vicentin',
    metadataBase: siteUrl,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'pt-BR': '/br',
        'en-US': '/en',
        'es-ES': '/es',
        'x-default': '/br',
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      title: selectedMetadata.title,
      description: selectedMetadata.description,
      siteName: 'Giovanni Vicentin',
      locale: selectedMetadata.locale,
      images: [
        {
          url: '/images/projects/portfolio.png',
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
      images: ['/images/projects/portfolio.png'],
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
  params: Promise<{ locale: string }>
}

const langMap: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es-ES',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params
  const selectedLang = langMap[locale]

  return (
    <html lang={selectedLang} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
