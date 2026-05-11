import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import pressData from '../data/press'
import projectsData from '../data/projects'

type UrlEntry = {
  id: string
  title: string
  source: string
  category: string
  url: string
}

export default function NewsLinks(){
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })

  const [category, setCategory] = useState('all')

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
        title: 'URL Entries',
        subtitle: 'Filter by category and explore all related links.',
        backHome: 'Back to home',
        all: 'All',
      }
    : {
        title: 'Entradas de URLs',
        subtitle: 'Filtrá por categoría y explorá todos los enlaces relacionados.',
        backHome: 'Volver al inicio',
        all: 'Todas',
      }

  const manualEntries: UrlEntry[] = [
    {
      id: 'ambito-notebooklm',
      title: isEnglish ? 'NotebookLM and the new challenge for organizations' : 'NotebookLM y el nuevo desafío de las organizaciones',
      source: 'Ámbito',
      category: 'Media',
      url: 'https://www.ambito.com/opiniones/notebooklm-y-el-nuevo-desafio-las-organizaciones-no-se-trata-la-falta-datos-sino-entenderlos-n6241912',
    },
    {
      id: 'itsitio-notebooklm',
      title: isEnglish ? 'NotebookLM for context-aware decisions' : 'NotebookLM para tomar decisiones con contexto',
      source: 'IT Sitio',
      category: 'Media',
      url: 'https://www.itsitio.com/inteligencia-artificial/notebooklm-no-se-trata-de-la-falta-de-datos-sino-de-entenderlos-para-tomar-decisiones/',
    },
  ]

  const pressEntries: UrlEntry[] = pressData
    .filter((item) => item.url && item.url !== '#')
    .map((item) => ({
      id: `press-${item.slug}`,
      title: item.title,
      source: item.outlet,
      category: 'Press',
      url: item.url as string,
    }))

  const projectEntries: UrlEntry[] = projectsData.flatMap((project) => {
    const list: UrlEntry[] = []
    if (project.links?.demo) {
      list.push({
        id: `${project.slug}-demo`,
        title: `${project.title} · Demo`,
        source: project.title,
        category: 'Projects',
        url: project.links.demo,
      })
    }
    if (project.links?.repo) {
      list.push({
        id: `${project.slug}-repo`,
        title: `${project.title} · Repo`,
        source: project.title,
        category: 'Projects',
        url: project.links.repo,
      })
    }
    if (project.links?.posts?.length) {
      project.links.posts.forEach((postUrl, index) => {
        list.push({
          id: `${project.slug}-post-${index + 1}`,
          title: `${project.title} · Post ${index + 1}`,
          source: project.title,
          category: 'LinkedIn',
          url: postUrl,
        })
      })
    }
    return list
  })

  const entries = useMemo(() => {
    const merged = [...manualEntries, ...pressEntries, ...projectEntries]
    const seen = new Set<string>()
    return merged.filter((entry) => {
      if (seen.has(entry.url)) return false
      seen.add(entry.url)
      return true
    })
  }, [manualEntries, pressEntries, projectEntries])

  const categories = useMemo(() => ['all', ...Array.from(new Set(entries.map((entry) => entry.category)))], [entries])

  const filtered = useMemo(
    () => entries.filter((entry) => (category === 'all' ? true : entry.category === category)),
    [entries, category],
  )

  return (
    <>
      <Helmet><title>{uiText.title} — Barbara Aceto</title></Helmet>
      <section className="w-full min-h-screen px-4 py-10" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm mb-4" style={{ color: 'var(--accent-primary)' }}>
            ← {uiText.backHome}
          </Link>

          <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>{uiText.title}</h1>
          <p className="text-sm md:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>{uiText.subtitle}</p>

          <div className="flex flex-wrap gap-2 mt-6 mb-6">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className="px-3 py-1.5 rounded-full text-xs md:text-sm"
                style={{
                  backgroundColor: category === item ? 'var(--accent-primary)' : 'var(--bg-alt)',
                  color: category === item ? '#FFFFFF' : 'var(--text-secondary)',
                }}
              >
                {item === 'all' ? uiText.all : item}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((entry) => (
              <a
                key={entry.id}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border px-4 py-3 transition-colors"
                style={{ borderColor: 'var(--border-base)', backgroundColor: '#FFFFFF' }}
              >
                <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{entry.category} · {entry.source}</p>
                <p className="text-sm md:text-base font-medium mt-1" style={{ color: 'var(--accent-primary)' }}>{entry.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
