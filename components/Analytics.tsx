"use client"

import { useState, useEffect } from 'react'
import { useApp } from '../contexts/AppContext'
import { BarChart3, TrendingUp, Users, Video, Image, Download, Eye, Clock } from 'lucide-react'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalProjects: number
  totalVideos: number
  totalPhotos: number
  totalDownloads: number
  averageSessionTime: number
  popularFeatures: string[]
  deviceStats: { mobile: number, desktop: number, tablet: number }
  languageStats: { [key: string]: number }
}

export default function Analytics({ onClose }: { onClose: () => void }) {
  const { t } = useApp()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    // Load analytics from localStorage (simulating real analytics)
    const loadAnalytics = () => {
      const saved = localStorage.getItem('vieditor_analytics')
      if (saved) {
        setAnalytics(JSON.parse(saved))
      } else {
        // Generate mock analytics data
        const mockData: AnalyticsData = {
          totalUsers: 1250,
          activeUsers: 890,
          totalProjects: 3200,
          totalVideos: 2100,
          totalPhotos: 1100,
          totalDownloads: 1850,
          averageSessionTime: 12.5,
          popularFeatures: ['Video Trimming', 'Filters', 'Text Overlay', 'Templates'],
          deviceStats: { mobile: 68, desktop: 25, tablet: 7 },
          languageStats: { en: 45, de: 30, ru: 25 }
        }
        localStorage.setItem('vieditor_analytics', JSON.stringify(mockData))
        setAnalytics(mockData)
      }
    }

    loadAnalytics()
  }, [])

  if (!analytics) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl max-w-4xl w-full h-96 flex items-center justify-center">
          <div className="text-white">Loading analytics...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Users</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Video className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.totalVideos.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Videos Created</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Download className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.totalDownloads.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Downloads</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Device Usage */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Device Usage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Mobile</span>
                  </div>
                  <span className="text-white font-semibold">{analytics.deviceStats.mobile}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: `${analytics.deviceStats.mobile}%`}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Desktop</span>
                  </div>
                  <span className="text-white font-semibold">{analytics.deviceStats.desktop}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: `${analytics.deviceStats.desktop}%`}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Tablet</span>
                  </div>
                  <span className="text-white font-semibold">{analytics.deviceStats.tablet}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{width: `${analytics.deviceStats.tablet}%`}}></div>
                </div>
              </div>
            </div>

            {/* Language Usage */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Language Usage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">English</span>
                  </div>
                  <span className="text-white font-semibold">{analytics.languageStats.en}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{width: `${analytics.languageStats.en}%`}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">German</span>
                  </div>
                  <span className="text-white font-semibold">{analytics.languageStats.de}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{width: `${analytics.languageStats.de}%`}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Russian</span>
                  </div>
                  <span className="text-white font-semibold">{analytics.languageStats.ru}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: `${analytics.languageStats.ru}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Features */}
          <div className="bg-gray-700 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Popular Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analytics.popularFeatures.map((feature, index) => (
                <div key={feature} className="bg-gray-600 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">#{index + 1}</div>
                  <div className="text-sm text-gray-300">{feature}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{analytics.averageSessionTime}m</div>
              <div className="text-sm text-gray-400">Avg Session Time</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Eye className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{analytics.totalProjects.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Image className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{analytics.totalPhotos.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Photos Edited</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}