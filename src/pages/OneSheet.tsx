import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import projectsData from '../data/projects'

export default function OneSheet(){
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

  const uiText = isEnglish
    ? {
        pageTitle: 'One Sheet',
        backHome: 'Back to home',
        role: 'Product Leader · AI & Digital Strategy',
        location: 'Buenos Aires, Argentina',
        summaryTitle: 'Executive Summary',
        summaryBody: 'Product leader with 10+ years of cross-functional experience in fintech, growth, digital transformation and AI-enabled products. Strong focus on measurable outcomes, team alignment and human-centered execution.',
        experienceTitle: 'Experience Highlights',
        capabilitiesTitle: 'Core Capabilities',
        contactTitle: 'Contact',
      }
    : {
        pageTitle: 'One Sheet',
        backHome: 'Volver al inicio',
        role: 'Líder de Producto · IA y Estrategia Digital',
        location: 'Buenos Aires, Argentina',
        summaryTitle: 'Resumen Ejecutivo',
        summaryBody: 'Líder de producto con más de 10 años de experiencia cross-funcional en fintech, growth, transformación digital y productos potenciados por IA. Foco en resultados medibles, alineación de equipos y ejecución centrada en las personas.',
        experienceTitle: 'Resumen de Experiencia',
        capabilitiesTitle: 'Capacidades Clave',
        contactTitle: 'Contacto',
      }

  const experienceItems = useMemo(
    () => projectsData
      .filter((project) => project.duration || project.summary)
      .slice(0, 6),
    [],
  )

  const capabilities = useMemo(() => {
    return Array.from(new Set(projectsData.flatMap((project) => project.tech || []))).slice(0, 12)
  }, [])

  const isPdfMode = useMemo(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    return params.get('pdf') === '1'
  }, [])

  useEffect(() => {
    if (!isPdfMode) return
    const timer = window.setTimeout(() => {
      window.print()
    }, 250)

    return () => window.clearTimeout(timer)
  }, [isPdfMode])

  return (
    <>
      <Helmet><title>{uiText.pageTitle} — Barbara Aceto</title></Helmet>

      <section className="w-full min-h-screen px-4 py-10" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          {!isPdfMode && (
            <Link
              to="/"
              className="inline-flex items-center text-sm mb-5"
              style={{ color: 'var(--accent-primary)' }}
            >
              ← {uiText.backHome}
            </Link>
          )}

          <article className="rounded-3xl border p-6 md:p-8" style={{ borderColor: 'var(--border-base)', backgroundColor: '#FFFFFF' }}>
            <div className="flex flex-col md:flex-row md:items-center gap-5 pb-6" style={{ borderBottom: '1px solid var(--border-base)' }}>
              <div className="w-24 h-24 rounded-full overflow-hidden border" style={{ borderColor: 'var(--border-base)' }}>
                <img src="/barbi.png" alt="Barbara Aceto" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                  Barbara Tamara Aceto
                </h1>
                <p className="text-sm md:text-base mt-1" style={{ color: 'var(--text-secondary)' }}>{uiText.role}</p>
                <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{uiText.location}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{uiText.summaryTitle}</h2>
              <p className="text-sm md:text-base leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                {uiText.summaryBody}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{uiText.experienceTitle}</h2>
              <div className="space-y-4">
                {experienceItems.map((item) => (
                  <div key={item.slug} className="rounded-xl border p-4" style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--bg)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                      {item.duration && (
                        <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{item.duration}</span>
                      )}
                    </div>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{uiText.capabilitiesTitle}</h2>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="px-3 py-1.5 rounded-full text-xs md:text-sm"
                    style={{ backgroundColor: 'var(--bg-alt)', color: 'var(--accent-primary)' }}
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5" style={{ borderTop: '1px solid var(--border-base)' }}>
              <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{uiText.contactTitle}</h2>
              <div className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <p>aceto.barbara@gmail.com</p>
                <p>+54 9 11 6209 3765</p>
                <p>linkedin.com/in/barbaraaceto</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
