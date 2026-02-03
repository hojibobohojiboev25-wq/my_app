"use client"

import { useEffect, useState } from 'react'
import { Keyboard, X } from 'lucide-react'

interface KeyboardShortcutsProps {
  onClose: () => void
}

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose])

  const shortcuts = [
    { keys: ['Ctrl', 'Z'], description: 'Undo last action' },
    { keys: ['Ctrl', 'Y'], description: 'Redo last action' },
    { keys: ['Ctrl', 'S'], description: 'Save project' },
    { keys: ['Space'], description: 'Play/Pause video' },
    { keys: ['←', '→'], description: 'Seek video backward/forward' },
    { keys: ['Ctrl', 'C'], description: 'Copy selected element' },
    { keys: ['Ctrl', 'V'], description: 'Paste element' },
    { keys: ['Delete'], description: 'Delete selected element' },
    { keys: ['Ctrl', 'A'], description: 'Select all' },
    { keys: ['F11'], description: 'Toggle fullscreen' },
    { keys: ['1-9'], description: 'Apply preset filters' },
    { keys: ['T'], description: 'Add text overlay' },
    { keys: ['M'], description: 'Mute/unmute audio' },
    { keys: ['R'], description: 'Reset all filters' },
    { keys: ['E'], description: 'Export project' },
    { keys: ['Shift', 'S'], description: 'Quick save' },
    { keys: ['Ctrl', 'Shift', 'E'], description: 'Export with custom settings' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-6">
          <div className="grid gap-3">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 px-4 bg-gray-700 rounded-lg"
              >
                <span className="text-gray-300">{shortcut.description}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <span key={keyIndex} className="flex items-center">
                      <kbd className="px-2 py-1 bg-gray-600 text-gray-200 rounded text-xs font-mono border border-gray-500">
                        {key}
                      </kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="text-gray-500 mx-1">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">💡 Pro Tips</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Hold <kbd className="px-1 py-0.5 bg-gray-600 rounded text-xs">Shift</kbd> while dragging for precise control</li>
              <li>• Double-click text to edit inline</li>
              <li>• Right-click elements for context menu</li>
              <li>• Use number keys (1-9) to quickly apply filter presets</li>
              <li>• Press <kbd className="px-1 py-0.5 bg-gray-600 rounded text-xs">Tab</kbd> to cycle through elements</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Press <kbd className="px-1 py-0.5 bg-gray-600 rounded text-xs">Esc</kbd> or click outside to close
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}