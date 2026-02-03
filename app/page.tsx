"use client"

import Link from 'next/link'
import { useApp } from '../contexts/AppContext'

export default function Home() {
  const { t } = useApp()

  return (
    <main className="px-4 pt-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{t('appName')}</h1>
      </header>

      <section className="mt-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎬</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{t('chooseContentType')}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional media editing tools
            </p>
            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 border border-gray-600">
              <span className="text-lg">⚡</span>
              {t('create')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Explore Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/templates" className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200">
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-semibold text-white text-sm">{t('templates')}</div>
              <div className="text-xs text-gray-400 mt-1">Templates</div>
            </div>
          </Link>

          <Link href="/projects" className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200">
            <div className="text-center">
              <div className="text-3xl mb-2">📁</div>
              <div className="font-semibold text-white text-sm">{t('projects')}</div>
              <div className="text-xs text-gray-400 mt-1">Projects</div>
            </div>
          </Link>

          <Link href="/create" className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-white text-sm">{t('create')}</div>
              <div className="text-xs text-gray-400 mt-1">Create</div>
            </div>
          </Link>

          <Link href="/profile" className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200">
            <div className="text-center">
              <div className="text-3xl mb-2">👤</div>
              <div className="font-semibold text-white text-sm">{t('profile')}</div>
              <div className="text-xs text-gray-400 mt-1">Profile</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-gray-400">Projects Created</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-xs text-gray-400">Templates</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-gray-400">Support</div>
          </div>
        </div>
      </section>

      <footer className="mt-8 text-xs text-gray-400 dark:text-gray-500">Built as a demo PWA focused on mobile UX</footer>

    </main>
  )
}
