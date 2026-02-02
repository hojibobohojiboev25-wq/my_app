"use client"

import { useState, useEffect } from 'react'
import { Smartphone, Download, X, CheckCircle } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInWebAppiOS = (window.navigator as any).standalone === true
      setIsInstalled(isStandalone || isInWebAppiOS)
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.addEventListener('appinstalled', handleAppInstalled)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.removeEventListener('appinstalled', handleAppInstalled)
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
      }

      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error('Install prompt failed:', error)
    }
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
  }

  // Don't show if already installed or no prompt available
  if (isInstalled || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-in slide-in-from-bottom-2">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl p-4 text-white">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Install VideoForge Pro</h3>
              <p className="text-sm text-blue-100">Get the full app experience on your device</p>
            </div>
          </div>
          <button
            onClick={dismissPrompt}
            className="text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-4 h-4 text-green-300" />
          <span className="text-sm">Offline access</span>
          <CheckCircle className="w-4 h-4 text-green-300" />
          <span className="text-sm">Push notifications</span>
          <CheckCircle className="w-4 h-4 text-green-300" />
          <span className="text-sm">Native performance</span>
        </div>

        <button
          onClick={handleInstallClick}
          className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Install App
        </button>

        <p className="text-xs text-blue-200 text-center mt-2">
          No app store required • Free installation
        </p>
      </div>
    </div>
  )
}