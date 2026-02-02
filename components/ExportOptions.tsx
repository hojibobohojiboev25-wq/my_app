"use client"

import { useState } from 'react'

interface ExportPreset {
  id: string
  name: string
  format: string
  quality: string
  resolution: string
  targetSize: string
  description: string
  icon: string
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
    icon: '📱',
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
    icon: '📺',
    popular: true
  }
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
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleExport = async (preset: ExportPreset) => {
    setIsExporting(true)
    setExportProgress(0)

    // Mock export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          if (onExport) onExport(preset)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const selectedPresetData = EXPORT_PRESETS.find(p => p.id === selectedPreset)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xl">⬇️</span>
            <h2 className="text-lg font-semibold">Export Video</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Export Progress */}
          {isExporting && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-blue-600 text-xl animate-spin">⏱️</span>
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
              {EXPORT_PRESETS.map(preset => (
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
                      <span className="text-lg">{preset.icon}</span>
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
              <span className="text-xl">📤</span>
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