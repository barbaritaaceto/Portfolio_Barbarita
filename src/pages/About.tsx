import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

const EN = {
  title: 'About',
  metaTitle: 'About — Barbara Aceto',
  intro: "I'm a product leader based in Buenos Aires with 10+ years building digital products across fintech, e-commerce and AI-native environments in LATAM.",
  paragraph1: "My career started in SEO and digital marketing — which gave me a strong foundation in data, user behavior and growth. Over time I moved into product management, where I found the right intersection between strategy, execution and people.",
  paragraph2: "For the past 4 years I led product at Santander Argentina, one of the country's largest digital banks, working on onboarding digitalization and cross-functional squad alignment. Today I'm at redbee, building AI-powered banking experiences for web, mobile and conversational channels.",
  paragraph3: "I believe the best products come from understanding context before writing a single line of code. I work best in environments where curiosity is valued, ambiguity is part of the job, and teams are genuinely invested in the outcome.",
  valuesTitle: 'How I work',
  values: [
    { label: 'Context first', description: 'I start with understanding — business, users, operations and technology — before moving the roadmap.' },
    { label: 'Ownership over process', description: 'I care deeply about outcomes, not just delivery. I stay connected to the problem until it is solved.' },
    { label: 'Teams over tools', description: 'The best execution comes from aligned people, not perfect frameworks.' },
    { label: 'Continuous learning', description: 'Experimenting, iterating and reflecting is not a phase — it is how I work every day.' },
  ],
  experienceTitle: 'Career path',
  experience: [
    { company: 'redbee', role: 'Bee Manager — Product Lead', period: 'Oct 2025 – Present' },
    { company: 'Santander Argentina', role: 'Product Manager → Senior Product Lead', period: 'Aug 2021 – Jul 2025' },
    { company: 'Mercado Libre', role: 'Product Senior — Mercado Shops', period: 'Jun 2019 – Jun 2021' },
    { company: '123Seguro', role: 'Growth Marketing Manager', period: 'Feb 2018 – May 2019' },
    { company: 'Google · Cognizant', role: 'Account Strategist & Optimizer', period: 'Sep 2015 – Dec 2017' },
    { company: 'Mercado Libre · Globant', role: 'SEO Semi Senior Analyst', period: 'Jan 2015 – Sep 2015' },
  ],
  interestsTitle: 'Beyond product',
  interests: "When I'm not building products I'm usually reading about AI, exploring new tools, or thinking about how organizations evolve. I also write on LinkedIn about product, leadership and learning in public.",
  contactLabel: 'Want to connect?',
  contactLink: 'Get in touch',
}

const ES = {
  title: 'Sobre mí',
  metaTitle: 'Sobre mí — Barbara Aceto',
  intro: 'Soy líder de producto con base en Buenos Aires, con más de 10 años construyendo productos digitales en fintech, e-commerce y entornos AI-native en LATAM.',
  paragraph1: 'Mi carrera empezó en SEO y marketing digital — lo que me dio una base sólida en datos, comportamiento de usuario y crecimiento. Con el tiempo migré hacia product management, donde encontré la intersección correcta entre estrategia, ejecución y personas.',
  paragraph2: 'Los últimos 4 años lideré producto en Santander Argentina, uno de los bancos digitales más grandes del país, trabajando en digitalización de onboarding y alineación de squads cross-funcionales. Hoy estoy en redbee, construyendo experiencias bancarias potenciadas por IA para canales web, mobile y conversacionales.',
  paragraph3: 'Creo que los mejores productos vienen de entender el contexto antes de escribir una sola línea de código. Trabajo mejor en entornos donde la curiosidad es valorada, la ambigüedad es parte del trabajo y los equipos están genuinamente comprometidos con el resultado.',
  valuesTitle: 'Cómo trabajo',
  values: [
    { label: 'Contexto primero', description: 'Empiezo por entender — negocio, usuarios, operación y tecnología — antes de mover el roadmap.' },
    { label: 'Ownership sobre proceso', description: 'Me importan los resultados, no solo la entrega. Me quedo conectada al problema hasta que esté resuelto.' },
    { label: 'Equipos sobre herramientas', description: 'La mejor ejecución viene de personas alineadas, no de frameworks perfectos.' },
    { label: 'Aprendizaje continuo', description: 'Experimentar, iterar y reflexionar no es una etapa — es cómo trabajo todos los días.' },
  ],
  experienceTitle: 'Trayectoria',
  experience: [
    { company: 'redbee', role: 'Bee Manager — Product Lead', period: 'Oct 2025 – Presente' },
    { company: 'Santander Argentina', role: 'Product Manager → Senior Product Lead', period: 'Ago 2021 – Jul 2025' },
    { company: 'Mercado Libre', role: 'Product Senior — Mercado Shops', period: 'Jun 2019 – Jun 2021' },
    { company: '123Seguro', role: 'Growth Marketing Manager', period: 'Feb 2018 – May 2019' },
    { company: 'Google · Cognizant', role: 'Account Strategist & Optimizer', period: 'Sep 2015 – Dic 2017' },
    { company: 'Mercado Libre · Globant', role: 'SEO Semi Senior Analyst', period: 'Ene 2015 – Sep 2015' },
  ],
  interestsTitle: 'Más allá del producto',
  interests: 'Cuando no estoy construyendo productos suelo leer sobre IA, explorar nuevas herramientas o pensar en cómo evolucionan las organizaciones. También escribo en LinkedIn sobre producto, liderazgo y aprendizaje en público.',
  contactLabel: '¿Querés conectar?',
  contactLink: 'Escribime',
}

export default function About() {
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lang') === 'en'
  })

  useEffect(() => {
    const sync = (e: Event) => {
      const detail = (e as CustomEvent<{ isEnglish: boolean }>).detail
      setIsEnglish(detail.isEnglish)
    }
    window.addEventListener('app-language-change', sync)
    return () => window.removeEventListener('app-language-change', sync)
  }, [])

  const c = isEnglish ? EN : ES

  return (
    <>
      <Helmet><title>{c.metaTitle}</title></Helmet>

      <div className="max-w-2xl mx-auto py-8 px-4 space-y-10">

        {/* Intro */}
        <section>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
            {c.title}
          </h1>
          <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p className="font-medium text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>{c.intro}</p>
            <p>{c.paragraph1}</p>
            <p>{c.paragraph2}</p>
            <p>{c.paragraph3}</p>
          </div>
        </section>

        {/* How I work */}
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-primary)' }}>
            {c.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.values.map(v => (
              <div
                key={v.label}
                className="rounded-2xl px-4 py-4"
                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{v.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Career path */}
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-primary)' }}>
            {c.experienceTitle}
          </h2>
          <div className="space-y-2">
            {c.experience.map(exp => (
              <div
                key={exp.company}
                className="flex items-baseline justify-between gap-4 flex-wrap py-2"
                style={{ borderBottom: '1px solid var(--border-base)' }}
              >
                <div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{exp.company}</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}> · {exp.role}</span>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{exp.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Beyond product */}
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent-primary)' }}>
            {c.interestsTitle}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.interests}</p>
        </section>

        {/* Contact nudge */}
        <section className="pt-2">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {c.contactLabel}{' '}
            <a
              href="mailto:aceto.barbara@gmail.com"
              className="font-medium"
              style={{ color: 'var(--accent-primary)' }}
            >
              {c.contactLink} →
            </a>
          </p>
        </section>

      </div>
    </>
  )
}
