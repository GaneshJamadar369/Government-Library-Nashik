import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Tiro_Devanagari_Marathi } from 'next/font/google'
import './globals.css'
import { FallingLeaves } from '@/components/falling-leaves'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const tiroDevanagari = Tiro_Devanagari_Marathi({
  variable: '--font-tiro-devanagari',
  subsets: ['devanagari'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'ज्ञानसंपदा सार्वजनिक वाचनालय | Dnyansampada Public Library',
  description: 'A government public library and reading room in Nashik, Maharashtra. Known for its lush greenery, community reading spaces, and rich collection of books including Bhagavad Gita, Vedas, and Upanishads.',
  keywords: ['library', 'Nashik', 'reading room', 'Maharashtra', 'public library', 'वाचनालय', 'ज्ञानसंपदा'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a90a4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mr" className={`${geistSans.variable} ${geistMono.variable} ${tiroDevanagari.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <FallingLeaves count={20} blur={true} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
