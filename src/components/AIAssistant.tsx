import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  matchIntent,
  fallbackES,
  fallbackEN,
  defaultSuggestionsES,
  defaultSuggestionsEN,
} from '../data/assistant'

interface Message {
  role: 'assistant' | 'user'
  text: string
  navLinks?: { labelES: string; labelEN: string; route: string }[]
}

interface AIAssistantProps {
  isEnglish: boolean
  onClose: () => void
}

function renderText(text: string): React.ReactNode {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- ')) {
      const content = line.slice(2)
      const parts = content.split(/\*\*(.*?)\*\*/g)
      return (
        <div key={i} className="flex gap-2 my-0.5">
          <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>·</span>
          <span>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </span>
        </div>
      )
    }
    const parts = line.split(/\*\*(.*?)\*\*/g)
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    )
    return (
      <React.Fragment key={i}>
        {i > 0 && line === '' ? <div className="h-2" /> : i > 0 ? <br /> : null}
        {rendered}
      </React.Fragment>
    )
  })
}

const placeholdersES = [
  'Preguntá algo...',
  '¿Qué hizo en Santander?',
  '¿Cómo usa AI en producto?',
  '¿Está disponible para proyectos?',
  '¿Cuál es su metodología?',
  '¿Qué la hace diferente?',
]

const placeholdersEN = [
  'Ask something...',
  'What did she do at Santander?',
  'How does she use AI in product?',
  'Is she available for new projects?',
  'What is her methodology?',
  'What makes her different?',
]

