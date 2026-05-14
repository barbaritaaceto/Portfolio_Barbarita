import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  matchIntent,
  fallbackES,
  fallbackEN,
  defaultSuggestionsES,
  defaultSuggestionsEN,
} from '../data/assistant'

interface ActiveResponse {
  text: string
  query: string
  navLinks?: { labelES: string; labelEN: string; route: string }[]
  suggestions: string[]
}

interface AIAssistantProps {
  isEnglish: boolean
  onClose: () => void
}

const topicsES = ['¿Quién es Barbara?', '¿Cómo aplica AI?', '¿Está disponible?', '¿Qué la diferencia?', '¿Cómo trabaja?', '¿Cómo lidera?']
const topicsEN = ['Who is Barbara?', 'How does she use AI?', 'Is she available?', 'What sets her apart?', 'How does she work?', 'How does she lead?']

const placeholdersES = ['escribe tu pregunta...', 'qué hizo en Santander?', 'cómo usa AI en producto?', 'está disponible?', 'cuál es su metodología?']
const placeholdersEN = ['type your question...', 'what did she do at Santander?', 'how does she use AI in product?', 'is she available?', 'what is her methodology?']

function useTypewriter(text: string, speed = 14) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    if (!text) return
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return { displayed, done }
}

function ResponseText({ text }: { text: string }) {
  const { displayed, done } = useTypewriter(text, 14)
  return (
    <span>
      {displayed.split('\n').map((line, i) => {
        if (line.startsWith('- ')) {
          const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')
          return (
            <span key={i} style={{ display: 'block' }}>
              <span style={{ color: 'var(--accent-primary)', opacity: 0.7 }}>·</span> {content}
            </span>
          )
        }
        const parts = line.split(/\*\*(.*?)\*\*/g)
        return (
          <span key={i} style={{ display: 'block', minHeight: line === '' ? '0.5em' : undefined }}>
            {parts.map((p, j) =>
              j % 2 === 1
                ? <span key={j} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p}</span>
                : p
            )}
          </span>
        )
      })}
      {!done && <span className="ai-tw-cursor" aria-hidden="true">▌</span>}
    </span>
  )
}

