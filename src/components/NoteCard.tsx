import React from 'react'
import { Link } from 'react-router-dom'
import { Note } from '../data/types'

export default function NoteCard({note, locale = 'en-US', minuteLabel = 'min'}:{note:Note; locale?: string; minuteLabel?: string}){
  return (
    <Link to={`/notes/${note.slug}`}> 
      <div className="bg-white rounded-2xl border p-4 shadow-sm" style={{borderColor:'var(--card-border)'}}>
        {note.image && (
          <div className="w-full h-36 rounded-xl overflow-hidden mb-3 border" style={{ borderColor: 'var(--border-base)', backgroundColor: '#F3F2EF' }}>
            <img src={note.image} alt={note.title} className="w-full h-full object-cover" style={note.imagePosition ? { objectPosition: note.imagePosition } : undefined} loading="lazy" />
          </div>
        )}
        <h4 className="font-medium text-gray-900">{note.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{note.excerpt}</p>
        <div className="text-xs text-gray-500 mt-2">
          {new Date(note.date).toLocaleDateString(locale, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })} · {note.readingTime} {minuteLabel}
        </div>
        <div className="mt-2 flex gap-2">
          {note.tags.map(t=> <span key={t} className="text-xs bg-[rgba(228,107,140,0.08)] px-2 py-1 rounded-full">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}
