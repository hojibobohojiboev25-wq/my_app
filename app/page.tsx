import Link from 'next/link'

export default function Home() {
  return (
    <main className="px-4 pt-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mobile Video Editor</h1>
        <div className="text-sm text-gray-500">PWA • Demo</div>
      </header>

      <section className="mt-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-medium">Create videos on mobile</h2>
          <p className="text-sm text-gray-500 mt-2">Upload, trim, preview, and export — all client-side (mock export).</p>
          <Link href="/create" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">Start a project</Link>
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-gray-600">Quick links</h3>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/projects" className="p-3 bg-white rounded-lg shadow-sm text-center">My Projects</Link>
          <Link href="/profile" className="p-3 bg-white rounded-lg shadow-sm text-center">Profile</Link>
        </div>
      </section>

      <footer className="mt-8 text-xs text-gray-400">Built as a demo PWA focused on mobile UX</footer>

    </main>
  )
}
