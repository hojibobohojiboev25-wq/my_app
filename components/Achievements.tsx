"use client"

import { useState, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { Trophy, Star, Zap, Video, Image, Download, Target, Award } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: string
}

export default function Achievements({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  useEffect(() => {
    // Load achievements from localStorage
    const loadAchievements = () => {
      const saved = localStorage.getItem('vieditor_achievements')
      if (saved) {
        setAchievements(JSON.parse(saved))
      } else {
        // Generate mock achievements
        const mockAchievements: Achievement[] = [
          {
            id: 'first_video',
            title: 'First Video',
            description: 'Create your first video project',
            icon: '🎬',
            unlocked: true,
            progress: 1,
            maxProgress: 1,
            rarity: 'common',
            unlockedAt: '2024-01-15'
          },
          {
            id: 'video_master',
            title: 'Video Master',
            description: 'Create 10 video projects',
            icon: '🎥',
            unlocked: false,
            progress: 3,
            maxProgress: 10,
            rarity: 'rare'
          },
          {
            id: 'filter_expert',
            title: 'Filter Expert',
            description: 'Apply 50 different filters',
            icon: '🎨',
            unlocked: false,
            progress: 12,
            maxProgress: 50,
            rarity: 'epic'
          },
          {
            id: 'text_artist',
            title: 'Text Artist',
            description: 'Add text overlays to 25 videos',
            icon: '✍️',
            unlocked: false,
            progress: 8,
            maxProgress: 25,
            rarity: 'rare'
          },
          {
            id: 'download_champion',
            title: 'Download Champion',
            description: 'Download 100 projects',
            icon: '⬇️',
            unlocked: false,
            progress: 45,
            maxProgress: 100,
            rarity: 'epic'
          },
          {
            id: 'template_creator',
            title: 'Template Creator',
            description: 'Use 20 different templates',
            icon: '📋',
            unlocked: true,
            progress: 20,
            maxProgress: 20,
            rarity: 'common',
            unlockedAt: '2024-02-01'
          },
          {
            id: 'social_sharer',
            title: 'Social Sharer',
            description: 'Share 50 projects on social media',
            icon: '📱',
            unlocked: false,
            progress: 15,
            maxProgress: 50,
            rarity: 'legendary'
          },
          {
            id: 'speed_demon',
            title: 'Speed Demon',
            description: 'Edit a video in under 5 minutes',
            icon: '⚡',
            unlocked: true,
            progress: 1,
            maxProgress: 1,
            rarity: 'rare',
            unlockedAt: '2024-01-20'
          }
        ]
        localStorage.setItem('vieditor_achievements', JSON.stringify(mockAchievements))
        setAchievements(mockAchievements)
      }
    }

    loadAchievements()
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400'
      case 'rare': return 'text-blue-400'
      case 'epic': return 'text-purple-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedFilter === 'unlocked') return achievement.unlocked
    if (selectedFilter === 'locked') return !achievement.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
              <p className="text-gray-400 text-sm">{unlockedCount} of {totalCount} unlocked</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setSelectedFilter('unlocked')}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedFilter === 'unlocked'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setSelectedFilter('locked')}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedFilter === 'locked'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Locked ({totalCount - unlockedCount})
            </button>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-800 border-gray-700 opacity-75'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)} bg-gray-700`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span>{achievement.progress} / {achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>

                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="mt-2 text-xs text-gray-500">
                        Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievement Badge */}
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No achievements found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}