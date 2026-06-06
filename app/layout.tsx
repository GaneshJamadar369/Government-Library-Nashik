import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Tiro_Devanagari_Marathi } from 'next/font/google'
import './globals.css'
import { FallingLeaves } from '@/components/falling-leaves'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const tiroDevanagari = Tiro_Devanagari_Marathi({
  variable: '--font-tiro-devanagari',
  subsets: ['devanagari'],
  weight: '400',
})

const SITE_URL = 'https://dyansampada-library.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ज्ञानसंपदा सार्वजनिक वाचनालय | Dnyansampada Public Library Nashik',
    template: '%s | ज्ञानसंपदा वाचनालय',
  },
  description:
    'ज्ञानसंपदा सार्वजनिक वाचनालय — Nashik, Maharashtra. Government public library & reading room with 5000+ books, magazines, newspapers. Free reading space, competitive exam resources, Marathi literature.',
  keywords: [
    'ज्ञानसंपदा वाचनालय', 'Dnyansampada Library', 'Nashik library', 'Nashik reading room',
    'Maharashtra public library', 'सार्वजनिक वाचनालय', 'नाशिक वाचनालय', 'free library Nashik',
    'government library Maharashtra', 'competitive exam library Nashik', 'MPSC library',
    'UPSC study center Nashik', 'Marathi books', 'reading room Nashik', 'public reading room',
  ],
  authors: [{ name: 'Dnyansampada Public Library' }],
  creator: 'Dnyansampada Public Library',
  publisher: 'Dnyansampada Public Library, Nashik',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'mr_IN',
    alternateLocale: 'en_IN',
    url: SITE_URL,
    siteName: 'ज्ञानसंपदा वाचनालय',
    title: 'ज्ञानसंपदा सार्वजनिक वाचनालय | Dnyansampada Public Library Nashik',
    description:
      'Government public library in Nashik — free reading room, 5000+ books, magazines, newspapers. Competitive exam resources, Marathi literature, community events.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ज्ञानसंपदा सार्वजनिक वाचनालय, Nashik' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ज्ञानसंपदा सार्वजनिक वाचनालय | Dnyansampada Public Library Nashik',
    description: 'Free public library & reading room in Nashik, Maharashtra. Books, magazines, newspapers.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'mr-IN': SITE_URL, 'en-IN': SITE_URL },
  },
}

export const viewport: Viewport = {
  themeColor: '#4a90a4',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Library',
  name: 'ज्ञानसंपदा सार्वजनिक वाचनालय',
  alternateName: 'Dnyansampada Public Library',
  description: 'Government public library and reading room in Nashik, Maharashtra with 5000+ books.',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nashik',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 07:00-21:00',
  image: `${SITE_URL}/og-image.jpg`,
  sameAs: [],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mr" className={`${geistSans.variable} ${geistMono.variable} ${tiroDevanagari.variable} bg-background`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <FallingLeaves count={20} blur={true} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
