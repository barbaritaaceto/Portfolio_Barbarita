import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  matchIntent,
  fallbackES,
  fallbackEN,
  defaultSuggestionsES,
  defaultSuggestionsEN,
} from '../data/assistant'

type MessageRole = 'assistant' | 'user'

interface Message {
  id: string
  role: MessageRole
  text: string
  navLinks?: { labelES: string; labelEN: string; route: string }[]
  chips?: string[]
  streaming?: boolean
  intentId?: string
}

interface AIAssistantProps {
  isEnglish: boolean
  onClose: () => void
}

const initialChipsES = ['Experiencia', 'Proyectos', 'Producto + AI', 'Disponibilidad']
const initialChipsEN = ['Experience', 'Projects', 'Product + AI', 'Availability']

const onboardingES = 'Hola 👋 Soy Boconcino, tu guía. Podés preguntarme cómo trabaja Barbara, cómo aplica AI en producto, qué proyectos hizo o cómo lidera equipos.'
const onboardingEN = "Hi 👋 I'm Boconcino, your guide. Ask me how Barbara works, how she applies AI to product, what projects she's done, or how she leads teams."

const placeholdersES = ['Preguntame sobre producto, AI o equipos…', '¿Cómo usa AI en producto?', '¿Está disponible?', '¿Cuál es su metodología?']
const placeholdersEN = ['Ask me about product, AI or teams…', 'How does she use AI in product?', 'Is she available?', 'What is her methodology?']

const intentMeta: Record<string, { emoji: string; labelES: string; labelEN: string }> = {
  greeting:       { emoji: '👋', labelES: 'Hola',            labelEN: 'Hello' },
  who_is_barbara: { emoji: '👩‍💼', labelES: 'Sobre Barbara',  labelEN: 'About Barbara' },
  experience:     { emoji: '📋', labelES: 'Experiencia',     labelEN: 'Experience' },
  santander:      { emoji: '🏦', labelES: 'Santander',       labelEN: 'Santander' },
  mercadolibre:   { emoji: '🛒', labelES: 'Mercado Libre',   labelEN: 'Mercado Libre' },
  redbee:         { emoji: '🔴', labelES: 'redbee',          labelEN: 'redbee' },
  ai_product:     { emoji: '🤖', labelES: 'Producto + AI',   labelEN: 'Product + AI' },
  leadership:     { emoji: '👥', labelES: 'Liderazgo',       labelEN: 'Leadership' },
  methodology:    { emoji: '🎯', labelES: 'Metodología',     labelEN: 'Methodology' },
  fintech:        { emoji: '💳', labelES: 'Fintech',         labelEN: 'Fintech' },
  projects:       { emoji: '🚀', labelES: 'Proyectos',       labelEN: 'Projects' },
  contact_cv:     { emoji: '📩', labelES: 'Contacto',        labelEN: 'Contact' },
  motivation:     { emoji: '✨', labelES: 'Motivación',      labelEN: 'Motivation' },
  ai_opinion:     { emoji: '💡', labelES: 'Visión AI',       labelEN: 'AI Vision' },
  talks:          { emoji: '🎙️', labelES: 'Charlas',         labelEN: 'Talks' },
  challenge:      { emoji: '⚡', labelES: 'Desafío',         labelEN: 'Challenge' },
  differentiator: { emoji: '⭐', labelES: 'Diferenciador',   labelEN: 'Differentiator' },
  seguro123:      { emoji: '🛡️', labelES: '123Seguro',       labelEN: '123Seguro' },
  notes_press:    { emoji: '📝', labelES: 'Notas & Prensa',  labelEN: 'Notes & Press' },
  short_ack:      { emoji: '✅', labelES: '',                labelEN: '' },
}

function renderInline(text: string): React.ReactNode[] {
  const boldParts = text.split(/\*\*(.*?)\*\*/g)
  return boldParts.map((seg, i) => {
    if (i % 2 === 1) return <strong key={`b${i}`}>{seg}</strong>
    const numParts = seg.split(/(\+\d+[\d,.]*|\d+[\d,.]*\s*(?:años?|meses?)|\d+%|\d+x\b)/g)
    if (numParts.length === 1) return seg as React.ReactNode
    return (
      <React.Fragment key={`f${i}`}>
        {numParts.map((p, j) =>
          j % 2 === 1
            ? <span key={j} style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{p}</span>
            : p
        )}
      </React.Fragment>
    )
  })
}