export default function AIAssistant({ isEnglish, onClose }: AIAssistantProps) {
  const navigate = useNavigate()
  const [response, setResponse] = useState<ActiveResponse | null>(null)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [tourStep, setTourStep] = useState<0 | 1 | 2>(0)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastIntentIdRef = useRef<string | undefined>(undefined)
  const isActive = response !== null || isTyping
  const topics = isEnglish ? topicsEN : topicsES
  const placeholders = isEnglish ? placeholdersEN : placeholdersES

  useEffect(() => {
    if (tourStep === 2) setTimeout(() => inputRef.current?.focus(), 80)
  }, [tourStep])

  useEffect(() => {
    if (input.length > 0 || isActive) return
    const t = setInterval(() => setPlaceholderIdx(i => (i + 1) % placeholders.length), 3400)
    return () => clearInterval(t)
  }, [input, isActive, placeholders.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const pickResponse = (intent: NonNullable<ReturnType<typeof matchIntent>>): string => {
    const variants = isEnglish ? intent.variantsEN : intent.variantsES
    if (variants && variants.length > 0) return variants[Math.floor(Math.random() * variants.length)]
    return isEnglish ? intent.responseEN : intent.responseES
  }

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return
    const query = text.trim()
    setInput('')
    setIsTyping(true)
    setResponse(null)
    setTimeout(() => {
      const intent = matchIntent(query, isEnglish, lastIntentIdRef.current)
      let responseText: string
      let suggestions: string[]
      let navLinks: ActiveResponse['navLinks']
      if (intent) {
        responseText = pickResponse(intent)
        suggestions = isEnglish ? intent.suggestionsEN : intent.suggestionsES
        navLinks = intent.navLinks
        lastIntentIdRef.current = intent.id
      } else {
        responseText = isEnglish ? fallbackEN : fallbackES
        suggestions = isEnglish ? defaultSuggestionsEN : defaultSuggestionsES
      }
      setResponse({ text: responseText, query, navLinks, suggestions })
      setIsTyping(false)
    }, 500)
  }, [isEnglish, isTyping])

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input) }

  const handleReset = () => {
    setResponse(null)
    setInput('')
    lastIntentIdRef.current = undefined
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <>
      <style>{`
        @keyframes ai-fade   { from{opacity:0} to{opacity:1} }
        @keyframes ai-rise   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tour-rise { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes tour-fall { from{opacity:0;transform:translateX(-50%) translateY(-12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes ai-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        .ai-bd   { animation: ai-fade 0.18s ease }
        .ai-ct   { animation: ai-rise 0.22s ease }
        .tc-0    { animation: tour-rise 0.2s cubic-bezier(0.16,1,0.3,1) }
        .tc-1    { animation: tour-fall 0.2s cubic-bezier(0.16,1,0.3,1) }
        .ai-tw-cursor { animation: ai-blink 1s step-end infinite; color: var(--accent-primary) }
        .ai-inp::placeholder { color: var(--text-muted); opacity:0.45; font-family: 'SF Mono','Fira Mono','Cascadia Code','Consolas',monospace; font-size:13px }
        .ai-inp:focus { outline:none }
        .ai-topic:hover .ai-topic-lbl { color: var(--accent-primary) !important }
        .ai-sugg:hover  .ai-sugg-lbl  { color: var(--accent-primary) !important }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="ai-bd fixed inset-0 z-[60]"
        style={{ backgroundColor: 'rgba(31,46,42,0.88)', backdropFilter: 'blur(8px)' }}
        onClick={tourStep >= 2 ? onClose : undefined}
      />

      {/* ── Main content ── */}
      <div
        className="ai-ct fixed inset-0 z-[61] flex flex-col items-center px-5 overflow-y-auto"
        style={{
          paddingBottom: '56px',
          justifyContent: isActive ? 'flex-start' : 'center',
          paddingTop: isActive ? '72px' : '0',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={isEnglish ? 'Close' : 'Cerrar'}
          className="fixed top-5 right-6 text-[11px] px-3 py-1.5 rounded-full transition-all"
          style={{
            color: 'rgba(250,248,245,0.45)',
            border: '1px solid rgba(250,248,245,0.15)',
            zIndex: 66,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(250,248,245,0.9)'; e.currentTarget.style.borderColor = 'rgba(250,248,245,0.35)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(250,248,245,0.45)'; e.currentTarget.style.borderColor = 'rgba(250,248,245,0.15)' }}
        >
          ESC
        </button>

        {/* ── Idle header ── */}
        {!isActive && (
          <div
            className="text-center mb-10"
            style={{
              opacity: tourStep === 1 ? 0.1 : 1,
              transition: 'opacity 0.3s ease',
              pointerEvents: tourStep === 1 ? 'none' : 'auto',
            }}
          >
            <h2
              className="mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: '22px',
                color: '#FAF8F5',
                letterSpacing: '-0.01em',
              }}
            >
              barbara.ai
            </h2>
            <p style={{ color: 'rgba(250,248,245,0.38)', fontSize: '11px', letterSpacing: '0.06em' }}>
              {isEnglish ? 'product · strategy · AI' : 'producto · estrategia · AI'}
            </p>
          </div>
        )}

        {/* ── Active header ── */}
        {isActive && (
          <div className="w-full max-w-xl mb-4">
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: '14px',
                color: 'rgba(250,248,245,0.55)',
                letterSpacing: '-0.01em',
              }}
            >
              barbara.ai
            </span>
          </div>
        )}

        {/* ── Search box ── */}
        <div
          className="w-full max-w-xl mb-5"
          style={{
            opacity: tourStep === 1 ? 0.1 : 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: tourStep === 1 ? 'none' : 'auto',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid var(--border-base)',
                boxShadow: tourStep === 0
                  ? '0 0 0 3px rgba(74,127,121,0.2), 0 12px 40px rgba(31,46,42,0.22)'
                  : '0 8px 32px rgba(31,46,42,0.18)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Monospace prompt char — only terminal-flavour element */}
              <span
                style={{
                  color: 'var(--accent-primary)',
                  fontSize: '14px',
                  flexShrink: 0,
                  fontFamily: "'SF Mono','Fira Mono','Consolas',monospace",
                  opacity: 0.7,
                }}
              >
                ❯
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  tourStep < 2
                    ? (isEnglish ? 'type your question...' : 'escribe tu pregunta...')
                    : placeholders[placeholderIdx]
                }
                className="ai-inp flex-1 bg-transparent text-sm"
                style={{ color: 'var(--text-primary)', caretColor: 'var(--accent-primary)' }}
                disabled={isTyping || tourStep < 2}
              />
              {/* Action row inside search bar */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {isActive && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[10px] px-2.5 py-1 rounded-full transition-colors"
                    style={{ color: 'var(--text-muted)', border: '1px solid var(--border-base)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                  >
                    {isEnglish ? 'clear' : 'limpiar'}
                  </button>
                )}
                {/* Site tour CTA */}
                <button
                  type="button"
                  onClick={() => { navigate('/'); onClose() }}
                  className="btn-primary text-[10px] px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ fontSize: '10px', padding: '5px 12px', lineHeight: 1.4, whiteSpace: 'nowrap' }}
                >
                  {isEnglish ? 'Site tour' : 'Tour por el site'}
                </button>
                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={isEnglish ? 'Close' : 'Cerrar'}
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#E5534B', opacity: 0.88 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                >
                  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <line x1="2" y1="2" x2="8" y2="8" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="8" y1="2" x2="2" y2="8" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {input.trim() && tourStep >= 2 && (
                <button
                  type="submit"
                  disabled={isTyping}
                  aria-label={isEnglish ? 'Send' : 'Enviar'}
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-opacity"
                  style={{ backgroundColor: 'var(--accent-primary)', opacity: isTyping ? 0.45 : 1 }}
                >
                  <svg width="9" height="9" viewBox="0 0 14 14" fill="none" style={{ color: '#fff', transform: 'rotate(90deg)' }}>
                    <path d="M7 1v12M2 6l5-5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Active: query echo ── */}
        {isActive && (
          <div className="w-full max-w-xl mb-2">
            <span
              style={{
                color: 'rgba(250,248,245,0.35)',
                fontSize: '11px',
                fontFamily: "'SF Mono','Fira Mono','Consolas',monospace",
              }}
            >
              <span style={{ color: 'var(--accent-primary)', opacity: 0.7, marginRight: '4px' }}>❯</span>
              ask(<span style={{ color: 'rgba(250,248,245,0.55)' }}>"{response?.query ?? ''}"</span>)
            </span>
          </div>
        )}

        {/* ── Processing ── */}
        {isTyping && (
          <div className="w-full max-w-xl flex items-center gap-2 mb-4">
            <span style={{ color: 'rgba(250,248,245,0.25)', fontSize: '11px', fontFamily: "'SF Mono','Fira Mono','Consolas',monospace" }}>
              ← {isEnglish ? 'processing...' : 'procesando...'}
              <span className="ai-tw-cursor">▌</span>
            </span>
          </div>
        )}

        {/* ── Response ── */}
        {response && !isTyping && (
          <div className="w-full max-w-xl mb-6">
            <div className="flex items-center gap-1.5 mb-2.5">
              <span style={{ color: 'rgba(250,248,245,0.28)', fontSize: '10px', fontFamily: "'SF Mono','Fira Mono','Consolas',monospace" }}>←</span>
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: '12px',
                  color: 'rgba(250,248,245,0.5)',
                  letterSpacing: '0.01em',
                }}
              >
                barbara.ai
              </span>
            </div>
            <div
              className="text-sm leading-7 pl-4"
              style={{
                color: 'rgba(250,248,245,0.82)',
                borderLeft: '2px solid rgba(74,127,121,0.35)',
                fontFamily: "'SF Mono','Fira Mono','Consolas',monospace",
                fontSize: '12px',
              }}
            >
              <ResponseText text={response.text} />
            </div>

            {response.navLinks && response.navLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pl-4">
                {response.navLinks.map((link, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => { navigate(link.route); onClose() }}
                    className="btn-ghost text-xs"
                    style={{
                      fontSize: '11px',
                      padding: '5px 14px',
                      borderColor: 'rgba(74,127,121,0.45)',
                      color: 'rgba(250,248,245,0.75)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#FAF8F5'; e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(250,248,245,0.75)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    {isEnglish ? link.labelEN : link.labelES} →
                  </button>
                ))}
              </div>
            )}

            {response.suggestions.length > 0 && (
              <div className="mt-4">
                <p
                  className="text-[9px] mb-2 uppercase tracking-widest"
                  style={{ color: 'rgba(250,248,245,0.25)' }}
                >
                  {isEnglish ? 'continue' : 'continuar'}
                </p>
                {response.suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="ai-sugg flex items-center gap-2 w-full text-left py-1.5"
                  >
                    <span style={{ color: 'rgba(74,127,121,0.5)', fontSize: '11px' }}>›</span>
                    <span
                      className="ai-sugg-lbl text-xs transition-colors"
                      style={{ color: 'rgba(250,248,245,0.5)', fontFamily: "'SF Mono','Fira Mono','Consolas',monospace" }}
                    >
                      {s}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Idle topics ── */}
        {!isActive && (
          <div
            className="w-full max-w-xl rounded-2xl"
            style={{
              opacity: tourStep === 0 ? 0.12 : 1,
              transition: 'opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              pointerEvents: tourStep === 0 ? 'none' : 'auto',
              padding: '18px 20px',
              backgroundColor: tourStep === 1 ? 'rgba(250,248,245,0.06)' : 'rgba(250,248,245,0.03)',
              border: tourStep === 1
                ? '1px solid rgba(74,127,121,0.35)'
                : '1px solid rgba(250,248,245,0.07)',
              boxShadow: tourStep === 1
                ? '0 0 0 4px rgba(74,127,121,0.1)'
                : 'none',
            }}
          >
            <p
              className="text-[9px] mb-3 uppercase tracking-widest"
              style={{ color: tourStep === 1 ? 'rgba(74,127,121,0.7)' : 'rgba(250,248,245,0.3)' }}
            >
              {isEnglish ? 'Suggested' : 'Sugeridos'}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-0.5">
              {topics.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { if (tourStep >= 2) sendMessage(t) }}
                  className="ai-topic flex items-center gap-2 text-left py-1.5"
                  disabled={tourStep < 2}
                >
                  <span style={{ color: 'rgba(74,127,121,0.55)', fontSize: '11px' }}>›</span>
                  <span
                    className="ai-topic-lbl text-[12px] transition-colors"
                    style={{ color: 'rgba(250,248,245,0.75)', fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {t}
                  </span>
                </button>
              ))}
            </div>

            {tourStep === 2 && (
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(250,248,245,0.07)' }}>
                <button
                  type="button"
                  onClick={() => { navigate('/'); onClose() }}
                  className="w-full text-left text-xs py-2 px-3 rounded-xl flex items-center justify-between transition-colors"
                  style={{
                    color: 'rgba(74,127,121,0.75)',
                    border: '1px solid rgba(74,127,121,0.2)',
                    backgroundColor: 'rgba(74,127,121,0.06)',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.12)'; e.currentTarget.style.color = 'rgba(74,127,121,1)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.06)'; e.currentTarget.style.color = 'rgba(74,127,121,0.75)' }}
                >
                  <span>{isEnglish ? '¿Should I take you on a site tour?' : '¿Te llevo a recorrer el site?'}</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Tour cards ── */}
      {tourStep < 2 && (
        <div
          key={tourStep}
          className={tourStep === 0 ? 'tc-0' : 'tc-1'}
          style={{
            position: 'fixed',
            zIndex: 67,
            /* step 0: right below the search bar, step 1: above topics / covering search zone */
            top: tourStep === 0 ? 'calc(50% + 72px)' : 'calc(50% - 220px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(400px, calc(100vw - 40px))',
            backgroundColor: 'var(--bg)',
            borderRadius: '20px',
            padding: '22px 24px 20px',
            boxShadow: '0 24px 64px rgba(10,20,16,0.55)',
            border: '1px solid var(--border-base)',
          }}
        >
          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mb-3">
            {[0, 1].map(n => (
              <div
                key={n}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: tourStep === n ? '20px' : '6px',
                  backgroundColor: tourStep === n ? 'var(--accent-primary)' : 'var(--border-base)',
                }}
              />
            ))}
          </div>

          <h3
            className="mb-1.5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: '16px',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {tourStep === 0
              ? (isEnglish ? 'Ask anything' : 'Escribí tu pregunta')
              : (isEnglish ? 'Or explore topics' : 'O explorá los temas')}
          </h3>

          <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            {tourStep === 0
              ? (isEnglish
                  ? "Ask about Barbara's experience, methodology, availability or how she applies AI to product."
                  : 'Preguntame sobre la experiencia de Barbara, su metodología, disponibilidad o cómo aplica AI en producto.')
              : (isEnglish
                  ? 'Select a topic to get started — each one takes you through a different angle of her work.'
                  : 'Tocá un tema sugerido para empezar. Cada uno te lleva por un aspecto diferente de su trabajo.')}
          </p>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setTourStep(2)}
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {isEnglish ? 'Exit tour' : 'Salir'}
            </button>
            <button
              type="button"
              onClick={() => setTourStep(tourStep === 0 ? 1 : 2)}
              className="btn-primary text-xs"
              style={{ fontSize: '12px', padding: '7px 20px' }}
            >
              {tourStep === 0
                ? (isEnglish ? 'Next →' : 'Siguiente →')
                : (isEnglish ? 'Got it →' : 'Entendido →')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
