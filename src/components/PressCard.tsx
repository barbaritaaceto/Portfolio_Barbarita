import React from 'react'
import { PressItem } from '../data/types'

export default function PressCard({item, locale = 'en-US', onClick}:{item:PressItem; locale?: string; onClick?: () => void}){
  const content = (
    <div
      className="bg-white rounded-2xl border p-4 shadow-sm"
      style={{
        borderColor: 'var(--border-base)',
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
      <div className="flex items-center gap-4">
        <div className="overflow-hidden rounded-xl flex-shrink-0" style={{ width: 96, height: 56 }}>
          <img
            src={item.image||'/placeholder.png'}
            alt={item.outlet}
            className="w-full h-full object-cover"
            style={{
              transition: 'transform 0.35s ease',
              filter: 'saturate(0.92) contrast(0.98) brightness(0.99)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.015)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = '' }}
          />
        </div>
        <div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {item.outlet} · {new Date(item.date).toLocaleDateString(locale, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <h4 className="font-medium" style={{ color: 'var(--text-primary)', transition: 'color 0.25s ease' }}>{item.title}</h4>
        </div>
      </div>
    </div>
  )

  if (item.url) {
    return <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={onClick} className="block" style={{ textDecoration: 'none' }}>{content}</a>
  }
  return content
}
