"use client"

import React from 'react'

export default function ProjectCard({ name, date }: { name: string; date: string }){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-gray-400 mt-1">{date}</div>
    </div>
  )
}
