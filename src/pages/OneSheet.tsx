import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const EN = {
  pageTitle: 'One Sheet',
  backHome: 'Back to home',
  printBtn: 'Download',
  name: 'Barbara Aceto',
  role: 'Product Leader · AI & Digital Strategy · Fintech',
  location: 'Buenos Aires, Argentina',
  tagline: 'I build digital products at the intersection of fintech, AI and human-centered design. I connect strategy with execution, and teams with what actually matters.',
  summaryTitle: 'Profile',
  summary: 'Product leader with 10+ years building digital products across fintech, e-commerce and high-growth startups in LATAM. Proven ability to lead cross-functional teams from discovery to delivery, design AI-powered experiences, and translate business goals into measurable outcomes. Driven by curiosity, ownership and continuous learning.',
  experienceTitle: 'Experience',
  experience: [
    {
      company: 'redbee',
      role: 'Bee Manager — Product Lead',
      duration: 'Oct 2025 – Present',
      bullets: [
        'Building AI-powered banking experiences for web, mobile and conversational channels.',
        'Leading cross-functional teams: Product, UX, QA and Technology.',
        'Designing products for complex financial operations with a human-centered approach.',
        'Driving conversational AI assistants integrated into digital banking flows.',
      ],
    },
    {
      company: 'Santander Argentina',
      role: 'Product Manager → Senior Product Lead',
      duration: 'Aug 2021 – Jul 2025 · 4 yrs',
      bullets: [
        'Led end-to-end digitalization of onboarding flows for Collections & Payments at one of Argentina\'s largest banks.',
        'Defined product vision and roadmap aligning business strategy, compliance and user experience.',
        'Built measurement frameworks to optimize conversion and performance across digital channels.',
        'Led agile cross-functional squads: UX, Tech, Data and Compliance.',
      ],
    },
    {
      company: 'Mercado Libre',
      role: 'Product Senior — Mercado Shops',
      duration: 'Jun 2019 – Jun 2021 · 2 yrs',
      bullets: [
        'Led Darwin Project for LATAM: marketing solutions platform reaching millions of sellers.',
        'Drove key integrations: Facebook Shop, Instagram Tagging, Google Analytics, GTM, Google Ads.',
        'Coordinated across IT, UX, Growth, Commercial, Agencies and API Partners.',
      ],
    },
    {
      company: '123Seguro',
      role: 'Growth Marketing Manager',
      duration: 'Feb 2018 – May 2019 · 1 yr 4 mos',
      bullets: [
        'Led full acquisition strategy: SEO, A/B testing, conversion funnels and paid media campaigns.',
        'Managed multi-channel budget, audience segmentation and performance reporting.',
      ],
    },
    {
      company: 'Google · Cognizant',
      role: 'Account Strategist & Optimizer',
      duration: 'Sep 2015 – Dec 2017 · 2 yrs',
      bullets: [
        'Managed YouTube, GDN and Search accounts across Media, Telco, Finance & Insurance.',
        'Recognized: Associate of the Year 2016 · Employee of the Quarter Q2\'16.',
      ],
    },
  ],
  skillsTitle: 'Core Capabilities',
  skills: [
    'Product Strategy', 'AI Product Development', 'Conversational AI',
    'Digital Banking', 'Fintech', 'Discovery & Delivery',
    'Cross-functional Leadership', 'Stakeholder Management',
    'Data-Driven Decisions', 'Growth & Acquisition', 'UX Strategy', 'Roadmapping',
  ],
  highlightsTitle: 'Key Highlights',
  highlights: [
    '10+ years building digital products across fintech, e-commerce and AI-native companies in LATAM',
    '4 years leading product at Santander Argentina, one of the region\'s largest digital banks',
    'Currently building conversational AI products for digital banking at redbee',
    'Led Darwin Project at Mercado Libre, impacting millions of sellers across LATAM',
    'Associate of the Year 2016 — Google · Cognizant',
  ],
  contactTitle: 'Contact',
  portfolioLabel: 'Portfolio',
}

