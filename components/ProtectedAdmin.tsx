"use client"

import React from 'react'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'

export default function ProtectedAdmin({ children }:{ children: React.ReactNode }){
  const { user } = useAuth()
  const router = useRouter()

  // Only perform client-side redirects
  if (typeof window !== 'undefined') {
    if (!user) {
      // If not logged in, redirect to profile
      router.push('/profile')
      return null
    }

    if (user?.role !== 'admin'){
      router.push('/')
      return null
    }
  }

  return <>{children}</>
}
