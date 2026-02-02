import './globals.css'
import { ReactNode } from 'react'

import { AuthProvider } from '../components/AuthProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import dynamic from 'next/dynamic'
const BottomNav = dynamic(() => import('../components/BottomNav'), { ssr: false })

export const metadata = {
  title: 'Vieditor - Ultimate Mobile Media Editor',
  description: 'Professional mobile media editing platform for videos, photos, and music. Edit, enhance, and create stunning content on your mobile device with advanced tools.',
  keywords: 'video editor, mobile video editing, PWA, video templates, cloud sync, professional video tools',
  authors: [{ name: 'VideoForge Pro Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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
        <ThemeProvider>
          <AuthProvider>
            <div className="app-shell max-w-md mx-auto w-full min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <main className="flex-1">{children}</main>
              <BottomNav />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