const ES = {
  pageTitle: 'One Sheet',
  backHome: 'Volver al inicio',
  printBtn: 'Descargar',
  name: 'Barbara Aceto',
  role: 'Líder de Producto · IA y Estrategia Digital · Fintech',
  location: 'Buenos Aires, Argentina',
  tagline: 'Construyo productos digitales en la intersección de fintech, IA y diseño centrado en las personas. Conecto estrategia con ejecución, y equipos con lo que realmente importa.',
  summaryTitle: 'Perfil',
  summary: 'Líder de producto con más de 10 años construyendo productos digitales en fintech, e-commerce y startups de alto crecimiento en LATAM. Experiencia comprobada liderando equipos cross-funcionales de discovery a delivery, diseñando experiencias potenciadas por IA, y traduciendo objetivos de negocio en resultados medibles. Impulsada por la curiosidad, el ownership y el aprendizaje continuo.',
  experienceTitle: 'Experiencia',
  experience: [
    {
      company: 'redbee',
      role: 'Bee Manager — Product Lead',
      duration: 'Oct 2025 – Presente',
      bullets: [
        'Construcción de experiencias bancarias potenciadas por IA para canales web, mobile y conversacionales.',
        'Liderazgo de equipos cross-funcionales: Producto, UX, QA y Tecnología.',
        'Diseño de productos para operaciones financieras complejas con foco en las personas.',
        'Implementación de asistentes de IA conversacional integrados en flujos de banca digital.',
      ],
    },
    {
      company: 'Santander Argentina',
      role: 'Product Manager → Senior Product Lead',
      duration: 'Ago 2021 – Jul 2025 · 4 años',
      bullets: [
        'Lideré la digitalización end-to-end de flujos de onboarding en Cobranzas & Pagos de uno de los bancos más grandes de Argentina.',
        'Definí visión y roadmap de producto alineando estrategia de negocio, compliance y experiencia de usuario.',
        'Construí frameworks de medición para optimizar conversión y performance en canales digitales.',
        'Lideré squads ágiles cross-funcionales: UX, Tech, Data y Compliance.',
      ],
    },
    {
      company: 'Mercado Libre',
      role: 'Product Senior — Mercado Shops',
      duration: 'Jun 2019 – Jun 2021 · 2 años',
      bullets: [
        'Lideré Darwin Project para LATAM: plataforma de soluciones de marketing para millones de vendedores.',
        'Impulsé integraciones clave: Facebook Shop, Instagram Tagging, Google Analytics, GTM, Google Ads.',
        'Coordiné IT, UX, Growth, Comercial, Agencias y Partners de API.',
      ],
    },
    {
      company: '123Seguro',
      role: 'Growth Marketing Manager',
      duration: 'Feb 2018 – May 2019 · 1 año 4 meses',
      bullets: [
        'Lideré estrategia de adquisición: SEO, A/B testing, funnels de conversión y campañas pagas.',
        'Gestioné presupuesto multicanal, segmentación de audiencia y reporting de performance.',
      ],
    },
    {
      company: 'Google · Cognizant',
      role: 'Account Strategist & Optimizer',
      duration: 'Sep 2015 – Dic 2017 · 2 años',
      bullets: [
        'Gestioné cuentas de YouTube, GDN y Search en industrias de Media, Telco, Finanzas y Seguros.',
        'Reconocida: Associate of the Year 2016 · Employee of the Quarter Q2\'16.',
      ],
    },
  ],
  skillsTitle: 'Capacidades Clave',
  skills: [
    'Estrategia de Producto', 'Desarrollo de Producto con IA', 'IA Conversacional',
    'Banca Digital', 'Fintech', 'Discovery & Delivery',
    'Liderazgo Cross-funcional', 'Gestión de Stakeholders',
    'Decisiones Basadas en Datos', 'Growth & Adquisición', 'Estrategia UX', 'Roadmapping',
  ],
  highlightsTitle: 'Logros Destacados',
  highlights: [
    'Más de 10 años construyendo productos digitales en fintech, e-commerce y empresas AI-native en LATAM',
    '4 años liderando producto en Santander Argentina, uno de los bancos digitales más grandes de la región',
    'Actualmente construyendo productos de IA conversacional para banca digital en redbee',
    'Lideré Darwin Project en Mercado Libre, impactando a millones de vendedores en LATAM',
    'Associate of the Year 2016 — Google · Cognizant',
  ],
  contactTitle: 'Contacto',
  portfolioLabel: 'Portfolio',
}

