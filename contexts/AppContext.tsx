"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, getTranslation } from '../lib/i18n'

interface AppContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  isOnboarded: boolean
  setIsOnboarded: (onboarded: boolean) => void
  isLoading: boolean
  t: (key: string) => string
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('vieditor_language') as Language
    const savedOnboarded = localStorage.getItem('vieditor_onboarded') === 'true'

    if (savedLanguage && ['en', 'de', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }

    setIsOnboarded(savedOnboarded)
    setIsLoading(false)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('vieditor_language', lang)
  }

  const handleSetOnboarded = (onboarded: boolean) => {
    setIsOnboarded(onboarded)
    localStorage.setItem('vieditor_onboarded', onboarded.toString())
  }

  const t = (key: string) => getTranslation(key, language)

  const value = {
    language,
    setLanguage: handleSetLanguage,
    isOnboarded,
    setIsOnboarded: handleSetOnboarded,
    isLoading,
    t
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}