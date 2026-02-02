"use client"

import { useEffect, useState } from 'react'
import ProjectCard from '../../components/ProjectCard'
import { HardDrive, Cloud, Plus } from 'lucide-react'
import Link from 'next/link'

interface Project {
  name: string
  date: string
  size?: string
  location?: string
  status?: string
}

export default function Projects(){
  const [projects, setProjects] = useState<Project[]>([])
  const [cloudProjects, setCloudProjects] = useState<Project[]>([])
  const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local')

  useEffect(()=>{
    const localRaw = localStorage.getItem('mve_projects')
    if (localRaw) setProjects(JSON.parse(localRaw))

    const cloudRaw = localStorage.getItem('mve_cloud_projects')
    if (cloudRaw) setCloudProjects(JSON.parse(cloudRaw))
  },[])

  const currentProjects = activeTab === 'local' ? projects : cloudProjects

  return (
    <main className="px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <Link href="/create" className="p-2 bg-blue-600 text-white rounded-lg">
          <Plus className="w-5 h-5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('local')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium ${
            activeTab === 'local' ? 'bg-white shadow-sm' : 'text-gray-600'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          Local ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('cloud')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium ${
            activeTab === 'cloud' ? 'bg-white shadow-sm' : 'text-gray-600'
          }`}
        >
          <Cloud className="w-4 h-4" />
          Cloud ({cloudProjects.length})
        </button>
      </div>

      <section className="space-y-3">
        {currentProjects.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="text-gray-400 mb-4">
              {activeTab === 'local' ? <HardDrive className="w-12 h-12 mx-auto" /> : <Cloud className="w-12 h-12 mx-auto" />}
            </div>
            <div className="text-gray-500 mb-4">
              No {activeTab} projects yet
            </div>
            <Link href="/create" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {currentProjects.map((p,i)=>(
              <ProjectCard
                key={i}
                name={p.name}
                date={p.date}
                size={p.size}
                status={p.status}
                location={activeTab}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/templates" className="bg-white rounded-lg p-4 shadow-sm text-center hover:bg-gray-50">
            <div className="text-2xl mb-2">📐</div>
            <div className="text-sm font-medium">Templates</div>
          </Link>
          <Link href="/create" className="bg-white rounded-lg p-4 shadow-sm text-center hover:bg-gray-50">
            <div className="text-2xl mb-2">🎬</div>
            <div className="text-sm font-medium">New Project</div>
          </Link>
        </div>
      </section>
    </main>
  )
}
