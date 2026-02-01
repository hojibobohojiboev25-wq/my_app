"use client"

import ProtectedAdmin from '../../components/ProtectedAdmin'

const MOCK_USERS = [
  { email: 'alice@example.com', role: 'user' },
  { email: 'bob@example.com', role: 'user' },
  { email: 'admin@example.com', role: 'admin' }
]

export default function AdminPage(){
  return (
    <ProtectedAdmin>
      <main className="px-4 pt-6 pb-24">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        <section className="mt-4 space-y-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <h2 className="font-medium">Users</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {MOCK_USERS.map((u, i) => (
                <li key={i} className="flex justify-between">
                  <span>{u.email}</span>
                  <span className="text-xs text-gray-500">{u.role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm">
            <h2 className="font-medium">Usage (mock)</h2>
            <div className="mt-2 text-sm text-gray-500">Total projects: 7</div>
            <div className="mt-1 text-sm text-gray-500">Active users (30d): 12</div>
          </div>
        </section>
      </main>
    </ProtectedAdmin>
  )
}
