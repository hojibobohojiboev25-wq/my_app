import './globals.css'
import { ReactNode } from 'react'

import { AuthProvider } from '../components/AuthProvider'
import dynamic from 'next/dynamic'
const BottomNav = dynamic(() => import('../components/BottomNav'), { ssr: false })

export const metadata = {
  title: 'Mobile Video Editor',
  description: 'Simple mobile-first PWA for basic video edit workflows',
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
        <AuthProvider>
          <div className="app-shell max-w-md mx-auto w-full min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
