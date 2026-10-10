import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const EN = {
  pageTitle: 'One Sheet',
  backHome: 'Back to home',
  printBtn: 'Download',
  name: 'Barbara Aceto',
  role: 'Product & AI Leader',
  location: 'Buenos Aires, Argentina',
  tagline: 'Between humans and algorithms, I lead products, teams and new ways of working.',
  tagline2: 'I connect strategy with execution, and teams with what actually matters.',
  summaryTitle: 'Profile',
  summary: 'Product leader with 10+ years building digital products and services. I lead multidisciplinary teams from discovery to delivery, design AI-powered experiences and translate business goals into measurable outcomes. I also train teams and speak about product, AI and leadership.',
  experienceTitle: 'Experience',
  experience: [
    {
      company: 'redbee',
      role: 'Bee Manager',
      duration: 'Oct 2025 – Present',
      bullets: [
        'Building a digital bank from scratch with a hybrid team: web and mobile experience (iOS and Android).',
        'Supporting teams of 15+ people across multiple disciplines: UX, Product, IT, BA and QA.',
        'Designing products for complex financial operations: accounts, transfers, supplier payments, eCheq, back office and single sign-on.',
        'Implementing AI assistants and agents within digital banking flows and the team\'s own work.',
      ],
    },
    {
      company: 'Santander Argentina',
      role: 'Sr. Product Lead → Product Manager',
      duration: 'Aug 2021 – Jul 2025 · 4 yrs',
      bullets: [
        'Led the end-to-end digitalization of Collections & Payments onboarding in the business online banking, with an impact on about 200,000 SMEs.',
        'Defined the vision and roadmap of the Onboarding squad, aligning business, compliance and user experience.',
        'Worked with partners to enable cross-selling and up-selling.',
        'Built the measurement and analytics strategy to optimize conversion in digital channels.',
        'Gave internal product talks: metrics, GA4, Tag Manager, Looker Studio and UX basics.',
      ],
    },
    {
      company: 'Mercado Libre',
      role: 'Product Senior, Mercado Shops',
      duration: 'Jun 2019 – Jun 2021 · 2 yrs',
      bullets: [
        'Led Darwin Project: digital marketing tools for Mercado Shops sellers in Argentina, Mexico and Brazil.',
        'Integrations and experiments: Smart Shopping, Facebook Shop, Instagram Tagging, Google and Facebook pixels, Search Console, GTM and ROAS tests.',
        'Trained commercial teams and agencies in digital marketing.',
        'Coordinated IT, UX, Growth, Commercial, Agencies and API Partners.',
      ],
    },
    {
      company: '123Seguro',
      role: 'Acquisition → Growth Marketing Manager',
      duration: 'Feb 2018 – May 2019 · 1 yr 4 mos',
      bullets: [
        'Led acquisition and growth: SEO, A/B testing, conversion funnels, email marketing and paid campaigns.',
        'Managed budget per channel, lead generation and performance reporting.',
      ],
    },
    {
      company: 'Google · Cognizant',
      role: 'LCS Account Strategist & Optimizer',
      duration: 'Sep 2015 – Dec 2017 · 2 yrs 4 mos',
      bullets: [
        'Managed YouTube, GDN and Search accounts, focused on Media & Entertainment, plus Telco, Finance & Insurance.',
        "Recognized: Associate of the Year 2016 · Employee of the Quarter Q2'16.",
      ],
    },
    {
      company: 'Mercado Libre · Globant',
      role: 'SEO Semi Senior Analyst',
      duration: 'Jan 2015 – Sep 2015 · 9 mos',
      bullets: [
        'Keyword research and opportunity detection for Classifieds (Motors, Real Estate and Services).',
      ],
    },
  ],
  trainingTitle: 'Training & Talks',
  training: [
    'Training in product, AI and leadership for teams in banking, retail, consumer goods, aerospace and travel assistance.',
    'Speaker at Agile Summit Uruguay 2026: “Agile After Agile”.',
    'Workshop “The Last Manual User Story”: AI applied to product.',
    'Course “Humans + Algorithms”: building products with AI.',
  ],
  educationTitle: 'Education',
  education: [
    'MIT xPRO — Designing and Building AI Products and Services',
    'Claude Code for Product Managers (2025)',
    'Leadership Agility Certified (2024)',
    'Data Analytics — Digital House (2020)',
    'BA in Public and Institutional Relations — UADE',
  ],
  skillsTitle: 'Core Capabilities',
  skills: [
    'Product Strategy', 'AI Product', 'AI Agents', 'Conversational AI',
    'Digital Banking & Fintech', 'E-commerce', 'Discovery & Delivery', 'Roadmapping',
    'Agile', 'Cross-functional Leadership', 'Stakeholder Management',
    'Training & Facilitation', 'Analytics & Measurement', 'Growth & Acquisition',
  ],
}

