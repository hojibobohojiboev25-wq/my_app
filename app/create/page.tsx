"use client"

import { useState, useRef } from 'react'
import SaveProject from '../../components/SaveProject'
import AudioEditor from '../../components/AudioEditor'
import ExportOptions from '../../components/ExportOptions'
import VideoDownloader from '../../components/VideoDownloader'
import PhotoEditor from '../../components/PhotoEditor'
import ShareModal from '../../components/ShareModal'
import KeyboardShortcuts from '../../components/KeyboardShortcuts'
import QuickPreview from '../../components/QuickPreview'
import { RotateCw, Type, Music, Scissors, Zap, Filter, Download, Image, Video, Sparkles, Share2, Eye } from 'lucide-react'

export default function CreatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [duration, setDuration] = useState(0)
  const [startPct, setStartPct] = useState(0)
  const [endPct, setEndPct] = useState(100)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(false)

  // Advanced editing features
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [hue, setHue] = useState(0)
  const [blur, setBlur] = useState(0)
  const [sepia, setSepia] = useState(0)
  const [grayscale, setGrayscale] = useState(0)
  const [invert, setInvert] = useState(0)
  const [opacity, setOpacity] = useState(100)
  const [vignette, setVignette] = useState(0)
  const [sharpen, setSharpen] = useState(0)
  const [noise, setNoise] = useState(0)
  const [pixelate, setPixelate] = useState(0)
  const [chromaKey, setChromaKey] = useState<string | null>(null)
  const [stabilization, setStabilization] = useState(false)
  const [denoise, setDenoise] = useState(false)
  const [colorCorrection, setColorCorrection] = useState({
    shadows: 0,
    highlights: 0,
    exposure: 0,
    temperature: 0
  })
  const [textOverlay, setTextOverlay] = useState('')
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom' | 'custom'>('bottom')
  const [textSize, setTextSize] = useState(24)
  const [textColor, setTextColor] = useState('#ffffff')
  const [textFont, setTextFont] = useState('Arial')
  const [textAnimation, setTextAnimation] = useState<'none' | 'fade' | 'slide' | 'bounce' | 'glow'>('none')
  const [textX, setTextX] = useState(50)
  const [textY, setTextY] = useState(50)
  const [activeTool, setActiveTool] = useState<'trim' | 'filter' | 'text' | 'audio' | 'effects' | 'advanced'>('trim')
  const [activeFilter, setActiveFilter] = useState<'basic' | 'color' | 'effects' | 'advanced' | 'correction'>('basic')
  const [contentType, setContentType] = useState<'video' | 'photo'>('video')
  const [showAudioEditor, setShowAudioEditor] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showVideoDownloader, setShowVideoDownloader] = useState(false)
  const [showPhotoEditor, setShowPhotoEditor] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showQuickPreview, setShowQuickPreview] = useState(false)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setStartPct(0)
    setEndPct(100)
  }

  function onLoadedMetadata() {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration || 0)
  }

  function applyVideoFilters() {
    if (!videoRef.current) return
    const video = videoRef.current

    // Advanced CSS filters
    const filters = [
      `brightness(${brightness + colorCorrection.exposure}%)`,
      `contrast(${contrast}%)`,
      `saturate(${saturation}%)`,
      `hue-rotate(${hue + colorCorrection.temperature}deg)`,
      `blur(${blur}px)`,
      `sepia(${sepia}%)`,
      `grayscale(${grayscale}%)`,
      `invert(${invert}%)`,
      `opacity(${opacity}%)`,
      vignette > 0 ? `brightness(${100 - vignette}%)` : '',
      sharpen > 0 ? `contrast(${100 + sharpen}%) brightness(${100 + sharpen * 0.5}%)` : '',
      noise > 0 ? `contrast(${100 + noise}%)` : '',
      pixelate > 0 ? `blur(${pixelate}px)` : ''
    ].filter(Boolean).join(' ')

    video.style.filter = filters
    video.style.transform = `rotate(${rotation}deg) ${stabilization ? 'translateZ(0)' : ''}`
    video.playbackRate = playbackSpeed

    // Apply text overlay styling
    if (textOverlay) {
      const textElement = document.getElementById('text-overlay')
      if (textElement) {
        textElement.style.fontSize = `${textSize}px`
        textElement.style.color = textColor
        textElement.style.fontFamily = textFont
        textElement.style.left = textPosition === 'custom' ? `${textX}%` : '50%'
        textElement.style.top = textPosition === 'custom' ? `${textY}%` : (
          textPosition === 'top' ? '10%' : textPosition === 'bottom' ? '90%' : '50%'
        )
        textElement.style.transform = textPosition === 'custom' ? 'translate(-50%, -50%)' : 'translateX(-50%)'

        // Apply text animation
        textElement.className = `absolute pointer-events-none z-10 text-center ${
          textAnimation === 'fade' ? 'animate-pulse' :
          textAnimation === 'bounce' ? 'animate-bounce' :
          textAnimation === 'glow' ? 'animate-pulse shadow-lg shadow-white' : ''
        }`
      }
    }
  }

  function mockExport() {
    if (!file) return
    setLoading(true)
    // Mock processing delay
    setTimeout(() => {
      const url = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = (file.name || 'video') + '.trim.mp4'
      a.click()
      URL.revokeObjectURL(url)
      setLoading(false)
      alert('Export complete (mock). Original file is downloaded. Real processing requires server-side/worker transcoding.')
    }, 1000)
  }

  const startTime = (duration * (startPct / 100)).toFixed(2)
  const endTime = (duration * (endPct / 100)).toFixed(2)

  return (
    <main className="px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Project</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Professional Editor</span>
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <button
            onClick={() => setShowKeyboardShortcuts(true)}
            className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-500 text-gray-300 rounded transition-colors"
            title="Keyboard Shortcuts"
          >
            ⌨️
          </button>
        </div>
      </div>

      {/* Content Type Selector */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Choose Content Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setContentType('video')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              contentType === 'video'
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300'
            }`}
          >
            <Video className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">Video Editor</div>
            <div className="text-xs opacity-80">Edit videos with advanced tools</div>
          </button>

          <button
            onClick={() => setContentType('photo')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              contentType === 'photo'
                ? 'border-purple-500 bg-purple-500 text-white shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-300'
            }`}
          >
            <Image className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">Photo Editor</div>
            <div className="text-xs opacity-80">Enhance photos with filters</div>
          </button>
        </div>
      </div>

      {contentType === 'video' ? (
        <section className="space-y-6">
          {/* Video Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upload Video</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Select a video file to start editing</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">Drag & drop a video file or click to browse</p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={onFile}
                    className="hidden"
                  />
                  <span className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Choose Video
                  </span>
                </label>
              </div>
            </div>
          </div>

          {file && (
            <section className="space-y-6">
              {/* Video Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Video Preview</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {duration ? `${duration.toFixed(1)}s` : 'Loading...'}
                  </div>
                </div>

                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    src={URL.createObjectURL(file)}
                    controls
                    onLoadedMetadata={() => {
                      onLoadedMetadata()
                      applyVideoFilters()
                    }}
                    className="w-full max-h-64 object-contain"
                    style={{
                      filter: `
                        brightness(${brightness}%)
                        contrast(${contrast}%)
                        saturate(${saturation}%)
                        hue-rotate(${hue}deg)
                        blur(${blur}px)
                        sepia(${sepia}%)
                        grayscale(${grayscale}%)
                        invert(${invert}%)
                        opacity(${opacity}%)
                      `,
                      transform: `rotate(${rotation}deg)`,
                    }}
                  />
                  {textOverlay && (
                    <div id="text-overlay" className="absolute inset-0 pointer-events-none">
                      {textOverlay}
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Editing Tools */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Editing Tools</h3>
                  <button
                    onClick={() => setShowQuickPreview(true)}
                    disabled={!file}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>

                {/* Tool Selection */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button onClick={() => setActiveTool('trim')} className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTool === 'trim' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <Scissors className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Trim</span>
                  </button>
                  <button onClick={() => setActiveTool('filter')} className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTool === 'filter' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <Filter className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Filters</span>
                  </button>
                  <button onClick={() => setActiveTool('effects')} className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTool === 'effects' ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <Sparkles className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Effects</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button onClick={() => setActiveTool('text')} className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTool === 'text' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <Type className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Text</span>
                  </button>
                  <button onClick={() => setActiveTool('audio')} className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTool === 'audio' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <Music className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Audio</span>
                  </button>
                  <button onClick={() => setActiveTool('advanced')} className={`flex flex-col items-center p-3 rounded-lg transition-all ${activeTool === 'advanced' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    <Zap className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Advanced</span>
                  </button>
                </div>

                {/* Tool Panels */}
                {activeTool === 'trim' && (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Trim Video</div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Start ({startTime}s)</label>
                      <input type="range" min={0} max={100} value={startPct} onChange={(e) => setStartPct(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">End ({endTime}s)</label>
                      <input type="range" min={0} max={100} value={endPct} onChange={(e) => setEndPct(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-300">Duration: {duration ? duration.toFixed(2) : '--'}s</div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <input
                          type="range"
                          min={0.25}
                          max={2}
                          step={0.25}
                          value={playbackSpeed}
                          onChange={(e) => {
                            const speed = Number(e.target.value)
                            setPlaybackSpeed(speed)
                            if (videoRef.current) videoRef.current.playbackRate = speed
                          }}
                          className="w-20"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{playbackSpeed}x</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTool === 'filter' && (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Video Filters</div>

                    {/* Filter Categories */}
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
                      <button
                        onClick={() => setActiveFilter('basic')}
                        className={`py-2 px-3 rounded-md text-sm ${
                          activeFilter === 'basic' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        Basic
                      </button>
                      <button
                        onClick={() => setActiveFilter('color')}
                        className={`py-2 px-3 rounded-md text-sm ${
                          activeFilter === 'color' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        Color
                      </button>
                      <button
                        onClick={() => setActiveFilter('effects')}
                        className={`py-2 px-3 rounded-md text-sm ${
                          activeFilter === 'effects' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        Effects
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
                      <button
                        onClick={() => setActiveFilter('advanced')}
                        className={`py-2 px-3 rounded-md text-sm ${
                          activeFilter === 'advanced' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        Advanced
                      </button>
                      <button
                        onClick={() => setActiveFilter('correction')}
                        className={`py-2 px-3 rounded-md text-sm ${
                          activeFilter === 'correction' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        Correction
                      </button>
                    </div>

                    {activeFilter === 'basic' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Brightness</label>
                          <input type="range" min={0} max={200} value={brightness} onChange={(e) => { setBrightness(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Contrast</label>
                          <input type="range" min={0} max={200} value={contrast} onChange={(e) => { setContrast(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Saturation</label>
                          <input type="range" min={0} max={200} value={saturation} onChange={(e) => { setSaturation(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                      </div>
                    )}

                    {activeFilter === 'color' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Hue</label>
                          <input type="range" min={0} max={360} value={hue} onChange={(e) => { setHue(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Sepia</label>
                          <input type="range" min={0} max={100} value={sepia} onChange={(e) => { setSepia(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Grayscale</label>
                          <input type="range" min={0} max={100} value={grayscale} onChange={(e) => { setGrayscale(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Invert</label>
                          <input type="range" min={0} max={100} value={invert} onChange={(e) => { setInvert(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                      </div>
                    )}

                    {activeFilter === 'effects' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Blur</label>
                          <input type="range" min={0} max={20} value={blur} onChange={(e) => { setBlur(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Opacity</label>
                          <input type="range" min={0} max={100} value={opacity} onChange={(e) => { setOpacity(Number(e.target.value)); applyVideoFilters() }} className="w-full mt-1" />
                        </div>
                      </div>
                    )}

                    {activeFilter === 'advanced' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Rotation</label>
                          <select
                            value={rotation}
                            onChange={(e) => {
                              setRotation(Number(e.target.value))
                              applyVideoFilters()
                            }}
                            className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-gray-900 dark:text-gray-100 mt-1"
                          >
                            <option value={0}>0°</option>
                            <option value={90}>90° (Portrait)</option>
                            <option value={180}>180° (Upside Down)</option>
                            <option value={270}>270° (Portrait)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {activeFilter === 'correction' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Shadows</label>
                          <input
                            type="range"
                            min={-50}
                            max={50}
                            value={colorCorrection.shadows}
                            onChange={(e) => {
                              setColorCorrection(prev => ({ ...prev, shadows: Number(e.target.value) }))
                              applyVideoFilters()
                            }}
                            className="w-full mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Highlights</label>
                          <input
                            type="range"
                            min={-50}
                            max={50}
                            value={colorCorrection.highlights}
                            onChange={(e) => {
                              setColorCorrection(prev => ({ ...prev, highlights: Number(e.target.value) }))
                              applyVideoFilters()
                            }}
                            className="w-full mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Exposure</label>
                          <input
                            type="range"
                            min={-50}
                            max={50}
                            value={colorCorrection.exposure}
                            onChange={(e) => {
                              setColorCorrection(prev => ({ ...prev, exposure: Number(e.target.value) }))
                              applyVideoFilters()
                            }}
                            className="w-full mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">Temperature</label>
                          <input
                            type="range"
                            min={-50}
                            max={50}
                            value={colorCorrection.temperature}
                            onChange={(e) => {
                              setColorCorrection(prev => ({ ...prev, temperature: Number(e.target.value) }))
                              applyVideoFilters()
                            }}
                            className="w-full mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTool === 'effects' && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Visual Effects</div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Vignette</label>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          value={vignette}
                          onChange={(e) => {
                            setVignette(Number(e.target.value))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Sharpen</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={sharpen}
                          onChange={(e) => {
                            setSharpen(Number(e.target.value))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Noise</label>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          value={noise}
                          onChange={(e) => {
                            setNoise(Number(e.target.value))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Pixelate</label>
                        <input
                          type="range"
                          min={0}
                          max={20}
                          value={pixelate}
                          onChange={(e) => {
                            setPixelate(Number(e.target.value))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={stabilization}
                          onChange={(e) => {
                            setStabilization(e.target.checked)
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Video Stabilization</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={denoise}
                          onChange={(e) => {
                            setDenoise(e.target.checked)
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Noise Reduction</span>
                      </label>
                    </div>
                  </div>
                )}

                {activeTool === 'advanced' && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Advanced Color Correction</div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Shadows</label>
                        <input
                          type="range"
                          min={-50}
                          max={50}
                          value={colorCorrection.shadows}
                          onChange={(e) => {
                            setColorCorrection(prev => ({ ...prev, shadows: Number(e.target.value) }))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Highlights</label>
                        <input
                          type="range"
                          min={-50}
                          max={50}
                          value={colorCorrection.highlights}
                          onChange={(e) => {
                            setColorCorrection(prev => ({ ...prev, highlights: Number(e.target.value) }))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Exposure</label>
                        <input
                          type="range"
                          min={-50}
                          max={50}
                          value={colorCorrection.exposure}
                          onChange={(e) => {
                            setColorCorrection(prev => ({ ...prev, exposure: Number(e.target.value) }))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Temperature</label>
                        <input
                          type="range"
                          min={-50}
                          max={50}
                          value={colorCorrection.temperature}
                          onChange={(e) => {
                            setColorCorrection(prev => ({ ...prev, temperature: Number(e.target.value) }))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Chroma Key Color</label>
                        <input
                          type="color"
                          value={chromaKey || '#00ff00'}
                          onChange={(e) => {
                            setChromaKey(e.target.value)
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
                        />
                      </div>
                      <button
                        onClick={() => setChromaKey(null)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                      >
                        Remove Green Screen
                      </button>
                    </div>
                  </div>
                )}

                {activeTool === 'text' && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Text Overlay</div>
                    <input
                      type="text"
                      placeholder="Enter text to overlay"
                      value={textOverlay}
                      onChange={(e) => setTextOverlay(e.target.value)}
                      className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Font Size</label>
                        <input
                          type="range"
                          min={12}
                          max={72}
                          value={textSize}
                          onChange={(e) => {
                            setTextSize(Number(e.target.value))
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full"
                        />
                        <div className="text-xs text-center text-gray-400 mt-1">{textSize}px</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Font</label>
                        <select
                          value={textFont}
                          onChange={(e) => {
                            setTextFont(e.target.value)
                            setTimeout(applyVideoFilters, 10)
                          }}
                          className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-gray-900 dark:text-gray-100"
                        >
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Impact">Impact</option>
                          <option value="Georgia">Georgia</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Text Color</label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value)
                          setTimeout(applyVideoFilters, 10)
                        }}
                        className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Position</label>
                      <select
                        value={textPosition}
                        onChange={(e) => {
                          setTextPosition(e.target.value as any)
                          setTimeout(applyVideoFilters, 10)
                        }}
                        className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm mt-1 text-gray-900 dark:text-gray-100"
                      >
                        <option value="top">Top</option>
                        <option value="center">Center</option>
                        <option value="bottom">Bottom</option>
                        <option value="custom">Custom Position</option>
                      </select>
                    </div>

                    {textPosition === 'custom' && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">X Position (%)</label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={textX}
                            onChange={(e) => {
                              setTextX(Number(e.target.value))
                              setTimeout(applyVideoFilters, 10)
                            }}
                            className="w-full"
                          />
                          <div className="text-xs text-center text-gray-400 mt-1">{textX}%</div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Y Position (%)</label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={textY}
                            onChange={(e) => {
                              setTextY(Number(e.target.value))
                              setTimeout(applyVideoFilters, 10)
                            }}
                            className="w-full"
                          />
                          <div className="text-xs text-center text-gray-400 mt-1">{textY}%</div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Animation</label>
                      <select
                        value={textAnimation}
                        onChange={(e) => {
                          setTextAnimation(e.target.value as any)
                          setTimeout(applyVideoFilters, 10)
                        }}
                        className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm mt-1 text-gray-900 dark:text-gray-100"
                      >
                        <option value="none">None</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="bounce">Bounce</option>
                        <option value="glow">Glow</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTool === 'audio' && (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Audio Settings</div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Add voiceovers, background music, and audio effects
                      </div>
                      <button
                        onClick={() => setShowAudioEditor(true)}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Music className="w-5 h-5 inline mr-2" />
                        Open Audio Editor
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button disabled={loading} onClick={() => setShowExportOptions(true)} className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    {loading ? 'Exporting...' : 'Export Video'}
                  </button>
                  <button
                    onClick={() => setShowVideoDownloader(true)}
                    disabled={!file}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    disabled={!file}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button onClick={() => {
                    setBrightness(100)
                    setContrast(100)
                    setSaturation(100)
                    setHue(0)
                    setBlur(0)
                    setSepia(0)
                    setGrayscale(0)
                    setInvert(0)
                    setOpacity(100)
                    setRotation(0)
                    setTextOverlay('')
                    setPlaybackSpeed(1)
                    setVignette(0)
                    setSharpen(0)
                    setNoise(0)
                    setPixelate(0)
                    setChromaKey(null)
                    setStabilization(false)
                    setDenoise(false)
                    setColorCorrection({ shadows: 0, highlights: 0, exposure: 0, temperature: 0 })
                    applyVideoFilters()
                  }} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Reset All
                  </button>
                </div>

                <div className="mt-3">
                  <SaveProject file={file} startPct={startPct} endPct={endPct} />
                </div>

                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">Note: Advanced editing is simulated. Real client-side processing requires WebCodecs/WebAssembly.</div>
              </div>
            </section>
          )}

          {showAudioEditor && (
            <AudioEditor onClose={() => setShowAudioEditor(false)} />
          )}

          {showExportOptions && (
            <ExportOptions onClose={() => setShowExportOptions(false)} />
          )}

          {showVideoDownloader && (
            <VideoDownloader videoUrl={file ? URL.createObjectURL(file) : ''} videoName={file?.name || 'video'} />
          )}
        </section>
      ) : (
        <PhotoEditor onClose={() => setShowPhotoEditor(true)} />
      )}

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        projectTitle="My Edited Project"
        projectType={contentType}
      />

      <KeyboardShortcuts
        onClose={() => setShowKeyboardShortcuts(false)}
      />

      <QuickPreview
        videoRef={videoRef}
        isVisible={showQuickPreview}
        onClose={() => setShowQuickPreview(false)}
      />

    </main>
  )
}