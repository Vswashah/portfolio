import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}