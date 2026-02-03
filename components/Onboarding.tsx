"use client"

import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { useAuth } from '../components/AuthProvider'
import { Language } from '../lib/i18n'

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { language, setLanguage, setIsOnboarded, t } = useApp()
  const { login } = useAuth()
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    role: 'user' as 'user' | 'admin'
  })

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setStep(2)
  }

  const handleProfileComplete = () => {
    if (userData.email && userData.name) {
      login(userData.email, userData.role)
      setIsOnboarded(true)
      onComplete()
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('welcome')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('chooseLanguage')}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleLanguageSelect('en')}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              🇺🇸 {t('english')}
            </button>

            <button
              onClick={() => handleLanguageSelect('de')}
              className="w-full p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
            >
              🇩🇪 {t('german')}
            </button>

            <button
              onClick={() => handleLanguageSelect('ru')}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
            >
              🇷🇺 {t('russian')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('welcome')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up your profile to get started
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUserData(prev => ({ ...prev, role: 'user' }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userData.role === 'user'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setUserData(prev => ({ ...prev, role: 'admin' }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userData.role === 'admin'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            onClick={handleProfileComplete}
            disabled={!userData.email || !userData.name}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  )
}