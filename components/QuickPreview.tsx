"use client"

import { useState, useEffect } from 'react'
import { Eye, X, Play, Pause } from 'lucide-react'

interface QuickPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>
  isVisible: boolean
  onClose: () => void
}

export default function QuickPreview({ videoRef, isVisible, onClose }: QuickPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!isVisible || !videoRef.current) return

    const video = videoRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [isVisible, videoRef])

  if (!isVisible) return null

  const togglePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return

    const time = (parseFloat(e.target.value) / 100) * duration
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Quick Preview</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-4 aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            playsInline
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Play/Pause and Progress */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={100}
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="w-full"
              />
            </div>

            <div className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Preview Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
              📸 Screenshot
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
              🔄 Loop Preview
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
              🎯 Split View
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
              📊 Waveform
            </button>
          </div>

          {/* Quick Filters Preview */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-white font-semibold mb-3">Quick Filter Preview</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { name: 'Original', filter: 'none' },
                { name: 'Vintage', filter: 'sepia(0.5) contrast(1.1) brightness(1.1)' },
                { name: 'B&W', filter: 'grayscale(1)' },
                { name: 'Bright', filter: 'brightness(1.2) contrast(1.1)' },
                { name: 'Cool', filter: 'hue-rotate(180deg) saturate(1.5)' },
                { name: 'Warm', filter: 'sepia(0.3) saturate(1.3) brightness(1.1)' }
              ].map((preset) => (
                <button
                  key={preset.name}
                  className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.style.filter = preset.filter
                    }
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            Use this preview to test effects before applying them permanently
          </p>
        </div>
      </div>
    </div>
  )
}