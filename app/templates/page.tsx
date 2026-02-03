"use client"

export const metadata = {
  title: 'Templates - Vieditor',
  description: 'Choose from professional video templates',
}

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, Monitor, Square, Instagram, Youtube, Facebook, Palette, Star } from 'lucide-react'

const TEMPLATES = [
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    platform: 'Instagram',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    icon: Instagram,
    category: 'Social Media',
    description: 'Vertical format perfect for Instagram Stories',
    popular: true
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    platform: 'Instagram',
    aspectRatio: '1:1',
    dimensions: '1080x1080',
    icon: Instagram,
    category: 'Social Media',
    description: 'Square format for Instagram feed posts',
    popular: true
  },
  {
    id: 'youtube-short',
    name: 'YouTube Short',
    platform: 'YouTube',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    icon: Youtube,
    category: 'Social Media',
    description: 'Short-form vertical videos for YouTube',
    popular: true
  },
  {
    id: 'youtube-video',
    name: 'YouTube Video',
    platform: 'YouTube',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    icon: Youtube,
    category: 'Social Media',
    description: 'Standard horizontal format for YouTube videos'
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    platform: 'Facebook',
    aspectRatio: '4:5',
    dimensions: '1080x1350',
    icon: Facebook,
    category: 'Social Media',
    description: 'Vertical format optimized for Facebook feed'
  },
  {
    id: 'tiktok',
    name: 'TikTok Video',
    platform: 'TikTok',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    icon: Smartphone,
    category: 'Social Media',
    description: 'Vertical format for TikTok videos'
  },
  {
    id: 'twitter-video',
    name: 'Twitter Video',
    platform: 'Twitter',
    aspectRatio: '16:9',
    dimensions: '1280x720',
    icon: Monitor,
    category: 'Social Media',
    description: 'Horizontal format for Twitter videos'
  },
  {
    id: 'cinematic-169',
    name: 'Cinematic 16:9',
    platform: 'General',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    icon: Monitor,
    category: 'Professional',
    description: 'Wide cinematic format for professional videos'
  },
  {
    id: 'square-promo',
    name: 'Square Promo',
    platform: 'General',
    aspectRatio: '1:1',
    dimensions: '1080x1080',
    icon: Square,
    category: 'Business',
    description: 'Square format perfect for promotional content'
  }
]

const THEMES = [
  {
    id: 'modern',
    name: 'Modern',
    colors: ['#6366f1', '#8b5cf6', '#ec4899'],
    description: 'Clean and contemporary design'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    colors: ['#92400e', '#dc2626', '#fbbf24'],
    description: 'Retro and nostalgic aesthetic'
  },
  {
    id: 'nature',
    name: 'Nature',
    colors: ['#059669', '#10b981', '#34d399'],
    description: 'Fresh and organic feel'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    colors: ['#1f2937', '#374151', '#6b7280'],
    description: 'Professional business style'
  },
  {
    id: 'bright',
    name: 'Bright & Fun',
    colors: ['#f59e0b', '#ef4444', '#8b5cf6'],
    description: 'Energetic and playful colors'
  }
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', ...new Set(TEMPLATES.map(t => t.category))]

  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.platform.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Templates</h1>
        <Link href="/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Start Creating
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        />

        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Video Formats</h2>
        <div className="grid gap-4">
          {filteredTemplates.map(template => {
            const Icon = template.icon
            return (
              <div key={template.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.name}</h3>
                        {template.popular && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{template.platform}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>{template.aspectRatio}</div>
                    <div>{template.dimensions}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{template.description}</p>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Use Template
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    Preview
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Themes Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">Color Themes</h2>
        <div className="grid gap-4">
          {THEMES.map(theme => (
            <div key={theme.id} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{theme.name}</h3>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </div>
                <div className="flex gap-1">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                Apply Theme
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
          <Palette className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="font-medium mb-2">Create Custom Template</h3>
          <p className="text-sm text-gray-600 mb-4">Design your own video format and save it as a reusable template</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Create Custom
          </button>
        </div>
      </section>
    </main>
  )
}