"use client"

import { useState } from 'react'
import { Download, FileVideo, Smartphone, Monitor, Tablet, CheckCircle, AlertCircle } from 'lucide-react'

interface DownloadOption {
  id: string
  name: string
  format: string
  quality: string
  size: string
  description: string
  icon: string
  recommended?: boolean
}

const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    id: 'mobile-hd',
    name: 'Mobile HD',
    format: 'MP4',
    quality: '1080p',
    size: '~50MB',
    description: 'Perfect for mobile devices and social media',
    icon: '📱',
    recommended: true
  },
  {
    id: 'desktop-4k',
    name: 'Desktop 4K',
    format: 'MP4',
    quality: '2160p',
    size: '~200MB',
    description: 'Ultra-high quality for large screens',
    icon: '🖥️'
  },
  {
    id: 'tablet-fullhd',
    name: 'Tablet Full HD',
    format: 'MP4',
    quality: '1080p',
    size: '~80MB',
    description: 'Optimized for tablet viewing',
    icon: '📱'
  },
  {
    id: 'web-optimized',
    name: 'Web Optimized',
    format: 'WebM',
    quality: '720p',
    size: '~25MB',
    description: 'Fast loading for websites',
    icon: '🌐'
  },
  {
    id: 'social-square',
    name: 'Social Square',
    format: 'MP4',
    quality: '1080p',
    size: '~40MB',
    description: 'Square format for Instagram and Facebook',
    icon: '📷'
  }
]

export default function VideoDownloader({ videoUrl, videoName = 'edited-video' }: {
  videoUrl?: string
  videoName?: string
}) {
  const [selectedFormat, setSelectedFormat] = useState<string>('mobile-hd')
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloadComplete, setDownloadComplete] = useState(false)

  const handleDownload = async (formatId: string) => {
    if (!videoUrl) {
      alert('No video to download. Please create or load a video first.')
      return
    }

    setIsDownloading(true)
    setDownloadProgress(0)
    setDownloadComplete(false)

    try {
      // Simulate processing time based on format
      const processingTime = formatId === 'mobile-hd' ? 1500 :
                           formatId === 'desktop-4k' ? 3000 :
                           formatId === 'tablet-fullhd' ? 2000 :
                           formatId === 'web-optimized' ? 1000 : 2500

      // Mock download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + Math.random() * 12
        })
      }, 150)

      // Process and download
      setTimeout(async () => {
        try {
          // For demo purposes, we'll download the original video
          // In a real app, this would process the video according to the selected format
          const response = await fetch(videoUrl)
          const blob = await response.blob()

          // Create download link
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `${videoName}-${formatId}.mp4`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          // Complete download
          setIsDownloading(false)
          setDownloadComplete(true)

          // Reset after 3 seconds
          setTimeout(() => {
            setDownloadComplete(false)
            setDownloadProgress(0)
          }, 3000)

        } catch (error) {
          console.error('Download failed:', error)
          alert('Download failed. Please check your internet connection and try again.')
          setIsDownloading(false)
          setDownloadProgress(0)
          clearInterval(progressInterval)
        }
      }, processingTime)

    } catch (error) {
      console.error('Processing failed:', error)
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }

  const selectedOption = DOWNLOAD_OPTIONS.find(opt => opt.id === selectedFormat)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Download Video</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred format and quality</p>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-3 mb-6">
          {DOWNLOAD_OPTIONS.map(option => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedFormat === option.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedFormat(option.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{option.name}</span>
                      {option.recommended && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {option.quality} • {option.format} • ~{option.size}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{option.quality}</div>
                  <div className="text-xs text-gray-400">{option.format}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              <span className="font-medium text-blue-900 dark:text-blue-100">Downloading...</span>
              <span className="text-sm text-blue-700 dark:text-blue-300">{Math.round(downloadProgress)}%</span>
            </div>
            <div className="bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Preparing your video for download...
            </div>
          </div>
        )}

        {/* Download Complete */}
        {downloadComplete && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900 dark:text-green-100">Download Complete!</div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Your video has been saved to your device
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleDownload(selectedFormat)}
            disabled={isDownloading || !videoUrl}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Video
              </>
            )}
          </button>
          <button className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <FileVideo className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Format Info */}
        {selectedOption && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Selected Format:</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedOption.name} • {selectedOption.quality} • {selectedOption.format} • ~{selectedOption.size}
            </div>
          </div>
        )}

        {/* Device Compatibility */}
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Compatibility:</strong> Downloads work on all modern devices. For best results, use the recommended format for your device type.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}