const ES = {
  pageTitle: 'One Sheet',
  backHome: 'Volver al inicio',
  printBtn: 'Descargar',
  name: 'Barbara Aceto',
  role: 'Product & AI Leader',
  location: 'Buenos Aires, Argentina',
  tagline: 'Entre humanos y algoritmos, lidero productos, equipos y nuevas formas de trabajar.',
  tagline2: 'Conecto estrategia con ejecución, y equipos con lo que realmente importa.',
  summaryTitle: 'Perfil',
  summary: 'Líder de producto con más de 10 años construyendo productos y servicios digitales. Lidero equipos multidisciplinarios de discovery a delivery, diseño experiencias potenciadas por IA y traduzco objetivos de negocio en resultados medibles. También capacito equipos y doy charlas sobre producto, IA y liderazgo.',
  experienceTitle: 'Experiencia',
  experience: [
    {
      company: 'redbee',
      role: 'Bee Manager',
      duration: 'Oct 2025 – Presente',
      bullets: [
        'Construcción de un banco digital desde cero con un equipo híbrido: experiencia web y mobile (iOS y Android).',
        'Acompañamiento de equipos de +15 personas de múltiples disciplinas: UX, Producto, IT, BA y QA.',
        'Diseño de productos para operaciones financieras complejas: cuentas, transferencias, pago a proveedores, eCheq, backoffice y single sign-on.',
        'Implementación de asistentes y agentes de IA en flujos de banca digital y en el trabajo del propio equipo.',
      ],
    },
    {
      company: 'Santander Argentina',
      role: 'Sr. Product Lead → Product Manager',
      duration: 'Ago 2021 – Jul 2025 · 4 años',
      bullets: [
        'Lideré la digitalización end-to-end del onboarding de Cobranzas y Pagos en el home banking de empresas, con impacto en unas 200 mil pymes.',
        'Definí la visión y el roadmap del squad de Onboarding, alineando negocio, compliance y experiencia de usuario.',
        'Trabajé con partners para habilitar cross-selling y up-selling.',
        'Construí la estrategia de medición y analítica para optimizar conversión en canales digitales.',
        'Di charlas internas de producto: métricas, GA4, Tag Manager, Looker Studio y bases de UX.',
      ],
    },
    {
      company: 'Mercado Libre',
      role: 'Product Senior, Mercado Shops',
      duration: 'Jun 2019 – Jun 2021 · 2 años',
      bullets: [
        'Lideré Darwin Project: herramientas de marketing digital para sellers de Mercado Shops en Argentina, México y Brasil.',
        'Integraciones y experimentos: Smart Shopping, Facebook Shop, Instagram Tagging, píxeles de Google y Facebook, Search Console, GTM y pruebas de ROAS.',
        'Capacité en marketing digital a equipos comerciales y agencias.',
        'Coordiné IT, UX, Growth, Comercial, Agencias y Partners de API.',
      ],
    },
    {
      company: '123Seguro',
      role: 'Acquisition → Growth Marketing Manager',
      duration: 'Feb 2018 – May 2019 · 1 año 4 meses',
      bullets: [
        'Lideré adquisición y growth: SEO, A/B testing, funnels de conversión, email marketing y campañas pagas.',
        'Gestioné presupuesto por canal, generación de leads y reporting de performance.',
      ],
    },
    {
      company: 'Google · Cognizant',
      role: 'LCS Account Strategist & Optimizer',
      duration: 'Sep 2015 – Dic 2017 · 2 años 4 meses',
      bullets: [
        'Gestioné cuentas de YouTube, GDN y Search, con foco en Media y Entretenimiento, además de Telco, Finanzas y Seguros.',
        "Reconocida: Associate of the Year 2016 · Employee of the Quarter Q2'16.",
      ],
    },
    {
      company: 'Mercado Libre · Globant',
      role: 'SEO Semi Senior Analyst',
      duration: 'Ene 2015 – Sep 2015 · 9 meses',
      bullets: [
        'Keyword research y detección de oportunidades para Clasificados (Autos, Inmuebles y Servicios).',
      ],
    },
  ],
  trainingTitle: 'Capacitaciones y charlas',
  training: [
    'Capacitaciones en producto, IA y liderazgo para equipos de banca, retail, consumo masivo, aeroespacial y asistencia al viajero.',
    'Speaker en Agile Summit Uruguay 2026: “Agile después del Agile”.',
    'Workshop “La Última Historia de Usuario Manual”: IA aplicada a producto.',
    'Curso “Humanos + Algoritmos”: creación de productos con IA.',
  ],
  educationTitle: 'Formación',
  education: [
    'MIT xPRO — Designing and Building AI Products and Services',
    'Claude Code para Product Managers (2025)',
    'Leadership Agility Certified (2024)',
    'Data Analytics — Digital House (2020)',
    'Lic. en Relaciones Públicas e Institucionales — UADE',
  ],
  skillsTitle: 'Capacidades Clave',
  skills: [
    'Estrategia de Producto', 'Producto con IA', 'Agentes de IA', 'IA Conversacional',
    'Banca Digital y Fintech', 'E-commerce', 'Discovery & Delivery', 'Roadmapping',
    'Agile', 'Liderazgo Cross-funcional', 'Gestión de Stakeholders',
    'Capacitación y Facilitación', 'Analítica y Medición', 'Growth & Adquisición',
  ],
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
      <Helmet>
        <title>{c.pageTitle} — Barbara Aceto</title>
        <meta name="description" content={isEnglish ? "Barbara Aceto's one-page résumé: Product & AI Leader. Experience, training, education and core capabilities." : 'El CV de Barbara Aceto en una hoja: Product & AI Leader. Experiencia, capacitaciones, formación y capacidades clave.'} />
      </Helmet>

      {/* Action bar — always visible, hidden on print */}
      <div
        className="one-sheet-actionbar sticky top-0 z-40 flex items-center justify-start gap-4 sm:gap-5 px-4 sm:px-6 py-3"
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
          <span className="hidden sm:inline">{c.backHome}</span>
          <span className="sm:hidden">{isEnglish ? 'Home' : 'Inicio'}</span>
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-primary !px-4 sm:!px-5 py-2 text-sm whitespace-nowrap"
        >
          {c.printBtn} PDF
        </button>
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
                src="/barbi-avatar.jpg"
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
              <br />
              {c.tagline2}
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
                <div key={`${exp.company}-${exp.duration}`} className="print-no-break">
                  <div className="one-sheet-exp-head flex items-baseline justify-between gap-4 flex-wrap">
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

          {/* ── TRAINING + EDUCATION (two-col on desktop) ── */}
          <div className="one-sheet-cols px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ borderBottom: '1px solid var(--border-base)' }}>
            <div className="print-no-break">
              <SectionLabel>{c.trainingTitle}</SectionLabel>
              <ul className="space-y-2">
                {c.training.map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-primary)', minWidth: '4px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="print-no-break">
              <SectionLabel>{c.educationTitle}</SectionLabel>
              <ul className="space-y-2">
                {c.education.map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-primary)', minWidth: '4px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── SKILLS ── */}
          <div className="px-8 py-6 print-no-break">
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

        </article>
      </div>

      <style>{`
        @media print {
          @page { margin: 1.2cm 1.4cm; size: A4; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          /* Hide everything except the article */
          .one-sheet-actionbar,
          #layout-lang-toggle,
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
          h1 { font-size: 20pt !important; }
          h2 { font-size: 7.5pt !important; margin-bottom: 6pt !important; break-after: avoid; page-break-after: avoid; }
          article .text-sm { font-size: 9pt !important; line-height: 1.45 !important; }
          article .text-xs { font-size: 8.2pt !important; line-height: 1.4 !important; }

          /* Compact spacing and real two-column rows on paper */
          article > div { padding: 11pt 0 !important; }
          article > div:first-child { padding-top: 0 !important; }
          .one-sheet-cols { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 20pt !important; }
          .one-sheet-exp-head { flex-wrap: nowrap !important; }
          article .space-y-5 > * + * { margin-top: 9pt !important; }
          article p.italic { margin-top: 10pt !important; }

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
