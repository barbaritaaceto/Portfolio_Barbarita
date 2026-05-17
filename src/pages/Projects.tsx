import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import projectsData from '../data/projects'
import TimeEvolution from '../components/TimeEvolution'

// ─── Company metadata ─────────────────────────────────────────────────────────
const companyMeta: Record<string, { emoji: string; accent: string; primary: boolean }> = {
  'redbee':                              { emoji: '🐝', accent: '#C05A5A', primary: true  },
  'santander-argentina':                 { emoji: '🏦', accent: '#B85040', primary: true  },
  'mercado-libre':                       { emoji: '🛒', accent: '#A0820A', primary: true  },
  '123seguro':                           { emoji: '🛡️', accent: '#7050C0', primary: true  },
  'cognizant':                           { emoji: '💼', accent: '#4A4AB8', primary: true  },
  'globant':                             { emoji: '🌐', accent: '#237A3A', primary: true  },
  'freelance-digital-designer':          { emoji: '✍️', accent: '#0A7A7A', primary: false },
  'x-project-administrative-assistant': { emoji: '🗃️', accent: '#5A6070', primary: false },
  'yo-estoy-marketing-assistant':        { emoji: '👥', accent: '#1D5CB5', primary: false },
  'imanaging-marketing-assistant':       { emoji: '👥', accent: '#6030B0', primary: false },
  'fulbright-database-growth-trainee':   { emoji: '🤸', accent: '#0A7070', primary: false },
}

// ─── Company logos ────────────────────────────────────────────────────────────
const companyLogos: Record<string, string> = {
  'redbee':              '/redbee logo nuevo.png',
  'mercado-libre':       '/mercado libre logo nuevo.png',
  '123seguro':           '/123seguros.png',
  'cognizant':           '/cognizant.png',
  'globant':             '/globant logo nuevo.png',
  'santander-argentina': '/santander.png',
}

// ─── Extra logos (secondary) — shown alongside the main logo ─────────────────
const companyLogosExtra: Record<string, string> = {
  'cognizant': '/google .jpeg',
  'globant':   '/mercado libre logo nuevo.png',
}

// ─── Company start years ──────────────────────────────────────────────────────
const companyYears: Record<string, number> = {
  'redbee':                              2025,
  'santander-argentina':                 2021,
  'mercado-libre':                       2019,
  '123seguro':                           2018,
  'cognizant':                           2015,
  'globant':                             2015,
  'freelance-digital-designer':          2013,
  'x-project-administrative-assistant': 2013,
  'yo-estoy-marketing-assistant':        2012,
  'imanaging-marketing-assistant':       2011,
  'fulbright-database-growth-trainee':   2010,
}

// ─── Timeline node phrases ────────────────────────────────────────────────────
const timelinePhrases: Record<string, { es: string; en: string }> = {
  'redbee':                              { es: 'Estrategia, sistemas y cultura. Todo a la vez.',                   en: 'Strategy, systems and culture. All at once.' },
  'santander-argentina':                 { es: 'Reduciendo fricción en sistemas financieros complejos.',           en: 'Reducing friction in complex financial systems.' },
  'mercado-libre':                       { es: 'Aprendiendo a diseñar para millones.',                             en: 'Learning to design for millions.' },
  '123seguro':                           { es: 'Growth como mentalidad, no como puesto.',                          en: 'Growth as a mindset, not a job title.' },
  'cognizant':                           { es: 'Escala, multicultural, decisiones bajo presión.',                  en: 'Scale, multicultural, decisions under pressure.' },
  'globant':                             { es: 'Donde los datos se convirtieron en curiosidad de producto.',        en: 'Where data turned into product curiosity.' },
  'freelance-digital-designer':          { es: 'Construyendo identidades visuales desde cero.',                    en: 'Building visual identities from scratch.' },
  'x-project-administrative-assistant': { es: 'La disciplina de los procesos detallados.',                        en: 'The discipline of detailed processes.' },
  'yo-estoy-marketing-assistant':        { es: 'Primeros pasos en estrategia de audiencias.',                      en: 'First steps in audience strategy.' },
  'imanaging-marketing-assistant':       { es: 'Ejecución y seguimiento consistentes.',                            en: 'Consistent execution and follow-up.' },
  'fulbright-database-growth-trainee':   { es: 'Growth y expansión de base de datos.',                            en: 'Growth and database expansion.' },
}

