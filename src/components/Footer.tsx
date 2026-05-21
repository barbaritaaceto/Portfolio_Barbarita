import React, { useState, useEffect } from 'react'
import FeedbackDialog from './FeedbackDialog'
import { track } from '../lib/analytics'

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })

  useEffect(() => {
    const onLang = (e: Event) => {
      const detail = (e as CustomEvent<{ isEnglish: boolean }>).detail
      setIsEnglish(detail.isEnglish)
    }
    window.addEventListener('app-language-change', onLang)
    return () => window.removeEventListener('app-language-change', onLang)
  }, [])

  return (
    <>
      <footer
        className="py-6 mt-12"
        style={{ borderTop: '1px solid var(--border-base)', backgroundColor: 'var(--bg-alt)' }}
      >
        <div
          className="container mx-auto px-4 flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href="https://docs.google.com/viewer?url=https://portfolio-barbarita.vercel.app/proceso.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.clickExternalLink('Cómo se construyó este portfolio', 'https://portfolio-barbarita.vercel.app/proceso.pdf', 'footer')}
            className="btn-ghost px-5 text-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span style={{ fontSize: '14px' }}>✨</span>
            {isEnglish ? 'How this portfolio was built' : 'Cómo se construyó este portfolio'}
          </a>
          <button
            id="footer-feedback-btn"
            type="button"
            onClick={() => { setIsOpen(true); track.openFeedback() }}
            className="btn-primary px-6"
          >
            {isEnglish ? '+ Leave feedback' : '+ Dejar feedback'}
          </button>
        </div>
      </footer>
      <FeedbackDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isEnglish={isEnglish}
      />
    </>
  )
}
