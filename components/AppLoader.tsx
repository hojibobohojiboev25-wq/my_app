"use client"

import { useState, useEffect } from 'react'
import { useApp } from '../contexts/AppContext'
import SplashScreen from './SplashScreen'
import Onboarding from './Onboarding'

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const { isLoading, isOnboarded } = useApp()
  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Show splash for 2.3 seconds, then check onboarding
      const timer = setTimeout(() => {
        setShowSplash(false)
        if (!isOnboarded) {
          setShowOnboarding(true)
        }
      }, 2300)

      return () => clearTimeout(timer)
    }
  }, [isLoading, isOnboarded])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />
  }

  return <>{children}</>
}