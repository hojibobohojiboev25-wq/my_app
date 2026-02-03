"use client"

import { useState } from 'react'
import { Share2, Copy, Facebook, Twitter, Instagram, Youtube, MessageCircle, Mail } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle?: string
  projectType?: 'video' | 'photo'
}

export default function ShareModal({ isOpen, onClose, projectTitle = "My Project", projectType = "video" }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out my amazing ${projectType} created with Vieditor! 🎬✨`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    instagram: 'https://www.instagram.com/', // Instagram doesn't support direct sharing
    youtube: 'https://www.youtube.com/upload',
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(`Check out my ${projectType}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareToPlatform = (platform: keyof typeof shareLinks) => {
    if (platform === 'instagram') {
      // For Instagram, just copy to clipboard and show message
      copyToClipboard()
      alert('Link copied! You can now paste it in Instagram.')
      return
    }

    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Share2 className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Share Project</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-2">Share your {projectType} "{projectTitle}"</p>
          <p className="text-sm text-gray-400">Let others discover your creative work!</p>
        </div>

        {/* Share URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                copied
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Share on Social Media
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => shareToPlatform('facebook')}
              className="flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span className="text-sm font-medium">Facebook</span>
            </button>

            <button
              onClick={() => shareToPlatform('twitter')}
              className="flex items-center gap-3 p-3 bg-blue-400 hover:bg-blue-500 rounded-lg text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm font-medium">Twitter</span>
            </button>

            <button
              onClick={() => shareToPlatform('instagram')}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">Instagram</span>
            </button>

            <button
              onClick={() => shareToPlatform('youtube')}
              className="flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span className="text-sm font-medium">YouTube</span>
            </button>

            <button
              onClick={() => shareToPlatform('whatsapp')}
              className="flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">WhatsApp</span>
            </button>

            <button
              onClick={() => shareToPlatform('email')}
              className="flex items-center gap-3 p-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Email</span>
            </button>
          </div>
        </div>

        {/* Share Stats */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">42</div>
              <div className="text-xs text-gray-400">Views</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">12</div>
              <div className="text-xs text-gray-400">Shares</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">8</div>
              <div className="text-xs text-gray-400">Likes</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Sharing helps grow the creative community! 🎨
          </p>
        </div>
      </div>
    </div>
  )
}