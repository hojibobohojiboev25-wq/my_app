"use client"

import { useState, useEffect } from 'react'
import ProtectedAdmin from '../../components/ProtectedAdmin'
import { useAuth } from '../../components/AuthProvider'
import { useApp } from '../../contexts/AppContext'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
  lastLogin: string
  isActive: boolean
}

export default function AdminPage(){
  const { user } = useAuth()
  const { t } = useApp()
  const [users, setUsers] = useState<User[]>([])
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [newUserData, setNewUserData] = useState({
    email: '',
    name: '',
    role: 'user' as 'user' | 'admin',
    password: ''
  })

  // Load users from localStorage (simulating database)
  useEffect(() => {
    const savedUsers = localStorage.getItem('vieditor_users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      // Initialize with default users
      const defaultUsers: User[] = [
        {
          id: '1',
          email: 'admin@vieditor.com',
          name: 'Admin User',
          role: 'admin',
          createdAt: '2024-01-01',
          lastLogin: new Date().toISOString(),
          isActive: true
        }
      ]
      setUsers(defaultUsers)
      localStorage.setItem('vieditor_users', JSON.stringify(defaultUsers))
    }
  }, [])

  // Save users to localStorage
  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
    localStorage.setItem('vieditor_users', JSON.stringify(updatedUsers))
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    // In real app, this would update the password in database
    alert('Password updated successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowPasswordModal(false)
  }

  const handleAddUser = () => {
    if (!newUserData.email || !newUserData.name || !newUserData.password) {
      alert('Please fill all fields')
      return
    }
    if (newUserData.password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: newUserData.email,
      name: newUserData.name,
      role: newUserData.role,
      createdAt: new Date().toISOString(),
      lastLogin: 'Never',
      isActive: true
    }

    const updatedUsers = [...users, newUser]
    saveUsers(updatedUsers)

    // In real app, this would create user account
    alert('User added successfully!')
    setNewUserData({ email: '', name: '', role: 'user', password: '' })
    setShowAddUserModal(false)
  }

  const handleDeleteUser = (userId: string) => {
    if (userId === user?.email) {
      alert('Cannot delete your own account')
      return
    }
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== userId)
      saveUsers(updatedUsers)
    }
  }

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    )
    saveUsers(updatedUsers)
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    totalProjects: 24 // Mock data
  }

  return (
    <ProtectedAdmin>
      <main className="px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('adminDashboard')}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Welcome, {user?.email}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="text-sm opacity-90">{t('totalUsers')}</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <div className="text-sm opacity-90">{t('activeUsers')}</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="text-2xl font-bold">{stats.adminUsers}</div>
            <div className="text-sm opacity-90">Admin Users</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <div className="text-sm opacity-90">Total Projects</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🔐</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{t('changePassword')}</div>
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{t('addUser')}</div>
          </button>
        </div>

        {/* Users Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
          <div className="p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('userManagement')}</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{u.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{u.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Role: {u.role} • Created: {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      u.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {u.isActive ? '🚫' : '✅'}
                    </button>
                    {u.id !== '1' && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('changePassword')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('currentPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('newPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {t('updatePassword')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('addUser')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUserData.password}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={newUserData.role === 'user'}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value as 'user' | 'admin' }))}
                        className="mr-2"
                      />
                      User
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={newUserData.role === 'admin'}
                        onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value as 'user' | 'admin' }))}
                        className="mr-2"
                      />
                      Admin
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  {t('addUser')}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedAdmin>
  )
}
