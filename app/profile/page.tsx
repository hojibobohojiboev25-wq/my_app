"use client"

import { useState } from 'react'
import { useAuth } from '../../components/AuthProvider'

export default function Profile(){
  const { user, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'user'|'admin'>('user')

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
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="font-medium">{user.email}</div>
          <div className="text-sm text-gray-500">Role: {user.role}</div>
          <div className="mt-3">
            <button onClick={()=>logout()} className="px-3 py-2 bg-red-600 text-white rounded-lg">Sign out</button>
          </div>
          {user.role === 'admin' && (
            <div className="mt-3">
              <a href="/admin" className="text-sm text-blue-600">Go to Admin Dashboard</a>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-xs text-gray-400">This app uses a mock, client-side login for demo and role switching only.</div>

    </main>
  )
}
