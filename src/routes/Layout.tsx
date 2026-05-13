import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import emailjs from '@emailjs/browser'
const Layout: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const uiText = isEnglish
    ? {
        chatbotAria: 'Barbara\'s AI Assistant',
        chatbotTooltip: 'Ask me about product, AI or strategy',
        closeDialogAria: 'Close dialog',
        title: 'Do you have feedback about this page?',
        subtitle: 'I would love to read you to keep improving it.',
        nameLabel: 'Name (optional)',
        emailLabel: 'Email (optional)',
        feedbackLabel: 'Feedback',
        feedbackPlaceholder: 'Tell me what you would improve...',
        submit: 'Send feedback',
        close: 'Close',
        thanks: 'Thank you! Your feedback was submitted.',
      }
    : {
        chatbotAria: 'AI Assistant de Barbara',
        chatbotTooltip: 'Preguntame sobre producto, AI o estrategia',
        closeDialogAria: 'Cerrar diálogo',
        title: '¿Tenés feedback sobre esta página?',
        subtitle: 'Me encantaría leerte para seguir mejorándola.',
        nameLabel: 'Nombre (opcional)',
        emailLabel: 'Email (opcional)',
        feedbackLabel: 'Feedback',
        feedbackPlaceholder: 'Contame qué mejorarías...',
        submit: 'Enviar feedback',
        close: 'Cerrar',
        thanks: '¡Gracias! Tu feedback fue enviado.',
      }

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

  const resetDialog = () => {
    setIsDialogOpen(false)
    setName('')
    setEmail('')
    setFeedback('')
    setIsSubmitted(false)
    setSubmitError(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!feedback.trim()) return

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: name || 'Anónimo',
        from_email: email || 'Sin email',
        message: feedback,
        page_url: window.location.href,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsSubmitted(true)
    }).catch(() => {
      setSubmitError(true)
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

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

      <div className="fixed top-20 right-6 md:top-24 md:right-8 z-50 group flex flex-col items-end gap-2">
        <button
          type="button"
          aria-label={uiText.chatbotAria}
          onClick={() => setIsDialogOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center ai-btn-float"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid rgba(58, 125, 107, 0.3)',
            boxShadow: '0 4px 14px rgba(30, 42, 56, 0.10)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Hub central */}
            <circle cx="13" cy="7" r="3" fill="var(--accent-primary)" />
            {/* Nodos secundarios */}
            <circle cx="6" cy="20" r="2" fill="var(--accent-primary)" opacity="0.65" />
            <circle cx="20" cy="20" r="2" fill="var(--accent-primary)" opacity="0.65" />
            {/* Líneas de conexión */}
            <line x1="13" y1="7" x2="6" y2="20" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
            <line x1="13" y1="7" x2="20" y2="20" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
            <line x1="6" y1="20" x2="20" y2="20" stroke="var(--accent-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
          </svg>
        </button>
        {/* Tooltip */}
        <div
          role="tooltip"
          className="ai-btn-tooltip pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-1"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full block"
            style={{
              backgroundColor: '#1E2A38',
              color: '#F5F2EC',
              letterSpacing: '0.01em',
            }}
          >
            {uiText.chatbotTooltip}
          </span>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 md:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/20"
            aria-label={uiText.closeDialogAria}
            onClick={resetDialog}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-2xl border p-5 shadow-xl"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: 'var(--border-base)',
            }}
          >
            <p className="text-lg font-serif font-semibold" style={{ color: 'var(--text-primary)' }}>
              {uiText.title}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              {uiText.subtitle}
            </p>

            {!isSubmitted ? (
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {uiText.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
                    style={{ borderColor: 'var(--border-base)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {uiText.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
                    style={{ borderColor: 'var(--border-base)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {uiText.feedbackLabel}
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(event) => setFeedback(event.target.value)}
                    required
                    rows={4}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none"
                    style={{ borderColor: 'var(--border-base)' }}
                    placeholder={uiText.feedbackPlaceholder}
                  />
                </div>

                {submitError && (
                  <p className="text-xs" style={{ color: '#e53e3e' }}>
                    {isEnglish ? 'Something went wrong. Please try again.' : 'Hubo un error al enviar. Intentá de nuevo.'}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: 'var(--accent-primary)', color: '#FFFFFF' }}
                  >
                    {uiText.submit}
                  </button>
                  <button
                    type="button"
                    onClick={resetDialog}
                    className="text-sm font-medium"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {uiText.close}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {uiText.thanks}
                </p>
                <button
                  type="button"
                  onClick={resetDialog}
                  className="mt-3 text-sm font-medium"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {uiText.close}
                </button>
              </div>
            )}
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
