import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AIAssistant from '../components/AIAssistant'
import Footer from '../components/Footer'

const Layout: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })

  const setLanguage = (english: boolean) => {
    setIsEnglish(english)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', english ? 'en' : 'es')
      window.dispatchEvent(new CustomEvent('app-language-change', { detail: { isEnglish: english } }))
    }
  }

  useEffect(() => {
    const onStorage = () => {
      if (typeof window === 'undefined') return
      setIsEnglish(window.localStorage.getItem('lang') === 'en')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const tooltip = isEnglish
    ? 'Ask me about product, AI or strategy'
    : 'Preguntame sobre producto, AI o estrategia'
  const ariaLabel = isEnglish ? "Barbara's AI Assistant" : 'AI Assistant de Barbara'

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />

      {/* Language toggle */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[65]">
        <div
          className="inline-flex rounded-full p-1"
          style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border-base)' }}
          role="group"
          aria-label="Language toggle"
        >
          <button
            type="button"
            onClick={() => setLanguage(false)}
            className="px-3 py-1.5 text-xs font-semibold rounded-full transition-colors"
            style={{
              backgroundColor: isEnglish ? 'transparent' : 'var(--accent-primary)',
              color: isEnglish ? 'var(--text-secondary)' : '#FFFFFF',
            }}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLanguage(true)}
            className="px-3 py-1.5 text-xs font-semibold rounded-full transition-colors"
            style={{
              backgroundColor: isEnglish ? 'var(--accent-primary)' : 'transparent',
              color: isEnglish ? '#FFFFFF' : 'var(--text-secondary)',
            }}
          >
            EN
          </button>
        </div>
      </div>

      {/* AI Assistant floating button */}
      <div className="fixed top-20 right-6 md:top-24 md:right-8 z-50 group flex flex-col items-end gap-2">
        <button
          type="button"
          aria-label={ariaLabel}
          onClick={() => setIsAssistantOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center ai-btn-float"
          style={{
            backgroundColor: isAssistantOpen ? 'var(--accent-primary)' : '#FFFFFF',
            border: `1.5px solid ${isAssistantOpen ? 'var(--accent-primary)' : 'rgba(58, 125, 107, 0.3)'}`,
            boxShadow: '0 4px 14px rgba(30, 42, 56, 0.10)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="13" cy="7" r="3" fill={isAssistantOpen ? 'white' : 'var(--accent-primary)'} />
            <circle cx="6" cy="20" r="2" fill={isAssistantOpen ? 'white' : 'var(--accent-primary)'} opacity="0.65" />
            <circle cx="20" cy="20" r="2" fill={isAssistantOpen ? 'white' : 'var(--accent-primary)'} opacity="0.65" />
            <line x1="13" y1="7" x2="6" y2="20" stroke={isAssistantOpen ? 'white' : 'var(--accent-primary)'} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
            <line x1="13" y1="7" x2="20" y2="20" stroke={isAssistantOpen ? 'white' : 'var(--accent-primary)'} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
            <line x1="6" y1="20" x2="20" y2="20" stroke={isAssistantOpen ? 'white' : 'var(--accent-primary)'} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
          </svg>
        </button>
        <div
          role="tooltip"
          className="ai-btn-tooltip pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-1"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full block"
            style={{ backgroundColor: '#1E2A38', color: '#F5F2EC', letterSpacing: '0.01em' }}
          >
            {tooltip}
          </span>
        </div>
      </div>

      {/* AI Assistant dialog */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 md:p-6 md:items-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/15"
            aria-label={isEnglish ? 'Close assistant' : 'Cerrar asistente'}
            onClick={() => setIsAssistantOpen(false)}
          />
          <div className="relative">
            <AIAssistant
              isEnglish={isEnglish}
              onClose={() => setIsAssistantOpen(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        .ai-btn-float {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ai-btn-float:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(30, 42, 56, 0.20) !important;
        }
        .ai-btn-tooltip {
          transition: opacity 0.2s ease;
        }
      `}</style>
    </div>
  )
}

export default Layout

