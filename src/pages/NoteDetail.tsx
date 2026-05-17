import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import notes from '../data/notes'
import { Helmet } from 'react-helmet-async'
import Card from '../components/ui/Card'

export default function NoteDetail(){
  const { slug } = useParams()
  const note = notes.find(n=> n.slug === slug)

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

  const esBySlug: Record<string, { title: string; excerpt: string; content: string }> = {
    'product-ops': { title: 'Product ops para equipos de IA', excerpt: 'Patrones operativos para gestionar productos de IA.', content: 'Contenido completo de referencia.' },
    'design-systems': { title: 'Design systems en 2026', excerpt: 'Sistemas de diseño que escalan en múltiples plataformas.', content: 'Contenido completo de referencia.' },
    'metrics': {
      title: 'Medir impacto con NotebookLM',
      excerpt: 'Cómo transformar conocimiento disperso en decisiones accionables.',
      content: 'NotebookLM aporta valor cuando los equipos ya tienen información, pero no una comprensión compartida del contexto.\n\nLa clave no es producir más contenido, sino reducir fricción para encontrar fuentes, comparar señales y llegar más rápido a decisiones.\n\nEn la práctica, el impacto se mide en resultados operativos: mejor alineación, menos retrabajo y mayor calidad de decisión entre producto, estrategia y ejecución.\n\nEn redbee, esta lógica refuerza una idea central: la IA debe ayudar a pensar mejor en conjunto, no solo a generar más artefactos.',
    },
    'ai-principles': { title: 'Humano + IA: principios', excerpt: 'Principios guía para una IA centrada en las personas.', content: 'Contenido completo de referencia.' },
    'scaling-teams': { title: 'Escalar equipos de producto', excerpt: 'Patrones organizacionales que funcionan.', content: 'Contenido completo de referencia.' },
    'research-practices': { title: 'Prácticas de research', excerpt: 'Cómo convertir research en roadmaps.', content: 'Contenido completo de referencia.' },
    'roadmaps': { title: 'Roadmaps que avanzan', excerpt: 'Roadmapping orientado a resultados.', content: 'Contenido completo de referencia.' },
    'data-strategy': { title: 'Fundamentos de estrategia de datos', excerpt: 'Construir datos como producto.', content: 'Contenido completo de referencia.' },
    'humanos-algoritmos': { title: 'Entre humanos y algoritmos', excerpt: 'Reflexiones sobre inteligencia artificial, equipos y el desafío real de las organizaciones hoy.', content: 'Reflexiones sobre inteligencia artificial, equipos y el desafío real de las organizaciones hoy.' },
    'claude-code': { title: 'Claude Code — usando AI para construir en serio', excerpt: 'Explorando cómo Claude Code cambia la forma de construir productos y herramientas digitales.', content: 'Explorando cómo Claude Code cambia la forma de construir productos y herramientas digitales.' },
    'women-in-tech': { title: 'Women in Tech · Product Management · redbee', excerpt: 'Sobre liderazgo femenino en tecnología y producto — lo que cambió, lo que sigue pendiente y lo que construimos.', content: 'Sobre liderazgo femenino en tecnología y producto — lo que cambió, lo que sigue pendiente y lo que construimos.' },
    'reinventandome': { title: 'Reinventándome', excerpt: 'Un momento de pausa, reflexión y reinvención personal — sobre cambiar el rumbo con intención.', content: 'Un momento de pausa, reflexión y reinvención personal — sobre cambiar el rumbo con intención.' },
  }

  const enBySlug: Record<string, { title: string; excerpt: string }> = {
    'humanos-algoritmos': { title: 'Between humans and algorithms', excerpt: 'Reflections on artificial intelligence, teams and the real challenge organizations face today.' },
    'claude-code': { title: 'My learnings using Claude in the last 72 hours', excerpt: 'Exploring how Claude changes the way we build digital products and tools.' },
    'women-in-tech': { title: 'Women in Tech · Product Management · redbee', excerpt: 'On female leadership in tech and product — what changed, what remains, and what we build.' },
    'reinventandome': { title: 'Reinventing myself', excerpt: 'A moment of pause, reflection and personal reinvention — on changing direction with intention.' },
  }

  const localizedNote = useMemo(() => {
    if (!note) return null
    if (isEnglish) return { ...note, ...(enBySlug[note.slug] || {}) }
    return { ...note, ...(esBySlug[note.slug] || {}) }
  }, [isEnglish, note])

  const uiText = isEnglish
    ? { notFound: 'Note not found', pageSuffix: 'Note', minuteLabel: 'min', sourceLabel: 'View source post' }
    : { notFound: 'Nota no encontrada', pageSuffix: 'Nota', minuteLabel: 'min', sourceLabel: 'Ver publicación original' }

  if(!localizedNote) return <div>{uiText.notFound}</div>

  return (
    <div>
      <Helmet><title>{localizedNote.title} — {uiText.pageSuffix}</title></Helmet>
      <Card>
        {localizedNote.image && (
          <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden mb-4 border" style={{ borderColor: 'var(--border-base)', backgroundColor: '#F3F2EF' }}>
            <img src={localizedNote.image} alt={localizedNote.title} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-2xl font-semibold">{localizedNote.title}</h1>
        <div className="text-sm text-gray-500 mt-1">
          {new Date(localizedNote.date).toLocaleDateString(isEnglish ? 'en-US' : 'es-AR', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })} · {localizedNote.readingTime} {uiText.minuteLabel}
        </div>
        <div className="mt-4 text-gray-700 whitespace-pre-line">{localizedNote.content}</div>
        {localizedNote.url && (
          <a
            href={localizedNote.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-4 text-sm font-medium underline"
            style={{ color: 'var(--accent-primary)' }}
          >
            {uiText.sourceLabel}
          </a>
        )}
      </Card>
    </div>
  )
}
