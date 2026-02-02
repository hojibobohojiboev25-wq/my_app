"use client"

import Link from 'next/link'
import { Home, PlusCircle, Folder, User, Palette } from 'lucide-react'

export default function BottomNav(){
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-2 px-4 flex justify-between items-center safe-bottom shadow-lg">
      <Link href="/" className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link href="/templates" className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Palette className="w-5 h-5" />
        <span>Templates</span>
      </Link>
      <Link href="/create" className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <PlusCircle className="w-5 h-5" />
        <span>Create</span>
      </Link>
      <Link href="/projects" className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Folder className="w-5 h-5" />
        <span>Projects</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <User className="w-5 h-5" />
        <span>Profile</span>
      </Link>
    </nav>
  )
}
