"use client"

import { useEffect, useState } from 'react'
import ProjectCard from '../../components/ProjectCard'

export default function Projects(){
  const [projects, setProjects] = useState<{name:string;date:string}[]>([])

  useEffect(()=>{
    const raw = localStorage.getItem('mve_projects')
    if (raw) setProjects(JSON.parse(raw))
  },[])

  return (
    <main className="px-4 pt-6 pb-24">
      <h1 className="text-xl font-semibold">Projects</h1>

      <section className="mt-4 space-y-3">
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-gray-500">No projects yet</div>
            <a href="/create" className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">Create a project</a>
          </div>
        ) : (
          <div className="grid gap-3">
            {projects.map((p,i)=>(<ProjectCard key={i} name={p.name} date={p.date} />))}
          </div>
        )}
      </section>
    </main>
  )
}
