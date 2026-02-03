"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, Monitor, Square, Instagram, Youtube, Facebook, Palette, Star } from 'lucide-react'

const TEMPLATES = [
  // Professional Templates
  {
    id: 'business-promo',
    name: 'Business Promo',
    platform: 'Professional',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Business',
    description: 'Professional business presentation with clean animations',
    thumbnail: '/templates/business-promo.jpg',
    features: ['Corporate colors', 'Professional typography', 'Call-to-action overlay'],
    popular: true,
    preset: {
      filters: { brightness: 105, contrast: 110, saturation: 95 },
      text: { font: 'Inter', size: 48, color: '#1f2937', position: 'center' },
      transitions: 'fade'
    }
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    platform: 'E-commerce',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    category: 'Business',
    description: 'Dynamic product demonstration with zoom effects',
    thumbnail: '/templates/product-showcase.jpg',
    features: ['Product focus', 'Zoom animations', 'Price overlay'],
    popular: true,
    preset: {
      filters: { brightness: 110, contrast: 105, saturation: 115 },
      text: { font: 'Poppins', size: 36, color: '#ffffff', position: 'bottom' },
      transitions: 'slide'
    }
  },
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    platform: 'Events',
    aspectRatio: '1:1',
    dimensions: '1080x1080',
    category: 'Events',
    description: 'Elegant event invitation with animated elements',
    thumbnail: '/templates/event-invitation.jpg',
    features: ['Date/time display', 'Location info', 'RSVP button'],
    preset: {
      filters: { brightness: 115, contrast: 100, saturation: 105 },
      text: { font: 'Playfair Display', size: 42, color: '#1a365d', position: 'center' },
      transitions: 'scale'
    }
  },

  // Social Media Templates
  {
    id: 'instagram-story-fashion',
    name: 'Fashion Story',
    platform: 'Instagram',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    category: 'Social Media',
    description: 'Trendy fashion lookbook with swipe animations',
    thumbnail: '/templates/instagram-story-fashion.jpg',
    features: ['Multiple slides', 'Product tags', 'Music sync'],
    preset: {
      filters: { brightness: 108, contrast: 102, saturation: 118 },
      text: { font: 'Montserrat', size: 28, color: '#ffffff', position: 'overlay' },
      transitions: 'swipe'
    }
  },
  {
    id: 'tiktok-dance',
    name: 'Dance Challenge',
    platform: 'TikTok',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    category: 'Social Media',
    description: 'Energetic dance video with beat-matched effects',
    thumbnail: '/templates/tiktok-dance.jpg',
    features: ['Beat detection', 'Color effects', 'Text animations'],
    popular: true,
    preset: {
      filters: { brightness: 120, contrast: 95, saturation: 125 },
      text: { font: 'Impact', size: 32, color: '#ff6b35', position: 'dynamic' },
      transitions: 'flash'
    }
  },
  {
    id: 'youtube-tutorial',
    name: 'Tutorial Video',
    platform: 'YouTube',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Education',
    description: 'Educational content with step-by-step animations',
    thumbnail: '/templates/youtube-tutorial.jpg',
    features: ['Step indicators', 'Progress bar', 'Voiceover sync'],
    preset: {
      filters: { brightness: 105, contrast: 108, saturation: 100 },
      text: { font: 'Roboto', size: 38, color: '#2d3748', position: 'top' },
      transitions: 'reveal'
    }
  },

  // Creative Templates
  {
    id: 'travel-vlog',
    name: 'Travel Vlog',
    platform: 'Content Creator',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Lifestyle',
    description: 'Cinematic travel footage with location overlays',
    thumbnail: '/templates/travel-vlog.jpg',
    features: ['Map integration', 'Location pins', 'Weather effects'],
    preset: {
      filters: { brightness: 112, contrast: 106, saturation: 115 },
      text: { font: 'Lato', size: 44, color: '#ffffff', position: 'bottom' },
      transitions: 'pan'
    }
  },
  {
    id: 'wedding-highlight',
    name: 'Wedding Highlight',
    platform: 'Events',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Personal',
    description: 'Romantic wedding video with smooth transitions',
    thumbnail: '/templates/wedding-highlight.jpg',
    features: ['Love theme', 'Soft filters', 'Music sync'],
    preset: {
      filters: { brightness: 118, contrast: 98, saturation: 108 },
      text: { font: 'Great Vibes', size: 52, color: '#d4af37', position: 'center' },
      transitions: 'dissolve'
    }
  },
  {
    id: 'fitness-motivation',
    name: 'Fitness Motivation',
    platform: 'Health & Fitness',
    aspectRatio: '9:16',
    dimensions: '1080x1920',
    category: 'Sports',
    description: 'High-energy workout video with motivational text',
    thumbnail: '/templates/fitness-motivation.jpg',
    features: ['Timer overlays', 'Progress tracking', 'Motivational quotes'],
    preset: {
      filters: { brightness: 115, contrast: 112, saturation: 120 },
      text: { font: 'Bebas Neue', size: 40, color: '#ff4757', position: 'dynamic' },
      transitions: 'bounce'
    }
  },

  // Advanced Templates
  {
    id: 'documentary-style',
    name: 'Documentary',
    platform: 'Professional',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Professional',
    description: 'Professional documentary style with interviews',
    thumbnail: '/templates/documentary-style.jpg',
    features: ['B-roll integration', 'Subtitles', 'Professional grading'],
    preset: {
      filters: { brightness: 95, contrast: 115, saturation: 85 },
      text: { font: 'Source Sans Pro', size: 36, color: '#ffffff', position: 'bottom' },
      transitions: 'wipe'
    }
  },
  {
    id: 'gaming-highlights',
    name: 'Gaming Highlights',
    platform: 'Gaming',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Entertainment',
    description: 'Exciting gaming moments with effects and text',
    thumbnail: '/templates/gaming-highlights.jpg',
    features: ['Slow motion', 'Screen effects', 'Score overlays'],
    popular: true,
    preset: {
      filters: { brightness: 110, contrast: 105, saturation: 130 },
      text: { font: 'Orbitron', size: 34, color: '#00ff88', position: 'overlay' },
      transitions: 'glitch'
    }
  },
  {
    id: 'music-video',
    name: 'Music Video',
    platform: 'Music',
    aspectRatio: '16:9',
    dimensions: '1920x1080',
    category: 'Entertainment',
    description: 'Artistic music video with synchronized effects',
    thumbnail: '/templates/music-video.jpg',
    features: ['Beat visualization', 'Color sync', 'Lyrics overlay'],
    preset: {
      filters: { brightness: 108, contrast: 102, saturation: 125 },
      text: { font: 'Abril Fatface', size: 46, color: '#ffffff', position: 'center' },
      transitions: 'pulse'
    }
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
        <h1 className="text-xl font-semibold text-white">Templates</h1>
        <Link href="/create" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
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
          className="w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 px-4 py-3"
        />

        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4 text-white">Video Formats</h2>
        <div className="grid gap-4">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <span className="text-2xl">{template.icon}</span>
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
                  <div className="text-right text-xs text-gray-400">
                    <div>{template.aspectRatio}</div>
                    <div>{template.dimensions}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-3">{template.description}</p>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                    Use Template
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors">
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
        <h2 className="text-lg font-medium mb-4 text-white">Color Themes</h2>
        <div className="grid gap-4">
          {THEMES.map(theme => (
            <div key={theme.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white">{theme.name}</h3>
                  <p className="text-sm text-gray-400">{theme.description}</p>
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

              <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors">
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