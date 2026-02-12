import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import notesData from '../data/notes'
import NoteCard from '../components/NoteCard'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function Notes(){
  const [q, setQ] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const tags = useMemo(()=> Array.from(new Set(notesData.flatMap(n=>n.tags))), [])

  const filtered = useMemo(()=> notesData.filter(n=>{
    const matchesQ = q ? (n.title + n.excerpt + n.content).toLowerCase().includes(q.toLowerCase()) : true
    const matchesTag = tag ? n.tags.includes(tag) : true
    return matchesQ && matchesTag
  }), [q, tag])

  return (
    <div>
      <Helmet><title>Notes — Barbara Aceto</title></Helmet>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <div className="w-1/3"><Input placeholder="Search notes…" value={q} onChange={e=>setQ(e.target.value)} /></div>
      </div>
      <Card>
        <div className="mb-3 flex gap-2 flex-wrap">
          {tags.map(t=> (
            <button key={t} onClick={()=> setTag(prev=> prev===t? null : t)} className={`px-3 py-1 rounded-full text-sm ${tag===t? 'bg-primary text-white':'bg-gray-100'}`}>{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(n=> <NoteCard key={n.slug} note={n} />)}
        </div>

        {filtered.length===0 && <div className="text-sm text-gray-600 mt-4">No notes match your filters.</div>}
      </Card>
    </div>
  )
}
