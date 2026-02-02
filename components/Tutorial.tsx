"use client"

import { useState, useEffect } from 'react'
// import { X, ChevronRight, ChevronLeft, Play, CheckCircle, Lightbulb, BookOpen } from 'lucide-react'

interface TutorialStep {
  id: string
  title: string
  description: string
  content: string
  action?: string
  target?: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Mobile Video Editor!',
    description: 'Let\'s take a quick tour of the main features',
    content: 'This powerful video editor is designed specifically for mobile devices. You can create, edit, and export professional-quality videos right from your phone.',
    position: 'center'
  },
  {
    id: 'navigation',
    title: 'Bottom Navigation',
    description: 'Easy access to all features',
    content: 'Use the bottom navigation to switch between Home, Templates, Create, Projects, and Profile. Each section has specific tools to help you create amazing videos.',
    target: 'bottom-nav',
    position: 'top'
  },
  {
    id: 'create',
    title: 'Creating Your First Video',
    description: 'Start with video upload and basic editing',
    content: 'Click the Create tab to upload videos, trim them, adjust speed, and apply basic filters. The interface is optimized for touch controls.',
    action: 'Go to Create',
    position: 'center'
  },
  {
    id: 'templates',
    title: 'Video Templates',
    description: 'Pre-built formats for social media',
    content: 'Choose from professionally designed templates optimized for Instagram, YouTube, TikTok, and more. Each template includes the perfect dimensions and settings.',
    action: 'View Templates',
    position: 'center'
  },
  {
    id: 'editing-tools',
    title: 'Advanced Editing Tools',
    description: 'Powerful editing capabilities',
    content: 'Access advanced tools like text overlays, audio editing, color correction, and effects. Switch between different editing modes using the tool tabs.',
    position: 'center'
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description: 'Work together on projects',
    content: 'Share projects with team members, add comments, track versions, and collaborate in real-time. Perfect for content creators working in teams.',
    position: 'center'
  },
  {
    id: 'export',
    title: 'Professional Export',
    description: 'Export in multiple formats',
    content: 'Choose from various export presets optimized for different platforms. Select quality settings and formats that match your needs.',
    position: 'center'
  },
  {
    id: 'analytics',
    title: 'Track Your Success',
    description: 'Analytics and insights',
    content: 'Monitor your video performance, track engagement, and get insights to improve your content strategy. Available in your Profile section.',
    action: 'View Analytics',
    position: 'center'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Ready to create amazing videos',
    content: 'You now know the basics of the Mobile Video Editor. Start creating your first video or explore the templates to get inspired!',
    action: 'Start Creating',
    position: 'center'
  }
]

export default function Tutorial({ onComplete, onClose }: {
  onComplete?: () => void
  onClose?: () => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showTutorial, setShowTutorial] = useState(true)

  useEffect(() => {
    // Mark tutorial as seen
    localStorage.setItem('tutorial_completed', 'true')
  }, [])

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setShowTutorial(false)
    if (onComplete) onComplete()
  }

  const handleAction = () => {
    const step = TUTORIAL_STEPS[currentStep]
    if (step.action === 'Go to Create') {
      window.location.href = '/create'
    } else if (step.action === 'View Templates') {
      window.location.href = '/templates'
    } else if (step.action === 'View Analytics') {
      window.location.href = '/profile'
    } else if (step.action === 'Start Creating') {
      window.location.href = '/create'
    }
    handleComplete()
  }

  if (!showTutorial) return null

  const step = TUTORIAL_STEPS[currentStep]
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">📚</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Step {currentStep + 1} of {TUTORIAL_STEPS.length}
              </span>
            </div>
            <button
              onClick={() => {
                setShowTutorial(false)
                if (onClose) onClose()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {step.description}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {step.content}
            </p>
          </div>

          {/* Visual Aid */}
          <div className="mb-6">
            {step.id === 'welcome' && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">Mobile Video Editor</div>
              </div>
            )}

            {step.id === 'navigation' && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-around items-center py-2 bg-white dark:bg-gray-800 rounded">
                  <div className="flex flex-col items-center text-blue-600">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded mb-1"></div>
                    <span className="text-xs">Home</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded mb-1"></div>
                    <span className="text-xs">Templates</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded mb-1"></div>
                    <span className="text-xs">Create</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded mb-1"></div>
                    <span className="text-xs">Projects</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded mb-1"></div>
                    <span className="text-xs">Profile</span>
                  </div>
                </div>
              </div>
            )}

            {step.id === 'editing-tools' && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-blue-100 dark:bg-blue-900/50 rounded text-blue-700 dark:text-blue-300">
                    <div className="w-6 h-6 bg-white dark:bg-gray-600 rounded mb-1"></div>
                    <span className="text-xs">Trim</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-600 rounded">
                    <div className="w-6 h-6 bg-white dark:bg-gray-500 rounded mb-1"></div>
                    <span className="text-xs">Filters</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-600 rounded">
                    <div className="w-6 h-6 bg-white dark:bg-gray-500 rounded mb-1"></div>
                    <span className="text-xs">Text</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-600 rounded">
                    <div className="w-6 h-6 bg-white dark:bg-gray-500 rounded mb-1"></div>
                    <span className="text-xs">Audio</span>
                  </div>
                </div>
              </div>
            )}

            {step.id === 'complete' && (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 text-center">
                <span className="text-green-600 text-4xl block mx-auto mb-3">✓</span>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Tutorial Complete!
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  You're ready to start creating amazing videos
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg">⬅️</span>
              Previous
            </button>

            <div className="flex gap-2">
              {step.action ? (
                <button
                  onClick={handleAction}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {step.action}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {currentStep === TUTORIAL_STEPS.length - 1 ? 'Finish' : 'Next'}
                  <span className="text-lg inline ml-1">➡️</span>
                </button>
              )}
            </div>
          </div>

          {/* Skip Option */}
          {currentStep < TUTORIAL_STEPS.length - 1 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleComplete}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Skip tutorial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
