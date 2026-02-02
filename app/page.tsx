import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import Tutorial to avoid SSR issues
const Tutorial = dynamic(() => import('../components/Tutorial').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null
})
import { useTutorial } from '../components/Tutorial'

export default function Home() {
  const { shouldShowTutorial, completeTutorial } = useTutorial()

  // Only render tutorial on client side
  const showTutorial = typeof window !== 'undefined' && shouldShowTutorial
  return (
    <main className="px-4 pt-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Mobile Video Editor</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">PWA • Demo</div>
      </header>

      <section className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border dark:border-gray-700">
          <h2 className="font-medium text-gray-900 dark:text-gray-100">Create videos on mobile</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Upload, trim, preview, and export — all client-side (mock export).</p>
          <Link href="/create" className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Start a project</Link>
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick links</h3>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/templates" className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Templates</Link>
          <Link href="/projects" className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">My Projects</Link>
          <Link href="/create" className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">New Project</Link>
          <Link href="/profile" className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Profile</Link>
        </div>
      </section>

      <footer className="mt-8 text-xs text-gray-400 dark:text-gray-500">Built as a demo PWA focused on mobile UX</footer>

      {showTutorial && (
        <Tutorial onComplete={completeTutorial} onClose={completeTutorial} />
      )}

    </main>
  )
}
