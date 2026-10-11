import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  intents,
  matchIntent,
  resolveIntent,
  clarifyES,
  clarifyEN,
  fallbackES,
  fallbackEN,
  defaultNext,
  type AssistantIntent,
} from '../data/assistant'
import { track } from '../lib/analytics'

type MessageRole = 'assistant' | 'user'

interface SuggestedChip {
  label: string
  intentId?: string
  isEnglish: boolean
}

interface Message {
  id: string
  role: MessageRole
  text: string
  navLinks?: { labelES: string; labelEN: string; route: string }[]
  chips?: SuggestedChip[]
  isEnglish?: boolean
  streaming?: boolean
  intentId?: string
  contact?: boolean
}

interface AIAssistantProps {
  isEnglish: boolean
  onClose: () => void
}

const initialChipsES = [
  'Conocer a Barbi',
  '¿Qué es Humanos + IA?',
  '¿Qué plantea Agile después del Agile?',
  '¿Qué dice sobre NotebookLM?',
  '¿Qué piensa sobre liderazgo?',
  'Quiero aplicar IA, ¿por dónde empiezo?',
]
const initialChipsEN = [
  'Get to know Barbi',
  'What is Humans + AI?',
  'What is Agile After Agile about?',
  'What does she say about NotebookLM?',
  'What does she think about leadership?',
  'I want to apply AI, where do I start?',
]

const onboardingES = 'Hola, soy Bocconcino 👋 el guía de este portfolio. Tengo respuestas preparadas sobre Barbi: quién es, su trayectoria, cómo trabaja y qué piensa sobre producto, IA 🤖 y liderazgo ❤️. Elegí un tema o escribime tu pregunta.'
const onboardingEN = "Hi, I'm Bocconcino 👋 the guide to this portfolio. I have prepared answers about Barbi: who she is, her career path, how she works and what she thinks about product, AI 🤖 and leadership ❤️. Pick a topic or type your question."

const placeholdersES = ['Escribí tu pregunta sobre Barbi…']
const placeholdersEN = ['Type your question about Barbi…']

