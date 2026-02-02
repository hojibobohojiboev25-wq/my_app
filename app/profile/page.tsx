"use client"

import { useState } from 'react'
import { useAuth } from '../../components/AuthProvider'
import Analytics from '../../components/Analytics'
import { BarChart3 } from 'lucide-react'

export default function Profile(){
  const { user, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user'|'admin'>('user')
  const [showAnalytics, setShowAnalytics] = useState(false)

  function onLogin(e: React.FormEvent){
    e.preventDefault()
    if (!email) return alert('Please enter an email')
    login(email, role)
    setEmail('')
  }

  return (
    <main className="px-4 pt-6 pb-24">
      <h1 className="text-xl font-semibold">Profile</h1>

      {!user ? (
        <form onSubmit={onLogin} className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Role (demo)</label>
            <select className="mt-1 w-full rounded-md border px-3 py-2" value={role} onChange={(e)=>setRole(e.target.value as any)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg">Sign In (mock)</button>
        </form>
      ) : (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border dark:border-gray-700">
          <div className="font-medium text-gray-900 dark:text-gray-100">{user.email}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Role: {user.role}</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowAnalytics(true)}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button
              onClick={() => logout()}
              className="py-3 px-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
            >
              Sign out
            </button>
          </div>
          {user.role === 'admin' && (
            <div className="mt-3">
              <a href="/admin" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Go to Admin Dashboard</a>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">This app uses a mock, client-side login for demo and role switching only.</div>

      {showAnalytics && (
        <Analytics onClose={() => setShowAnalytics(false)} />
      )}

    </main>
  )
}
