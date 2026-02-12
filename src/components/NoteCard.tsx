import React from 'react'
import { Link } from 'react-router-dom'
import { Note } from '../data/types'

export default function NoteCard({note}:{note:Note}){
  return (
    <Link to={`/notes/${note.slug}`}> 
      <div className="bg-white rounded-2xl border p-4 shadow-sm" style={{borderColor:'var(--card-border)'}}>
        <h4 className="font-medium text-gray-900">{note.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{note.excerpt}</p>
        <div className="text-xs text-gray-500 mt-2">{note.date} · {note.readingTime} min</div>
        <div className="mt-2 flex gap-2">
          {note.tags.map(t=> <span key={t} className="text-xs bg-[rgba(228,107,140,0.08)] px-2 py-1 rounded-full">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}
