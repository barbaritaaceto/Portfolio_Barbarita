import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import projectsData from '../data/projects'

const projectInitialCards: Record<string, { emoji: string; title: string; titleEs: string; text: string; textEs: string; borderColor: string; textColor: string }> = {
  'redbee': {
    emoji: '🐝',
    title: 'Bee Manager',
    titleEs: 'Bee Manager',
    text: 'Leading with purpose within a digital ecosystem that values impact, creativity and human connection.',
    textEs: 'Liderando con propósito dentro de un ecosistema digital que valora el impacto, la creatividad y la conexión humana.',
    borderColor: '#DC2626',
    textColor: '#DC2626'
  },
  'santander-argentina': {
    emoji: '🏦',
    title: 'Santander Argentina',
    titleEs: 'Santander Argentina',
    text: 'Building the future of digital banking across Collections & Payments.',
    textEs: 'Construyendo el futuro de la banca digital en Cobranzas y Pagos.',
    borderColor: '#DC2626',
    textColor: '#DC2626'
  },
  'mercado-libre': {
    emoji: '🛒',
    title: 'Mercado Libre',
    titleEs: 'Mercado Libre',
    text: 'AI-powered discovery for 80M+ users across Latin America.',
    textEs: 'Descubrimiento potenciado por IA para más de 80M de usuarios en Latinoamérica.',
    borderColor: '#FACC15',
    textColor: '#FACC15'
  },
  'globant': {
    emoji: '🌐',
    title: 'Globant',
    titleEs: 'Globant',
    text: 'Digital transformation consulting for Fortune 500 companies.',
    textEs: 'Consultoría en transformación digital para empresas Fortune 500.',
    borderColor: '#16A34A',
    textColor: '#16A34A'
  },
  'freelance-digital-designer': {
    emoji: '✍️',
    title: 'Freelance Project',
    titleEs: 'Proyecto Freelance',
    text: 'Digital graphic design and public relations across branding and communication initiatives.',
    textEs: 'Diseño gráfico digital y relaciones públicas en iniciativas de branding y comunicación.',
    borderColor: '#0EA5A4',
    textColor: '#0EA5A4'
  },
  'x-project-administrative-assistant': {
    emoji: '🗃️',
    title: 'X Project S.A.',
    titleEs: 'X Project S.A.',
    text: 'Administrative operations across tax, labor settlement and billing.',
    textEs: 'Operaciones administrativas en liquidación impositiva, laboral y facturación.',
    borderColor: '#6B7280',
    textColor: '#6B7280'
  },
  'yo-estoy-marketing-assistant': {
    emoji: '👥',
    title: 'Yo Estoy',
    titleEs: 'Yo Estoy',
    text: 'Market research, audience strategy and lead generation support.',
    textEs: 'Investigación de mercado, estrategia de audiencias y soporte de generación de leads.',
    borderColor: '#2563EB',
    textColor: '#2563EB'
  },
  'imanaging-marketing-assistant': {
    emoji: '👥',
    title: 'Imanaging',
    titleEs: 'Imanaging',
    text: 'Lead generation and event follow-up for marketing operations.',
    textEs: 'Generación de leads y seguimiento de eventos para operaciones de marketing.',
    borderColor: '#7C3AED',
    textColor: '#7C3AED'
  },
  'fulbright-database-growth-trainee': {
    emoji: '🤸',
    title: 'Fulbright',
    titleEs: 'Fulbright',
    text: 'Database growth through research, outreach and email marketing.',
    textEs: 'Crecimiento de base de datos mediante investigación, outreach y email marketing.',
    borderColor: '#0D9488',
    textColor: '#0D9488'
  },
  '123seguro': {
    emoji: '🛡️',
    title: '123Seguro',
    titleEs: '123Seguro',
    text: 'Insurance technology and digital customer experience.',
    textEs: 'Tecnología de seguros y experiencia de cliente digital.',
    borderColor: '#8B5CF6',
    textColor: '#8B5CF6'
  },
  'cognizant': {
    emoji: '💼',
    title: 'Cognizant',
    titleEs: 'Cognizant',
    text: 'Technology consulting and digital solutions.',
    textEs: 'Consultoría tecnológica y soluciones digitales.',
    borderColor: '#6366F1',
    textColor: '#6366F1'
  }
}