export default function OneSheet() {
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

  const c = isEnglish ? EN : ES

  const isPdfMode = useMemo(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    return params.get('pdf') === '1'
  }, [])

  useEffect(() => {
    if (!isPdfMode) return
    window.print()
  }, [isPdfMode])

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <h2
      className="text-xs font-semibold tracking-widest uppercase mb-4"
      style={{ color: 'var(--accent-primary)' }}
    >
      {children}
    </h2>
  )

  return (
    <>
      <Helmet><title>{c.pageTitle} — Barbara Aceto</title></Helmet>

      {/* Action bar — always visible, hidden on print */}
      <div
        className="one-sheet-actionbar sticky top-0 z-40 flex items-center gap-4 px-6 py-3"
        style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border-base)' }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {c.backHome}
        </Link>
      </div>

      <div className="one-sheet-wrap w-full min-h-screen px-4 py-8 md:py-12" style={{ backgroundColor: 'var(--bg)' }}>
        <article
          className="max-w-3xl mx-auto rounded-3xl overflow-hidden"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-base)', boxShadow: '0 4px 32px rgba(30,42,56,0.07)' }}
        >

          {/* ── HEADER ── */}
          <div className="px-8 pt-10 pb-8" style={{ borderBottom: '1px solid var(--border-base)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <img
                src="/barbi.png"
                alt="Barbara Aceto"
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                style={{ border: '2px solid var(--border-base)' }}
              />
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-serif font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  {c.name}
                </h1>
                <p className="text-sm font-medium mt-1" style={{ color: 'var(--accent-primary)' }}>{c.role}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.location}</p>
                {/* Contact links */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                  {[
                    { label: 'aceto.barbara@gmail.com', href: 'mailto:aceto.barbara@gmail.com' },
                    { label: '+54 9 11 6209 3765', href: 'tel:+5491162093765' },
                    { label: 'linkedin.com/in/barbaraaceto', href: 'https://linkedin.com/in/barbaraaceto' },
                    { label: 'portfolio-barbarita.vercel.app', href: 'https://portfolio-barbarita.vercel.app' },
                  ].map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Tagline */}
            <p className="mt-7 text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)', borderLeft: '2px solid var(--accent-primary)', paddingLeft: '0.875rem' }}>
              {c.tagline}
            </p>
          </div>

          {/* ── SUMMARY ── */}
          <div className="px-8 py-8" style={{ borderBottom: '1px solid var(--border-base)' }}>
            <SectionLabel>{c.summaryTitle}</SectionLabel>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {c.summary}
            </p>
          </div>

          {/* ── EXPERIENCE ── */}
          <div className="px-8 py-8" style={{ borderBottom: '1px solid var(--border-base)' }}>
            <SectionLabel>{c.experienceTitle}</SectionLabel>
            <div className="space-y-5">
              {c.experience.map((exp) => (
                <div key={exp.company} className="print-no-break">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div>
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{exp.company}</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}> · {exp.role}</span>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{exp.duration}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-xs leading-relaxed flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-primary)', minWidth: '4px' }} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── SKILLS + HIGHLIGHTS (two-col on desktop) ── */}
          <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ borderBottom: '1px solid var(--border-base)' }}>
            <div>
              <SectionLabel>{c.skillsTitle}</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(74,127,121,0.10)', color: 'var(--accent-primary)', border: '1px solid rgba(74,127,121,0.20)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>{c.highlightsTitle}</SectionLabel>
              <ul className="space-y-2">
                {c.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-primary)', minWidth: '4px' }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── FOOTER / CONTACT ── */}
          <div className="px-8 py-5">
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{c.contactTitle}: </span>
              aceto.barbara@gmail.com · +54 9 11 6209 3765
            </div>
          </div>

        </article>
      </div>

      <style>{`
        @media print {
          @page { margin: 1.2cm 1.4cm; size: A4; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          /* Hide everything except the article */
          .one-sheet-actionbar,
          nav, header, footer,
          #layout-ai-btn,
          [data-tour], [data-feedback] { display: none !important; }

          body, html { background: white !important; margin: 0; padding: 0; }

          /* Make the article fill the page cleanly */
          .one-sheet-wrap { padding: 0 !important; margin: 0 !important; min-height: unset !important; }
          article {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            margin: 0 !important;
          }

          /* Typography */
          h1 { font-size: 22pt !important; }
          h2 { font-size: 8pt !important; }

          /* Keep colors on chips/dots */
          span[style], a[style], p[style] { color: inherit !important; }

          /* Avoid page breaks inside experience blocks */
          .print-no-break { page-break-inside: avoid; break-inside: avoid; }

          /* Action bar already hidden but make sure */
          .one-sheet-actionbar { display: none !important; }
        }
      `}</style>
    </>
  )
}
