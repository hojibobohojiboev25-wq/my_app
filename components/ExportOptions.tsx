"use client"

import { useState } from 'react'
import { Download, Settings, Share2, CheckCircle, Clock, FileVideo, Smartphone, Monitor, Globe } from 'lucide-react'

interface ExportPreset {
  id: string
  name: string
  format: string
  quality: 'low' | 'medium' | 'high' | 'ultra'
  resolution: string
  targetSize: string
  description: string
  icon: any
  popular?: boolean
}

const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    format: 'MP4',
    quality: 'high',
    resolution: '1080x1920',
    targetSize: '~15MB',
    description: 'Perfect for Instagram Stories and Reels',
    icon: Smartphone,
    popular: true
  },
  {
    id: 'youtube-hd',
    name: 'YouTube HD',
    format: 'MP4',
    quality: 'ultra',
    resolution: '1920x1080',
    targetSize: '~50MB',
    description: 'High quality for YouTube uploads',
    icon: Monitor,
    popular: true
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    format: 'MP4',
    quality: 'high',
    resolution: '1080x1920',
    targetSize: '~20MB',
    description: 'Optimized for TikTok algorithm',
    icon: Smartphone
  },
  {
    id: 'facebook-hd',
    name: 'Facebook HD',
    format: 'MP4',
    quality: 'high',
    resolution: '1280x720',
    targetSize: '~25MB',
    description: 'HD quality for Facebook feed',
    icon: Globe
  },
  {
    id: 'web-optimized',
    name: 'Web Optimized',
    format: 'WebM',
    quality: 'medium',
    resolution: '1280x720',
    targetSize: '~10MB',
    description: 'Small file size for web sharing',
    icon: Globe
  },
  {
    id: 'high-quality',
    name: 'Archive Quality',
    format: 'MOV',
    quality: 'ultra',
    resolution: '3840x2160',
    targetSize: '~200MB',
    description: 'Maximum quality for archiving',
    icon: FileVideo
  }
]

const QUALITY_OPTIONS = [
  { value: 'low', label: 'Low (Faster)', multiplier: 0.6 },
  { value: 'medium', label: 'Medium (Balanced)', multiplier: 0.8 },
  { value: 'high', label: 'High (Quality)', multiplier: 1.0 },
  { value: 'ultra', label: 'Ultra (Best)', multiplier: 1.2 }
]

export default function ExportOptions({
  videoDuration = 30,
  onClose,
  onExport
}: {
  videoDuration?: number
  onClose?: () => void
  onExport?: (preset: ExportPreset) => void
}) {
  const [selectedPreset, setSelectedPreset] = useState<string>('instagram-story')
  const [customQuality, setCustomQuality] = useState<'low' | 'medium' | 'high' | 'ultra'>('high')
  const [customFormat, setCustomFormat] = useState<'MP4' | 'WebM' | 'MOV'>('MP4')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportHistory, setExportHistory] = useState<Array<{
    id: string
    preset: string
    timestamp: string
    size: string
    status: 'completed' | 'failed'
  }>>([
    {
      id: '1',
      preset: 'Instagram Story',
      timestamp: '2024-02-01 14:30',
      size: '12.5 MB',
      status: 'completed'
    },
    {
      id: '2',
      preset: 'YouTube HD',
      timestamp: '2024-01-31 16:45',
      size: '45.2 MB',
      status: 'completed'
    }
  ])

  const handleExport = async (preset: ExportPreset) => {
    setIsExporting(true)
    setExportProgress(0)

    // Mock export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)

          // Add to export history
          const newExport = {
            id: Date.now().toString(),
            preset: preset.name,
            timestamp: new Date().toLocaleString(),
            size: preset.targetSize,
            status: 'completed' as const
          }
          setExportHistory(prev => [newExport, ...prev.slice(0, 4)])

          if (onExport) onExport(preset)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const selectedPresetData = EXPORT_PRESETS.find(p => p.id === selectedPreset)

  const estimatedFileSize = (baseSize: number, quality: string) => {
    const qualityMultiplier = QUALITY_OPTIONS.find(q => q.value === quality)?.multiplier || 1
    return Math.round(baseSize * qualityMultiplier * (videoDuration / 30))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Export Video</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Export Progress */}
          {isExporting && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                <span className="font-medium">Exporting...</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(exportProgress)}%</span>
              </div>
              <div className="bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Processing video with selected settings...
              </div>
            </div>
          )}

          {/* Quick Presets */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quick Export Presets</h3>
            <div className="space-y-2">
              {EXPORT_PRESETS.map(preset => {
                const Icon = preset.icon
                return (
                  <div
                    key={preset.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedPreset === preset.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedPreset(preset.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{preset.name}</span>
                            {preset.popular && (
                              <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {preset.resolution} • {preset.format} • ~{preset.targetSize}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{preset.quality.toUpperCase()}</div>
                        <div className="text-xs text-gray-400">Quality</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{preset.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Custom Settings */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Custom Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Format</label>
                <select
                  value={customFormat}
                  onChange={(e) => setCustomFormat(e.target.value as any)}
                  className="w-full mt-1 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100"
                >
                  <option value="MP4">MP4 (Universal)</option>
                  <option value="WebM">WebM (Web Optimized)</option>
                  <option value="MOV">MOV (High Quality)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Quality</label>
                <select
                  value={customQuality}
                  onChange={(e) => setCustomQuality(e.target.value as any)}
                  className="w-full mt-1 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100"
                >
                  {QUALITY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          {selectedPresetData && (
            <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2">Export Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Format:</span>
                  <span>{selectedPresetData.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Resolution:</span>
                  <span>{selectedPresetData.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                  <span className="capitalize">{selectedPresetData.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Est. Size:</span>
                  <span>{selectedPresetData.targetSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span>{videoDuration}s</span>
                </div>
              </div>
            </div>
          )}

          {/* Export History */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Recent Exports</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {exportHistory.map(export => (
                <div key={export.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <div className="font-medium text-sm">{export.preset}</div>
                    <div className="text-xs text-gray-500">{export.timestamp}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{export.size}</div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 capitalize">{export.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => selectedPresetData && handleExport(selectedPresetData)}
              disabled={isExporting}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
            >
              {isExporting ? 'Exporting...' : 'Export Video'}
            </button>
            <button className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            Export times vary based on video length and quality settings
          </div>
        </div>
      </div>
    </div>
  )
}