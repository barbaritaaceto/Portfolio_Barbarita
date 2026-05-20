import React from 'react'
import { Link } from 'react-router-dom'
import { Note } from '../data/types'

export default function NoteCard({note, locale = 'en-US', minuteLabel = 'min'}:{note:Note; locale?: string; minuteLabel?: string}){
  return (
    <Link to={`/notes/${note.slug}`} className="block group"> 
      <div
        className="bg-white rounded-2xl border p-4 shadow-sm"
        style={{
          borderColor:'var(--border-base)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = 'translateY(-2px)'
          el.style.boxShadow = '0 8px 28px rgba(30,42,56,0.09)'
          el.style.borderColor = 'rgba(74,127,121,0.25)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = ''
          el.style.boxShadow = ''
          el.style.borderColor = 'var(--border-base)'
        }}
      >
        {note.image && (
          <div className="w-full h-36 rounded-2xl overflow-hidden mb-3 border" style={{ borderColor: 'var(--border-base)', backgroundColor: '#F3F2EF' }}>
            <img
              src={note.image}
              alt={note.title}
              className="w-full h-full object-cover"
              style={{
                objectPosition: note.imagePosition ?? 'center',
                transition: 'transform 0.35s ease, filter 0.35s ease',
                filter: 'saturate(0.92) contrast(0.98) brightness(0.99)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.015)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = '' }}
              loading="lazy"
            />
          </div>
        )}
        <h4
          className="font-medium"
          style={{ color: 'var(--text-primary)', transition: 'color 0.25s ease' }}
        >
          {note.title}
        </h4>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{note.excerpt}</p>
        <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
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
