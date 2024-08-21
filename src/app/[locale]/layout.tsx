import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import type { Metadata } from 'next'
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
  title: 'Giovanni Vicentin Portfolio',
  description: 'Generated by create next app',
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
            <div className="-z-10 mt-20 flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