const intentMeta: Record<string, { emoji: string; labelES: string; labelEN: string }> = {
  greeting:       { emoji: '👋', labelES: 'Hola',            labelEN: 'Hello' },
  team_not_delivering: { emoji: '👥', labelES: 'Equipo trabado', labelEN: 'Stuck team' },
  product_idea_validation: { emoji: '🚀', labelES: 'Validar producto', labelEN: 'Product validation' },
  ai_pm_role:     { emoji: '🤖', labelES: 'IA y rol PM',     labelEN: 'AI and PM role' },
  financial_products_learning: { emoji: '🏦', labelES: 'Producto financiero', labelEN: 'Financial product' },
  speed_quality:  { emoji: '⚖️', labelES: 'Velocidad y calidad', labelEN: 'Speed and quality' },
  ambiguity_leadership: { emoji: '🌫️', labelES: 'Ambigüedad', labelEN: 'Ambiguity' },
  misaligned_stakeholders: { emoji: '🧩', labelES: 'Alineación', labelEN: 'Alignment' },
  roadmap_chaos: { emoji: '🗺️', labelES: 'Roadmap', labelEN: 'Roadmap' },
  ai_without_strategy: { emoji: '🤖', labelES: 'IA con criterio', labelEN: 'AI with judgment' },
  what_not_to_do: { emoji: '⛔', labelES: 'Qué evitar',      labelEN: 'What to avoid' },
  metrics_decision: { emoji: '📊', labelES: 'Métricas',      labelEN: 'Metrics' },
  organizational_learning: { emoji: '🔁', labelES: 'Aprendizaje', labelEN: 'Learning' },
  thinking:       { emoji: '🧠', labelES: 'Cómo piensa',     labelEN: 'How she thinks' },
  who_is_barbara: { emoji: '👩‍💼', labelES: 'Sobre Barbi',  labelEN: 'About Barbi' },
  experience:     { emoji: '📋', labelES: 'Trayectoria', labelEN: 'Career path' },
  banking_experience: { emoji: '🏦', labelES: 'Banca digital', labelEN: 'Digital banking' },
  ecommerce_experience: { emoji: '🛍️', labelES: 'E-commerce', labelEN: 'E-commerce' },
  insurtech_growth: { emoji: '📈', labelES: 'Growth', labelEN: 'Growth' },
  early_career: { emoji: '🔎', labelES: 'Inicios', labelEN: 'Early career' },
  current_work: { emoji: '🧭', labelES: 'Trabajo actual', labelEN: 'Current work' },
  ai_product:     { emoji: '🤖', labelES: 'IA y trabajo',    labelEN: 'AI and work' },
  leadership:     { emoji: '❤️', labelES: 'Liderazgo',       labelEN: 'Leadership' },
  methodology:    { emoji: '🎯', labelES: 'Metodología',     labelEN: 'Methodology' },
  fintech:        { emoji: '💳', labelES: 'Fintech',         labelEN: 'Fintech' },
  projects:       { emoji: '🚀', labelES: 'Proyectos',       labelEN: 'Projects' },
  contact_cv:     { emoji: '📩', labelES: 'Contacto',        labelEN: 'Contact' },
  motivation:     { emoji: '✨', labelES: 'Motivación',      labelEN: 'Motivation' },
  ai_opinion:     { emoji: '💡', labelES: 'Visión sobre IA', labelEN: 'View on AI' },
  talks:          { emoji: '🎙️', labelES: 'Charlas',         labelEN: 'Talks' },
  challenge:      { emoji: '⚡', labelES: 'Desafío',         labelEN: 'Challenge' },
  differentiator: { emoji: '⭐', labelES: 'Diferenciador',   labelEN: 'Differentiator' },
  agile_after_agile: { emoji: '🔄', labelES: 'Agile después del Agile', labelEN: 'Agile After Agile' },
  spec_driven_ai: { emoji: '🧾', labelES: 'Specs con IA', labelEN: 'AI specs' },
  ai_agents:      { emoji: '🤖', labelES: 'Agentes de IA', labelEN: 'AI agents' },
  three_amigos:   { emoji: '👥', labelES: 'Three Amigos', labelEN: 'Three Amigos' },
  qa_product:     { emoji: '✅', labelES: 'QA y producto', labelEN: 'QA and product' },
  speaker_story:  { emoji: '🎤', labelES: 'Speaker', labelEN: 'Speaker' },
  notes_press:    { emoji: '📝', labelES: 'Notas & Prensa',  labelEN: 'Notes & Press' },
  short_ack:      { emoji: '✅', labelES: '',                labelEN: '' },
  help_menu:      { emoji: '📋', labelES: 'Menú',           labelEN: 'Menu' },
  education:      { emoji: '🎓', labelES: 'Formación',      labelEN: 'Education' },
  tools_stack:    { emoji: '🛠️', labelES: 'Herramientas',   labelEN: 'Tools' },
  location_remote:{ emoji: '📍', labelES: 'Ubicación',      labelEN: 'Location' },
  availability: { emoji: '🤝', labelES: 'Trabajar juntos', labelEN: 'Work together' },
}

