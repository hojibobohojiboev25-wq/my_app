"use client"

import { useState } from 'react'
import { Share2, MessageCircle, History, Users, Copy, Mail, Link as LinkIcon } from 'lucide-react'

interface Comment {
  id: string
  user: string
  avatar: string
  text: string
  timestamp: string
  type: 'comment' | 'edit' | 'share'
}

interface Version {
  id: string
  name: string
  timestamp: string
  user: string
  changes: string
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    user: 'Alice Johnson',
    avatar: '👩',
    text: 'Great start! The intro looks much better now.',
    timestamp: '2 hours ago',
    type: 'comment'
  },
  {
    id: '2',
    user: 'Bob Smith',
    avatar: '👨',
    text: 'Added color correction and improved audio levels',
    timestamp: '4 hours ago',
    type: 'edit'
  },
  {
    id: '3',
    user: 'You',
    avatar: '😊',
    text: 'Shared project with the team',
    timestamp: '1 day ago',
    type: 'share'
  }
]

const MOCK_VERSIONS: Version[] = [
  {
    id: 'v3',
    name: 'Final Cut',
    timestamp: '2024-02-01 14:30',
    user: 'You',
    changes: 'Added text overlay and final color grading'
  },
  {
    id: 'v2',
    name: 'Audio Mix',
    timestamp: '2024-02-01 12:15',
    user: 'Alice Johnson',
    changes: 'Improved audio mixing and added background music'
  },
  {
    id: 'v1',
    name: 'Initial Edit',
    timestamp: '2024-01-31 16:45',
    user: 'You',
    changes: 'Basic trimming and speed adjustments'
  }
]

const MOCK_COLLABORATORS = [
  { id: '1', name: 'Alice Johnson', avatar: '👩', role: 'Editor', status: 'online' },
  { id: '2', name: 'Bob Smith', avatar: '👨', role: 'Reviewer', status: 'offline' },
  { id: '3', name: 'Carol Davis', avatar: '👩‍💼', role: 'Manager', status: 'online' }
]

export default function CollaborationPanel({ projectName, onClose }: { projectName: string; onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<'comments' | 'versions' | 'sharing'>('comments')
  const [newComment, setNewComment] = useState('')
  const [shareLink, setShareLink] = useState('https://videoeditor.app/share/project-123')

  const handleAddComment = () => {
    if (!newComment.trim()) return
    // Mock adding comment
    alert('Comment added!')
    setNewComment('')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    alert('Link copied to clipboard!')
  }

  const getActivityIcon = (type: Comment['type']) => {
    switch (type) {
      case 'comment': return '💬'
      case 'edit': return '✏️'
      case 'share': return '📤'
      default: return '📝'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Collaborate</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-medium">{projectName}</h3>
            <p className="text-sm text-gray-500">3 collaborators • 8 comments</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-sm ${
                activeTab === 'comments' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Comments
            </button>
            <button
              onClick={() => setActiveTab('versions')}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-sm ${
                activeTab === 'versions' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <History className="w-4 h-4" />
              Versions
            </button>
            <button
              onClick={() => setActiveTab('sharing')}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-sm ${
                activeTab === 'sharing' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Content */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              {/* Add Comment */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full resize-none border rounded px-3 py-2 text-sm"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                  >
                    Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {MOCK_COMMENTS.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="text-lg">{comment.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        <span className="text-sm">{getActivityIcon(comment.type)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'versions' && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {MOCK_VERSIONS.map(version => (
                <div key={version.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm">{version.name}</div>
                      <div className="text-xs text-gray-500">
                        by {version.user} • {version.timestamp}
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm hover:underline">
                      Restore
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{version.changes}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sharing' && (
            <div className="space-y-4">
              {/* Current Collaborators */}
              <div>
                <h4 className="font-medium mb-3">Current Collaborators</h4>
                <div className="space-y-2">
                  {MOCK_COLLABORATORS.map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-lg">{user.avatar}</div>
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <button className="text-red-600 text-sm hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Link */}
              <div>
                <h4 className="font-medium mb-3">Share Link</h4>
                <div className="flex gap-2">
                  <input
                    value={shareLink}
                    readOnly
                    className="flex-1 border rounded px-3 py-2 text-sm bg-gray-50"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded text-sm">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Invite by Email
                  </button>
                  <button className="py-2 px-3 bg-gray-100 text-gray-700 rounded">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-medium mb-3">Permissions</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    Allow comments
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    Allow editing
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Allow downloading
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}