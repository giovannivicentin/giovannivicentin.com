import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const langMap: Record<string, string> = {
  en: 'en-US',
  br: 'pt-BR',
  es: 'es-ES',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const selectedLang = langMap[locale]
  return (
    <html lang={selectedLang}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
          <header></header>
          <div className="flex-grow mt-20">{children}</div>
          <footer></footer>
        </div>
      </body>
    </html>
  );
}