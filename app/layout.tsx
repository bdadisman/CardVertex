import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter } from 'next/font/google'
import { Cursor } from '@/components/motion/cursor'
import { MotionProvider } from '@/components/motion/motion-provider'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cardvertex — Google reviews for Gainesville shops',
  description:
    "Your shop doesn't have a review problem. It has an asking problem. Cardvertex installs tap-to-review plates, trains your staff, and replies to every review — in Gainesville, FL.",
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070c16',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} bg-background`}>
      <body className="font-sans antialiased">
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Cursor />
        </MotionProvider>
        <div aria-hidden="true" className="grain" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
