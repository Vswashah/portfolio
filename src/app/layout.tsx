import type { Metadata } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vishwaashah.vercel.app'),
  title: 'Vishwaa Shah — AI Engineer & Software Builder',
  description:
    'AI Engineer and Software Developer building intelligent systems that learn, scale, and solve real-world problems. MS Computer Science @ UT Dallas.',
  authors: [{ name: 'Vishwaa Shah' }],
  openGraph: {
    title: 'Vishwaa Shah — AI Engineer & Software Builder',
    description: 'Building intelligent systems that learn, scale, and solve real-world problems.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishwaa Shah — AI Engineer & Software Builder',
    description: 'Building intelligent systems that learn, scale, and solve real-world problems.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${plexSans.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  )
}