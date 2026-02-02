"use client"

import React, { useState } from 'react'
import { Cloud, HardDrive, Play, MoreVertical, Users } from 'lucide-react'
import CollaborationPanel from './CollaborationPanel'

interface ProjectCardProps {
  name: string
  date: string
  size?: string
  status?: string
  location?: string
}

export default function ProjectCard({ name, date, size, status, location }: ProjectCardProps){
  const [showCollaboration, setShowCollaboration] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="font-medium">{name}</div>
              {status === 'synced' && <Cloud className="w-4 h-4 text-blue-500" />}
              {location === 'local' && <HardDrive className="w-4 h-4 text-gray-500" />}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <span>{formatDate(date)}</span>
              {size && <span>{size}</span>}
              {status && status !== 'synced' && (
                <span className="text-orange-500 capitalize">{status}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCollaboration(true)}
              className="p-2 text-gray-400 hover:text-blue-600 rounded"
              title="Collaborate"
            >
              <Users className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
              <Play className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar for projects that are processing */}
        {status === 'syncing' && (
          <div className="mt-3">
            <div className="bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Syncing to cloud...</div>
          </div>
        )}
      </div>

      {showCollaboration && (
        <CollaborationPanel
          projectName={name}
          onClose={() => setShowCollaboration(false)}
        />
      )}
    </>
  )
}