export default function Projects(){
  const [selectedProject, setSelectedProject] = useState<string | null>('redbee')
  const [pageIndex, setPageIndex] = useState(0)
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
        backHome: 'Back to home',
        heroTitle: 'Making noise since 1989',
        heroSubtitle: 'Leading product strategy across fintech, AI and digital platforms.',
        selectCard: 'Select a card to view details.',
        durationLabel: 'Duration',
        roles: 'Roles & Responsibilities',
        focus: 'Focus',
        talks: 'Product Talks & Knowledge Sharing',
        talksDesc: 'Delivered internal talks and trainings on:',
        featuredLink: 'Featured Link',
        featuredLinkDesc: (title: string) => `Explore a related publication from the ${title} experience.`,
      }
    : {
        backHome: 'Volver al inicio',
        heroTitle: 'Haciendo ruido desde 1989',
        heroSubtitle: 'Liderando estrategia de producto en fintech, IA y plataformas digitales.',
        selectCard: 'Seleccioná una tarjeta para ver el detalle.',
        durationLabel: 'Período',
        roles: 'Roles y Responsabilidades',
        focus: 'Foco',
        talks: 'Charlas de Producto y Compartir Conocimiento',
        talksDesc: 'Di charlas internas y capacitaciones sobre:',
        featuredLink: 'Enlace destacado',
        featuredLinkDesc: (title: string) => `Explorá una publicación relacionada con la experiencia en ${title}.`,
        previousProjects: 'Proyectos anteriores',
        nextProjects: 'Proyectos siguientes',
        openLink: 'Abrir enlace',
        externalLink: 'Enlace externo',
      }

  const esMap: Record<string, string> = {
    'redbee': 'redbee',
    'Contributing to the design and delivery of products that matter — blending strategy, systems thinking and execution while nurturing a collaborative, human-centered culture.': 'Contribuyendo al diseño y la entrega de productos que importan, combinando estrategia, pensamiento sistémico y ejecución mientras se cultiva una cultura colaborativa y centrada en las personas.',
    'Product leadership within a high-impact digital ecosystem.': 'Liderazgo de producto dentro de un ecosistema digital de alto impacto.',
    'Product leadership across the Collections & Payments digital ecosystem.': 'Liderazgo de producto en el ecosistema digital de Cobranzas y Pagos.',
    'Defined and executed onboarding strategy, aligned cross-functional teams, and built data-driven measurement frameworks to accelerate digital transformation and optimize performance.': 'Definí y ejecuté la estrategia de onboarding, alineé equipos cross-funcionales y construí marcos de medición basados en datos para acelerar la transformación digital y optimizar el rendimiento.',
    'Product Senior at Mercado Shops | Proud Darwin TTTL': 'Product Senior en Mercado Shops | Orgullosa Darwin TTTL',
    'Leading Darwin Project for LATAM. Providing friendly marketing solutions during two incredible years.': 'Liderando el Proyecto Darwin para LATAM. Brindando soluciones de marketing durante dos años increíbles.',
    'Insurance technology and digital customer experience.': 'Tecnología de seguros y experiencia de cliente digital.',
    '"Growth" is more of a mindset than a position. People who embrace this idea are not afraid to stretch boundaries and think outside the box to get results. Basically anyone who has an experimental mind.': '"Growth" es más una mentalidad que un puesto. Quienes adoptan esta idea no temen expandir límites y pensar distinto para lograr resultados. Básicamente, cualquiera con mentalidad experimental.',
    'LCS Account Strategist & Optimizer - Google Project': 'Estratega y Optimizadora de Cuentas LCS - Proyecto Google',
    'Specialized on Media and Entertainment, with cross-industry experience in Food & Beverage, Telco, Finance and Insurance. Managed YouTube, GDN and Search on multicultural accounts.': 'Especializada en Media y Entretenimiento, con experiencia transversal en Alimentos y Bebidas, Telco, Finanzas y Seguros. Gestioné YouTube, GDN y Search en cuentas multiculturales.',
    'SEO Semi Senior Analyst at Mercadolibre Inc.': 'Analista SEO Semi Senior en Mercadolibre Inc.',
    'SEO Semi Senior Analyst at Mercadolibre with focus on Classifieds Business Unit (Motors, Real Estate & Services). Specialist in keyword research and opportunity detection; started as Analyst Trainee.': 'Analista SEO Semi Senior en Mercadolibre con foco en la unidad de Clasificados (Autos, Inmuebles y Servicios). Especialista en keyword research y detección de oportunidades; comencé como Analista Trainee.',
    'Digital Graphic Designer and Public Relations': 'Diseñadora Gráfica Digital y Relaciones Públicas',
    'Designed and executed branding, communication and digital design initiatives for multi-format applications, including Android and iOS.': 'Diseñé y ejecuté iniciativas de branding, comunicación y diseño digital para aplicaciones multiformato, incluyendo Android e iOS.',
    'Administrative Assistant': 'Asistente Administrativa',
    'Administrative support across tax, labor and billing operations.': 'Soporte administrativo en operaciones impositivas, laborales y de facturación.',
    'Marketing Assistant': 'Asistente de Marketing',
    'Supported early-stage marketing initiatives focused on audience and demand growth.': 'Apoyé iniciativas de marketing en etapa temprana enfocadas en crecimiento de audiencias y demanda.',
    'Contributed to growth execution through lead generation and event follow-up.': 'Contribuí a la ejecución de crecimiento mediante generación de leads y seguimiento de eventos.',
    'Trainee - Fulbright Database Growth Area': 'Trainee - Área de Crecimiento de Base de Datos Fulbright',
    'Supported database growth initiatives through outreach, research and email campaigns.': 'Apoyé iniciativas de crecimiento de base de datos mediante outreach, investigación y campañas de email.',
    'Full-time · 4 yrs': 'Tiempo completo · 4 años',
    'Jun 2019 - Jun 2021 · 2 yrs 1 mo': 'Jun 2019 - Jun 2021 · 2 años 1 mes',
    'Feb 2018 - May 2019 · 1 yr 4 mos': 'Feb 2018 - May 2019 · 1 año 4 meses',
    'Sep 2015 - Dec 2017 · 2 yrs 4 mos': 'Sep 2015 - Dic 2017 · 2 años 4 meses',
    'Jan 2015 - Sep 2015 · 9 mos': 'Ene 2015 - Sep 2015 · 9 meses',
    'Nov 2013 - Apr 2015 · 1 yr 6 mos': 'Nov 2013 - Abr 2015 · 1 año 6 meses',
    'Mar 2013 - Sep 2014 · 1 yr 7 mos': 'Mar 2013 - Sep 2014 · 1 año 7 meses',
    'Jun 2012 - Aug 2012 · 3 mos': 'Jun 2012 - Ago 2012 · 3 meses',
    'Sep 2011 - Oct 2011 · 2 mos': 'Sep 2011 - Oct 2011 · 2 meses',
    'Nov 2010 - Apr 2011 · 6 mos': 'Nov 2010 - Abr 2011 · 6 meses',
    'Product Manager': 'Product Manager',
    'Senior Product Lead': 'Senior Product Lead',
    'Growth Marketing Manager': 'Gerente de Growth Marketing',
    'Acquisition Marketing Manager': 'Gerente de Marketing de Adquisición',
    'Specialized on Media and Entertainment Industry': 'Especialización en la industria de Media y Entretenimiento',
    'Food and Beverage, Telco, Finance & Insurance industry knowledge': 'Conocimiento de industrias de Alimentos y Bebidas, Telco, Finanzas y Seguros',
    'Managed YouTube, GDN and Search on multicultural accounts': 'Gestión de YouTube, GDN y Search en cuentas multiculturales',
    'Handling of contingencies': 'Gestión de contingencias',
    'Prioritization of tasks': 'Priorización de tareas',
    'Expectation setting': 'Definición de expectativas',
    'Changes and client management': 'Gestión de cambios y de clientes',
    'Attention to detail': 'Atención al detalle',
    'Team work': 'Trabajo en equipo',
    'Detection of opportunities': 'Detección de oportunidades',
    'Defined vision and roadmap for the Onboarding Squad, aligning business, compliance and user experience.': 'Definí visión y roadmap para el squad de Onboarding, alineando negocio, compliance y experiencia de usuario.',
    'Drove end-to-end digitalization of onboarding flows across collections and payments.': 'Impulsé la digitalización end-to-end de flujos de onboarding en cobranzas y pagos.',
    'Led cross-functional agile teams (UX, Tech, Data, Compliance).': 'Lideré equipos ágiles cross-funcionales (UX, Tech, Data, Compliance).',
    'Designed and implemented measurement frameworks to optimize conversion and performance.': 'Diseñé e implementé marcos de medición para optimizar conversión y rendimiento.',
    'Enabled cross-selling opportunities through ecosystem integration.': 'Habilité oportunidades de cross-selling mediante integración del ecosistema.',
    'Translated business objectives into structured product roadmaps.': 'Traduje objetivos de negocio en roadmaps de producto estructurados.',
    'Gathered stakeholder insights and aligned cross-functional teams.': 'Relevé insights de stakeholders y alineé equipos cross-funcionales.',
    'Facilitated agile ceremonies and ensured delivery quality.': 'Facilité ceremonias ágiles y aseguré calidad de entrega.',
    'Defined key metrics and leveraged user feedback for continuous iteration.': 'Definí métricas clave y aproveché feedback de usuarios para iteración continua.',
    'Connected product strategy with evolving market trends and customer needs.': 'Conecté la estrategia de producto con tendencias de mercado y necesidades de clientes.',
    'Team work lover: IT, UX, Growth, Commercial, Agencies, Marketing & Partners for API integrations': 'Amante del trabajo en equipo: IT, UX, Growth, Comercial, Agencias, Marketing y Partners para integraciones vía API',
    'Benchmarking of features and marketing tools': 'Benchmarking de funcionalidades y herramientas de marketing',
    'Mapping initiatives and prioritization': 'Mapeo de iniciativas y priorización',
    'Finding insights and creating dashboards': 'Búsqueda de insights y creación de dashboards',
    'Commercial and Agencies Q&A spaces': 'Espacios de Q&A con Comercial y Agencias',
    'Digital Marketing trainings: Also, creation of audiovisual marketing materials and support on special dates': 'Capacitaciones en Marketing Digital, además de creación de materiales audiovisuales y soporte en fechas especiales',
    'Responsible for carrying out strategies and actions related to: Acquisition | Branding | Product | SEO | Social networks | Press | Email marketing | Audience analysis | Conversion funnels | A/B testing': 'Responsable de ejecutar estrategias y acciones relacionadas con: Adquisición | Branding | Producto | SEO | Redes sociales | Prensa | Email marketing | análisis de audiencias | funnels de conversión | A/B testing',
    'Strategy, creation, optimizing and measuring of leads generation opportunities': 'Estrategia, creación, optimización y medición de oportunidades de generación de leads',
    'Strategy and hands-on management of digital marketing campaigns': 'Estrategia y gestión hands-on de campañas de marketing digital',
    'Budget distribution and control per campaign/channel': 'Distribución y control de presupuesto por campaña/canal',
    'Marketing acquisition communication': 'Comunicación de adquisición de marketing',
    'Keyword Research for Classifieds Business Unit (Motors, Real Estate & Services).': 'Keyword Research para la unidad de Clasificados (Autos, Inmuebles y Servicios).',
    'Specialist in Keyword Research and Detection Of Opportunities.': 'Especialista en Keyword Research y detección de oportunidades.',
    'Started as Analyst Trainee.': 'Comencé como Analyst Trainee.',
    'Work deliverable on time': 'Entregas en tiempo',
    'Strategic thinking': 'Pensamiento estratégico',
    'Work methodology': 'Metodología de trabajo',
    'Knowledge of UX and keyword research patterns': 'Conocimiento de UX y patrones de keyword research',
    'Innovation in presentations': 'Innovación en presentaciones',
    'Brand Book': 'Manual de marca',
    'Corporate Identity': 'Identidad corporativa',
    'Strategic Communication Plan': 'Plan estratégico de comunicación',
    'Products Communication': 'Comunicación de productos',
    'Advertising pieces': 'Piezas publicitarias',
    'New Year Cards': 'Tarjetas de fin de año',
    'Logos': 'Logos',
    'Corporate Stationery': 'Papelería corporativa',
    'Communication and digital design for application on Android and iOS': 'Comunicación y diseño digital para aplicaciones en Android e iOS',
    'Tax settlement: National, provincial and municipal taxes.': 'Liquidación impositiva: impuestos nacionales, provinciales y municipales.',
    'Labor settlement (Salaries, social security, Unions, Insurance, etc.)': 'Liquidación laboral (sueldos, cargas sociales, sindicatos, seguros, etc.)',
    'Billing': 'Facturación',
    'Market research and Audience reach strategy.': 'Investigación de mercado y estrategia de alcance de audiencias.',
    'Demand segmentation and lead generation.': 'Segmentación de demanda y generación de leads.',
    'Lead Generation and events follow up.': 'Generación de leads y seguimiento de eventos.',
    'Lead Generation': 'Generación de leads',
    'Social Media Research': 'Investigación en redes sociales',
    'E-mail Marketing': 'Email marketing',
    'Product Strategy · Agile Delivery · Digital Transformation · Data-Driven Optimization': 'Estrategia de Producto · Entrega Ágil · Transformación Digital · Optimización basada en datos',
    'Roadmapping · Stakeholder Alignment · Metrics & Iteration · Agile Leadership': 'Roadmapping · Alineación de stakeholders · Métricas e iteración · Liderazgo ágil',
    'Projects, MVPs and experiments: Smart Shopping integration | Facebook Shop | Instagram tagging | Google Analytics pixel | Facebook Pixel | Google Ads pixel | Search Console | GTM | Custom Scripts | PAds & Shops | Darwin Pilot | Continuity | Flash Darwin | ROAS experiments | Darwin roadmap': 'Proyectos, MVPs y experimentos: integración Smart Shopping | Facebook Shop | etiquetado en Instagram | pixel de Google Analytics | Facebook Pixel | pixel de Google Ads | Search Console | GTM | scripts custom | PAds & Shops | Darwin Pilot | Continuity | Flash Darwin | experimentos ROAS | roadmap Darwin',
    'Data analytics · Leadership': 'Analítica de datos · Liderazgo',
    'Tools & knowledge of: Google Adwords | Google Analytics | Google Tag Manager | HTML | SQL | Mixpanel | Whimsical': 'Herramientas y conocimientos: Google Adwords | Google Analytics | Google Tag Manager | HTML | SQL | Mixpanel | Whimsical',
    'Awards: Associate of the Year 2016 · Employee of the Quarter – Q2’16': 'Premios: Associate of the Year 2016 · Employee of the Quarter – Q2’16',
    'SEO · Keyword Research · UX': 'SEO · Keyword Research · UX',
    'Skills: Proactivity · Ownership · Empowerment · Consistency · Digital Design · Communication skills': 'Skills: Proactividad · Ownership · Empowerment · Consistencia · Diseño digital · Habilidades de comunicación',
    'Administrative Operations · Tax & Labor Processes': 'Operaciones administrativas · Procesos impositivos y laborales',
    'Audience Growth · Marketing Research': 'Crecimiento de audiencias · Investigación de marketing',
    'Growth Support · Event Operations': 'Soporte de growth · Operaciones de eventos',
    'Database Growth · Outreach': 'Crecimiento de base de datos · Outreach',
    'Product fundamentals for Product Owners': 'Fundamentos de producto para Product Owners',
    'Token App for businesses': 'Token App para empresas',
    'Metrics & Measurement frameworks': 'Métricas y marcos de medición',
    'Google Analytics & GA4': 'Google Analytics y GA4',
    'Google Tag Manager': 'Google Tag Manager',
    'Looker Studio': 'Looker Studio',
    'UX basics for product teams': 'Bases de UX para equipos de producto',
    'Product Leadership': 'Liderazgo de Producto',
    'Digital Strategy': 'Estrategia Digital',
    'Systems Thinking': 'Pensamiento Sistémico',
    'Cross-functional Teams': 'Equipos Cross-funcionales',
    'Human-Centered': 'Centrado en las Personas',
    'Fintech': 'Fintech',
    'Digital Transformation': 'Transformación Digital',
    'Agile Leadership': 'Liderazgo Ágil',
    'Data & Analytics': 'Datos y Analítica',
    'Marketing Solutions': 'Soluciones de Marketing',
    'E-commerce': 'E-commerce',
    'Analytics': 'Analítica',
    'Integrations': 'Integraciones',
    'Growth Marketing': 'Growth Marketing',
    'Digital Marketing': 'Marketing Digital',
    'Data Analytics': 'Analítica de Datos',
    'SEO': 'SEO',
    'A/B Testing': 'Pruebas A/B',
    'YouTube': 'YouTube',
    'GDN': 'GDN',
    'Search': 'Search',
    'Client Management': 'Gestión de Clientes',
    'Optimization': 'Optimización',
    'Keyword Research': 'Keyword Research',
    'UX': 'UX',
    'Innovation': 'Innovación',
    'Digital Design': 'Diseño Digital',
    'Branding': 'Branding',
    'Strategic Communication': 'Comunicación Estratégica',
    'Public Relations': 'Relaciones Públicas',
    'Administration': 'Administración',
    'Tax Settlement': 'Liquidación Impositiva',
    'Labor Settlement': 'Liquidación Laboral',
    'Market Research': 'Investigación de Mercado',
    'Audience Strategy': 'Estrategia de Audiencias',
    'Marketing': 'Marketing',
    'Event Follow-up': 'Seguimiento de Eventos',
    'Outreach': 'Outreach'
  }

  const tValue = (value?: string) => {
    if (!value) return ''
    if (isEnglish) return value
    return esMap[value] ?? value
  }

  const cardsPerPage = 5
  const totalPages = Math.ceil(projectsData.length / cardsPerPage)
  const carouselGap = 16
  const carouselCardWidth = 220
  const carouselTotalWidth = carouselCardWidth * cardsPerPage + carouselGap * (cardsPerPage - 1)

  const handleCardClick = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation()
    if (selectedProject === slug) {
      setSelectedProject('redbee')
    } else {
      setSelectedProject(slug)
    }
  }

  const selectedProjectData = selectedProject ? projectsData.find(p => p.slug === selectedProject) : null

  const localizedProjectData = selectedProjectData
    ? {
        ...selectedProjectData,
        title: tValue(selectedProjectData.title),
        summary: tValue(selectedProjectData.summary),
        description: tValue(selectedProjectData.description),
        duration: tValue(selectedProjectData.duration),
        tech: selectedProjectData.tech?.map((tag) => tValue(tag)) ?? [],
        roles: selectedProjectData.roles?.map((role) => ({
          ...role,
          title: tValue(role.title),
          period: tValue(role.period),
          responsibilities: role.responsibilities.map((resp) => tValue(resp)),
          focus: tValue(role.focus),
        })),
        talks: selectedProjectData.talks?.map((talk) => tValue(talk)),
      }
    : null

  const visibleProjects = projectsData.slice(
    pageIndex * cardsPerPage,
    (pageIndex + 1) * cardsPerPage
  )

  const nextPage = () => {
    setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
  }

  const prevPage = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0))
  }

  const getLinkMetaFromUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url)
      const host = parsedUrl.hostname.replace('www.', '')
      const pathSegment = parsedUrl.pathname
        .split('/')
        .filter(Boolean)
        .find((segment) => segment.includes('activity-') || segment.includes('_'))

      if (!pathSegment) {
        return {
          title: host,
          heading: isEnglish ? 'Open link' : uiText.openLink,
        }
      }

      const slugPart = pathSegment.includes('_') ? pathSegment.split('_').slice(1).join('_') : pathSegment
      const withoutActivity = slugPart.replace(/-activity-.*/, '')
      const decoded = decodeURIComponent(withoutActivity).replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
      const heading = decoded ? decoded.charAt(0).toUpperCase() + decoded.slice(1) : (isEnglish ? 'Open link' : uiText.openLink)

      return {
        title: host,
        heading,
      }
    } catch {
      return {
        title: isEnglish ? 'External link' : uiText.externalLink,
        heading: isEnglish ? 'Open link' : uiText.openLink,
      }
    }
  }

  return (
    <>
      <Helmet><title>Projects — Barbara Aceto</title></Helmet>
      
      <div className="w-full min-h-screen py-20 px-4" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm transition-colors mb-8"
            style={{ color: 'var(--accent-primary)' }}
          >
            ← {uiText.backHome}
          </Link>

          <div className="mb-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border" style={{ borderColor: 'var(--border-base)' }}>
                <img
                  src="/barbi baby.png"
                  alt="Barbara baby"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {uiText.heroTitle}
                </h2>
                <p className="text-sm md:text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {uiText.heroSubtitle}
                </p>
              </div>
            </div>
            <div className="mt-3 h-px w-full" style={{ backgroundColor: 'var(--border-base)' }}></div>
          </div>

          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
            {uiText.selectCard}
          </p>

          <div className="relative" onClick={() => { setSelectedProject('redbee'); setPageIndex(0); }}>
            {pageIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevPage(); }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 md:-translate-x-20 lg:-translate-x-28 w-10 h-10 rounded-full bg-white/90 border shadow-sm hover:bg-white transition-colors duration-200 z-10 flex items-center justify-center"
                style={{ borderColor: 'var(--border-base)', color: 'var(--text-muted)' }}
                aria-label={isEnglish ? 'Previous projects' : uiText.previousProjects}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {pageIndex < totalPages - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextPage(); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 md:translate-x-20 lg:translate-x-28 w-10 h-10 rounded-full bg-white/90 border shadow-sm hover:bg-white transition-colors duration-200 z-10 flex items-center justify-center"
                style={{ borderColor: 'var(--border-base)', color: 'var(--text-muted)' }}
                aria-label={isEnglish ? 'Next projects' : uiText.nextProjects}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div className="flex justify-center items-center gap-4 mb-8 min-h-[220px]">
            {visibleProjects.map((project) => {
              const initialCard = projectInitialCards[project.slug]
              const isSelected = selectedProject === project.slug
              const isRedbeeCard = project.slug === 'redbee'
              const isColoredCard = isSelected

              return (
                <div 
                  key={project.slug}
                  className="cursor-pointer transition-all duration-300 flex-shrink-0"
                  style={{ 
                    width: `${carouselCardWidth}px`, 
                    height: '220px',
                    position: 'relative',
                    zIndex: isSelected ? 5 : 1
                  }}
                  onClick={(e) => handleCardClick(e, project.slug)}
                >
                  <div className={`w-full h-full rounded-2xl p-4 flex flex-col gap-3 justify-center items-center text-center relative ${isSelected ? 'shadow-xl' : 'shadow-sm'}`}
                    style={{ 
                      backgroundColor: isColoredCard
                        ? (isRedbeeCard ? '#DC2626' : `${initialCard.borderColor}10`)
                        : '#FFFFFF',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: isColoredCard ? initialCard.borderColor : '#D1D5DB',
                    }}
                  >
                    <div className="text-3xl mb-2">{initialCard.emoji}</div>
                    <h3 className="text-base font-serif font-semibold" style={{ color: isColoredCard && isRedbeeCard ? '#FAF8F5' : '#0f172a' }}>
                      {isEnglish ? initialCard.title : initialCard.titleEs}
                    </h3>
                    <p className="text-xs leading-relaxed px-2" style={{ color: isColoredCard && isRedbeeCard ? '#FDECEC' : '#334155' }}>
                      {isEnglish ? initialCard.text : initialCard.textEs}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

          {localizedProjectData && (
            <div className="bg-white mt-8 p-8 animate-in fade-in slide-in-from-top-4 duration-500 mx-auto border rounded-2xl shadow-sm" style={{ maxWidth: `${carouselTotalWidth}px`, borderColor: 'var(--border-base)' }}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-serif font-semibold text-slate-900">
                  {localizedProjectData.title}
                </h2>
              </div>

              {localizedProjectData.duration && (
                <p className="text-sm text-slate-500 mb-4">{uiText.durationLabel}: {localizedProjectData.duration}</p>
              )}

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {localizedProjectData.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {localizedProjectData.tech?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#E7F3F2', color: '#2F7F78' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {localizedProjectData.roles && localizedProjectData.roles.length > 0 && (
                <div className="space-y-6 mb-8">
                  <h3 className="text-xl font-serif font-semibold text-slate-900">{uiText.roles}</h3>
                  {localizedProjectData.roles.map((role, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: 'var(--accent-primary)' }}>
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">
                        {role.title}
                      </h4>
                      <p className="text-sm text-slate-500 mb-3">{role.period}</p>
                      <ul className="space-y-2 mb-4">
                        {role.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm text-slate-700 flex">
                            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--accent-primary)' }}>•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">{uiText.focus}</p>
                      <p className="text-sm text-slate-700">{role.focus}</p>
                    </div>
                  ))}
                </div>
              )}

              {localizedProjectData.talks && localizedProjectData.talks.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif font-semibold text-slate-900 mb-4">
                    {uiText.talks}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {uiText.talksDesc}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {localizedProjectData.talks.map((talk, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start">
                        <span className="mr-2 flex-shrink-0" style={{ color: 'var(--accent-primary)' }}>•</span>
                        <span>{talk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(localizedProjectData.links?.demo || localizedProjectData.links?.repo || (localizedProjectData.links?.posts && localizedProjectData.links.posts.length > 0)) && (
                <div className="mt-8 p-5 rounded-xl border" style={{ borderColor: 'var(--border-base)', backgroundColor: '#FAFBFB' }}>
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-1">{uiText.featuredLink}</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {uiText.featuredLinkDesc(localizedProjectData.title)}
                  </p>
                  <div className="space-y-3">
                    {localizedProjectData.links?.posts?.map((postUrl) => {
                      const linkMeta = getLinkMetaFromUrl(postUrl)
                      return (
                      <div key={postUrl} className="rounded-lg border p-4" style={{ borderColor: 'var(--border-base)', backgroundColor: '#FFFFFF' }}>
                        <p className="text-xs uppercase tracking-wide font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                          {linkMeta.title}
                        </p>
                        <a
                          href={postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-serif text-2xl leading-tight transition-colors"
                          style={{ color: 'var(--accent-primary)' }}
                        >
                          {linkMeta.heading} ↗
                        </a>
                      </div>
                      )
                    })}
                    {localizedProjectData.links?.demo && (
                      (() => {
                        const linkMeta = getLinkMetaFromUrl(localizedProjectData.links.demo as string)
                        return (
                          <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-base)', backgroundColor: '#FFFFFF' }}>
                            <p className="text-xs uppercase tracking-wide font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                              {linkMeta.title}
                            </p>
                            <a
                              href={localizedProjectData.links?.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-serif text-2xl leading-tight transition-colors"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              {linkMeta.heading} ↗
                            </a>
                          </div>
                        )
                      })()
                    )}
                    {localizedProjectData.links?.repo && (
                      (() => {
                        const linkMeta = getLinkMetaFromUrl(localizedProjectData.links.repo as string)
                        return (
                          <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-base)', backgroundColor: '#FFFFFF' }}>
                            <p className="text-xs uppercase tracking-wide font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                              {linkMeta.title}
                            </p>
                            <a
                              href={localizedProjectData.links?.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-serif text-2xl leading-tight transition-colors"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              {linkMeta.heading} ↗
                            </a>
                          </div>
                        )
                      })()
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </>
  )
}
