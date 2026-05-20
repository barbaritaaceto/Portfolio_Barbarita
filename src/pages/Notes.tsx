import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import notesData from '../data/notes'
import NoteCard from '../components/NoteCard'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { useReveal } from '../hooks/useReveal'

export default function Notes(){
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })

  useEffect(() => {
    const syncLanguage = () => {
      if (typeof window === 'undefined') return
      setIsEnglish(window.localStorage.getItem('lang') === 'en')
    }

    window.addEventListener('storage', syncLanguage)
    window.addEventListener('app-language-change', syncLanguage as EventListener)
    return () => {
      window.removeEventListener('storage', syncLanguage)
      window.removeEventListener('app-language-change', syncLanguage as EventListener)
    }
  }, [])

  const [q, setQ] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const uiText = isEnglish
    ? {
        pageTitle: 'Notes',
        searchPlaceholder: 'Search notes…',
        noMatches: 'No notes match your filters.',
        minuteLabel: 'min',
        ariaLanguage: 'Language toggle',
      }
    : {
        pageTitle: 'Notas',
        searchPlaceholder: 'Buscar notas…',
        noMatches: 'No hay notas que coincidan con tus filtros.',
        minuteLabel: 'min',
        ariaLanguage: 'Selector de idioma',
      }

  const esBySlug: Record<string, { title: string; excerpt: string; content: string }> = {
    'product-ops': {
      title: 'Product ops para equipos de IA',
      excerpt: 'Patrones operativos para gestionar productos de IA.',
      content: 'Contenido completo de referencia.',
    },
    'design-systems': {
      title: 'Design systems en 2026',
      excerpt: 'Sistemas de diseño que escalan en múltiples plataformas.',
      content: 'Contenido completo de referencia.',
    },
    'metrics': {
      title: 'Resultados vs actividad',
      excerpt: 'Medir impacto en lugar de actividad.',
      content: 'Contenido completo de referencia.',
    },
    'ai-principles': {
      title: 'Humano + IA: principios',
      excerpt: 'Principios guía para una IA centrada en las personas.',
      content: 'Contenido completo de referencia.',
    },
    'scaling-teams': {
      title: 'Escalar equipos de producto',
      excerpt: 'Patrones organizacionales que funcionan.',
      content: 'Contenido completo de referencia.',
    },
    'research-practices': {
      title: 'Prácticas de research',
      excerpt: 'Cómo convertir research en roadmaps.',
      content: 'Contenido completo de referencia.',
    },
    'roadmaps': {
      title: 'Roadmaps que avanzan',
      excerpt: 'Roadmapping orientado a resultados.',
      content: 'Contenido completo de referencia.',
    },
    'data-strategy': {
      title: 'Fundamentos de estrategia de datos',
      excerpt: 'Construir datos como producto.',
      content: 'Contenido completo de referencia.',
    },
    'humanos-algoritmos': {
      title: 'Entre humanos y algoritmos',
      excerpt: 'Reflexiones sobre inteligencia artificial, equipos y el desafío real de las organizaciones hoy.',
      content: 'Reflexiones sobre inteligencia artificial, equipos y el desafío real de las organizaciones hoy.',
    },
    'claude-code': {
      title: 'Claude Code — usando AI para construir en serio',
      excerpt: 'Explorando cómo Claude Code cambia la forma de construir productos y herramientas digitales.',
      content: 'Explorando cómo Claude Code cambia la forma de construir productos y herramientas digitales.',
    },
    'women-in-tech': {
      title: 'Women in Tech · Product Management · redbee',
      excerpt: 'Sobre liderazgo femenino en tecnología y producto — lo que cambió, lo que sigue pendiente y lo que construimos.',
      content: 'Sobre liderazgo femenino en tecnología y producto — lo que cambió, lo que sigue pendiente y lo que construimos.',
    },
    'reinventandome': {
      title: 'Reinventándome',
      excerpt: 'Un momento de pausa, reflexión y reinvención personal — sobre cambiar el rumbo con intención.',
      content: 'Un momento de pausa, reflexión y reinvención personal — sobre cambiar el rumbo con intención.',
    },
  }

  const enBySlug: Record<string, { title: string; excerpt: string }> = {
    'humanos-algoritmos': {
      title: 'Between humans and algorithms',
      excerpt: 'Reflections on artificial intelligence, teams and the real challenge organizations face today.',
    },
    'claude-code': {
      title: 'My learnings using Claude in the last 72 hours',
      excerpt: 'What I discovered building seriously with AI — and what surprised me.',
    },
    'women-in-tech': {
      title: 'Women in Tech · Product Management · redbee',
      excerpt: 'On female leadership in tech and product — what changed, what remains, and what we build.',
    },
    'reinventandome': {
      title: 'Reinventing myself',
      excerpt: 'A moment of pause, reflection and personal reinvention — on changing direction with intention.',
    },
  }

  const tagLabels: Record<string, string> = isEnglish
    ? {}
    : { 'AI': 'IA', 'Metrics': 'Métricas', 'Ops': 'Ops', 'Design': 'Diseño', 'Ethics': 'Ética', 'People': 'Personas', 'Research': 'Research', 'Strategy': 'Estrategia', 'Data': 'Datos', 'Liderazgo': 'Liderazgo', 'Producto': 'Producto' }

  const localizedNotes = useMemo(
    () => notesData.map((note) => {
      if (isEnglish) return { ...note, ...(enBySlug[note.slug] || {}) }
      return { ...note, ...(esBySlug[note.slug] || {}) }
    }),
    [isEnglish],
  )

  const tags = useMemo(()=> Array.from(new Set(localizedNotes.flatMap(n=>n.tags))), [localizedNotes])

  const filtered = useMemo(()=> localizedNotes.filter(n=>{
    const matchesQ = q ? (n.title + n.excerpt + n.content).toLowerCase().includes(q.toLowerCase()) : true
    const matchesTag = tag ? n.tags.includes(tag) : true
    return matchesQ && matchesTag
  }), [localizedNotes, q, tag])

  return (
    <div>
      <Helmet><title>{uiText.pageTitle} — Barbara Aceto</title></Helmet>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{uiText.pageTitle}</h1>
        <div className="w-1/3"><Input placeholder={uiText.searchPlaceholder} value={q} onChange={e=>setQ(e.target.value)} /></div>
      </div>
      <Card>
        <div className="mb-3 flex gap-2 flex-wrap">
          {tags.map(t=> (
            <button key={t} onClick={()=> setTag(prev=> prev===t? null : t)} className={`px-3 py-1 rounded-full text-sm ${tag===t? 'bg-primary text-white':'bg-gray-100'}`}>{tagLabels[t] ?? t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal-stagger is-revealed">
          {filtered.map(n=> <NoteCard key={n.slug} note={n} minuteLabel={uiText.minuteLabel} locale={isEnglish ? 'en-US' : 'es-AR'} />)}
        </div>

        {filtered.length===0 && <div className="text-sm text-gray-600 mt-4">{uiText.noMatches}</div>}
      </Card>
    </div>
  )
}
