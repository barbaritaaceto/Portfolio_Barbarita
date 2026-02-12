import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import projectsData from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function Projects(){
  const [q, setQ] = useState('')
  const [techFilter, setTechFilter] = useState<string | null>(null)

  const techs = useMemo(()=> Array.from(new Set(projectsData.flatMap(p=>p.tech))), [])

  const filtered = useMemo(()=> projectsData.filter(p=> {
    const matchesQ = q ? (p.title + p.summary + p.description).toLowerCase().includes(q.toLowerCase()) : true
    const matchesTech = techFilter ? p.tech.includes(techFilter) : true
    return matchesQ && matchesTech
  }), [q, techFilter])

  return (
    <div>
      <Helmet><title>Projects — Barbara Aceto</title></Helmet>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <div className="w-full md:w-1/3"><Input placeholder="Search projects…" value={q} onChange={e=>setQ(e.target.value)} /></div>
      </div>

      <Card>
        <div className="mb-3 flex gap-2 flex-wrap">
          {techs.map(t=> (
            <button key={t} onClick={()=> setTechFilter(prev => prev===t? null : t)} className={`px-3 py-1 rounded-full text-sm ${techFilter===t? 'bg-primary text-white':'bg-gray-100'}`}>{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map(p=> <ProjectCard key={p.slug} project={p} />)}
        </div>

        {filtered.length === 0 && <div className="text-sm text-gray-600 mt-4">No projects match your filters.</div>}
      </Card>
    </div>
  )
}
