import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
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
    ? 'Ask me about Barbi'
    : 'Preguntame sobre Barbi'
  const ariaLabel = isEnglish ? "Barbara's AI Assistant" : 'AI Assistant de Barbara'

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 pt-4 pb-8">
        <Outlet />
      </main>

      <Footer />
      <Analytics />

      {/* Language toggle */}
      <div id="layout-lang-toggle" className="fixed top-4 right-4 md:top-8 md:right-8 z-[65]">
        <div
          className="inline-flex rounded-full p-1"
          style={{
            backgroundColor: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(74,127,121,0.18)',
            boxShadow: '0 4px 18px rgba(30,42,56,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
          role="group"
          aria-label="Language toggle"
        >
          <button
            type="button"
            onClick={() => setLanguage(false)}
            className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
            style={{
              backgroundColor: isEnglish ? 'transparent' : 'var(--accent-primary)',
              color: isEnglish ? 'var(--text-secondary)' : '#FFFFFF',
              boxShadow: isEnglish ? 'none' : '0 2px 8px rgba(74,127,121,0.25)',
            }}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLanguage(true)}
            className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
            style={{
              backgroundColor: isEnglish ? 'var(--accent-primary)' : 'transparent',
              color: isEnglish ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: isEnglish ? '0 2px 8px rgba(74,127,121,0.25)' : 'none',
            }}
          >
            EN
          </button>
        </div>
      </div>

      {/* AI Assistant floating button */}
      <div className="fixed top-16 right-4 md:top-24 md:right-8 z-50 group flex flex-col items-end gap-2">
        <button
          id="layout-ai-btn"
          type="button"
          aria-label={ariaLabel}
          onClick={() => setIsAssistantOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center ai-btn-float"
          style={{
            backgroundColor: isAssistantOpen
              ? 'var(--accent-primary)'
              : 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${isAssistantOpen ? 'rgba(74,127,121,0.6)' : 'rgba(74,127,121,0.18)'}`,
            boxShadow: isAssistantOpen
              ? '0 6px 24px rgba(74,127,121,0.30)'
              : '0 4px 18px rgba(30,42,56,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
          className="ai-btn-tooltip pointer-events-none opacity-0 group-hover:opacity-100 mr-1"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full block"
            style={{
              backgroundColor: 'rgba(30,42,40,0.88)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#F5F2EC',
              letterSpacing: '0.02em',
              border: '1px solid rgba(74,127,121,0.15)',
            }}
          >
            {tooltip}
          </span>
        </div>
      </div>

      {/* AI Assistant dialog */}
      {isAssistantOpen && (
        <AIAssistant
          isEnglish={isEnglish}
          onClose={() => setIsAssistantOpen(false)}
        />
      )}

      <style>{`
        @keyframes aiFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        .ai-btn-float {
          animation: aiFloat 4s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.25s ease, border-color 0.25s ease;
        }
        .ai-btn-float:hover {
          animation-play-state: paused;
          transform: translateY(-4px) scale(1.07);
          box-shadow: 0 12px 32px rgba(74, 127, 121, 0.26), inset 0 1px 0 rgba(255,255,255,0.6) !important;
        }
        .ai-btn-float:active {
          animation-play-state: paused;
          transform: scale(0.96);
        }
        .ai-btn-tooltip {
          transition: opacity 0.25s ease, transform 0.25s ease;
          transform: translateY(4px);
        }
        .group:hover .ai-btn-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default Layout

