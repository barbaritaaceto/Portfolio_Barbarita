import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

interface FeedbackDialogProps {
  isOpen: boolean
  onClose: () => void
  isEnglish: boolean
}

export default function FeedbackDialog({ isOpen, onClose, isEnglish }: FeedbackDialogProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const t = isEnglish
    ? {
        title: 'Do you have feedback about this page?',
        subtitle: 'I would love to read you to keep improving it.',
        nameLabel: 'Name (optional)',
        emailLabel: 'Email (optional)',
        feedbackLabel: 'Feedback',
        feedbackPlaceholder: 'Tell me what you would improve...',
        submit: 'Send feedback',
        close: 'Close',
        thanks: 'Thank you! Your feedback was submitted.',
        error: 'Something went wrong. Please try again.',
      }
    : {
        title: '¿Tenés feedback sobre esta página?',
        subtitle: 'Me encantaría leerte para seguir mejorándola.',
        nameLabel: 'Nombre (opcional)',
        emailLabel: 'Email (opcional)',
        feedbackLabel: 'Feedback',
        feedbackPlaceholder: 'Contame qué mejorarías...',
        submit: 'Enviar feedback',
        close: 'Cerrar',
        thanks: 'Grazie milleee! Tu feedback fue enviado.',
        error: 'Hubo un error al enviar. Intentá de nuevo.',
      }

  const reset = () => {
    onClose()
    setTimeout(() => {
      setName('')
      setEmail('')
      setFeedback('')
      setIsSubmitted(false)
      setSubmitError(false)
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!feedback.trim()) return
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name || 'Anónimo',
          from_email: email || 'Sin email',
          message: feedback,
          page_url: window.location.href,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => setIsSubmitted(true))
      .catch(() => setSubmitError(true))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/25"
        aria-label={isEnglish ? 'Close dialog' : 'Cerrar diálogo'}
        onClick={reset}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm rounded-2xl border p-6 shadow-xl"
        style={{ backgroundColor: '#FFFFFF', borderColor: 'var(--border-base)', zIndex: 1 }}
      >
        {!isSubmitted ? (
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: 'var(--border-base)' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: 'var(--border-base)' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {t.feedbackLabel}
              </label>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                required
                rows={4}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none"
                style={{ borderColor: 'var(--border-base)' }}
                placeholder={t.feedbackPlaceholder}
              />
            </div>
            {submitError && (
              <p className="text-xs" style={{ color: '#e53e3e' }}>
                {t.error}
              </p>
            )}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#FFFFFF' }}
              >
                {t.submit}
              </button>
              <button
                type="button"
                onClick={reset}
                className="text-sm font-medium"
                style={{ color: 'var(--accent-primary)' }}
              >
                {t.close}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t.thanks}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 text-sm font-medium"
              style={{ color: 'var(--accent-primary)' }}
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