// ─── Editorial learnings ──────────────────────────────────────────────────────
const learnings: Record<string, { es: string; en: string }> = {
  'redbee': {
    es: 'La IA nos atraviesa por todos lados, y el desafío no es solo tecnológico: es entender cómo cambia la forma en que construimos, decidimos y colaboramos. Estoy en el centro de eso, y lo disfruto.',
    en: 'AI is everywhere, and the challenge is not just technical: it is understanding how it changes the way we build, decide and collaborate. I am right in the middle of that, and I enjoy it.',
  },
  'santander-argentina': {
    es: 'La tecnología sola no transforma procesos. La adopción real ocurre cuando negocio, operación y UX se alinean.',
    en: 'Technology alone does not transform processes. Real adoption happens when business, operations and UX align.',
  },
  'mercado-libre': {
    es: 'Escalar para millones te obliga a pensar en sistemas, no en features. La simplicidad es el resultado de mucho trabajo invisible.',
    en: 'Scaling for millions forces you to think in systems, not features. Simplicity is the result of a lot of invisible work.',
  },
  '123seguro': {
    es: 'Growth no es solo adquisición. Es entender por qué alguien se queda y por qué se va. La experimentación constante cambia la forma de tomar decisiones — hace que la intuición y los datos trabajen juntos.',
    en: 'Growth is not just acquisition. It is understanding why someone stays and why they leave. Constant experimentation changes how you make decisions — it makes intuition and data work together.',
  },
  'cognizant': {
    es: 'Trabajar con clientes de industrias muy distintas me enseñó a contextualizar rápido y a priorizar con información incompleta. Eso es una habilidad central del producto.',
    en: 'Working with clients from very different industries taught me to contextualize quickly and prioritize with incomplete information. That is a core product skill.',
  },
  'globant': {
    es: 'SEO fue mi primer contacto real con la intersección entre datos y comportamiento de usuario. Ahí empezó mi curiosidad por el producto y por entender cómo la gente busca y decide.',
    en: 'SEO was my first real contact with the intersection between data and user behavior. That is where my curiosity for product started — and for understanding how people search and decide.',
  },
  'freelance-digital-designer': {
    es: 'El diseño me enseñó que la comunicación tiene estructura invisible. Eso se tradujo directamente en cómo pienso roadmaps, presentaciones y jerarquía de información.',
    en: 'Design taught me that communication has invisible structure. That directly translated into how I think about roadmaps, presentations and information hierarchy.',
  },
  'x-project-administrative-assistant': {
    es: 'Aprendí la disciplina de los procesos detallados y el valor de la precisión operativa. Una base que nunca subestimo.',
    en: 'I learned the discipline of detailed processes and the value of operational precision. A foundation I never underestimate.',
  },
  'yo-estoy-marketing-assistant': {
    es: 'Entender a quién le hablás es siempre el primer paso de cualquier producto o campaña. Acá lo aprendí desde la práctica.',
    en: 'Understanding who you are talking to is always the first step of any product or campaign. I learned that here through practice.',
  },
  'imanaging-marketing-assistant': {
    es: 'El seguimiento consistente y la ejecución son habilidades que no se enseñan en cursos. Se aprenden haciéndolo.',
    en: 'Consistent follow-up and execution are skills not taught in courses. They are learned by doing.',
  },
  'fulbright-database-growth-trainee': {
    es: 'Mis primeros contactos con growth y expansión de base. El outreach bien hecho tiene más de producto que de marketing.',
    en: 'My first contacts with growth and database expansion. Good outreach has more of product than marketing in it.',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedSlug, setSelectedSlug] = useState('redbee')
  const [showEarlyCareer, setShowEarlyCareer] = useState(false)
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
        heroSubtitle: 'The context changed. Not the essence.',
        heroThirdLine: 'Each stage evolved the way I build product.',
        contextLabel: 'Context',
        rolesLabel: 'Roles & Responsibilities',
        focusLabel: 'Focus',
        learningLabel: 'What I Learned',
        skillsLabel: 'Skills',
        talksLabel: 'Product Talks & Knowledge Sharing',
        talksDesc: 'Delivered internal talks and trainings on:',
        linksLabel: 'Featured Link',
        linksDesc: (title: string) => `Explore a related publication from the ${title} experience.`,
        earlyCareerLabel: 'Show early career',
        hideEarlyCareerLabel: 'Hide early career',
        openLink: 'Open link',
        externalLink: 'External link',
      }
    : {
        backHome: 'Volver al inicio',
        heroTitle: 'Haciendo ruido desde 1989',
        heroSubtitle: 'Cambió el contexto. No la esencia.',
        heroThirdLine: 'Cada etapa evolucionó mi forma de construir producto.',
        contextLabel: 'Contexto',
        rolesLabel: 'Roles y Responsabilidades',
        focusLabel: 'Foco',
        learningLabel: 'Lo que aprendí',
        skillsLabel: 'Skills',
        talksLabel: 'Charlas de Producto y Compartir Conocimiento',
        talksDesc: 'Di charlas internas y capacitaciones sobre:',
        linksLabel: 'Enlace destacado',
        linksDesc: (title: string) => `Explorá una publicación relacionada con la experiencia en ${title}.`,
        earlyCareerLabel: 'Ver primeros pasos',
        hideEarlyCareerLabel: 'Ocultar primeros pasos',
        openLink: 'Abrir enlace',
        externalLink: 'Enlace externo',
      }

  // ─── Translations map (kept intact for localization) ─────────────────────────
  const esMap: Record<string, string> = {
    'redbee': 'redbee',
    'Traversing the opportunity to challenge myself professionally building a home banking product, creating with AI, and shaping product and team processes.': 'Atravesando la oportunidad de desafiarme como profesional en la construcción de un home banking, creando con AI, producto y procesos de equipo.',
    'Building digital banking experiences for web, mobile and AI channels.': 'Construyendo experiencias de banca digital para canales web, mobile e IA.',
    'Designing products centered on users and complex operations.': 'Diseñando productos centrados en usuarios y operaciones complejas.',
    'Coordinating Product, UX, QA and Technology teams.': 'Coordinando equipos de Producto, UX, QA y Tecnología.',
    'Driving conversational assistants powered by artificial intelligence.': 'Impulsando asistentes conversacionales con inteligencia artificial.',
    'Managing roadmaps, releases and high-impact deployments.': 'Gestionando roadmaps, releases y despliegues de alto impacto.',
    'Transforming legacy processes into simple digital experiences.': 'Transformando procesos legacy en experiencias digitales simples.',
    'Product leadership within a high-impact digital ecosystem.': 'Liderazgo de producto dentro de un ecosistema digital de alto impacto.',
    'Bee Manager': 'Bee Manager',
    'Shaping product direction and delivery quality across high-impact client projects.': 'Definiendo dirección de producto y calidad de entrega en proyectos de clientes de alto impacto.',
    'Connecting business strategy with execution across cross-functional teams.': 'Conectando estrategia de negocio con ejecución en equipos cross-funcionales.',
    'Building a collaborative, human-centered culture within consulting environments.': 'Construyendo una cultura colaborativa y centrada en las personas dentro de entornos de consultoría.',
    'Driving continuous learning and product thinking across teams.': 'Impulsando aprendizaje continuo y pensamiento de producto en los equipos.',
    'Product Leadership · Strategy · Systems Thinking · Human-Centered Culture': 'Liderazgo de Producto · Estrategia · Pensamiento Sistémico · Cultura Centrada en las Personas',
    'Product leadership across the Collections & Payments digital ecosystem.': 'Liderazgo de producto en el ecosistema digital de Cobranzas y Pagos.',
    'Defined and executed onboarding strategy, aligned cross-functional teams, and built data-driven measurement frameworks to accelerate digital transformation and optimize performance.': 'Definí y ejecuté la estrategia de onboarding, alineé equipos cross-funcionales y construí marcos de medición basados en datos para acelerar la transformación digital y optimizar el rendimiento.',
    'Product Senior at Mercado Shops | Proud Darwin TTTL': 'Product Senior en Mercado Shops | Orgullosa Darwin TTTL',
    'Leading Darwin Project for LATAM. Providing friendly marketing solutions during two incredible years.': 'Liderando el Proyecto Darwin para LATAM. Brindando soluciones de marketing durante dos años increíbles.',
    'Insurance technology and digital customer experience.': 'Tecnología de seguros y experiencia de cliente digital.',
    '"Growth" is more of a mindset than a position. People who embrace this idea are not afraid to stretch boundaries and think outside the box to get results. Basically anyone who has an experimental mind.': '"Growth" es más una mentalidad que un puesto. Quienes adoptan esta idea no temen expandir límites y pensar distinto para lograr resultados. Básicamente, cualquiera con mentalidad experimental.',
    'LCS Account Strategist & Optimizer - Google Project': 'Estratega y Optimizadora de Cuentas LCS - Proyecto Google',
    'Understanding the world of Media and Entertainment, with cross-industry experience in Food & Beverage, Telco, Finance and Insurance, among others. Managed YouTube, GDN and Search on multicultural accounts.': 'Entendiendo el mundo de Medios y Entretenimiento, con experiencia transversal en Alimentos y Bebidas, Telco, Finanzas y Seguros, entre otros. Gestioné YouTube, GDN y Search en cuentas multiculturales.',
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
    'Awards: Associate of the Year 2016 · Employee of the Quarter – Q2\u201916': 'Premios: Associate of the Year 2016 · Employee of the Quarter – Q2\u201916',
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
    'Outreach': 'Outreach',
    'Product Strategy': 'Estrategia de Producto',
    'Strategic Thinking': 'Pensamiento Estratégico',
    'Santander': 'Santander',
    'Mercado Libre': 'Mercado Libre',
    '123Seguro': '123Seguro',
    'Cognizant': 'Cognizant',
    'Google · Cognizant': 'Google · Cognizant',
    'Globant': 'Globant',
    'Freelance Project': 'Proyecto Freelance',
    'X Project S.A.': 'X Project S.A.',
    'Yo Estoy': 'Yo Estoy',
    'Imanaging': 'Imanaging',
    'Comisión Fulbright Argentina': 'Comisión Fulbright Argentina',
  }

  const tValue = (value?: string): string => {
    if (!value) return ''
    if (isEnglish) return value
    return esMap[value] ?? value
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
        return { title: host, heading: uiText.openLink }
      }
      const slugPart = pathSegment.includes('_') ? pathSegment.split('_').slice(1).join('_') : pathSegment
      const withoutActivity = slugPart.replace(/-activity-.*/, '')
      const decoded = decodeURIComponent(withoutActivity).replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
      const heading = decoded ? decoded.charAt(0).toUpperCase() + decoded.slice(1) : uiText.openLink
      return { title: host, heading }
    } catch {
      return { title: uiText.externalLink, heading: uiText.openLink }
    }
  }

  // ─── Derived data ─────────────────────────────────────────────────────────────
  const primaryProjects = projectsData.filter(p => companyMeta[p.slug]?.primary)
  const earlyProjects   = projectsData.filter(p => !companyMeta[p.slug]?.primary)
  const sortedPrimary   = [...primaryProjects].sort((a, b) => (companyYears[b.slug] ?? 0) - (companyYears[a.slug] ?? 0))
  const sortedEarly     = [...earlyProjects].sort((a, b) => (companyYears[b.slug] ?? 0) - (companyYears[a.slug] ?? 0))

  const selectedProject = projectsData.find(p => p.slug === selectedSlug) ?? projectsData[0]
  const currentMeta     = companyMeta[selectedSlug] ?? { emoji: '💼', accent: 'var(--accent-primary)', primary: true }
  const currentPhrase   = timelinePhrases[selectedSlug]
  const currentLearning = learnings[selectedSlug]

  const localizedProject = {
    ...selectedProject,
    title:       tValue(selectedProject.title),
    description: tValue(selectedProject.description),
    duration:    tValue(selectedProject.duration),
    tech:        selectedProject.tech?.map(tValue) ?? [],
    roles:       selectedProject.roles?.map(role => ({
      ...role,
      title:            tValue(role.title),
      period:           tValue(role.period),
      responsibilities: role.responsibilities.map(tValue),
      focus:            tValue(role.focus),
    })),
    talks: selectedProject.talks?.map(tValue),
  }

  // ─── Section label style ───────────────────────────────────────────────────
  const sectionLabel = (text: string) => (
    <p
      className="text-[10px] font-semibold uppercase mb-3 tracking-[0.14em]"
      style={{ color: 'var(--text-muted)' }}
    >
      {text}
    </p>
  )

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet><title>Projects — Barbara Aceto</title></Helmet>

      {/* Keyframe animation for panel */}
      <style>{`
        @keyframes panelFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .panel-enter { animation: panelFadeUp 0.28s ease both; }
      `}</style>

      <div className="w-full min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">

          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center text-sm mb-10 transition-colors"
            style={{ color: 'var(--accent-primary)' }}
          >
            ← {uiText.backHome}
          </Link>

          {/* ── MAIN: vertical timeline left + content right ─────────────── */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 items-start">

            {/* ── LEFT: image + vertical timeline ──────────────────────── */}
            <div className="flex-shrink-0 flex flex-row sm:flex-col gap-4 sm:gap-0 sm:w-[188px]">

              {/* Slider image */}
              <div className="flex-shrink-0">
                <TimeEvolution isEnglish={isEnglish} />
              </div>

              {/* Vertical timeline — line starts from below the image */}
              <div className="relative flex-1 min-w-0 sm:flex-none mt-0 sm:mt-3" style={{ paddingLeft: 20 }}>
                {/* Vertical line */}
                <div
                  className="absolute top-0 bottom-0"
                  style={{ left: 6, width: 0.5, backgroundColor: 'var(--border-base)' }}
                />

                {/* Primary career items */}
                {sortedPrimary.map(project => {
                  const isActive = selectedSlug === project.slug
                  const meta     = companyMeta[project.slug]
                  const year     = companyYears[project.slug]
                  return (
                    <button
                      key={project.slug}
                      onClick={() => setSelectedSlug(project.slug)}
                      className="relative w-full text-left pb-4 focus:outline-none"
                      aria-pressed={isActive}
                    >
                      <span
                        className="absolute rounded-full transition-all duration-200"
                        style={{
                          left: isActive ? -15 : -13, top: 5,
                          width: isActive ? 9 : 7, height: isActive ? 9 : 7,
                          backgroundColor: isActive ? meta.accent : 'var(--border-base)',
                          boxShadow: isActive ? `0 0 0 3px ${meta.accent}28` : 'none',
                        }}
                      />
                      <span
                        className="block text-[10px] leading-none mb-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      >{year}</span>
                      <span
                        className="block text-xs font-medium leading-snug transition-colors"
                        style={{ color: isActive ? meta.accent : 'var(--text-primary)' }}
                      >{tValue(project.title)}</span>
                    </button>
                  )
                })}

                {/* Early-career toggle */}
                <button
                  onClick={() => setShowEarlyCareer(v => !v)}
                  className="relative w-full text-left py-2 focus:outline-none group"
                  aria-pressed={showEarlyCareer}
                >
                  <span
                    className="absolute rounded-full transition-all duration-200"
                    style={{
                      left: -14, top: 13,
                      width: 8, height: 8,
                      backgroundColor: showEarlyCareer ? 'var(--accent-primary)' : 'var(--border-base)',
                    }}
                  />
                  <span
                    className="text-xs font-medium transition-colors"
                    style={{ color: 'var(--accent-primary)', opacity: showEarlyCareer ? 1 : 0.7 }}
                  >
                    {showEarlyCareer
                      ? (isEnglish ? '↓ hide early' : '↓ ocultar inicios')
                      : (isEnglish ? '↓ early career' : '↓ inicios')}
                  </span>
                </button>

                {/* Early career items */}
                {showEarlyCareer && sortedEarly.map(project => {
                  const isActive = selectedSlug === project.slug
                  const meta     = companyMeta[project.slug]
                  const year     = companyYears[project.slug]
                  return (
                    <button
                      key={project.slug}
                      onClick={() => setSelectedSlug(project.slug)}
                      className="relative w-full text-left pb-4 focus:outline-none"
                      aria-pressed={isActive}
                    >
                      <span
                        className="absolute rounded-full transition-all duration-200"
                        style={{
                          left: isActive ? -15 : -13, top: 5,
                          width: isActive ? 9 : 7, height: isActive ? 9 : 7,
                          backgroundColor: isActive ? meta.accent : 'var(--border-base)',
                          boxShadow: isActive ? `0 0 0 3px ${meta.accent}28` : 'none',
                        }}
                      />
                      <span
                        className="block text-[10px] leading-none mb-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      >{year}</span>
                      <span
                        className="block text-xs font-medium leading-snug transition-colors"
                        style={{ color: isActive ? meta.accent : 'var(--text-secondary)' }}
                      >{tValue(project.title)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── RIGHT: intro text + experience panel ─────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Intro text */}
              <div className="mb-8">
                <h1
                  className="font-serif text-2xl md:text-3xl font-semibold leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {uiText.heroTitle}
                </h1>
                <p className="text-sm md:text-base mt-1 italic" style={{ color: 'var(--text-secondary)' }}>
                  {uiText.heroSubtitle}
                </p>
                <p className="text-sm md:text-base mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {uiText.heroThirdLine}
                </p>
              </div>

              {/* Experience panel */}
              <div key={selectedSlug} className="panel-enter">

                {/* Company hero */}
                <div
                  className="rounded-2xl p-5 md:p-6 mb-10 border"
                  style={{
                    borderColor: 'var(--border-base)',
                    borderLeft:  `4px solid ${currentMeta.accent}`,
                    backgroundColor: 'var(--card-bg)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {companyLogos[selectedSlug] ? (
                        <div className="flex items-center gap-3 mb-2">
                          {companyLogosExtra[selectedSlug] && (
                            <img
                              src={companyLogosExtra[selectedSlug]}
                              alt={selectedSlug === 'cognizant' ? 'Google' : 'Mercado Libre'}
                              className="object-contain rounded"
                              style={{ maxHeight: selectedSlug === 'globant' ? 52 : 64, maxWidth: 100 }}
                            />
                          )}
                          <img
                            src={companyLogos[selectedSlug]}
                            alt={localizedProject.title}
                            className="object-contain rounded"
                            style={{
                              maxHeight: ['globant', '123seguro', 'mercado-libre'].includes(selectedSlug) ? (selectedSlug === 'globant' ? 60 : 52) : selectedSlug === 'redbee' ? 48 : selectedSlug === 'cognizant' ? 26 : 36,
                              maxWidth: 160,
                              backgroundColor: 'transparent',
                              padding: 0,
                              borderRadius: 0,
                            }}
                          />
                        </div>
                      ) : (
                        <h2
                          className="font-serif text-xl md:text-2xl font-semibold leading-tight"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {localizedProject.title}
                        </h2>
                      )}
                      {localizedProject.duration && (
                        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                          {localizedProject.duration}
                        </p>
                      )}

                    </div>
                  </div>
                </div>

                {/* Context */}
                <section className="mb-10">
                  {sectionLabel(uiText.contextLabel)}
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {localizedProject.description}
                  </p>
                </section>

                {/* Roles */}
                {localizedProject.roles && localizedProject.roles.length > 0 && (
                  <section className="mb-10">
                    {sectionLabel(uiText.rolesLabel)}
                    <div className="space-y-8">
                      {localizedProject.roles.map((role, i) => (
                        <div key={i}>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {role.title}
                          </p>
                          <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--text-muted)' }}>
                            {role.period}
                          </p>
                          <ul className="space-y-2 mb-3">
                            {role.responsibilities.map((resp, j) => (
                              <li key={j} className="flex items-start gap-2.5">
                                <span
                                  className="mt-[7px] flex-shrink-0 rounded-full"
                                  style={{
                                    width:           5,
                                    height:          5,
                                    backgroundColor: currentMeta.accent,
                                    opacity:         0.55,
                                  }}
                                />
                                <span
                                  className="text-sm leading-relaxed"
                                  style={{ color: 'var(--text-secondary)' }}
                                >
                                  {resp}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {role.focus && (
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                              {role.focus}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Lo que aprendí */}
                {currentLearning && (
                  <section className="mb-10">
                    {sectionLabel(uiText.learningLabel)}
                    <div
                      className="border-l-2 pl-5 py-1"
                      style={{ borderColor: currentMeta.accent }}
                    >
                      <p
                        className="font-serif italic text-base md:text-lg leading-relaxed"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {isEnglish ? currentLearning.en : currentLearning.es}
                      </p>
                    </div>
                  </section>
                )}

                {/* Skills */}
                {localizedProject.tech && localizedProject.tech.length > 0 && (
                  <section className="mb-10">
                    {sectionLabel(uiText.skillsLabel)}
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {localizedProject.tech.map(tag => (
                        <span
                          key={tag}
                          className="text-xs font-medium"
                          style={{ color: currentMeta.accent }}
                        >
                          + {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Talks */}
                {localizedProject.talks && localizedProject.talks.length > 0 && (
                  <section className="mb-10">
                    {sectionLabel(uiText.talksLabel)}
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {uiText.talksDesc}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {localizedProject.talks.map((talk, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium"
                          style={{ color: currentMeta.accent }}
                        >
                          + {talk}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Links */}
                {(localizedProject.links?.demo || localizedProject.links?.repo ||
                  (localizedProject.links?.posts && localizedProject.links.posts.length > 0)) && (
                  <section className="mb-10">
                    {sectionLabel(uiText.linksLabel)}
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {uiText.linksDesc(localizedProject.title)}
                    </p>
                    <div className="space-y-3">
                      {localizedProject.links?.posts?.map(postUrl => {
                        const lm = getLinkMetaFromUrl(postUrl)
                        return (
                          <div
                            key={postUrl}
                            className="rounded-xl border p-4"
                            style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)' }}
                          >
                            <p
                              className="text-[10px] uppercase tracking-[0.13em] font-semibold mb-1"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              {lm.title}
                            </p>
                            <a
                              href={postUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-serif text-base leading-snug transition-colors"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              {lm.heading} ↗
                            </a>
                          </div>
                        )
                      })}
                      {localizedProject.links?.demo && (() => {
                        const lm = getLinkMetaFromUrl(localizedProject.links!.demo as string)
                        return (
                          <div
                            className="rounded-xl border p-4"
                            style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)' }}
                          >
                            <p
                              className="text-[10px] uppercase tracking-[0.13em] font-semibold mb-1"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              {lm.title}
                            </p>
                            <a
                              href={localizedProject.links!.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-serif text-base leading-snug transition-colors"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              {lm.heading} ↗
                            </a>
                          </div>
                        )
                      })()}
                      {localizedProject.links?.repo && (() => {
                        const lm = getLinkMetaFromUrl(localizedProject.links!.repo as string)
                        return (
                          <div
                            className="rounded-xl border p-4"
                            style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)' }}
                          >
                            <p
                              className="text-[10px] uppercase tracking-[0.13em] font-semibold mb-1"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              {lm.title}
                            </p>
                            <a
                              href={localizedProject.links!.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-serif text-base leading-snug transition-colors"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              {lm.heading} ↗
                            </a>
                          </div>
                        )
                      })()}
                    </div>
                  </section>
                )}

            </div>
            {/* end panel-enter */}

            </div>
            {/* end right column */}
          </div>
          {/* end flex layout */}

        </div>
      </div>
    </>
  )
}
