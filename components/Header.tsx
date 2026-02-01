"use client"

import Link from 'next/link'

export default function Header({ title = 'App' }: { title?: string }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div className="font-semibold">{title}</div>
      <nav className="text-sm text-gray-600">
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  )
}
