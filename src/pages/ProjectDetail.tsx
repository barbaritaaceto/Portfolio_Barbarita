import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import projects from '../data/projects'
import Card from '../components/ui/Card'

export default function ProjectDetail(){
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if(!project) return <div>Project not found</div>

  return (
    <div>
      <Helmet><title>{project.title} — Project</title></Helmet>
      <Card>
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="text-gray-600 mt-2">{project.summary}</p>
        <div className="mt-4 flex gap-2">{project.tech.map(t=> <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}</div>
      </Card>

      <Card className="mt-6">
        <h3 className="font-semibold">Problem</h3>
        <p className="text-gray-600 mt-2">{project.description}</p>
        <h3 className="font-semibold mt-4">Approach</h3>
        <p className="text-gray-600 mt-2">Approach placeholder content.</p>
        <h3 className="font-semibold mt-4">Outcome</h3>
        <p className="text-gray-600 mt-2">Outcome placeholder content.</p>
      </Card>
    </div>
  )
}
