"use client"

import { useState } from 'react'
import { Cloud, Upload, Download, Share2, Trash2 } from 'lucide-react'

interface Project {
  id: string
  name: string
  date: string
  size: string
  status: 'synced' | 'local' | 'syncing'
  thumbnail?: string
}

const MOCK_CLOUD_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Summer Vacation Vlog',
    date: '2024-02-01',
    size: '245 MB',
    status: 'synced',
    thumbnail: '🎥'
  },
  {
    id: '2',
    name: 'Product Demo',
    date: '2024-01-28',
    size: '156 MB',
    status: 'synced',
    thumbnail: '📱'
  },
  {
    id: '3',
    name: 'Birthday Celebration',
    date: '2024-01-25',
    size: '312 MB',
    status: 'local',
    thumbnail: '🎂'
  }
]

export default function CloudStorage({ onClose }: { onClose?: () => void }) {
  const [projects, setProjects] = useState<Project[]>(MOCK_CLOUD_PROJECTS)
  const [activeTab, setActiveTab] = useState<'cloud' | 'local'>('cloud')
  const [syncingProject, setSyncingProject] = useState<string | null>(null)

  const handleSync = async (projectId: string) => {
    setSyncingProject(projectId)
    // Mock sync delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, status: 'synced' as const } : p
    ))
    setSyncingProject(null)
  }

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  const cloudProjects = projects.filter(p => p.status === 'synced')
  const localProjects = projects.filter(p => p.status === 'local')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Cloud Storage</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-4">
          {/* Tabs */}
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('cloud')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                activeTab === 'cloud' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Cloud ({cloudProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('local')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                activeTab === 'local' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Local ({localProjects.length})
            </button>
          </div>

          {/* Storage Info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">Storage Used</span>
              <span className="font-medium">713 MB / 5 GB</span>
            </div>
            <div className="mt-2 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-1/8"></div>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {(activeTab === 'cloud' ? cloudProjects : localProjects).map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg">
                    {project.thumbnail}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="text-xs text-gray-500">
                      {project.date} • {project.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {project.status === 'local' && (
                    <button
                      onClick={() => handleSync(project.id)}
                      disabled={syncingProject === project.id}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      {syncingProject === project.id ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Download className="w-4 h-4" />
                  </button>

                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium">
              Upload New Project
            </button>
            <button className="w-full py-2 text-blue-600 text-sm">
              Manage Storage Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}