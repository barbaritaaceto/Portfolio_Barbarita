import React, { useState, useEffect, useCallback, useRef } from 'react'

const DONE_KEY = 'home-tour-done'
const REQUEST_KEY = 'home-tour-requested'
const PAD = 10

interface Step {
  targetId: string | null
  emoji: string
  titleES: string
  titleEN: string
  bodyES: string
  bodyEN: string
}

const STEPS: Step[] = [
  {
    targetId: 'home-profile-card',
    emoji: '👋',
    titleES: 'Bienvenido al portfolio de Barbara',
    titleEN: "Welcome to Barbara's portfolio",
    bodyES:
      'Barbara es PM y estratega de producto con +10 años construyendo productos digitales. Recorramos juntos lo que tiene para mostrar.',
    bodyEN:
      "Barbara is a PM and product strategist with 10+ years building digital products. Let's explore what she has to show.",
  },
  {
    targetId: 'home-btn-projects',
    emoji: '🚀',
    titleES: 'Ver proyectos',
    titleEN: 'View Projects',
    bodyES:
      'Desde acá podés explorar sus proyectos más relevantes — casos reales con contexto, decisiones y aprendizajes.',
    bodyEN:
      'Explore her most relevant projects — real cases with context, decisions, and learnings.',
  },
  {
    targetId: 'layout-ai-btn',
    emoji: '🤖',
    titleES: 'Tu Guía',
    titleEN: 'Your Guide',
    bodyES:
      'Chateá con el asistente para conocer más sobre Barbara — experiencia, proyectos, AI, disponibilidad o lo que quieras preguntar.',
    bodyEN:
      'Chat with the assistant to learn more about Barbara — experience, projects, AI, availability, or anything you want to ask.',
  },
  {
    targetId: 'layout-lang-toggle',
    emoji: '🌐',
    titleES: 'Español · Inglés',
    titleEN: 'Spanish · English',
    bodyES: 'El portfolio está disponible en los dos idiomas. Cambiá cuando quieras con este selector.',
    bodyEN: 'The portfolio is available in both languages. Switch anytime with this toggle.',
  },
  {
    targetId: 'footer-feedback-btn',
    emoji: '💬',
    titleES: 'Dejá tu feedback',
    titleEN: 'Leave your feedback',
    bodyES:
      '¿Algo que te gustó? ¿Algo que podría mejorar? Tu opinión importa y ayuda a que el portfolio siga creciendo.',
    bodyEN:
      'Something you liked? Something that could improve? Your opinion matters and helps the portfolio keep growing.',
  },
  {
    targetId: null,
    emoji: '🔁',
    titleES: 'Ya viste todo',
    titleEN: "You've seen it all",
    bodyES:
      'Podés reiniciar este tour cuando quieras desde el asistente — chip "Tour del portfolio" — o tocando el botón del asistente.',
    bodyEN:
      'Restart this tour anytime from the assistant — chip "Tour the portfolio" — or by tapping the assistant button.',
  },
]

// ─── TourCard ────────────────────────────────────────────────────────────────

interface TourCardProps {
  emoji: string
  title: string
  body: string
  step: number
  total: number
  onNext: () => void
  onSkip?: () => void
  isLast: boolean
  isEnglish: boolean
}

