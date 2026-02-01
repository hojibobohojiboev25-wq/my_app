"use client"

import { useState } from 'react'

export default function SaveProject({ file, startPct, endPct }:{ file: File | null; startPct?: number; endPct?: number }){
  const [name, setName] = useState('')
  function save(){
    const projects = JSON.parse(localStorage.getItem('mve_projects') || '[]')
    projects.unshift({
      name: name || (file?.name ?? 'Untitled'),
      date: new Date().toISOString(),
      trim: { startPct: startPct ?? 0, endPct: endPct ?? 100 }
    })
    localStorage.setItem('mve_projects', JSON.stringify(projects))
    alert('Project saved (mock)')
    setName('')
  }
  return (
    <div className="bg-gray-50 p-3 rounded">
      <label className="text-xs text-gray-500">Save project (mock)</label>
      <div className="mt-2 flex gap-2">
        <input className="flex-1 rounded-md border px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} placeholder={(file?.name ?? 'Untitled Project')} />
        <button onClick={save} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Save</button>
      </div>
    </div>
  )
}
