import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import press from '../data/press';
import notesData from '../data/notes';
import HomeTour from '../components/HomeTour';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('lang') === 'en';
  });

  useEffect(() => {
    const syncLanguage = () => {
      if (typeof window === 'undefined') return;
      setIsEnglish(window.localStorage.getItem('lang') === 'en');
    };

    window.addEventListener('storage', syncLanguage);
    window.addEventListener('app-language-change', syncLanguage as EventListener);
    return () => {
      window.removeEventListener('storage', syncLanguage);
      window.removeEventListener('app-language-change', syncLanguage as EventListener);
    };
  }, []);
  const scrollToWhyAndWork = () => {
    const whyStartElement = document.getElementById('why-work-start');
    if (whyStartElement) {
      const targetTop = whyStartElement.getBoundingClientRect().top + window.pageYOffset - 12;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };
  const scrollToEnd = () => {
    const endElement = document.getElementById('home-end');
    if (endElement) {
      endElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  const scrollToNews = () => {
    const newsStartElement = document.getElementById('news-start');
    if (newsStartElement) {
      newsStartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const homeText = isEnglish
    ? {
        whyTitle: 'Why I Build',
        wayTitle: 'The Way I Work',
        whyLine1: 'Over the years I understood that most of the work in product is not just about ideas.',
        whyLine2: 'It lives in understanding context, aligning people, testing hypotheses and making decisions while things keep changing.',
        whyHighlight: 'That is where I like to work.',
        wayIntro: 'My way of working evolved over the years. Today I prioritize context, learning and decisions with clear direction.',
        newsTitle: 'Thinking, Product & Shared Learning',
        newsSubtitle: 'A curated selection of notes, publications and conversations on product, AI, strategy and teams.',
        readArticle: 'Read publication →',
        noteLabel: 'NOTE',
        readNote: 'See on LinkedIn →',
        scrollWhyAria: 'Scroll to Why I Build and The Way I Work',
        scrollNewsAria: 'Scroll to news section',
        closeModalAria: 'Close modal',
        modalTitle: "Let's build something meaningful.",
        modalSubtitle: "If you're building a product, leading a team or exploring how to apply AI in real contexts, I'd love to connect.",
        modalChip1: 'Digital product',
        modalChip2: 'Applied AI',
        modalChip3: 'Strategy & teams',
        modalWhatsApp: 'Message on WhatsApp',
        modalEmail: 'Send email',
        modalFooter: 'Also happy to connect if you want to share an idea, an opportunity, or just talk about product and AI.',
      }
    : {
        whyTitle: 'Por qué construyo',
        wayTitle: 'Cómo trabajo',
        whyLine1: 'Con el tiempo entendí que gran parte del trabajo en producto no está solo en las ideas.',
        whyLine2: 'Está en entender contexto, alinear personas, validar hipótesis y tomar decisiones mientras las cosas cambian.',
        whyHighlight: 'Ahí es donde más me gusta trabajar.',
        wayIntro: 'Mi forma de trabajar fue cambiando con los años. Hoy priorizo contexto, aprendizaje y decisiones con dirección.',
        newsTitle: 'Pensamiento, producto y aprendizaje compartido',
        newsSubtitle: 'Una selección de notas, publicaciones y conversaciones sobre producto, AI, estrategia y equipos.',
        readArticle: 'Leer publicación →',
        noteLabel: 'NOTA',
        readNote: 'Ver en LinkedIn →',
        scrollWhyAria: 'Ir a Por qué construyo y Mi forma de trabajar',
        scrollNewsAria: 'Ir a la sección de noticias',
        closeModalAria: 'Cerrar modal',
        modalTitle: 'Construyamos algo con sentido.',
        modalSubtitle: 'Si estás construyendo un producto, liderando un equipo o explorando cómo aplicar IA en contextos reales, me encantará conversar.',
        modalChip1: 'Producto digital',
        modalChip2: 'IA aplicada',
        modalChip3: 'Estrategia y equipos',
        modalWhatsApp: 'Escribirme por WhatsApp',
        modalEmail: 'Enviar email',
        modalFooter: 'También podés escribirme si querés compartir una idea, una oportunidad o simplemente conversar sobre producto e IA.',
      };

  const workSteps = isEnglish
    ? [
        {
          number: '01',
          label: 'DISCOVERY',
          title: 'Understand before building',
          description: 'Before moving a roadmap, I need to understand how business, users, operations and technology coexist.',
          highlight: false,
        },
        {
          number: '02',
          label: 'HYPOTHESES',
          title: 'Validate hypotheses',
          description: 'I use signals, behavior and continuous learning to reduce uncertainty and make better decisions.',
          highlight: false,
        },
        {
          number: '03',
          label: 'DELIVERY',
          title: 'Build close to reality',
          description: 'I prefer teams connected to the problem over perfect processes disconnected from real impact.',
          highlight: false,
        },
        {
          number: '04',
          label: 'LEARNING LOOP',
          title: 'Evolve continuously',
          description: 'Experimenting, iterating and learning is not a phase. It is part of the product.',
          highlight: true,
        },
      ]
    : [
        {
          number: '01',
          label: 'DISCOVERY',
          title: 'Entender antes de construir',
          description: 'Antes de mover un roadmap, necesito entender cómo conviven negocio, usuarios, operación y tecnología.',
          highlight: false,
        },
        {
          number: '02',
          label: 'HIPÓTESIS',
          title: 'Validar hipótesis',
          description: 'Uso señales, comportamiento y aprendizaje continuo para reducir incertidumbre y tomar mejores decisiones.',
          highlight: false,
        },
        {
          number: '03',
          label: 'DELIVERY',
          title: 'Construir cerca de la realidad',
          description: 'Prefiero equipos conectados al problema antes que procesos perfectos alejados del impacto real.',
          highlight: false,
        },
        {
          number: '04',
          label: 'LEARNING LOOP',
          title: 'Evolucionar continuamente',
          description: 'Experimentar, iterar y aprender no es una etapa del proceso. Es parte del producto.',
          highlight: true,
        },
      ];

  const dateLocale = isEnglish ? 'en-US' : 'es-AR';

  const newsCards = [
    ...press.filter((item) => item.title !== 'Leader in AI Product').slice(0, 6).map((item) => ({
      slug: item.slug,
      outlet: item.outlet,
      title: item.title,
      excerpt: item.excerpt,
      url: item.url,
      date: item.date,
      image: item.image,
    })),
  ].slice(0, 3);

  const localizedNewsCards = newsCards.map((item) => ({
    ...item,
    outlet: isEnglish ? (item as { outletEn?: string }).outletEn || item.outlet : item.outlet,
    title: isEnglish ? (item as { titleEn?: string }).titleEn || item.title : item.title,
    excerpt: isEnglish ? (item as { excerptEn?: string }).excerptEn || item.excerpt : item.excerpt,
  }));

  const newsCardMeta: Record<string, { label: string; shortExcerpt: string }> = {
    'press-4': {
      label: 'FEATURED ARTICLE',
      shortExcerpt: isEnglish
        ? 'How to transform scattered information into actionable learning using AI inside real organizations.'
        : 'Cómo transformar información dispersa en aprendizaje accionable usando AI dentro de organizaciones reales.',
    },
    'press-5': {
      label: 'TALK',
      shortExcerpt: isEnglish
        ? 'AI applied to product, UX and technology — from fundamentals to real practice and shared learning.'
        : 'IA aplicada a producto, UX y tecnología — desde fundamentos hasta práctica real y aprendizaje compartido.',
    },
    'press-6': {
      label: 'LINKEDIN POST',
      shortExcerpt: isEnglish
        ? 'Strategy and product mindset: each move has impact, and real mastery lives in intention.'
        : 'Estrategia y mindset de producto: cada jugada tiene impacto y la maestría real está en la intención.',
    },
  };
  const featuredCard = localizedNewsCards[0] ?? null;
  const secondaryCards = localizedNewsCards.slice(1);

  const linkedInNotes = notesData
    .filter((n) => ['women-in-tech', 'claude-code', 'reinventandome'].includes(n.slug))
    .sort((a, b) => ['women-in-tech', 'claude-code', 'reinventandome'].indexOf(a.slug) - ['women-in-tech', 'claude-code', 'reinventandome'].indexOf(b.slug));

  const noteCardMeta: Record<string, { labelEs: string; labelEn: string; titleEn: string }> = {
    'women-in-tech': {
      labelEs: 'MUJERES EN TECH',
      labelEn: 'WOMEN IN TECH',
      titleEn: 'Women in Tech · Product Management · redbee',
    },
    'claude-code': {
      labelEs: 'APRENDIZAJES',
      labelEn: 'LEARNING',
      titleEn: 'My learnings using Claude in the last 72 hours',
    },
    'reinventandome': {
      labelEs: 'REFLEXIÓN',
      labelEn: 'REFLECTION',
      titleEn: 'Reinventing myself',
    },
  };
  const profileContent = isEnglish
    ? {
        heroLine1: 'Between humans and algorithms,',
        heroLine2: 'I build what truly matters.',
        descLine1: '+10 years building digital products, supporting teams',
        descLine2: 'and connecting strategy with execution.',
        role: 'Product Leader · AI & Digital Strategy',
        projectsCta: 'View Projects',
        contactCta: 'Get in touch',
        cvCta: 'Download CV',
      }
    : {
        heroLine1: 'Entre humanos y algoritmos,',
        heroLine2: 'construyo lo que de verdad importa.',
        descLine1: '+10 años construyendo productos digitales, acompañando equipos',
        descLine2: 'y conectando estrategia con ejecución.',
        role: 'Líder de Producto · IA y Estrategia Digital',
        projectsCta: 'Ver proyectos',
        contactCta: 'Contactame',
        cvCta: 'Descargar CV',
      };

  return (
    <>
      <HomeTour isEnglish={isEnglish} />
      <Helmet>
        <title>Barbara Aceto | Builder of Things That Matter</title>
        <meta name="description" content="Barbara Aceto — Products that understand people and services that make them feel better." />
      </Helmet>

      <div className="w-full relative" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/fodo limones.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-45"
              style={{ objectPosition: 'center 76%' }}
            />
          </div>

        {/* ════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ════════════════════════════════════ */}
        <section className="relative w-full flex items-center justify-center pt-20 pb-32 px-4">
          {/* Hero content */}
          <div className="relative z-20 max-w-3xl text-center">
            {/* Subtle separator */}
            <div className="flex justify-center mt-8 mb-8">
              <div className="stationery-sep"></div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════ */}
        {/* PROFILE CARD */}
        {/* ════════════════════════════════════ */}
        <section className="w-full px-4 py-16 md:py-20 relative z-40" style={{ marginTop: '-16rem' }}>
          <div className="max-w-6xl mx-auto">
          <div id="home-profile-card" className="card w-full max-w-xl relative overflow-hidden mx-auto">
            <div className="relative z-10 flex flex-row gap-5 items-stretch">

              {/* Foto izquierda */}
              <div className="w-2/5 flex-shrink-0 -m-6 mr-0">
                <img 
                  src="/limones saco.png" 
                  alt="Barbara Aceto" 
                  className="w-full h-full object-cover object-top rounded-l-2xl"
                  style={{ minHeight: '280px' }}
                />
              </div>

              {/* Contenido derecha */}
              <div className="flex-1 flex flex-col justify-center text-left py-2 pr-2">

                <div className="mb-4">
                  <h2 className="font-serif text-lg md:text-xl leading-tight" style={{ color: '#1E2A38' }}>
                    {profileContent.heroLine1}
                    <br />
                    {profileContent.heroLine2}
                  </h2>
                  <p className="text-xs md:text-sm leading-relaxed mt-2" style={{ color: '#4A5552' }}>
                    {profileContent.descLine1} {profileContent.descLine2}
                  </p>
                </div>

                <p className="text-base font-bold mb-0.5" style={{ color: 'var(--accent-primary)' }}>
                  Barbara Aceto
                </p>
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {profileContent.role}
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                  Buenos Aires, Argentina
                </p>

                <div className="stationery-sep mb-4"></div>

                <div className="flex flex-col gap-2">
                  <Link 
                    id="home-btn-projects"
                    to="/projects" 
                    className="btn-primary text-center px-4 text-sm"
                  >
                    {profileContent.projectsCta}
                  </Link>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-ghost text-center px-4 text-sm"
                  >
                    {profileContent.contactCta}
                  </button>
                  <a
                    href="/one-sheet?pdf=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link text-center text-sm"
                  >
                    {profileContent.cvCta}
                  </a>
                </div>
              </div>

            </div>
          </div>
          </div>
        </section>
        </div>

        <div className="w-full flex justify-center mt-2 mb-4 md:mb-5 relative z-50">
          <button
            type="button"
            onClick={scrollToWhyAndWork}
            className="w-11 h-11 rounded-full animate-bounce flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-base)',
              boxShadow: '0 2px 8px rgba(30, 42, 56, 0.08)',
              color: 'var(--accent-primary)',
            }}
            aria-label={homeText.scrollWhyAria}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </button>
        </div>

        <div style={{ background: 'linear-gradient(180deg, rgba(30,42,56,0.12) 0%, rgba(30,42,56,0.08) 45%, rgba(30,42,56,0.05) 100%)' }}>
        {/* ════════════════════════════════════ */}
        {/* WHY I BUILD */}
        {/* ════════════════════════════════════ */}
        <section
          id="why-work-start"
          className="w-full mt-4 md:mt-6 py-7 md:py-10 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
              <div className="relative rounded-3xl overflow-hidden border w-full max-w-xl mx-auto md:mx-0 md:col-span-5 h-full min-h-[480px]" style={{ borderColor: 'var(--border-base)' }}>
                <img
                  src="/barbi fuego.png"
                  alt="Barbara"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '18% center', filter: 'brightness(0.84) contrast(0.92)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(160deg, rgba(20,32,44,0.28) 0%, rgba(20,32,44,0.06) 52%, rgba(20,32,44,0.22) 100%)' }}
                />
              </div>

            <div className="text-center md:text-left w-full rounded-3xl border p-5 md:p-6 md:col-span-7 h-full min-h-[480px] flex flex-col" style={{ borderColor: 'var(--border-base)', background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--bg) 100%)' }}>
              <header className="mb-4 md:mb-5">
                <h2 className="text-xl md:text-2xl font-serif font-semibold leading-tight" style={{ color: 'var(--accent-primary)' }}>
                  {homeText.whyTitle}
                </h2>
              </header>
              <div
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                }}
              >
                <div className="space-y-3 mb-5">
                  <p style={{ maxWidth: '52ch' }}>{homeText.whyLine1}</p>
                  <p style={{ maxWidth: '52ch' }}>{homeText.whyLine2}</p>
                </div>
                <div className="border-l-2 pl-5 py-1" style={{ borderColor: 'var(--accent-primary)', color: 'var(--text-primary)' }}>
                  <p className="font-serif italic text-sm md:text-base leading-relaxed">{homeText.whyHighlight}</p>
                </div>
              </div>

              <div className="mt-5 md:mt-6 flex-1 flex flex-col">
                <header className="mb-3 md:mb-4">
                  <h2 className="text-base md:text-lg font-serif font-semibold" style={{ color: 'var(--accent-primary)' }}>
                    {homeText.wayTitle}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    {homeText.wayIntro}
                  </p>
                </header>

                <div className="flex flex-col w-full">
                  {workSteps.map((step, i) => (
                    <div key={step.number}>
                      <article
                        className="group flex gap-3 py-2.5 px-3 rounded-xl transition-all duration-200"
                        style={{ borderLeft: '2px solid transparent' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderLeftColor = 'var(--accent-primary)'
                          e.currentTarget.style.backgroundColor = 'rgba(58,125,107,0.04)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderLeftColor = 'transparent'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <span
                            className="inline-block text-[10px] font-semibold mb-1.5"
                            style={{ color: 'var(--accent-primary)', opacity: 0.65, letterSpacing: '0.13em' }}
                          >
                            {step.label}
                          </span>
                          <h3 className="text-sm md:text-base font-serif font-semibold mb-1 leading-snug" style={{ color: 'var(--text-primary)' }}>
                            {step.title}
                          </h3>
                          {step.highlight ? (
                            <p className="text-sm font-serif italic leading-relaxed" style={{ color: 'var(--accent-primary)', opacity: 0.82 }}>
                              {step.description}
                            </p>
                          ) : (
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              {step.description}
                            </p>
                          )}
                        </div>
                      </article>
                      {i < workSteps.length - 1 && (
                        <div className="flex items-center pl-4 py-0.5" aria-hidden="true">
                          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <path d="M5 0v9M1.5 6.5L5 10.5l3.5-4" stroke="var(--accent-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════ */}
        {/* PENSAMIENTO */}
        {/* ════════════════════════════════════ */}
        <section id="news-start" className="w-full py-16 md:py-24 px-4" style={{ marginTop: '-5rem' }}>
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="flex justify-center mt-1 mb-5">
                <button
                  type="button"
                  onClick={scrollToNews}
                  className="w-11 h-11 rounded-full animate-bounce flex items-center justify-center"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-base)',
                    boxShadow: '0 2px 8px rgba(30, 42, 56, 0.08)',
                    color: 'var(--accent-primary)',
                  }}
                  aria-label={homeText.scrollNewsAria}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
                  </svg>
                </button>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {homeText.newsTitle}
              </h2>
              <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
                {homeText.newsSubtitle}
              </p>
            </div>

            {/* LinkedIn notes grid */}
            {linkedInNotes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 md:mb-6">
                {linkedInNotes.map((note) => (
                  <a
                    key={note.slug}
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <article
                      className="h-full rounded-xl border overflow-hidden flex flex-col"
                      style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)', transition: 'border-color 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(58,125,107,0.4)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)' }}
                    >
                      {note.image && (
                        <div className="w-full overflow-hidden" style={{ height: '140px' }}>
                          <img
                            src={note.image}
                            alt={note.title}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center top', filter: 'brightness(0.88) contrast(0.92)' }}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <span
                          className="inline-block text-[10px] font-semibold mb-2.5"
                          style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                        >
                          {isEnglish ? (noteCardMeta[note.slug]?.labelEn ?? homeText.noteLabel) : (noteCardMeta[note.slug]?.labelEs ?? homeText.noteLabel)}
                        </span>
                        <h3 className="text-base font-serif font-semibold mb-2 leading-snug flex-1" style={{ color: 'var(--text-primary)' }}>
                          {isEnglish ? (noteCardMeta[note.slug]?.titleEn ?? note.title) : note.title}
                        </h3>
                        <span className="inline-block mt-3 text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>
                          {homeText.readNote}
                        </span>
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            )}

            {/* Featured card */}
            {featuredCard && (
              <a
                href={featuredCard.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-5 md:mb-6"
              >
                <article
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)', transition: 'border-color 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(58,125,107,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between" style={{ minHeight: '280px' }}>
                      <div>
                        <span
                          className="inline-block text-[10px] font-semibold mb-3"
                          style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                        >
                          {newsCardMeta[featuredCard.slug]?.label ?? 'ARTICLE'}
                        </span>
                        <h3 className="text-xl md:text-2xl font-serif font-semibold mb-3 leading-snug" style={{ color: 'var(--text-primary)' }}>
                          {featuredCard.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '52ch' }}>
                          {newsCardMeta[featuredCard.slug]?.shortExcerpt ?? featuredCard.excerpt}
                        </p>
                      </div>
                      <span className="inline-block mt-6 text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                        {homeText.readArticle}
                      </span>
                    </div>
                    {featuredCard.image && (
                      <div className="md:col-span-5 relative overflow-hidden" style={{ minHeight: '220px' }}>
                        <img
                          src={featuredCard.image}
                          alt={featuredCard.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ objectPosition: 'center top', filter: 'brightness(0.88) contrast(0.92)' }}
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none hidden md:block"
                          style={{ background: 'linear-gradient(to right, var(--card-bg) 0%, transparent 30%)' }}
                        />
                      </div>
                    )}
                  </div>
                </article>
              </a>
            )}

            {/* Secondary grid */}
            {secondaryCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 md:mb-6">
                {secondaryCards.map((item, i) => (
                  <a
                    key={`${item.slug}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <article
                      className="h-full rounded-xl border p-5 flex flex-col"
                      style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)', transition: 'border-color 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(58,125,107,0.4)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; }}
                    >
                      <span
                        className="inline-block text-[10px] font-semibold mb-2.5"
                        style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                      >
                        {newsCardMeta[item.slug]?.label ?? item.outlet}
                      </span>
                      <h3 className="text-base font-serif font-semibold mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                        {newsCardMeta[item.slug]?.shortExcerpt ?? item.excerpt}
                      </p>
                      <span className="inline-block mt-4 text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>
                        {homeText.readArticle}
                      </span>
                    </article>
                  </a>
                ))}
              </div>
            )}


          </div>
        </section>
        </div>

        {/* CONTACT MODAL */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            style={{ backgroundColor: 'rgba(20,32,28,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={e => { if (e.target === e.currentTarget) setIsModalOpen(false) }}
          >
            <div
              className="w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border-base)',
                animation: 'slideUp 0.28s cubic-bezier(0.16,1,0.3,1)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header stripe */}
              <div className="px-6 pt-6 pb-5" style={{ borderBottom: '1px solid var(--border-base)' }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="font-serif font-semibold text-xl md:text-2xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {homeText.modalTitle}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors mt-0.5"
                    style={{ backgroundColor: 'var(--border-base)', color: 'var(--text-muted)' }}
                    aria-label={homeText.closeModalAria}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--accent-primary)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--border-base)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {homeText.modalSubtitle}
                </p>
              </div>

              {/* Contact rows */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border-base)' }}>
                <div className="space-y-2">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/5491162093765"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,127,121,0.4)'; e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.backgroundColor = 'var(--card-bg)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,127,121,0.12)' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>WhatsApp</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>+54 9 11 6209 3765</p>
                    </div>
                    <svg className="w-4 h-4 flex-shrink-0 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  {/* Email */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,127,121,0.12)' }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Email</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>aceto.barbara@gmail.com</p>
                    </div>
                    <button
                      onClick={() => { navigator.clipboard.writeText('aceto.barbara@gmail.com'); setEmailCopied(true); setTimeout(() => setEmailCopied(false), 2000) }}
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      title="Copiar email"
                      onMouseEnter={e => { if (!emailCopied) { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.10)'; e.currentTarget.style.color = 'var(--accent-primary)' } }}
                      onMouseLeave={e => { if (!emailCopied) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' } }}
                      style={{ color: emailCopied ? 'var(--accent-primary)' : 'var(--text-muted)', backgroundColor: emailCopied ? 'rgba(74,127,121,0.10)' : 'transparent' }}
                    >
                      {emailCopied ? (
                        <span className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>¡Copiado!</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/barbaraaceto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,127,121,0.4)'; e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.backgroundColor = 'var(--card-bg)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,127,121,0.12)' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>LinkedIn</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>linkedin.com/in/barbaraaceto</p>
                    </div>
                    <svg className="w-4 h-4 flex-shrink-0 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>


            </div>
          </div>
        )}

        <div id="home-end" aria-hidden="true" />
      </div>
    </>
  );
}
