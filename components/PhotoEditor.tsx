"use client"

import { useState, useRef, useCallback } from 'react'
import { Upload, RotateCw, ZoomIn, ZoomOut, Crop, Type, Palette, Download, X } from 'lucide-react'

interface PhotoFilter {
  id: string
  name: string
  filter: string
  preview: string
}

const PHOTO_FILTERS: PhotoFilter[] = [
  { id: 'none', name: 'Original', filter: 'none', preview: '🔍' },
  { id: 'vintage', name: 'Vintage', filter: 'sepia(0.3) contrast(1.1) brightness(1.1)', preview: '📻' },
  { id: 'bw', name: 'Black & White', filter: 'grayscale(1)', preview: '⚫' },
  { id: 'bright', name: 'Bright', filter: 'brightness(1.2) contrast(1.1) saturate(1.3)', preview: '☀️' },
  { id: 'cool', name: 'Cool', filter: 'hue-rotate(180deg) saturate(1.2)', preview: '❄️' },
  { id: 'warm', name: 'Warm', filter: 'sepia(0.2) saturate(1.3) brightness(1.1)', preview: '🔥' },
  { id: 'dramatic', name: 'Dramatic', filter: 'contrast(1.5) brightness(0.9) saturate(1.2)', preview: '🎭' },
  { id: 'dreamy', name: 'Dreamy', filter: 'blur(0.5px) brightness(1.1) saturate(1.2)', preview: '💭' }
]

export default function PhotoEditor({ onClose }: { onClose?: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>('none')
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [textOverlay, setTextOverlay] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [textSize, setTextSize] = useState(24)
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const applyFilters = useCallback(() => {
    if (!selectedImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Save context
      ctx.save()

      // Apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.scale(scale, scale)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)

      // Apply filters
      ctx.filter = selectedFilter !== 'none' ?
        PHOTO_FILTERS.find(f => f.id === selectedFilter)?.filter || 'none' :
        `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Add text overlay
      if (textOverlay.trim()) {
        ctx.filter = 'none'
        ctx.fillStyle = textColor
        ctx.font = `${textSize}px Arial`
        ctx.textAlign = 'center'
        ctx.fillText(
          textOverlay,
          (textPosition.x / 100) * canvas.width,
          (textPosition.y / 100) * canvas.height
        )
      }

      // Restore context
      ctx.restore()
    }
    img.src = selectedImage
  }, [selectedImage, selectedFilter, rotation, scale, brightness, contrast, saturation, textOverlay, textColor, textSize, textPosition])

  const downloadImage = useCallback(() => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = `edited-photo-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }, [])

  // Apply filters when dependencies change
  React.useEffect(() => {
    if (selectedImage) {
      applyFilters()
    }
  }, [selectedImage, selectedFilter, rotation, scale, brightness, contrast, saturation, textOverlay, textColor, textSize, textPosition, applyFilters])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Photo Editor</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Edit and enhance your photos</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Editor Panel */}
          <div className="flex-1 p-4">
            {!selectedImage ? (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Upload a Photo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  Select a photo from your device to start editing
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  Choose Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    style={{ maxHeight: '400px' }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Change Photo
                  </button>
                  <button
                    onClick={downloadImage}
                    className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls Panel */}
          {selectedImage && (
            <div className="w-full lg:w-80 p-4 border-t lg:border-t-0 lg:border-l dark:border-gray-700 max-h-[60vh] lg:max-h-none overflow-y-auto">
              <div className="space-y-6">
                {/* Filters */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Filters</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {PHOTO_FILTERS.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`p-2 rounded-lg text-center transition-all ${
                          selectedFilter === filter.id
                            ? 'bg-purple-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="text-lg mb-1">{filter.preview}</div>
                        <div className="text-xs">{filter.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adjustments */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Adjustments</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Brightness</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Contrast</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Saturation</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={saturation}
                        onChange={(e) => setSaturation(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Transform */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Transform</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Rotation</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRotation(prev => prev - 90)}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                        >
                          ↺
                        </button>
                        <span className="flex-1 text-center text-sm">{rotation}°</span>
                        <button
                          onClick={() => setRotation(prev => prev + 90)}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                        >
                          ↻
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Zoom</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center text-sm">{Math.round(scale * 100)}%</span>
                        <button
                          onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Overlay */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Text Overlay</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter text..."
                      value={textOverlay}
                      onChange={(e) => setTextOverlay(e.target.value)}
                      className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-8 rounded border"
                      />
                      <select
                        value={textSize}
                        onChange={(e) => setTextSize(Number(e.target.value))}
                        className="flex-1 px-2 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="16">Small</option>
                        <option value="24">Medium</option>
                        <option value="32">Large</option>
                        <option value="48">Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSelectedFilter('none')
                    setRotation(0)
                    setScale(1)
                    setBrightness(100)
                    setContrast(100)
                    setSaturation(100)
                    setTextOverlay('')
                  }}
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}