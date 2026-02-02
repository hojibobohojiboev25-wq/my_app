"use client"

import { useState } from 'react'
import { BarChart3, TrendingUp, Clock, Film, Users, Download, Eye, Heart, Share2, Calendar } from 'lucide-react'

interface AnalyticsData {
  totalProjects: number
  totalExports: number
  totalWatchTime: number
  averageProjectDuration: number
  mostUsedFormats: Array<{ format: string; count: number }>
  exportTrends: Array<{ date: string; exports: number }>
  projectCategories: Array<{ category: string; count: number }>
  topPerformingContent: Array<{
    title: string
    views: number
    engagement: number
    platform: string
  }>
}

const MOCK_ANALYTICS: AnalyticsData = {
  totalProjects: 24,
  totalExports: 18,
  totalWatchTime: 1247, // minutes
  averageProjectDuration: 42, // seconds
  mostUsedFormats: [
    { format: 'Instagram Story', count: 8 },
    { format: 'YouTube HD', count: 5 },
    { format: 'TikTok', count: 3 },
    { format: 'Facebook HD', count: 2 }
  ],
  exportTrends: [
    { date: '2024-01-25', exports: 2 },
    { date: '2024-01-26', exports: 1 },
    { date: '2024-01-27', exports: 3 },
    { date: '2024-01-28', exports: 2 },
    { date: '2024-01-29', exports: 4 },
    { date: '2024-01-30', exports: 3 },
    { date: '2024-02-01', exports: 3 }
  ],
  projectCategories: [
    { category: 'Social Media', count: 12 },
    { category: 'Business', count: 6 },
    { category: 'Personal', count: 4 },
    { category: 'Education', count: 2 }
  ],
  topPerformingContent: [
    {
      title: 'Summer Vacation Vlog',
      views: 1250,
      engagement: 8.5,
      platform: 'YouTube'
    },
    {
      title: 'Product Demo',
      views: 890,
      engagement: 12.3,
      platform: 'Instagram'
    },
    {
      title: 'Team Introduction',
      views: 567,
      engagement: 15.2,
      platform: 'LinkedIn'
    }
  ]
}

export default function Analytics({ onClose }: { onClose?: () => void }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'insights'>('overview')

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Analytics</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-4">
          {/* Time Range Selector */}
          <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`flex-1 py-2 px-3 rounded-md text-sm ${
                timeRange === '7d' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`flex-1 py-2 px-3 rounded-md text-sm ${
                timeRange === '30d' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`flex-1 py-2 px-3 rounded-md text-sm ${
                timeRange === '90d' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              90 Days
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-3 rounded-md text-sm ${
                activeTab === 'overview' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`flex-1 py-2 px-3 rounded-md text-sm ${
                activeTab === 'performance' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex-1 py-2 px-3 rounded-md text-sm ${
                activeTab === 'insights' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Insights
            </button>
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Film className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Projects</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{MOCK_ANALYTICS.totalProjects}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">+3 this month</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Exports</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">{MOCK_ANALYTICS.totalExports}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">75% completion rate</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Watch Time</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{formatTime(MOCK_ANALYTICS.totalWatchTime)}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Total viewed</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Avg Duration</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{MOCK_ANALYTICS.averageProjectDuration}s</div>
                  <div className="text-xs text-orange-600 dark:text-orange-400">Per project</div>
                </div>
              </div>

              {/* Export Trends */}
              <div>
                <h3 className="font-medium mb-3">Export Activity</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</span>
                    <span className="text-sm font-medium">{MOCK_ANALYTICS.exportTrends.slice(-7).reduce((sum, day) => sum + day.exports, 0)} exports</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {MOCK_ANALYTICS.exportTrends.slice(-7).map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="bg-blue-500 rounded-t w-full"
                          style={{ height: `${(day.exports / 4) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4">
              {/* Top Performing Content */}
              <div>
                <h3 className="font-medium mb-3">Top Performing Content</h3>
                <div className="space-y-3">
                  {MOCK_ANALYTICS.topPerformingContent.map((content, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{content.title}</span>
                        <span className="text-xs text-gray-500">{content.platform}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-blue-500" />
                          <span>{formatNumber(content.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{content.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format Usage */}
              <div>
                <h3 className="font-medium mb-3">Most Used Formats</h3>
                <div className="space-y-2">
                  {MOCK_ANALYTICS.mostUsedFormats.map((format, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{format.format}</span>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2 flex-1 max-w-20">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(format.count / Math.max(...MOCK_ANALYTICS.mostUsedFormats.map(f => f.count))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-6 text-right">{format.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-4">
              {/* Project Categories */}
              <div>
                <h3 className="font-medium mb-3">Content Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {MOCK_ANALYTICS.projectCategories.map((category, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{category.count}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{category.category}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-medium mb-3">AI Insights</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm text-blue-900 dark:text-blue-100">Trending Format</div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          Instagram Stories are performing 40% better this month
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm text-green-900 dark:text-green-100">Optimal Length</div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Videos 30-45 seconds get 25% more engagement
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm text-purple-900 dark:text-purple-100">Best Time to Post</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          Tuesdays and Thursdays at 7-9 PM get highest views
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export Data Button */}
          <div className="mt-6 pt-4 border-t dark:border-gray-700">
            <button className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Export Analytics Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}