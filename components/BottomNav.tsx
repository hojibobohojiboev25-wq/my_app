"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '../contexts/AppContext'

const navItems = [
  { href: '/', icon: '🏠', labelKey: 'home' },
  { href: '/templates', icon: '🎨', labelKey: 'templates' },
  { href: '/create', icon: '⚡', labelKey: 'create' },
  { href: '/projects', icon: '📁', labelKey: 'projects' },
  { href: '/profile', icon: '👤', labelKey: 'profile' }
]

export default function BottomNav(){
  const pathname = usePathname()
  const { t } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 px-4 py-3 safe-bottom shadow-lg">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}