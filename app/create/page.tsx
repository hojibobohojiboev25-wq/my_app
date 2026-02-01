"use client"

import { useState, useRef } from 'react'
import SaveProject from '../../components/SaveProject'

export default function CreatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [duration, setDuration] = useState(0)
  const [startPct, setStartPct] = useState(0)
  const [endPct, setEndPct] = useState(100)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(false)

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
      <h1 className="text-xl font-semibold">Create</h1>

      <section className="mt-4">
        <label className="block text-sm text-gray-600">Upload a video</label>
        <input className="mt-2" type="file" accept="video/*" onChange={onFile} />
      </section>

      {file && (
        <section className="mt-4 space-y-3">
          <div className="bg-white rounded-lg overflow-hidden">
            <video ref={videoRef} src={URL.createObjectURL(file)} controls onLoadedMetadata={onLoadedMetadata} className="w-full max-h-64 object-contain" />
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Trim</div>
            <div className="mt-2">
              <label className="text-xs text-gray-500">Start ({startTime}s)</label>
              <input type="range" min={0} max={100} value={startPct} onChange={(e) => setStartPct(Number(e.target.value))} />
            </div>

            <div className="mt-2">
              <label className="text-xs text-gray-500">End ({endTime}s)</label>
              <input type="range" min={0} max={100} value={endPct} onChange={(e) => setEndPct(Number(e.target.value))} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">Duration: {duration ? duration.toFixed(2) : '--'}s</div>
              <button disabled={loading} onClick={mockExport} className="px-3 py-2 bg-green-600 text-white rounded-lg">{loading ? 'Exporting...' : 'Export (mock)'}</button>
            </div>

            <div className="mt-3">
              <SaveProject file={file} startPct={startPct} endPct={endPct} />
            </div>

            <div className="mt-2 text-xs text-gray-400">Note: Trimming is simulated. Proper client-side re-encoding requires WebCodecs/WebAssembly and is out of scope for this demo.</div>
          </div>
        </section>
      )}

    </main>
  )
}
