import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <img src="/fodo limones.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-20" />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">

        <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--accent-soft)' }}>
          Madonna mia…
        </p>

        <h1 className="text-6xl font-serif font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          404
        </h1>

        <p className="text-2xl font-serif mb-3" style={{ color: 'var(--text-primary)' }}>
          Questa pagina non esiste.
        </p>

        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          Se perdió en el camino — o nunca existió.<br />
          <span className="italic" style={{ color: 'var(--text-muted)' }}>Come il Wi-Fi en el subte.</span>
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--accent-primary)', color: '#FFFFFF' }}
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