const quickIntentByLabel: Record<string, string> = {
  'conocer a barbi': 'who_is_barbara',
  'conocer a barbara': 'who_is_barbara',
  'get to know barbi': 'who_is_barbara',
  'get to know barbara': 'who_is_barbara',
  'que es humanos ia': 'ai_product',
  'what is humans ai': 'ai_product',
  'que aprendio en agile summit uruguay': 'speaker_story',
  'what did she learn at agile summit uruguay': 'speaker_story',
  'que plantea agile despues del agile': 'agile_after_agile',
  'what is agile after agile about': 'agile_after_agile',
  'que dice sobre notebooklm': 'organizational_learning',
  'what does she say about notebooklm': 'organizational_learning',
  'que piensa sobre liderazgo': 'leadership',
  'what does she think about leadership': 'leadership',
  'quiero aplicar ia por donde empiezo': 'ai_without_strategy',
  'i want to apply ai where do i start': 'ai_without_strategy',
  'tengo muchas ideas como priorizo': 'roadmap_chaos',
  'i have too many ideas how do i prioritize': 'roadmap_chaos',
  'negocio y tecnologia no estan alineados que hago': 'misaligned_stakeholders',
  'business and technology are not aligned what should i do': 'misaligned_stakeholders',
  'como bajo una estrategia a ejecucion': 'methodology',
  'how do i turn strategy into execution': 'methodology',
  'que pregunta deberia hacer antes de construir': 'product_idea_validation',
  'what question should i ask before building': 'product_idea_validation',
  'como piensa': 'thinking',
  'how she thinks': 'thinking',
  'como construye producto': 'methodology',
  'how she builds product': 'methodology',
  'ia y futuro del trabajo': 'ai_product',
  'ai and the future of work': 'ai_product',
  'como lidera equipos': 'leadership',
  'how she leads teams': 'leadership',
  'casos reales y aprendizajes': 'projects',
  'real cases and learnings': 'projects',
  'podemos trabajar juntos': 'availability',
  'can we work together': 'availability',
  'mi equipo no esta entregando por donde empezarias': 'team_not_delivering',
  'my team isn t delivering where would you start': 'team_not_delivering',
  'tengo una idea de producto como validarias si vale la pena construirla': 'product_idea_validation',
  'i have a product idea how would you validate whether it is worth building': 'product_idea_validation',
  'como cambia la ia el rol de product manager': 'ai_pm_role',
  'how does ai change the product manager role': 'ai_pm_role',
  'que aprendiste construyendo productos financieros': 'financial_products_learning',
  'what did you learn building financial products': 'financial_products_learning',
  'como equilibras velocidad y calidad': 'speed_quality',
  'how do you balance speed and quality': 'speed_quality',
  'como lideras en contextos ambiguos': 'ambiguity_leadership',
  'how do you lead in ambiguous contexts': 'ambiguity_leadership',
  'stakeholders desalineados': 'misaligned_stakeholders',
  'misaligned stakeholders': 'misaligned_stakeholders',
  'roadmap caotico': 'roadmap_chaos',
  'chaotic roadmap': 'roadmap_chaos',
  'ia sin estrategia': 'ai_without_strategy',
  'ai without strategy': 'ai_without_strategy',
  'que no haria barbara': 'what_not_to_do',
  'what would barbara not do': 'what_not_to_do',
  'que metricas mirarias': 'metrics_decision',
  'what metrics would you watch': 'metrics_decision',
  'aprendizaje organizacional': 'organizational_learning',
  'organizational learning': 'organizational_learning',
  'specs con ia': 'spec_driven_ai',
  'ai specs': 'spec_driven_ai',
  'agentes de ia': 'ai_agents',
  'ai agents': 'ai_agents',
  'qa desde origen': 'qa_product',
  'quality from the start': 'qa_product',
  'three amigos': 'three_amigos',
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

function detectInputLanguage(text: string): 'en' | 'es' | 'unknown' {
  const lower = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
  const words = lower.split(/\s+/).filter(Boolean)
  const EN_EXCLUSIVE = new Set(['the', 'she', 'her', 'his', 'they', 'you', 'your', 'does', 'has', 'have', 'what', 'how', 'tell', 'about', 'where', 'when', 'did', 'can', 'could', 'would', 'should', 'are', 'were', 'was'])
  const ES_EXCLUSIVE = new Set(['que', 'como', 'esta', 'tiene', 'hace', 'tambien', 'cual', 'trabaja', 'podes', 'queres', 'sabes', 'conoces', 'donde', 'cuando', 'tenes', 'sos', 'lidera', 'liderar', 'liderazgo'])
  const enCount = words.filter(w => EN_EXCLUSIVE.has(w)).length
  const esCount = words.filter(w => ES_EXCLUSIVE.has(w)).length
  if (enCount >= 2 || (enCount === 1 && esCount === 0)) return 'en'
  if (esCount >= 1 && enCount === 0) return 'es'
  return 'unknown'
}

function buildChips(labels: string[], isEnglish: boolean): SuggestedChip[] {
  return labels
    .filter(Boolean)
    .map(label => {
      const normalized = label
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      return {
        label,
        isEnglish,
        intentId: quickIntentByLabel[normalized] ?? matchIntent(label, isEnglish, undefined)?.id,
      }
    })
}

function chipsFromIds(ids: string[], isEnglish: boolean): SuggestedChip[] {
  return ids
    .filter(id => intentMeta[id]?.labelES)
    .map(id => {
      const meta = intentMeta[id]
      return { label: `${meta.emoji} ${isEnglish ? meta.labelEN : meta.labelES}`, isEnglish, intentId: id }
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

export default function AIAssistant({ isEnglish, onClose }: AIAssistantProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // Los links pueden ser una página ("/one-sheet") o una sección del Home ("/#trayectoria").
  const goTo = (route: string) => {
    const [path, hash] = route.split('#')
    onClose()
    if (!hash) { navigate(path); return }
    const scroll = () => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (location.pathname === '/') { setTimeout(scroll, 150); return }
    navigate('/')
    setTimeout(scroll, 600)
  }

  const openContact = () => {
    track.openContactModal('ai_assistant')
    onClose()
    if (location.pathname !== '/') navigate('/')
    setTimeout(() => window.dispatchEvent(new CustomEvent('open-contact-modal')), location.pathname === '/' ? 150 : 600)
  }
  const [messages, setMessages] = useState<Message[]>([{
    id: 'onboarding', role: 'assistant',
    text: isEnglish ? onboardingEN : onboardingES,
    chips: buildChips(isEnglish ? initialChipsEN : initialChipsES, isEnglish),
  }])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastIntentIdRef = useRef<string | undefined>(undefined)
  const seenIntentsRef = useRef<Set<string>>(new Set())
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const placeholders = isEnglish ? placeholdersEN : placeholdersES

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

  const pickResponse = (intent: AssistantIntent, lang: boolean): string => {
    const variants = lang ? intent.variantsEN : intent.variantsES
    if (variants?.length) return variants[Math.floor(Math.random() * variants.length)]
    return lang ? intent.responseEN : intent.responseES
  }

  const sendMessage = useCallback((text: string, forcedIntentId?: string, forcedEnglish?: boolean) => {
    // Mientras una respuesta se está escribiendo no se acepta otra pregunta, para no cortarla a la mitad
    if (!text.trim() || isTyping || streamIntervalRef.current) return
    const query = text.trim()
    track.aiQuestionSent(query.length, (forcedEnglish ?? isEnglish) ? 'en' : 'es')
    setInput('')
    if (inputRef.current) { inputRef.current.style.height = 'auto' }
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text: query }])
    setIsTyping(true)
    setTimeout(() => {
      // Auto-detect language: if user types in the other language, respond accordingly
      const detectedLang = detectInputLanguage(query)
      const effectiveEnglish = detectedLang !== 'unknown' ? detectedLang === 'en' : isEnglish
      let responseEnglish = forcedEnglish ?? effectiveEnglish
      let intent: AssistantIntent | null = null
      let candidates: AssistantIntent[] = []
      if (forcedIntentId) {
        intent = intents.find(item => item.id === forcedIntentId) ?? null
      } else {
        let resolution = resolveIntent(query, responseEnglish, lastIntentIdRef.current)
        if (!resolution.intent && !resolution.candidates.length) {
          const alternate = resolveIntent(query, !responseEnglish, lastIntentIdRef.current)
          if (alternate.intent || alternate.candidates.length) {
            resolution = alternate
            responseEnglish = !responseEnglish
          }
        }
        intent = resolution.intent
        candidates = resolution.candidates
      }
      let responseText: string, chips: SuggestedChip[], navLinks: Message['navLinks']
      let contact = false
      if (intent) {
        const matched = intent
        responseText = pickResponse(matched, responseEnglish)
        // No repetir temas que la persona ya vio
        const unseen = matched.next.filter(id => id !== matched.id && !seenIntentsRef.current.has(id))
        chips = chipsFromIds(unseen.length >= 2 ? unseen : matched.next, responseEnglish)
        navLinks = matched.navLinks
        contact = !!matched.contact
        lastIntentIdRef.current = matched.id
        seenIntentsRef.current.add(matched.id)
      } else if (candidates.length) {
        // Coincidencia débil: en vez de arriesgar una respuesta, preguntamos por el tema
        responseText = responseEnglish ? clarifyEN : clarifyES
        chips = chipsFromIds(candidates.map(c => c.id), responseEnglish)
        track.aiFallback(query, responseEnglish ? 'en' : 'es', 'clarify')
      } else {
        // Sin respuesta: queda registrado para poder sumar el tema más adelante
        try {
          const key = 'ai-fallback-log'
          const existing: { q: string; t: number }[] = JSON.parse(localStorage.getItem(key) || '[]')
          localStorage.setItem(key, JSON.stringify([...existing, { q: query, t: Date.now() }].slice(-50)))
        } catch {}
        track.aiFallback(query, responseEnglish ? 'en' : 'es', 'no_match')
        responseText = responseEnglish ? fallbackEN : fallbackES
        chips = chipsFromIds(defaultNext, responseEnglish)
        contact = true
      }
      const msgId = `a-${Date.now()}`
      setIsTyping(false)
      setMessages(prev => [...prev, { id: msgId, role: 'assistant', text: '', isEnglish: responseEnglish, streaming: true, intentId: intent?.id }])
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
      const words = responseText.split(' ')
      let wordIdx = 0
      streamIntervalRef.current = setInterval(() => {
        wordIdx++
        if (wordIdx >= words.length) {
          clearInterval(streamIntervalRef.current!)
          streamIntervalRef.current = null
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: words.join(' '), streaming: false, navLinks, chips, contact } : m))
          track.aiResponseReceived(intent?.id, responseEnglish ? 'en' : 'es')
        } else {
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: words.slice(0, wordIdx).join(' ') } : m))
        }
      }, 32)
    }, 650)
  }, [isEnglish, isTyping])

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
        aria-label={isEnglish ? 'Bocconcino, the portfolio guide' : 'Bocconcino, el guía del portfolio'}
        className="ai-panel fixed z-[61] flex flex-col inset-x-0 bottom-0 rounded-t-[28px] md:inset-auto md:bottom-auto md:top-[5vh] md:left-1/2 md:-translate-x-1/2 md:w-[580px] md:rounded-[24px]"
        style={{
          backgroundColor: '#FFFFFF',
          maxHeight: 'min(90dvh, 720px)',
          boxShadow: '0 -2px 24px rgba(31,46,42,0.08), 0 32px 80px rgba(31,46,42,0.2)',
          border: '1px solid var(--border-base)',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border-base)' }}
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {isEnglish ? 'Bocconcino · Portfolio guide' : 'Bocconcino · Guía del portfolio'}
              </span>
            </div>
            <p className="ml-4 mt-0.5" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {isEnglish ? 'Answers about Barbi, her career path and her ideas' : 'Respuestas sobre Barbi, su trayectoria y sus ideas'}
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

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--border-base) transparent' }}
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
                    <span style={{ fontSize: '11px', lineHeight: 1 }}>{intentMeta[msg.intentId]?.emoji ?? ''}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
                      {(msg.isEnglish ?? isEnglish) ? intentMeta[msg.intentId]?.labelEN ?? '' : intentMeta[msg.intentId]?.labelES ?? ''}
                    </span>
                  </div>
                )}
                <div className="self-start max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed"
                  style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-base)' }}>
                  {renderText(msg.text)}{msg.streaming && <span className="ai-cursor" aria-hidden="true" />}
                </div>
                {Array.isArray(msg.navLinks) && msg.navLinks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.navLinks.filter(link => link && link.labelEN && link.labelES && link.route).map((link, j) => (
                      <button key={j} type="button" onClick={() => goTo(link.route)}
                        className="text-xs px-3 py-1.5 rounded-full transition-colors"
                        style={{ color: 'var(--accent-primary)', border: '1px solid rgba(74,127,121,0.28)', backgroundColor: 'rgba(74,127,121,0.06)' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.12)' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.06)' }}>
                        {(msg.isEnglish ?? isEnglish) ? link.labelEN : link.labelES}
                      </button>
                    ))}
                  </div>
                )}
                {msg.contact && (
                  <div>
                    <button type="button" onClick={openContact}
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-full"
                      style={{ color: '#FFFFFF', backgroundColor: 'var(--accent-primary)' }}>
                      ✉️ {(msg.isEnglish ?? isEnglish) ? 'Write to Barbi' : 'Escribile a Barbi'}
                    </button>
                  </div>
                )}
                {Array.isArray(msg.chips) && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.chips.filter(chip => chip?.label).map((chip, ci) => (
                      <button key={ci} type="button" onClick={() => { track.aiSuggestedQuestionClick(chip.label.length, chip.isEnglish ? 'en' : 'es'); sendMessage(chip.label, chip.intentId, chip.isEnglish) }}
                        className="ai-chip text-xs px-3 py-1.5 rounded-full"
                        style={{ color: 'var(--text-secondary)', backgroundColor: '#FFFFFF', border: '1px solid var(--border-base)' }}>
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          {isTyping && <TypingDots />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          className="flex-shrink-0 px-4 pt-3"
          style={{
            borderTop: '1px solid var(--border-base)',
            paddingBottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))',
          }}
        >
          <div className="mb-2.5">
            <form onSubmit={handleSubmit}>
              <div className="ai-inp-wrap flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ border: '1.5px solid var(--border-base)', backgroundColor: 'var(--bg)' }}>
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
                  }}
                  placeholder={placeholders[placeholderIdx]}
                  className="ai-inp flex-1 bg-transparent text-sm resize-none"
                  style={{ color: 'var(--text-primary)', caretColor: 'var(--accent-primary)', lineHeight: '1.4', overflow: 'hidden', minHeight: '20px' }}
                  disabled={isTyping}
                  autoComplete="off"
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

          <div
            className="mt-2"
            style={{
              display: 'flex', gap: '6px', flexWrap: 'wrap' as const,
            }}
          >
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
                borderColor: 'var(--border-base)',
                backgroundColor: 'transparent',
              }}
            >
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 4v3.5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {isEnglish ? 'Tour the portfolio' : 'Tour del portfolio'}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
