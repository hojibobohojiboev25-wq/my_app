"use client"

import { useState } from 'react'
import CloudStorage from './CloudStorage'
import CollaborationPanel from './CollaborationPanel'
import { Cloud, HardDrive, Save, Users } from 'lucide-react'

export default function SaveProject({ file, startPct, endPct }:{ file: File | null; startPct?: number; endPct?: number }){
  const [name, setName] = useState('')
  const [saveLocation, setSaveLocation] = useState<'local' | 'cloud'>('local')
  const [showCloudStorage, setShowCloudStorage] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  function save(){
    setIsSaving(true)
    const projectData = {
      name: name || (file?.name ?? 'Untitled'),
      date: new Date().toISOString(),
      trim: { startPct: startPct ?? 0, endPct: endPct ?? 100 },
      size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
      location: saveLocation
    }

    if (saveLocation === 'local') {
      const projects = JSON.parse(localStorage.getItem('mve_projects') || '[]')
      projects.unshift(projectData)
      localStorage.setItem('mve_projects', JSON.stringify(projects))
      alert('Project saved locally!')
    } else {
      // Mock cloud save
      setTimeout(() => {
        const cloudProjects = JSON.parse(localStorage.getItem('mve_cloud_projects') || '[]')
        cloudProjects.unshift({ ...projectData, id: Date.now().toString(), status: 'synced' })
        localStorage.setItem('mve_cloud_projects', JSON.stringify(cloudProjects))
        alert('Project saved to cloud!')
        setIsSaving(false)
      }, 1500)
      return
    }

    setName('')
    setIsSaving(false)
  }

  return (
    <>
      <div className="bg-gray-50 p-3 rounded">
        <label className="text-xs text-gray-500">Save project</label>
        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder={(file?.name ?? 'Untitled Project')}
          />
          <button onClick={save} disabled={isSaving} className="px-3 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50">
            {isSaving ? 'Saving...' : <Save className="w-4 h-4" />}
          </button>
        </div>

        {/* Save Location Toggle */}
        <div className="mt-3 flex bg-white rounded-lg p-1">
          <button
            onClick={() => setSaveLocation('local')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm ${
              saveLocation === 'local' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            Local
          </button>
          <button
            onClick={() => setSaveLocation('cloud')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm ${
              saveLocation === 'cloud' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
            }`}
          >
            <Cloud className="w-4 h-4" />
            Cloud
          </button>
        </div>

        {/* Cloud Storage Actions */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setShowCloudStorage(true)}
            className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
          >
            Browse Cloud
          </button>
          <button
            onClick={() => setShowCollaboration(true)}
            className="py-2 px-3 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
          >
            <Users className="w-4 h-4 inline mr-1" />
            Collaborate
          </button>
          <button className="py-2 px-3 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
            Auto-sync
          </button>
        </div>

        {saveLocation === 'cloud' && (
          <div className="mt-2 text-xs text-blue-600">
            💡 Cloud projects are automatically synced across devices
          </div>
        )}
      </div>

      {showCloudStorage && (
        <CloudStorage onClose={() => setShowCloudStorage(false)} />
      )}

      {showCollaboration && (
        <CollaborationPanel
          projectName={name || (file?.name ?? 'Untitled Project')}
          onClose={() => setShowCollaboration(false)}
        />
      )}
    </>
  )
}
