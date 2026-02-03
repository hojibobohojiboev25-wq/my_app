"use client"

export const metadata = {
  title: 'Profile - Vieditor',
  description: 'Manage your account and view analytics',
}

import { useState } from 'react'
import { useAuth } from '../../components/AuthProvider'
import Analytics from '../../components/Analytics'
import Achievements from '../../components/Achievements'
import { BarChart3, Trophy } from 'lucide-react'

export default function Profile(){
  const { user, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user'|'admin'>('user')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)

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
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowAnalytics(true)}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </button>
            <button
              onClick={() => setShowAchievements(true)}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Achievements</span>
            </button>
            <button
              onClick={() => {/* Show tutorial */}}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span className="text-lg">📚</span>
              <span className="font-medium">Tutorial</span>
            </button>
            <button
              onClick={() => {/* Share app */}}
              className="flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span className="text-lg">📤</span>
              <span className="font-medium">Share App</span>
            </button>
            <button
              onClick={() => logout()}
              className="col-span-2 flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span className="text-lg">🚪</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>

          {/* Usage Stats */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Your Stats</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">24</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Edits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">42h</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Time Saved</div>
              </div>
            </div>
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

      {showAchievements && (
        <Achievements onClose={() => setShowAchievements(false)} />
      )}

    </main>
  )
}
