"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type User = { email: string; role: 'user' | 'admin' }

type AuthContextValue = {
  user: User | null
  login: (email: string, role?: User['role']) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth(){
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const raw = localStorage.getItem('mve_user')
    if (raw) setUser(JSON.parse(raw))
  },[])

  function login(email: string, role: User['role']='user'){
    const u = { email, role }
    setUser(u)
    localStorage.setItem('mve_user', JSON.stringify(u))
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('mve_user')
  }

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
