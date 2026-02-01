"use client"

import Link from 'next/link'
import { Home, PlusCircle, Folder, User } from 'lucide-react'

export default function BottomNav(){
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t py-2 px-4 flex justify-between items-center safe-bottom">
      <Link href="/" className="flex flex-col items-center text-xs">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link href="/create" className="flex flex-col items-center text-xs">
        <PlusCircle className="w-5 h-5" />
        <span>Create</span>
      </Link>
      <Link href="/projects" className="flex flex-col items-center text-xs">
        <Folder className="w-5 h-5" />
        <span>Projects</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center text-xs">
        <User className="w-5 h-5" />
        <span>Profile</span>
      </Link>
    </nav>
  )
}
