"use client"

import { useState, useEffect } from 'react'
import { Trophy, Star, Award, Target, Zap, Crown } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_edit',
    title: 'First Edit',
    description: 'Complete your first video edit',
    icon: '✨',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'common'
  },
  {
    id: 'template_master',
    title: 'Template Master',
    description: 'Use 10 different templates',
    icon: '🎨',
    unlocked: true,
    progress: 7,
    maxProgress: 10,
    rarity: 'rare'
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Edit 5 videos in under 30 seconds each',
    icon: '⚡',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'epic'
  },
  {
    id: 'cloud_savvy',
    title: 'Cloud Savvy',
    description: 'Save 20 projects to cloud storage',
    icon: '☁️',
    unlocked: true,
    progress: 18,
    maxProgress: 20,
    rarity: 'rare'
  },
  {
    id: 'social_star',
    title: 'Social Star',
    description: 'Export 50 videos for social media',
    icon: '⭐',
    unlocked: false,
    progress: 24,
    maxProgress: 50,
    rarity: 'legendary'
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Spend 10+ minutes editing a single video',
    icon: '🎯',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rarity: 'epic'
  }
]

export default function Achievements({ onClose }: { onClose?: () => void }) {
  const [selectedRarity, setSelectedRarity] = useState<string>('all')

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500'
      case 'rare': return 'from-blue-400 to-blue-500'
      case 'epic': return 'from-purple-400 to-purple-500'
      case 'legendary': return 'from-yellow-400 to-yellow-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '👑'
      case 'epic': return '💎'
      case 'rare': return '🔷'
      default: return '⚪'
    }
  }

  const filteredAchievements = selectedRarity === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.rarity === selectedRarity)

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length
  const totalCount = ACHIEVEMENTS.length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Achievements</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unlockedCount} of {totalCount} unlocked
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round((unlockedCount / totalCount) * 100)}%</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Rarity Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { key: 'all', label: 'All', color: 'bg-gray-100 dark:bg-gray-700' },
              { key: 'common', label: 'Common', color: 'bg-gray-100 dark:bg-gray-700' },
              { key: 'rare', label: 'Rare', color: 'bg-blue-100 dark:bg-blue-900/20' },
              { key: 'epic', label: 'Epic', color: 'bg-purple-100 dark:bg-purple-900/20' },
              { key: 'legendary', label: 'Legendary', color: 'bg-yellow-100 dark:bg-yellow-900/20' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedRarity(filter.key)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedRarity === filter.key
                    ? `${filter.color} text-gray-900 dark:text-gray-100 font-medium`
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Achievements List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAchievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.unlocked
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    <span className="text-lg">{achievement.icon}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      <span className="text-sm">{getRarityIcon(achievement.rarity)}</span>
                    </div>

                    <p className={`text-sm mb-2 ${
                      achievement.unlocked
                        ? 'text-gray-600 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked
                              ? 'bg-gradient-to-r from-green-400 to-green-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{unlockedCount}</div>
              <div className="text-xs text-blue-700 dark:text-blue-300">Unlocked</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{totalCount - unlockedCount}</div>
              <div className="text-xs text-purple-700 dark:text-purple-300">Remaining</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">4</div>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">Rarities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}