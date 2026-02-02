"use client"

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header({ title = 'App' }: { title?: string }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="font-semibold text-gray-900 dark:text-gray-100">{title}</div>
      <nav className="flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="/profile"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          Profile
        </Link>
      </nav>
    </header>
  )
}
