import { site } from '@pedroaba/config/portfolio.config'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: `%s | ${site.name}`,
    default: site.title,
  },
  description: site.description,
  keywords: [
    'Pedro Augusto',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'SIBIS',
    'INATEL',
    'Software Engineer',
  ],
  authors: [{ name: 'Pedro Augusto' }],
  creator: 'Pedro Augusto',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: site.url,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