export default function AIAssistant({ isEnglish, onClose }: AIAssistantProps) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(
    isEnglish ? defaultSuggestionsEN : defaultSuggestionsES
  )
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastIntentIdRef = useRef<string | undefined>(undefined)
  const placeholders = isEnglish ? placeholdersEN : placeholdersES

  const welcomeES = 'Hola, soy el AI Assistant de Barbara.\nPuedo contarte sobre su experiencia en producto, estrategia, AI o fintech.'
  const welcomeEN = "Hi, I'm Barbara's AI Assistant.\nI can tell you about her experience in product, strategy, AI or fintech."

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (input.length > 0) return
    const timer = setInterval(() => {
      setPlaceholderIdx(i => (i + 1) % placeholders.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [input, placeholders.length])

  const pickResponse = (intent: NonNullable<ReturnType<typeof matchIntent>>): string => {
    const variants = isEnglish ? intent.variantsEN : intent.variantsES
    if (variants && variants.length > 0) {
      return variants[Math.floor(Math.random() * variants.length)]
    }
    return isEnglish ? intent.responseEN : intent.responseES
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setSuggestions([])
    setIsTyping(true)

    setTimeout(() => {
      const intent = matchIntent(text, isEnglish, lastIntentIdRef.current)
      let responseText: string
      let nextSuggestions: string[]
      let navLinks: Message['navLinks']

      if (intent) {
        responseText = pickResponse(intent)
        nextSuggestions = isEnglish ? intent.suggestionsEN : intent.suggestionsES
        navLinks = intent.navLinks
        lastIntentIdRef.current = intent.id
      } else {
        responseText = isEnglish ? fallbackEN : fallbackES
        nextSuggestions = isEnglish ? defaultSuggestionsEN : defaultSuggestionsES
      }

      setMessages(prev => [...prev, { role: 'assistant', text: responseText, navLinks }])
      setIsTyping(false)
      setSuggestions(nextSuggestions)
    }, 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <style>{`
        @keyframes assistant-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .assistant-panel { animation: assistant-in 0.2s ease-out; }
      `}</style>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEnglish ? "Barbara's AI Assistant" : 'AI Assistant de Barbara'}
        className="assistant-panel flex flex-col overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '380px',
          height: 'min(520px, calc(100dvh - 120px))',
          borderRadius: '20px',
          border: '1px solid rgba(30,42,56,0.10)',
          backgroundColor: '#FAFAF8',
          boxShadow: '0 20px 60px rgba(30,42,56,0.18)',
        }}
      >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{ backgroundColor: '#1E2A38', borderRadius: '20px 20px 0 0' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
          >
            <svg width="16" height="16" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="7" r="3" fill="#C8D8C0" />
              <circle cx="6" cy="20" r="2" fill="#C8D8C0" opacity="0.65" />
              <circle cx="20" cy="20" r="2" fill="#C8D8C0" opacity="0.65" />
              <line x1="13" y1="7" x2="6" y2="20" stroke="#C8D8C0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              <line x1="13" y1="7" x2="20" y2="20" stroke="#C8D8C0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              <line x1="6" y1="20" x2="20" y2="20" stroke="#C8D8C0" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: '#F5F2EC' }}>
              {isEnglish ? "Barbara's AI Assistant" : 'AI Assistant de Barbara'}
            </p>
            <p className="text-xs leading-tight" style={{ color: 'rgba(245,242,236,0.55)' }}>
              {isEnglish ? 'Product · Strategy · AI' : 'Producto · Estrategia · AI'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={isEnglish ? 'Close' : 'Cerrar'}
          className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
          style={{ color: 'rgba(245,242,236,0.6)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>

        {/* Welcome message */}
        <div className="flex items-start gap-2">
          <div
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
            style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.85 }}
          >
            <svg width="10" height="10" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="7" r="3" fill="white" />
              <circle cx="6" cy="20" r="2" fill="white" opacity="0.8" />
              <circle cx="20" cy="20" r="2" fill="white" opacity="0.8" />
            </svg>
          </div>
          <div
            className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed max-w-[88%]"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(30,42,56,0.07)', color: '#2D3A3A' }}
          >
            {renderText(isEnglish ? welcomeEN : welcomeES)}
          </div>
        </div>

        {/* Conversation messages */}
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <div
              className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.85 }}
                >
                  <svg width="10" height="10" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                    <circle cx="13" cy="7" r="3" fill="white" />
                    <circle cx="6" cy="20" r="2" fill="white" opacity="0.8" />
                    <circle cx="20" cy="20" r="2" fill="white" opacity="0.8" />
                  </svg>
                </div>
              )}
              <div
                className="rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[88%]"
                style={
                msg.role === 'user'
                  ? {
                      backgroundColor: 'var(--accent-primary)',
                      color: '#FFFFFF',
                      borderRadius: '18px 18px 4px 18px',
                    }
                  : {
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(30,42,56,0.07)',
                      color: '#2D3A3A',
                      borderRadius: '4px 18px 18px 18px',
                    }
              }
            >
                {msg.role === 'assistant' ? renderText(msg.text) : msg.text}
              </div>
            </div>
            {msg.navLinks && msg.navLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1.5 pl-8">
                {msg.navLinks.map((link, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => { navigate(link.route); onClose() }}
                    className="text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: '#FFFFFF',
                      fontWeight: 500,
                    }}
                  >
                    {isEnglish ? link.labelEN : link.labelES}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.85 }}
            >
              <svg width="10" height="10" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <circle cx="13" cy="7" r="3" fill="white" />
              </svg>
            </div>
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(30,42,56,0.07)' }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
              <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && !isTyping && (
        <div className="relative flex-shrink-0">
          <div
            className="px-4 pb-2 flex gap-2 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendMessage(s)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap"
                style={{
                  backgroundColor: 'rgba(58,125,107,0.08)',
                  border: '1px solid rgba(58,125,107,0.25)',
                  color: 'var(--accent-primary)',
                  fontWeight: 500,
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div
            className="absolute right-0 top-0 bottom-2 w-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #FAFAF8, transparent)' }}
          />
        </div>
      )}

      {/* Input */}
      <div
        className="px-4 py-3 flex-shrink-0"
        style={{
          borderTop: '1px solid rgba(30,42,56,0.07)',
          backgroundColor: '#FFFFFF',
          borderRadius: '0 0 20px 20px',
        }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholders[placeholderIdx]}
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: '#2D3A3A' }}
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            aria-label={isEnglish ? 'Send' : 'Enviar'}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150"
            style={{
              backgroundColor: input.trim() && !isTyping ? 'var(--accent-primary)' : 'rgba(30,42,56,0.08)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              style={{
                color: input.trim() && !isTyping ? '#FFFFFF' : 'rgba(30,42,56,0.3)',
                transform: 'rotate(90deg)',
              }}
            >
              <path d="M7 1v12M2 6l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>

      <style>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-primary);
          opacity: 0.5;
          animation: typingPulse 1s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes typingPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      </div>
    </>
  )
}