function renderText(text: string): React.ReactNode {
  const lines = text.split('\n')
  let firstContent = true
  return lines.map((line, i) => {
    if (line === '') return <span key={i} style={{ display: 'block', height: '7px' }} />
    if (line.startsWith('- ')) {
      firstContent = false
      return (
        <span key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '4px' }}>
          <span style={{
            display: 'inline-block', width: '2px', minHeight: '13px',
            backgroundColor: 'var(--accent-primary)', opacity: 0.4,
            borderRadius: '1px', marginTop: '3px', flexShrink: 0,
          }} />
          <span style={{ flex: 1, lineHeight: '1.5' }}>{renderInline(line.slice(2))}</span>
        </span>
      )
    }
    const isHeadline = firstContent
    firstContent = false
    return (
      <span key={i} style={{
        display: 'block',
        fontWeight: isHeadline ? 600 : 400,
        color: isHeadline ? 'var(--text-primary)' : undefined,
        marginBottom: isHeadline ? '7px' : 0,
        lineHeight: '1.55',
      }}>
        {renderInline(line)}
      </span>
    )
  })
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border-base)' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '14px' }}>
          {[0, 1, 2].map(i => <span key={i} className="ai-dot" style={{ animationDelay: `${i * 0.18}s` }} />)}
        </div>
      </div>
    </div>
  )
}

// Tour callout card
function TourCard({ emoji, title, body, onNext, nextLabel, onBack, backLabel, onClose }: {
  emoji: string; title: string; body: string
  onNext: () => void; nextLabel: string
  onBack?: () => void; backLabel?: string
  onClose?: () => void
}) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '2px solid var(--accent-primary)',
      borderRadius: '16px',
      padding: '14px 16px',
      boxShadow: '0 0 0 4px rgba(74,127,121,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
        <span style={{ fontSize: '16px', lineHeight: 1 }}>{emoji}</span>
        <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', flex: 1 }}>{title}</span>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Cerrar" style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 12px' }}>{body}</p>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {onBack && (
          <button type="button" onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-base)', borderRadius: '20px', color: 'var(--text-muted)', fontSize: '11px', padding: '4px 12px', cursor: 'pointer' }}>
            {backLabel ?? '← Atrás'}
          </button>
        )}
        <button
          type="button" onClick={onNext}
          style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}

