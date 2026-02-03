import Link from 'next/link'
import { useApp } from '../contexts/AppContext'

export default function Home() {
  const { t } = useApp()

  return (
    <main className="px-4 pt-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{t('appName')}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">{t('tagline')}</div>
      </header>

      <section className="mt-6">
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎬</span>
              <span className="text-white/80 text-sm font-medium">{t('tagline')}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('chooseContentType')}</h2>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              {t('editVideosWithTools')}
            </p>
            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <span className="text-lg">✨</span>
              {t('create')}
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full"></div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Explore Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/templates" className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden card-hover">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-2 animate-float">🎨</div>
              <div className="font-semibold text-lg">{t('templates')}</div>
              <div className="text-xs text-purple-100 mt-1 opacity-90">Professional designs</div>
            </div>
          </Link>

          <Link href="/projects" className="group relative bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-4 text-white hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden card-hover">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-2 animate-float" style={{animationDelay: '0.5s'}}>📁</div>
              <div className="font-semibold text-lg">{t('projects')}</div>
              <div className="text-xs text-green-100 mt-1 opacity-90">Cloud storage</div>
            </div>
          </Link>

          <Link href="/create" className="group relative bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden card-hover">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-2 animate-float" style={{animationDelay: '1s'}}>⚡</div>
              <div className="font-semibold text-lg">{t('create')}</div>
              <div className="text-xs text-orange-100 mt-1 opacity-90">Fast processing</div>
            </div>
          </Link>

          <Link href="/profile" className="group relative bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-4 text-white hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden card-hover">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-2 animate-float" style={{animationDelay: '1.5s'}}>📊</div>
              <div className="font-semibold text-lg">{t('profile')}</div>
              <div className="text-xs text-blue-100 mt-1 opacity-90">Performance insights</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Why Choose Vieditor?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">🎯</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Professional Quality</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">4K support with advanced color grading</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm">⚡</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Lightning Fast</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Client-side processing, no uploads needed</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-sm">📱</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">Cross-Platform</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Optimized for phones, tablets and desktops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-8 text-xs text-gray-400 dark:text-gray-500">Built as a demo PWA focused on mobile UX</footer>

    </main>
  )
}
