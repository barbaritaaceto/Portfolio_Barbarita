import React from 'react'
import { Link } from 'react-router-dom'
import { Project } from '../data/types'
import Card from './ui/Card'
import Button from './ui/Button'

export default function ProjectCard({project}:{project:Project}){
  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h4 className="font-medium text-lg text-gray-900">{project.title}</h4>
          <p className="text-sm text-gray-600 mt-2">{project.summary}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">{project.tech.map(t=> <span key={t} className="text-xs bg-[rgba(228,107,140,0.08)] px-2 py-1 rounded-full text-[0.72rem] text-[rgba(15,23,42,0.7)]">{t}</span>)}</div>
          <Link to={`/projects/${project.slug}`}><Button variant="ghost" className="text-[var(--primary)]">View case study</Button></Link>
        </div>
      </div>
    </Card>
  )
}
