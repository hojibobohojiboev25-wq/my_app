"use client"

import { useState } from 'react'
import { Download, Settings, FileVideo, FileImage, Zap, X } from 'lucide-react'

interface AdvancedExportProps {
  isOpen: boolean
  onClose: () => void
  onExport: (settings: ExportSettings) => void
  contentType: 'video' | 'photo'
}

interface ExportSettings {
  format: 'mp4' | 'webm' | 'gif' | 'png' | 'jpg' | 'webp'
  quality: 'low' | 'medium' | 'high' | 'ultra'
  resolution: 'original' | '1080p' | '720p' | '480p' | '360p'
  frameRate: 24 | 30 | 60
  bitrate: 'low' | 'medium' | 'high' | 'ultra'
  includeAudio: boolean
  watermark: boolean
  compression: 'none' | 'light' | 'medium' | 'heavy'
}

const VIDEO_FORMATS = [
  { value: 'mp4', label: 'MP4 (Universal)', icon: '🎬' },
  { value: 'webm', label: 'WebM (Web Optimized)', icon: '🌐' },
  { value: 'gif', label: 'GIF (Animated)', icon: '🎞️' }
] as const

const IMAGE_FORMATS = [
  { value: 'png', label: 'PNG (Lossless)', icon: '🖼️' },
  { value: 'jpg', label: 'JPG (Small Size)', icon: '📷' },
  { value: 'webp', label: 'WebP (Modern)', icon: '🎯' }
] as const

const QUALITIES = [
  { value: 'low', label: 'Low (Fast)', size: '~10MB', color: 'text-red-400' },
  { value: 'medium', label: 'Medium (Balanced)', size: '~25MB', color: 'text-yellow-400' },
  { value: 'high', label: 'High (Quality)', size: '~50MB', color: 'text-green-400' },
  { value: 'ultra', label: 'Ultra (Best)', size: '~100MB', color: 'text-purple-400' }
] as const

const RESOLUTIONS = [
  { value: 'original', label: 'Original' },
  { value: '1080p', label: '1080p HD' },
  { value: '720p', label: '720p HD' },
  { value: '480p', label: '480p SD' },
  { value: '360p', label: '360p Mobile' }
] as const

export default function AdvancedExport({ isOpen, onClose, onExport, contentType }: AdvancedExportProps) {
  const [settings, setSettings] = useState<ExportSettings>({
    format: contentType === 'video' ? 'mp4' : 'png',
    quality: 'high',
    resolution: 'original',
    frameRate: 30,
    bitrate: 'high',
    includeAudio: true,
    watermark: false,
    compression: 'medium'
  })

  const [estimatedSize, setEstimatedSize] = useState('~25MB')
  const [estimatedTime, setEstimatedTime] = useState('2-3 min')

  const updateEstimates = (newSettings: ExportSettings) => {
    // Mock size and time estimation
    let sizeMultiplier = 1
    let timeMultiplier = 1

    if (newSettings.quality === 'ultra') sizeMultiplier = 4
    else if (newSettings.quality === 'high') sizeMultiplier = 2
    else if (newSettings.quality === 'medium') sizeMultiplier = 1
    else sizeMultiplier = 0.5

    if (newSettings.resolution === '1080p') sizeMultiplier *= 1.5
    else if (newSettings.resolution === '720p') sizeMultiplier *= 1
    else if (newSettings.resolution === '480p') sizeMultiplier *= 0.7
    else if (newSettings.resolution === '360p') sizeMultiplier *= 0.5

    if (newSettings.frameRate === 60) sizeMultiplier *= 1.3
    else if (newSettings.frameRate === 24) sizeMultiplier *= 0.8

    const baseSize = contentType === 'video' ? 25 : 5
    const size = Math.round(baseSize * sizeMultiplier)
    setEstimatedSize(`~${size}MB`)

    if (newSettings.quality === 'ultra') timeMultiplier = 3
    else if (newSettings.quality === 'high') timeMultiplier = 2
    else if (newSettings.quality === 'medium') timeMultiplier = 1.5
    else timeMultiplier = 1

    const time = Math.round((contentType === 'video' ? 2.5 : 1) * timeMultiplier)
    setEstimatedTime(`${time}-${time + 1} min`)
  }

  const handleSettingChange = (key: keyof ExportSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    updateEstimates(newSettings)
  }

  const handleExport = () => {
    onExport(settings)
    onClose()
  }

  if (!isOpen) return null

  const formats = contentType === 'video' ? VIDEO_FORMATS : IMAGE_FORMATS

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Advanced Export</h2>
              <p className="text-gray-400 text-sm">Customize your export settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-1 gap-2">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => handleSettingChange('format', format.value)}
                  className={`p-3 rounded-lg border transition-all ${
                    settings.format === format.value
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                      : 'border-gray-600 hover:border-gray-500 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{format.icon}</span>
                    <span className="font-medium">{format.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Quality Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {QUALITIES.map((quality) => (
                <button
                  key={quality.value}
                  onClick={() => handleSettingChange('quality', quality.value)}
                  className={`p-3 rounded-lg border transition-all ${
                    settings.quality === quality.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className={`font-medium ${quality.color}`}>{quality.label}</div>
                    <div className="text-xs text-gray-400">{quality.size}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video-specific settings */}
          {contentType === 'video' && (
            <>
              {/* Resolution */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Resolution
                </label>
                <select
                  value={settings.resolution}
                  onChange={(e) => handleSettingChange('resolution', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  {RESOLUTIONS.map((res) => (
                    <option key={res.value} value={res.value}>{res.label}</option>
                  ))}
                </select>
              </div>

              {/* Frame Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Frame Rate (FPS)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[24, 30, 60].map((fps) => (
                    <button
                      key={fps}
                      onClick={() => handleSettingChange('frameRate', fps)}
                      className={`p-2 rounded-lg border transition-all ${
                        settings.frameRate === fps
                          ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                          : 'border-gray-600 hover:border-gray-500 text-gray-300'
                      }`}
                    >
                      {fps} FPS
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Options */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Include Audio
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.includeAudio}
                    onChange={(e) => handleSettingChange('includeAudio', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Yes</span>
                </label>
              </div>
            </>
          )}

          {/* Advanced Options */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-4">Advanced Options</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Compression Level
                </label>
                <select
                  value={settings.compression}
                  onChange={(e) => handleSettingChange('compression', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="none">No Compression</option>
                  <option value="light">Light Compression</option>
                  <option value="medium">Medium Compression</option>
                  <option value="heavy">Heavy Compression</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Add Watermark
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.watermark}
                    onChange={(e) => handleSettingChange('watermark', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Vieditor</span>
                </label>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Estimated Size:</span>
                <div className="text-white font-semibold">{estimatedSize}</div>
              </div>
              <div>
                <span className="text-gray-400">Estimated Time:</span>
                <div className="text-white font-semibold">{estimatedTime}</div>
              </div>
              <div>
                <span className="text-gray-400">Format:</span>
                <div className="text-white font-semibold">{settings.format.toUpperCase()}</div>
              </div>
              <div>
                <span className="text-gray-400">Quality:</span>
                <div className={`font-semibold ${QUALITIES.find(q => q.value === settings.quality)?.color}`}>
                  {QUALITIES.find(q => q.value === settings.quality)?.label}
                </div>
              </div>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Start Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}