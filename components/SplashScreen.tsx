"use client"

import { useEffect, useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showLogo, setShowLogo] = useState(false)
  const { t } = useApp()

  useEffect(() => {
    // Start animation after mount
    const timer1 = setTimeout(() => setShowLogo(true), 300)

    // Complete after 2 seconds
    const timer2 = setTimeout(() => {
      onComplete()
    }, 2300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-white rounded-full"></div>
      </div>

      {/* Logo Animation */}
      <div className="text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {/* Logo Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-2xl flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
          </div>

          {/* App Name */}
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
            {t('appName')}
          </h1>

          {/* Tagline */}
          <p className="text-white/80 text-lg font-medium">
            {t('tagline')}
          </p>

          {/* Loading Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-white/60 text-sm text-center">
          Professional Media Editing
        </p>
      </div>
    </div>
  )
}