export default function AIAssistant({ isEnglish, onClose }: AIAssistantProps) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([{
    id: 'onboarding', role: 'assistant',
    text: isEnglish ? onboardingEN : onboardingES,
    chips: isEnglish ? initialChipsEN : initialChipsES,
  }])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [tourStep, setTourStep] = useState<number>(() => {
    if (typeof window === 'undefined') return -1
    return window.sessionStorage.getItem('ai-tour-done') ? -1 : 0
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastIntentIdRef = useRef<string | undefined>(undefined)
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const placeholders = isEnglish ? placeholdersEN : placeholdersES

  const nextTour = () => {
    if (tourStep >= 2) {
      setTourStep(-1)
      if (typeof window !== 'undefined') window.sessionStorage.setItem('ai-tour-done', '1')
    } else {
      setTourStep(s => s + 1)
    }
  }
  const prevTour = () => setTourStep(s => Math.max(0, s - 1))
  const skipTour = () => {
    setTourStep(-1)
    if (typeof window !== 'undefined') window.sessionStorage.setItem('ai-tour-done', '1')
  }
  const restartTour = () => {
    if (typeof window !== 'undefined') window.sessionStorage.removeItem('ai-tour-done')
    setTourStep(0)
  }

  // Returns style to dim a section that is NOT the spotlight for this tourStep
  // spotlight: 'messages' | 'input' | 'chips-row' — what's visible
  const sectionDim = (spotlight: 'messages' | 'input' | 'chips'): React.CSSProperties => {
    if (tourStep < 0) return {}
    const active = tourStep === 0 ? 'input' : tourStep === 1 ? 'messages' : 'chips'
    if (active === spotlight) return { transition: 'opacity 0.25s' }
    return { opacity: 0.12, pointerEvents: 'none', filter: 'blur(0.5px)', transition: 'opacity 0.25s, filter 0.25s' }
  }

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100) }, [])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])
  // Cleanup stream interval on unmount to prevent setState on unmounted component
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    }
  }, [])
  useEffect(() => {
    if (input.length > 0) return
    const t = setInterval(() => setPlaceholderIdx(i => (i + 1) % placeholders.length), 3400)
    return () => clearInterval(t)
  }, [input, placeholders.length])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const pickResponse = (intent: NonNullable<ReturnType<typeof matchIntent>>): string => {
    const variants = isEnglish ? intent.variantsEN : intent.variantsES
    if (variants?.length) return variants[Math.floor(Math.random() * variants.length)]
    return isEnglish ? intent.responseEN : intent.responseES
  }

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return
    if (tourStep >= 0) skipTour()
    const query = text.trim()
    setInput('')
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text: query }])
    setIsTyping(true)
    setTimeout(() => {
      const intent = matchIntent(query, isEnglish, lastIntentIdRef.current)
      let responseText: string, chips: string[], navLinks: Message['navLinks']
      if (intent) {
        responseText = pickResponse(intent)
        chips = isEnglish ? intent.suggestionsEN : intent.suggestionsES
        navLinks = intent.navLinks
        lastIntentIdRef.current = intent.id
      } else {
        responseText = isEnglish ? fallbackEN : fallbackES
        chips = isEnglish ? defaultSuggestionsEN : defaultSuggestionsES
      }
      const msgId = `a-${Date.now()}`
      setIsTyping(false)
      setMessages(prev => [...prev, { id: msgId, role: 'assistant', text: '', streaming: true, intentId: intent?.id }])
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
      const words = responseText.split(' ')
      let wordIdx = 0
      streamIntervalRef.current = setInterval(() => {
        wordIdx++
        if (wordIdx >= words.length) {
          clearInterval(streamIntervalRef.current!)
          streamIntervalRef.current = null
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: words.join(' '), streaming: false, navLinks, chips } : m))
        } else {
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: words.slice(0, wordIdx).join(' ') } : m))
        }
      }, 32)
    }, 650)
  }, [isEnglish, isTyping, tourStep])

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input) }

  return (
    <>
      <style>{`
        @keyframes ai-bd-in    { from{opacity:0} to{opacity:1} }
        @keyframes ai-panel-bs { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes ai-msg-in   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ai-dot-pulse { 0%,100%{opacity:0.22;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes ai-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .ai-cursor { display:inline-block; width:2px; height:0.9em; background:var(--accent-primary); border-radius:1px; margin-left:2px; vertical-align:text-bottom; animation:ai-cursor-blink 0.8s ease-in-out infinite; }
        .ai-bd  { animation: ai-bd-in 0.2s ease }
        .ai-panel { animation: none }
        @media (max-width: 767px) { .ai-panel { animation: ai-panel-bs 0.28s cubic-bezier(0.22,1,0.36,1) } }
        .ai-msg { animation: ai-msg-in 0.2s ease }
        .ai-dot { display:inline-block; width:5px; height:5px; border-radius:50%; background-color:var(--text-muted); animation:ai-dot-pulse 1.2s ease-in-out infinite; }
        .ai-inp::placeholder { color:var(--text-muted); opacity:0.5 }
        .ai-inp:focus { outline:none }
        .ai-chip { cursor:pointer; transition:background-color 0.15s,color 0.15s,border-color 0.15s; }
        .ai-chip:hover { background-color:var(--bg-alt)!important; border-color:rgba(74,127,121,0.35)!important; color:var(--accent-primary)!important; }
        .ai-inp-wrap { transition:border-color 0.2s,box-shadow 0.2s }
        .ai-inp-wrap:focus-within { border-color:rgba(74,127,121,0.5)!important; box-shadow:0 0 0 3px rgba(74,127,121,0.1)!important; }
        .ai-send-btn { transition:background-color 0.15s,opacity 0.15s }
        .ai-send-btn:hover:not(:disabled) { background-color:var(--accent-primary-hover)!important }
        .ai-close:hover { background-color:var(--border-base)!important }
        .ai-tour:hover { background-color:var(--bg-alt)!important; color:var(--text-secondary)!important; border-color:rgba(74,127,121,0.2)!important; }
      `}</style>

      {/* Backdrop */}
      <div className="ai-bd fixed inset-0 z-[60]"
        style={{ backgroundColor: 'rgba(31,46,42,0.48)', backdropFilter: 'blur(6px)' }}
        onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div
        role="dialog" aria-modal="true"
        aria-label={isEnglish ? "Boconcino — Barbara's Guide" : 'Boconcino — Guía de Barbara'}
        className="ai-panel fixed z-[61] flex flex-col inset-x-0 bottom-0 rounded-t-[28px] md:inset-auto md:bottom-auto md:top-[5vh] md:left-1/2 md:-translate-x-1/2 md:w-[580px] md:rounded-[24px]"
        style={{
          backgroundColor: '#FFFFFF',
          maxHeight: 'min(90dvh, 720px)',
          boxShadow: '0 -2px 24px rgba(31,46,42,0.08), 0 32px 80px rgba(31,46,42,0.2)',
          border: '1px solid var(--border-base)',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* Header — dimmed on step 0, 1, 2 */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border-base)', ...(tourStep >= 0 ? { opacity: 0.12, pointerEvents: 'none' as const, filter: 'blur(0.5px)', transition: 'opacity 0.25s, filter 0.25s' } : {}) }}
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Boconcino
              </span>
            </div>
            <p className="ml-4 mt-0.5" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {isEnglish ? 'Barbara Aceto · Product Leader · AI & Digital Strategy' : 'Barbara Aceto · Líder de Producto · IA y Estrategia Digital'}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label={isEnglish ? 'Close' : 'Cerrar'}
            className="ai-close w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-alt)' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages area — spotlight on step 0 */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--border-base) transparent', ...sectionDim('messages') }}
        >
          {messages.map(msg =>
            msg.role === 'user' ? (
              <div key={msg.id} className="ai-msg flex justify-end">
                <div className="max-w-[78%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed"
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#FFFFFF', border: '1px solid transparent' }}>
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="ai-msg flex flex-col gap-2.5">
                {msg.intentId && intentMeta[msg.intentId] && intentMeta[msg.intentId].labelES !== '' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '2px', marginBottom: '-2px' }}>
                    <span style={{ fontSize: '11px', lineHeight: 1 }}>{intentMeta[msg.intentId].emoji}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
                      {isEnglish ? intentMeta[msg.intentId].labelEN : intentMeta[msg.intentId].labelES}
                    </span>
                  </div>
                )}
                <div className="self-start max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed"
                  style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-base)', ...(tourStep === 1 && msg.id === 'onboarding' ? { opacity: 0.1, filter: 'blur(0.5px)', transition: 'opacity 0.25s, filter 0.25s' } : {}) }}>
                  {renderText(msg.text)}{msg.streaming && <span className="ai-cursor" aria-hidden="true" />}
                </div>
                {msg.navLinks && msg.navLinks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.navLinks.map((link, j) => (
                      <button key={j} type="button" onClick={() => { navigate(link.route); onClose() }}
                        className="text-xs px-3 py-1.5 rounded-full transition-colors"
                        style={{ color: 'var(--accent-primary)', border: '1px solid rgba(74,127,121,0.28)', backgroundColor: 'rgba(74,127,121,0.06)' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.12)' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.06)' }}>
                        {isEnglish ? link.labelEN : link.labelES} →
                      </button>
                    ))}
                  </div>
                )}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.chips.map((chip, ci) => (
                      <button key={ci} type="button" onClick={() => sendMessage(chip)}
                        className="ai-chip text-xs px-3 py-1.5 rounded-full"
                        style={{ color: 'var(--text-secondary)', backgroundColor: '#FFFFFF', border: '1px solid var(--border-base)' }}>
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          {isTyping && <TypingDots />}

          {/* Step 1 callout — inside messages area, highlights content chips */}
          {tourStep === 1 && (
            <div className="ai-msg mt-1">
              <TourCard
                emoji="☝️"
                title={isEnglish ? 'Quick topics' : 'Temas rápidos'}
                body={isEnglish
                  ? 'Tap any chip to explore a topic instantly — no typing needed.'
                  : 'Tocá cualquier pastilla para explorar un tema al toque, sin escribir nada.'}
                onBack={prevTour}
                backLabel={isEnglish ? '← Back' : '← Atrás'}
                onNext={nextTour}
                nextLabel={isEnglish ? 'Next →' : 'Siguiente →'}
                onClose={skipTour}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area — spotlight on step 1 and 2 */}
        <div
          className="flex-shrink-0 px-4 pt-3"
          style={{
            borderTop: '1px solid var(--border-base)',
            paddingBottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))',
            ...(tourStep === 1 ? { opacity: 0.12, pointerEvents: 'none', filter: 'blur(0.5px)', transition: 'opacity 0.25s, filter 0.25s' } : { transition: 'opacity 0.25s' }),
          }}
        >
          {/* Step 0 callout — above input bar */}
          {tourStep === 0 && (
            <div className="mb-3">
              <TourCard
                emoji="✍️"
                title={isEnglish ? 'Ask me anything' : 'Preguntame lo que querés'}
                body={isEnglish
                  ? 'Type a question below — experience, projects, AI, availability, or anything you\'re curious about.'
                  : 'Escribí tu pregunta acá — experiencia, proyectos, AI, disponibilidad, o lo que quieras saber.'}
                onNext={nextTour}
                nextLabel={isEnglish ? 'Next →' : 'Siguiente →'}
                onClose={skipTour}
              />
            </div>
          )}

          {/* Input form — first, dimmed during step 2 */}
          <div
            className="mb-2.5"
            style={(tourStep === 1 || tourStep === 2) ? { opacity: 0.2, pointerEvents: 'none', transition: 'opacity 0.25s' } : {}}
          >
            <form onSubmit={handleSubmit}>
              <div className="ai-inp-wrap flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ border: '1.5px solid var(--border-base)', backgroundColor: 'var(--bg)' }}>
                <input
                  ref={inputRef} type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={placeholders[placeholderIdx]}
                  className="ai-inp flex-1 bg-transparent text-sm"
                  style={{ color: 'var(--text-primary)', caretColor: 'var(--accent-primary)' }}
                  disabled={isTyping} autoComplete="off"
                />
                <button
                  type="submit" disabled={isTyping || !input.trim()}
                  aria-label={isEnglish ? 'Send' : 'Enviar'}
                  className="ai-send-btn flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: input.trim() && !isTyping ? 'var(--accent-primary)' : 'var(--border-base)',
                    opacity: input.trim() && !isTyping ? 1 : 0.5,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" style={{ color: '#fff', transform: 'rotate(90deg)' }} aria-hidden="true">
                    <path d="M7 1v12M2 6l5-5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Tour chips row — spotlight on step 2, dimmed on step 1 */}
          <div
            className="mt-2"
            style={{
              display: 'flex', gap: '6px', flexWrap: 'wrap' as const,
              ...((tourStep === 0 || tourStep === 1) ? { opacity: 0.1, pointerEvents: 'none', filter: 'blur(0.5px)', transition: 'opacity 0.25s, filter 0.25s' } : tourStep === 2 ? { transition: 'opacity 0.25s' } : {}),
            }}
          >
            {/* Step 2 callout — above the chips */}
            {tourStep === 2 && (
              <div style={{ width: '100%', marginBottom: '8px' }}>
                <TourCard
                  emoji="🔖"
                  title={isEnglish ? 'Always here when you need them' : 'Siempre disponibles'}
                  body={isEnglish
                    ? 'These two chips are always here. "Tour the portfolio" takes you through the site. "Tour the guide" restarts this walkthrough anytime.'
                    : 'Estos dos chips siempre están acá. "Tour del portfolio" te lleva por el sitio. "Tour del asistente" reinicia esta guía cuando quieras.'}
                  onBack={prevTour}
                  backLabel={isEnglish ? '← Back' : '← Atrás'}
                  onNext={nextTour}
                  nextLabel={isEnglish ? '✓ Got it' : '✓ Entendido'}
                  onClose={skipTour}
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                window.sessionStorage.setItem('home-tour-requested', '1')
                window.dispatchEvent(new CustomEvent('start-home-tour'))
                navigate('/')
                onClose()
              }}
              className="ai-tour text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 transition-all"
              style={{
                color: 'var(--text-muted)',
                borderWidth: '1px', borderStyle: 'solid',
                borderColor: tourStep === 2 ? 'var(--accent-primary)' : 'var(--border-base)',
                backgroundColor: 'transparent',
                ...(tourStep === 2 ? { boxShadow: '0 0 0 3px rgba(74,127,121,0.18)' } : {}),
              }}
            >
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 4v3.5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {isEnglish ? 'Tour the portfolio' : 'Tour del portfolio'}
            </button>
            <button
              type="button"
              onClick={restartTour}
              className="ai-tour text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 transition-all"
              style={{
                color: 'var(--text-muted)',
                borderWidth: '1px', borderStyle: 'solid',
                borderColor: tourStep === 2 ? 'var(--accent-primary)' : 'var(--border-base)',
                backgroundColor: 'transparent',
                ...(tourStep === 2 ? { boxShadow: '0 0 0 3px rgba(74,127,121,0.18)' } : {}),
              }}
            >
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7a5 5 0 1 0 1-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M2 3v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isEnglish ? 'Tour the guide' : 'Tour del asistente'}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
