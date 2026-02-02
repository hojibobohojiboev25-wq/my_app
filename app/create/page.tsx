"use client"

import { useState, useRef } from 'react'
import SaveProject from '../../components/SaveProject'
import AudioEditor from '../../components/AudioEditor'
import ExportOptions from '../../components/ExportOptions'
import VideoDownloader from '../../components/VideoDownloader'
import { RotateCw, Type, Music, Scissors, Zap, Filter, Download } from 'lucide-react'

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
  const [activeFilter, setActiveFilter] = useState<'basic' | 'color' | 'effects' | 'advanced'>('basic')
  const [textOverlay, setTextOverlay] = useState('')
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom'>('bottom')
  const [activeTool, setActiveTool] = useState<'trim' | 'filter' | 'text' | 'audio'>('trim')
  const [showAudioEditor, setShowAudioEditor] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showVideoDownloader, setShowVideoDownloader] = useState(false)

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
    video.style.filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
      hue-rotate(${hue}deg)
      blur(${blur}px)
      sepia(${sepia}%)
      grayscale(${grayscale}%)
      invert(${invert}%)
      opacity(${opacity}%)
    `
    video.style.transform = `rotate(${rotation}deg)`
    video.playbackRate = playbackSpeed
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
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create</h1>

      <section className="mt-4">
        <label className="block text-sm text-gray-600 dark:text-gray-400">Upload a video</label>
        <input className="mt-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-100" type="file" accept="video/*" onChange={onFile} />
      </section>

      {file && (
        <section className="mt-4 space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden relative border dark:border-gray-700">
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
              <div className={`absolute inset-0 flex ${textPosition === 'top' ? 'items-start' : textPosition === 'center' ? 'items-center' : 'items-end'} justify-center pointer-events-none p-4`}>
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-lg font-semibold">
                  {textOverlay}
                </div>
              </div>
            )}
          </div>

          {/* Tool Selection */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700">
            <div className="flex justify-between mb-3">
              <button onClick={() => setActiveTool('trim')} className={`flex flex-col items-center p-2 rounded ${activeTool === 'trim' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
                <Scissors className="w-5 h-5" />
                <span className="text-xs mt-1">Trim</span>
              </button>
              <button onClick={() => setActiveTool('filter')} className={`flex flex-col items-center p-2 rounded ${activeTool === 'filter' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
                <Filter className="w-5 h-5" />
                <span className="text-xs mt-1">Filters</span>
              </button>
              <button onClick={() => setActiveTool('text')} className={`flex flex-col items-center p-2 rounded ${activeTool === 'text' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
                <Type className="w-5 h-5" />
                <span className="text-xs mt-1">Text</span>
              </button>
              <button onClick={() => setActiveTool('audio')} className={`flex flex-col items-center p-2 rounded ${activeTool === 'audio' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
                <Music className="w-5 h-5" />
                <span className="text-xs mt-1">Audio</span>
              </button>
            </div>

            {/* Tool Panels */}
            {activeTool === 'trim' && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">Trim Video</div>
                <div>
                  <label className="text-xs text-gray-500">Start ({startTime}s)</label>
                  <input type="range" min={0} max={100} value={startPct} onChange={(e) => setStartPct(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">End ({endTime}s)</label>
                  <input type="range" min={0} max={100} value={endPct} onChange={(e) => setEndPct(Number(e.target.value))} className="w-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Duration: {duration ? duration.toFixed(2) : '--'}s</div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
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
                    <span className="text-xs text-gray-500">{playbackSpeed}x</span>
                  </div>
                </div>
              </div>
            )}

            {activeTool === 'filter' && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">Video Filters</div>

                {/* Filter Categories */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setActiveFilter('basic')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm ${
                      activeFilter === 'basic' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setActiveFilter('color')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm ${
                      activeFilter === 'color' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Color
                  </button>
                  <button
                    onClick={() => setActiveFilter('effects')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm ${
                      activeFilter === 'effects' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Effects
                  </button>
                  <button
                    onClick={() => setActiveFilter('advanced')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm ${
                      activeFilter === 'advanced' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Advanced
                  </button>
                </div>

                {/* Filter Controls */}
                {activeFilter === 'basic' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Brightness</label>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        value={brightness}
                        onChange={(e) => {
                          setBrightness(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{brightness}%</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Contrast</label>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        value={contrast}
                        onChange={(e) => {
                          setContrast(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{contrast}%</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Saturation</label>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        value={saturation}
                        onChange={(e) => {
                          setSaturation(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{saturation}%</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Opacity</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={opacity}
                        onChange={(e) => {
                          setOpacity(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{opacity}%</div>
                    </div>
                  </div>
                )}

                {activeFilter === 'color' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Hue Rotate</label>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={hue}
                        onChange={(e) => {
                          setHue(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{hue}°</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Sepia</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sepia}
                        onChange={(e) => {
                          setSepia(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{sepia}%</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Grayscale</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={grayscale}
                        onChange={(e) => {
                          setGrayscale(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{grayscale}%</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Invert</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={invert}
                        onChange={(e) => {
                          setInvert(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{invert}%</div>
                    </div>
                  </div>
                )}

                {activeFilter === 'effects' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Blur</label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={blur}
                        onChange={(e) => {
                          setBlur(Number(e.target.value))
                          applyVideoFilters()
                        }}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400 mt-1">{blur}px</div>
                    </div>

                    {/* Preset Effects */}
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">Preset Effects</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => {
                            setBrightness(120)
                            setContrast(110)
                            setSaturation(110)
                            setHue(0)
                            setSepia(0)
                            setGrayscale(0)
                            setInvert(0)
                            setBlur(0)
                            applyVideoFilters()
                          }}
                          className="p-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded text-xs"
                        >
                          Vibrant
                        </button>
                        <button
                          onClick={() => {
                            setBrightness(90)
                            setContrast(120)
                            setSaturation(80)
                            setHue(0)
                            setSepia(20)
                            setGrayscale(0)
                            setInvert(0)
                            setBlur(0)
                            applyVideoFilters()
                          }}
                          className="p-2 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded text-xs"
                        >
                          Vintage
                        </button>
                        <button
                          onClick={() => {
                            setBrightness(100)
                            setContrast(100)
                            setSaturation(100)
                            setHue(0)
                            setSepia(0)
                            setGrayscale(100)
                            setInvert(0)
                            setBlur(0)
                            applyVideoFilters()
                          }}
                          className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs"
                        >
                          B&W
                        </button>
                      </div>
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

                    {/* Advanced Presets */}
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">Advanced Presets</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setBrightness(110)
                            setContrast(105)
                            setSaturation(115)
                            setHue(15)
                            setSepia(0)
                            setGrayscale(0)
                            setInvert(0)
                            setBlur(0)
                            applyVideoFilters()
                          }}
                          className="p-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded text-xs"
                        >
                          Cinematic
                        </button>
                        <button
                          onClick={() => {
                            setBrightness(130)
                            setContrast(90)
                            setSaturation(120)
                            setHue(0)
                            setSepia(0)
                            setGrayscale(0)
                            setInvert(0)
                            setBlur(0.5)
                            applyVideoFilters()
                          }}
                          className="p-2 bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200 rounded text-xs"
                        >
                          Dreamy
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Pro Tip:</strong> Combine multiple filters for unique effects. Save your favorite combinations as presets for future use.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTool === 'text' && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">Text Overlay</div>
                <input
                  type="text"
                  placeholder="Enter text to overlay"
                  value={textOverlay}
                  onChange={(e) => setTextOverlay(e.target.value)}
                  className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100"
                />
                <div>
                  <label className="text-xs text-gray-500">Position</label>
                    <select
                      value={textPosition}
                      onChange={(e) => setTextPosition(e.target.value as any)}
                      className="w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm mt-1 text-gray-900 dark:text-gray-100"
                    >
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
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

            <div className="mt-4 flex gap-2">
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
                applyVideoFilters()
              }} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Reset All
              </button>
            </div>

            <div className="mt-3">
              <SaveProject file={file} startPct={startPct} endPct={endPct} />
            </div>

            <div className="mt-2 text-xs text-gray-400">Note: Advanced editing is simulated. Real client-side processing requires WebCodecs/WebAssembly.</div>
          </div>
        </section>
      )}

      {showAudioEditor && (
        <AudioEditor onClose={() => setShowAudioEditor(false)} />
      )}

      {showExportOptions && (
        <ExportOptions
          videoDuration={duration}
          onClose={() => setShowExportOptions(false)}
          onExport={(preset) => {
            setShowExportOptions(false)
            // Mock export with selected preset
            alert(`Exporting with preset: ${preset.name}\nFormat: ${preset.format}\nQuality: ${preset.quality}\nResolution: ${preset.resolution}`)
          }}
        />
      )}

      {showVideoDownloader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <VideoDownloader
            videoUrl={file ? URL.createObjectURL(file) : undefined}
            videoName={file?.name?.replace(/\.[^/.]+$/, "") || 'edited-video'}
          />
          <button
            onClick={() => setShowVideoDownloader(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>
      )}

    </main>
  )
}
