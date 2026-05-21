import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import pressData from '../data/press'
import PressCard from '../components/PressCard'
import Card from '../components/ui/Card'
import { useReveal } from '../hooks/useReveal'
import { track } from '../lib/analytics'
import { useScrollDepth } from '../hooks/useAnalytics'

export default function Press(){
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })

  useScrollDepth()

  useEffect(() => {
    track.sectionView('prensa')
  }, [])

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

  const years = useMemo(()=> Array.from(new Set(pressData.map(p=>p.year))).sort((a,b)=>b-a), [])
  const [year, setYear] = useState<number | null>(years[0] || null)

  const uiText = isEnglish
    ? {
        pageTitle: 'Press',
        ariaLanguage: 'Language toggle',
      }
    : {
        pageTitle: 'Prensa',
        ariaLanguage: 'Selector de idioma',
      }

  const esBySlug: Record<string, { outlet: string; title: string; excerpt: string }> = {
    'press-1': { outlet: 'Tech Daily', title: 'Liderazgo en Producto de IA', excerpt: 'Perfil sobre Bárbara' },
    'press-4': { outlet: 'Analytics Today', title: 'Midiendo impacto', excerpt: 'Decisiones de producto guiadas por datos' },
    'press-5': { outlet: 'Startup Magazine', title: 'Escalando equipos', excerpt: 'Crecimiento y estructura' },
    'press-6': { outlet: 'News Byte', title: 'Cobertura de lanzamiento', excerpt: 'Resumen del lanzamiento de producto' },
    'press-7': { outlet: 'Industry', title: 'Liderazgo de pensamiento', excerpt: 'Columna sobre adopción de IA' },
    'press-8': { outlet: 'Local Tech', title: 'Primeros años de carrera', excerpt: 'Artículo de perfil' },
  }

  const filtered = useMemo(()=> pressData.filter(p=> year ? p.year === year : true), [year])

  const localizedFiltered = useMemo(
    () => filtered.map((item) => (isEnglish ? item : { ...item, ...(esBySlug[item.slug] || {}) })),
    [filtered, isEnglish],
  )

  return (
    <div>
      <Helmet><title>{uiText.pageTitle} — Barbara Aceto</title></Helmet>
      <h1 className="text-2xl font-semibold mb-4">{uiText.pageTitle}</h1>
      <Card>
        <div className="mb-4 flex gap-2">
          {years.map(y=> <button key={y} onClick={()=> setYear(prev=> prev===y? null : y)} className={`px-3 py-1 rounded ${year===y? 'bg-primary text-white':'bg-gray-100'}`}>{y}</button>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal-stagger is-revealed">
          {localizedFiltered.map(p=> <PressCard key={p.slug} item={p} locale={isEnglish ? 'en-US' : 'es-AR'} onClick={() => track.clickContentCard(p.title, 'press', p.url || '', 'prensa')} />)}
        </div>
      </Card>
    </div>
  )
}