function TourCard({ emoji, title, body, step, total, onNext, onSkip, isLast, isEnglish }: TourCardProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-base)',
        boxShadow: '0 8px 32px rgba(31,46,42,0.22)',
      }}
    >
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? 18 : 6,
              height: 6,
              backgroundColor: i === step ? 'var(--accent-primary)' : 'var(--border-base)',
              flexShrink: 0,
            }}
          />
        ))}
        <span className="ml-auto text-[10px] font-medium" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {step + 1} / {total}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <span className="text-2xl leading-none block mb-2">{emoji}</span>
        <h3
          className="font-serif font-semibold text-base leading-snug mb-1.5"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {body}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNext}
          className="btn-primary text-sm px-5 py-2"
        >
          {isLast
            ? isEnglish ? '✓ Got it' : '✓ Entendido'
            : isEnglish ? 'Next →' : 'Siguiente →'}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs px-3 py-2 rounded-full transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            {isEnglish ? 'Skip tour' : 'Saltar tour'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── HomeTour ─────────────────────────────────────────────────────────────────

interface HomeTourProps {
  isEnglish: boolean
}

export default function HomeTour({ isEnglish }: HomeTourProps) {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const updateRect = useCallback(() => {
    const target = STEPS[step]
    if (!target.targetId) {
      setRect(null)
      return
    }
    const el = document.getElementById(target.targetId)
    if (el) {
      setRect(el.getBoundingClientRect())
    } else {
      setRect(null)
    }
  }, [step])

  // Auto-start on first visit, or restart when requested
  useEffect(() => {
    const checkAndStart = () => {
      const requested = sessionStorage.getItem(REQUEST_KEY) === '1'
      const done = sessionStorage.getItem(DONE_KEY) === '1'
      if (requested || !done) {
        if (requested) sessionStorage.removeItem(REQUEST_KEY)
        setStep(0)
        setRect(null)
        setActive(true)
      }
    }
    checkAndStart()

    const onTourRequest = () => {
      sessionStorage.removeItem(REQUEST_KEY)
      setStep(0)
      setRect(null)
      setActive(true)
    }
    window.addEventListener('start-home-tour', onTourRequest)
    return () => window.removeEventListener('start-home-tour', onTourRequest)
  }, [])

  // Scroll to element and update rect when step changes
  useEffect(() => {
    if (!active) return
    const target = STEPS[step]
    if (target.targetId) {
      const el = document.getElementById(target.targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(updateRect, 450)
      } else {
        setRect(null)
      }
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      setRect(null)
    }
  }, [step, active, updateRect])

  // Keep rect updated on scroll and resize
  useEffect(() => {
    if (!active) return
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateRect)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateRect)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateRect)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, updateRect])

  const nextStep = useCallback(() => {
    if (step >= STEPS.length - 1) {
      setActive(false)
      sessionStorage.setItem(DONE_KEY, '1')
    } else {
      setStep(s => s + 1)
    }
  }, [step])

  const skip = useCallback(() => {
    setActive(false)
    sessionStorage.setItem(DONE_KEY, '1')
  }, [])

  if (!active) return null

  const currentStep = STEPS[step]

  return (
    <>
      {/* SVG spotlight overlay — pointer-events: none so page stays interactive */}
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <mask id="home-tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={Math.max(0, rect.left - PAD)}
                y={Math.max(0, rect.top - PAD)}
                width={rect.width + PAD * 2}
                height={rect.height + PAD * 2}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(31,46,42,0.52)"
          mask="url(#home-tour-mask)"
        />
      </svg>

      {/* Highlight ring */}
      {rect && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            zIndex: 201,
            top: Math.max(0, rect.top - PAD),
            left: Math.max(0, rect.left - PAD),
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
            border: '2px solid var(--accent-primary)',
            borderRadius: '12px',
            boxShadow: '0 0 0 4px rgba(74,127,121,0.2)',
            pointerEvents: 'none',
            transition: 'top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease',
          }}
        />
      )}

      {/* TourCard — always blocks clicks on itself */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(90vw, 420px)',
          zIndex: 202,
          pointerEvents: 'all',
        }}
      >
        <TourCard
          emoji={currentStep.emoji}
          title={isEnglish ? currentStep.titleEN : currentStep.titleES}
          body={isEnglish ? currentStep.bodyEN : currentStep.bodyES}
          step={step}
          total={STEPS.length}
          onNext={nextStep}
          onSkip={step < STEPS.length - 1 ? skip : undefined}
          isLast={step === STEPS.length - 1}
          isEnglish={isEnglish}
        />
      </div>
    </>
  )
}
