"use client"

import { useState, useEffect } from 'react'

export function useTutorial() {
  const [shouldShowTutorial, setShouldShowTutorial] = useState(false)

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      try {
        const tutorialCompleted = localStorage.getItem('tutorial_completed')
        const isNewUser = !localStorage.getItem('has_used_app')

        if (!tutorialCompleted && isNewUser) {
          setShouldShowTutorial(true)
        }
      } catch (error) {
        // localStorage not available, show tutorial
        setShouldShowTutorial(true)
      }
    }
  }, [])

  const completeTutorial = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tutorial_completed', 'true')
        localStorage.setItem('has_used_app', 'true')
      }
    } catch (error) {
      // localStorage not available, just close tutorial
    }
    setShouldShowTutorial(false)
  }

  return { shouldShowTutorial, completeTutorial }
}