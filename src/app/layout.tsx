import { ReactNode } from 'react'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  metadataBase: new URL('https://giovannivicentin.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return children
}
