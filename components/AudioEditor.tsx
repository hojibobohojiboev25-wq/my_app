"use client"

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Music, Volume2, VolumeX, Play, Pause, Square, Trash2, Upload } from 'lucide-react'

interface AudioTrack {
  id: string
  name: string
  type: 'voice' | 'music' | 'effect'
  duration: number
  volume: number
  startTime: number
  file?: File
  url?: string
}

const MUSIC_LIBRARY = [
  { id: '1', name: 'Upbeat Pop', duration: 180, genre: 'Pop', url: '🎵' },
  { id: '2', name: 'Calm Ambient', duration: 240, genre: 'Ambient', url: '🎼' },
  { id: '3', name: 'Energetic Rock', duration: 200, genre: 'Rock', url: '🎸' },
  { id: '4', name: 'Corporate Background', duration: 300, genre: 'Corporate', url: '💼' },
  { id: '5', name: 'Happy Acoustic', duration: 160, genre: 'Acoustic', url: '🎶' }
]

const AUDIO_EFFECTS = [
  { id: 'fade-in', name: 'Fade In', icon: '📈' },
  { id: 'fade-out', name: 'Fade Out', icon: '📉' },
  { id: 'echo', name: 'Echo', icon: '🔊' },
  { id: 'reverb', name: 'Reverb', icon: '🏔️' },
  { id: 'pitch-shift', name: 'Pitch Shift', icon: '🎵' }
]

export default function AudioEditor({ onClose }: { onClose?: () => void }) {
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [activeTab, setActiveTab] = useState<'record' | 'library' | 'device' | 'effects'>('record')
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)
  const [deviceAudio, setDeviceAudio] = useState<File | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const file = new File([blob], `voice-recording-${Date.now()}.wav`, { type: 'audio/wav' })

        const newTrack: AudioTrack = {
          id: Date.now().toString(),
          name: 'Voice Recording',
          type: 'voice',
          duration: recordingTime,
          volume: 80,
          startTime: 0,
          file,
          url: URL.createObjectURL(blob)
        }

        setTracks(prev => [...prev, newTrack])
        setRecordingTime(0)
      }

      mediaRecorder.start()
      setIsRecording(true)

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }

  const addMusicTrack = (music: typeof MUSIC_LIBRARY[0]) => {
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      name: music.name,
      type: 'music',
      duration: music.duration,
      volume: 60,
      startTime: 0,
      url: music.url
    }
    setTracks(prev => [...prev, newTrack])
    setSelectedMusic(music.id)
  }

  const removeTrack = (trackId: string) => {
    setTracks(prev => prev.filter(t => t.id !== trackId))
  }

  const updateTrackVolume = (trackId: string, volume: number) => {
    setTracks(prev => prev.map(t =>
      t.id === trackId ? { ...t, volume } : t
    ))
  }

  const handleDeviceAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      setDeviceAudio(file)
      const newTrack: AudioTrack = {
        id: Date.now().toString(),
        name: file.name,
        type: 'music',
        duration: 0, // We'll get this from audio element
        volume: 70,
        startTime: 0,
        file,
        url: URL.createObjectURL(file)
      }
      setTracks(prev => [...prev, newTrack])
    }
  }

  const addDeviceAudio = () => {
    if (deviceAudio) {
      fileInputRef.current?.click()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Audio Editor</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-4">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-1 mb-4">
            <button
              onClick={() => setActiveTab('record')}
              className={`flex items-center justify-center gap-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'record'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Mic className="w-4 h-4" />
              Record
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center justify-center gap-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'library'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Music className="w-4 h-4" />
              Library
            </button>
            <button
              onClick={() => setActiveTab('device')}
              className={`flex items-center justify-center gap-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'device'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              📱 Device
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`flex items-center justify-center gap-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'effects'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              Effects
            </button>
          </div>

          {/* Content */}
          {activeTab === 'record' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {isRecording ? (
                    <Mic className="w-8 h-8 text-red-600" />
                  ) : (
                    <MicOff className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {isRecording && (
                  <div className="text-lg font-mono text-red-600 mb-4">
                    {formatTime(recordingTime)}
                  </div>
                )}

                <div className="flex gap-2 justify-center">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Mic className="w-5 h-5 inline mr-2" />
                      Start Recording
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <Square className="w-5 h-5 inline mr-2" />
                      Stop Recording
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Recording Tips</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Find a quiet environment</li>
                  <li>• Speak clearly and at normal volume</li>
                  <li>• Hold phone 6-8 inches from mouth</li>
                  <li>• Test recording before final take</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Music Library</h4>
                <button className="text-blue-600 text-sm hover:underline">
                  <Upload className="w-4 h-4 inline mr-1" />
                  Upload
                </button>
              </div>

              {MUSIC_LIBRARY.map(music => (
                <div key={music.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{music.url}</span>
                      <div>
                        <div className="font-medium text-sm">{music.name}</div>
                        <div className="text-xs text-gray-500">{music.genre} • {formatTime(music.duration)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addMusicTrack(music)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                      <div className="bg-blue-600 h-1 rounded-full w-0"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'device' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Upload from Device</h4>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload audio files from your device (MP3, WAV, M4A)
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Choose Audio File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleDeviceAudioUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Supported Formats</h4>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p>• MP3 - Most common audio format</p>
                  <p>• WAV - High quality, uncompressed</p>
                  <p>• M4A - Apple audio format</p>
                  <p>• AAC - Advanced audio coding</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'effects' && (
            <div className="space-y-3">
              <h4 className="font-medium">Audio Effects</h4>
              <div className="grid grid-cols-2 gap-2">
                {AUDIO_EFFECTS.map(effect => (
                  <button
                    key={effect.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="text-2xl mb-1">{effect.icon}</div>
                    <div className="text-xs font-medium">{effect.name}</div>
                  </button>
                ))}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mt-4">
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Audio effects are simulated in this demo. Real-time processing requires Web Audio API implementation.
                </div>
              </div>
            </div>
          )}

          {/* Audio Tracks */}
          {tracks.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">Audio Tracks ({tracks.length})</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {tracks.map(track => (
                  <div key={track.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {track.type === 'voice' ? '🎤' : track.type === 'music' ? '🎵' : '⚡'}
                        </span>
                        <span className="font-medium text-sm">{track.name}</span>
                        <span className="text-xs text-gray-500">({formatTime(track.duration)})</span>
                      </div>
                      <button
                        onClick={() => removeTrack(track.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <VolumeX className="w-4 h-4 text-gray-400" />
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={track.volume}
                        onChange={(e) => updateTrackVolume(track.id, Number(e.target.value))}
                        className="flex-1"
                      />
                      <Volume2 className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 w-8">{track.volume}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-2">
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium">
              Apply Audio Changes
            </button>
            <button
              onClick={() => setTracks([])}
              className="py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}