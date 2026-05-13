import React, { useState, useEffect } from 'react'
import FeedbackDialog from './FeedbackDialog'

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
          className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}
        >
          <span>aceto.barbara@gmail.com</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="transition-colors duration-150"
            style={{ color: 'var(--text-muted)', fontWeight: 500 }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
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
