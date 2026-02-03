import './globals.css'
import { ReactNode } from 'react'

import { AuthProvider } from '../components/AuthProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import { AppProvider } from '../contexts/AppContext'
import dynamic from 'next/dynamic'
const BottomNav = dynamic(() => import('../components/BottomNav'), { ssr: false })
const AppLoader = dynamic(() => import('../components/AppLoader'), { ssr: false })
const PageTransition = dynamic(() => import('../components/PageTransition'), { ssr: false })

export const metadata = {
  title: 'Vieditor - Ultimate Media Editor',
  description: 'Professional media editing platform for videos, photos, and music. Edit, enhance, and create stunning content on any device with advanced tools.',
  keywords: 'video editor, photo editor, media editor, PWA, video templates, cloud sync, professional tools',
  authors: [{ name: 'Vieditor Team' }],
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/icon-192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', url: '/icons/icon-192.png', sizes: '192x192' }
  ],
  openGraph: {
    title: 'Vieditor - Ultimate Media Editor',
    description: 'Professional media editing platform for videos, photos, and music',
    type: 'website',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6366f1',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <AppProvider>
          <ThemeProvider>
            <AuthProvider>
              <AppLoader>
                <PageTransition>
                  <div className="app-shell max-w-md mx-auto w-full min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <main className="flex-1">{children}</main>
                    <BottomNav />
                  </div>
                </PageTransition>
              </AppLoader>
            </AuthProvider>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
