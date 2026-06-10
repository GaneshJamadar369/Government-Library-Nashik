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

const SITE_URL = 'https://dnyansampada-vachanalay.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dnyansampada Sarvajanik Vachanalay, Murari Nagar | ज्ञानसंपदा सार्वजनिक वाचनालय, मुरारी नगर, नाशिक',
    template: '%s | Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik',
  },
  description:
    'Dnyansampada Sarvajanik Vachanalay (ज्ञानसंपदा सार्वजनिक वाचनालय) — Murari Nagar, Nashik 422010. Government public library & reading room with 5000+ books, magazines, newspapers. Free reading space, MPSC/UPSC competitive exam resources, Marathi literature.',
  keywords: [
    'Dnyansampada Sarvajanik Vachanalay', 'ज्ञानसंपदा सार्वजनिक वाचनालय', 'Dnyansampada Library',
    'Sarvajanik Vachanalay Murari Nagar', 'Murari Nagar library', 'मुरारी नगर वाचनालय',
    'Nashik library', 'Nashik reading room', 'library near Murari Nagar Nashik',
    'Maharashtra public library', 'सार्वजनिक वाचनालय', 'नाशिक वाचनालय', 'free library Nashik',
    'government library Maharashtra', 'competitive exam library Nashik', 'MPSC library Nashik',
    'UPSC study center Nashik', 'Marathi books', 'reading room Nashik', 'public reading room',
    'library 422010', 'अभ्यासिका नाशिक', 'वाचनालय मुरारी नगर',
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
    siteName: 'Dnyansampada Sarvajanik Vachanalay',
    title: 'Dnyansampada Sarvajanik Vachanalay, Murari Nagar | ज्ञानसंपदा सार्वजनिक वाचनालय, नाशिक',
    description:
      'Government public library in Murari Nagar, Nashik (422010) — free reading room, 5000+ books, magazines, newspapers. MPSC/UPSC competitive exam resources, Marathi literature, community events.',
    images: [{ url: 'https://res.cloudinary.com/djgkoxguj/image/upload/dyansampada/events/dyansampada/events/event_01.jpg', width: 1200, height: 630, alt: 'Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dnyansampada Sarvajanik Vachanalay | Murari Nagar, Nashik',
    description: 'Free public library & reading room in Murari Nagar, Nashik, Maharashtra. Books, magazines, newspapers.',
    images: ['https://res.cloudinary.com/djgkoxguj/image/upload/dyansampada/events/dyansampada/events/event_01.jpg'],
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
  name: 'Dnyansampada Sarvajanik Vachanalay',
  alternateName: ['ज्ञानसंपदा सार्वजनिक वाचनालय', 'Dnyansampada Public Library'],
  description: 'Government public library and reading room in Murari Nagar, Nashik, Maharashtra with 5000+ books.',
  url: SITE_URL,
  telephone: '+91-7559399889',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Murari Nagar',
    addressLocality: 'Nashik',
    addressRegion: 'Maharashtra',
    postalCode: '422010',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.9721671,
    longitude: 73.745583,
  },
  hasMap: 'https://www.google.com/maps/place/Dnyansampada+Sarvajanik+Vachnalay/@19.9721671,73.7455146,21z/data=!4m6!3m5!1s0x3bddeca04601cf65:0xfb74435397ab899e!8m2!3d19.9721671!4d73.745583!16s%2Fg%2F11c6qsnbyg',
  openingHours: 'Mo-Sa 07:00-21:00',
  image: 'https://res.cloudinary.com/djgkoxguj/image/upload/dyansampada/events/dyansampada/events/event_01.jpg',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.2',
    reviewCount: '18',
  },
  sameAs: [
    'https://www.google.com/maps/place/Dnyansampada+Sarvajanik+Vachnalay/@19.9721671,73.7455146,21z/data=!4m6!3m5!1s0x3bddeca04601cf65:0xfb74435397ab899e!8m2!3d19.9721671!4d73.745583!16s%2Fg%2F11c6qsnbyg',
  ],
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
