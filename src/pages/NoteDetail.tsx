import React from 'react'
import { useParams } from 'react-router-dom'
import notes from '../data/notes'
import { Helmet } from 'react-helmet-async'
import Card from '../components/ui/Card'

export default function NoteDetail(){
  const { slug } = useParams()
  const note = notes.find(n=> n.slug === slug)

  if(!note) return <div>Note not found</div>

  return (
    <div>
      <Helmet><title>{note.title} — Note</title></Helmet>
      <Card>
        <h1 className="text-2xl font-semibold">{note.title}</h1>
        <div className="text-sm text-gray-500 mt-1">{note.date} · {note.readingTime} min</div>
        <div className="mt-4 text-gray-700">{note.content}</div>
      </Card>
    </div>
  )
}
