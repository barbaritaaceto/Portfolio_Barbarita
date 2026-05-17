import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import press from '../data/press';
import HomeTour from '../components/HomeTour';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        newsCta: 'Explore more publications and appearances →',
        readArticle: 'Read publication →',
        trainingNoteTitle: 'Google Analytics and decision-making in product',
        trainingNoteBody: 'How to connect metrics, behavior and shared learning across teams.',
        trainingNoteCta: 'Watch recording ↗',
        scrollWhyAria: 'Scroll to Why I Build and The Way I Work',
        scrollNewsAria: 'Scroll to news section',
        closeModalAria: 'Close modal',
        modalTitle: "Let's build something meaningful.",
        modalSubtitle: "If you're working on a product, leading a team or exploring AI in a real-world context, I'd love to hear about it.",
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
        newsCta: 'Explorar más publicaciones y apariciones →',
        readArticle: 'Leer publicación →',
        trainingNoteTitle: 'Google Analytics y toma de decisiones en producto',
        trainingNoteBody: 'Cómo conectar métricas, comportamiento y aprendizaje compartido entre equipos.',
        trainingNoteCta: 'Ver grabación ↗',
        scrollWhyAria: 'Ir a Por qué construyo y Mi forma de trabajar',
        scrollNewsAria: 'Ir a la sección de noticias',
        closeModalAria: 'Cerrar modal',
        modalTitle: 'Construyamos algo con sentido.',
        modalSubtitle: 'Si estás trabajando en producto, liderando un equipo o explorando IA en contexto real, me encantará conocerte.',
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
          className="w-full mt-6 md:mt-8 py-10 md:py-14 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
              <div className="relative rounded-3xl overflow-hidden border w-full max-w-xl mx-auto md:mx-0 md:col-span-5 h-full min-h-[640px]" style={{ borderColor: 'var(--border-base)' }}>
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

            <div className="text-center md:text-left w-full rounded-3xl border p-6 md:p-8 md:col-span-7 h-full min-h-[640px] flex flex-col" style={{ borderColor: 'var(--border-base)', background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--bg) 100%)' }}>
              <header className="mb-6 md:mb-7">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold leading-tight" style={{ color: 'var(--accent-primary)' }}>
                  {homeText.whyTitle}
                </h2>
              </header>
              <div
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                }}
              >
                <div className="space-y-4 mb-7">
                  <p style={{ maxWidth: '52ch' }}>{homeText.whyLine1}</p>
                  <p style={{ maxWidth: '52ch' }}>{homeText.whyLine2}</p>
                </div>
                <div className="border-l-2 pl-5 py-1" style={{ borderColor: 'var(--accent-primary)', color: 'var(--text-primary)' }}>
                  <p className="font-serif italic text-base md:text-lg leading-relaxed">{homeText.whyHighlight}</p>
                </div>
              </div>

              <div className="mt-8 md:mt-9 flex-1 flex flex-col">
                <header className="mb-4 md:mb-5">
                  <h2 className="text-xl md:text-2xl font-serif font-semibold" style={{ color: 'var(--accent-primary)' }}>
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
                        className="group flex gap-3 py-3.5 px-3 rounded-xl transition-all duration-200"
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

            {/* Workshop card */}
            <div
              className="rounded-xl border p-5 md:p-6 mb-10 md:mb-12"
              style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)' }}
            >
              <span
                className="inline-block text-[10px] font-semibold mb-3"
                style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
              >
                WORKSHOP
              </span>
              <p className="text-base font-serif font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {homeText.trainingNoteTitle}
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {homeText.trainingNoteBody}
              </p>
              <video
                className="w-full rounded-xl border"
                style={{ borderColor: 'var(--border-base)', backgroundColor: '#000000' }}
                controls
                preload="metadata"
              >
                <source src="/Grabación de pantalla 2026-02-18 a las 18.47.11.mov" type="video/quicktime" />
              </video>
              <a
                href="https://www.linkedin.com/posts/barbaraaceto_analytics-oneproductteam-tarot-activity-6940000359255801856-fy_R?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAO9lWcBYTOMHR-JOYdfU2v4CZ_xUqB85qc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-3 text-sm font-medium"
                style={{ color: 'var(--accent-primary)' }}
              >
                {homeText.trainingNoteCta}
              </a>
            </div>

            {/* CTA */}
            <div className="flex justify-end">
              <Link
                to="/news-links"
                className="text-sm md:text-base font-medium"
                style={{ color: 'var(--accent-primary)' }}
              >
                {homeText.newsCta}
              </Link>
            </div>

          </div>
        </section>
        </div>

        {/* CONTACT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-7 md:p-9 max-w-3xl w-full min-h-[440px] md:min-h-[500px] shadow-lg relative flex items-center">
              {/* Close button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={homeText.closeModalAria}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full max-w-2xl mx-auto px-3 md:px-8 text-center">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 mb-2">
                  {homeText.modalTitle}
                </h2>

                {/* Subheader */}
                <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
                  {homeText.modalSubtitle}
                </p>

                {/* Separator */}
                <div className="stationery-sep mb-12 mx-auto"></div>

                {/* Direct contact - centered */}
                <div className="space-y-3 mb-2 text-center">
                  <div className="text-base">
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-900">📞</span> <a href="tel:+5491162093765" style={{ color: 'var(--accent-primary)' }}>+54 9 11 6209 3765</a>
                    </p>
                  </div>
                  <div className="text-base">
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-900">✉️</span> <a href="mailto:aceto.barbara@gmail.com" style={{ color: 'var(--accent-primary)' }}>aceto.barbara@gmail.com</a>
                    </p>
                  </div>
                  <div className="text-base">
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-900">🔗</span> <a href="https://linkedin.com/in/barbaraaceto" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>linkedin.com/in/barbaraaceto</a>
                    </p>
                  </div>
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
