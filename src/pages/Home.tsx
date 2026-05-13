import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import press from '../data/press';

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
        whyLine1: 'I connect strategy, technology and human behavior to build products that perform.',
        whyLine2: 'My focus is simple: clear direction, aligned teams and measurable outcomes.',
        whyHighlight: 'I prioritize value delivered, not just features released.',
        wayIntro: 'A practical framework to move from ambiguity to impact.',
        newsTitle: 'Latest News',
        newsSubtitle: 'Articles and interviews in media.',
        readArticle: 'Read article →',
        trainingNoteTitle: 'Watch the intro of the Google Analytics & Tarot training',
        trainingNoteBody: 'I had an incredible time in this session. It was great to share the space with friends, teammates and new joiners, all learning from their different roles in product, business, UX, technology and commercial areas. The focus was practical: how to use this tool and turn metrics into better day-to-day decisions. #Analytics #OneProductTeam #Tarot #SantanderAR',
        trainingNoteCta: 'Watch recording ↗',
        scrollWhyAria: 'Scroll to Why I Build and The Way I Work',
        scrollNewsAria: 'Scroll to news section',
        closeModalAria: 'Close modal',
        modalTitle: "Let's build something meaningful.",
        modalSubtitle: "If you're working on a product, leading a team or exploring AI in a real-world context, I'd love to hear about it.",
      }
    : {
        whyTitle: 'Por qué construyo',
        wayTitle: 'Mi forma de trabajar',
      whyLine1: 'Conecto estrategia, tecnología y comportamiento humano para crear productos que funcionan.',
      whyLine2: 'Mi foco es simple: dirección clara, equipos alineados y resultados medibles.',
      whyHighlight: 'Priorizo valor entregado, no solo features publicadas.',
      wayIntro: 'Un marco práctico para pasar de la ambigüedad al impacto.',
        newsTitle: 'Últimas noticias',
        newsSubtitle: 'Artículos y entrevistas en medios.',
        readArticle: 'Leer nota →',
        trainingNoteTitle: 'Mirá la intro de la capacitación de Google Analytics y Tarot',
        trainingNoteBody: 'Increíble lo que me divertí ♥️ quienes estuvieron espero hayan disfrutado tanto como yo. Fue lindo ver amigos, compañeros y nuevos ingresantes en un mismo lugar. Cada uno desde su rol de producto, negocio, UX, tecnología y comercial, queriendo aprender sobre el uso de esta herramienta y cómo capitalizar las métricas en la toma de decisiones del día a día. #Analytics #OneProductTeam #Tarot #SantanderAR',
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
          title: 'Discover',
          description: 'I don't just research users: I align business, technology and operations.',
        },
        {
          number: '02',
          title: 'Define',
          description: 'I turn ambiguity into actionable roadmaps.',
        },
        {
          number: '03',
          title: 'Build',
          description: 'I work close to real teams, not from PowerPoints.',
        },
        {
          number: '04',
          title: 'Measure',
          description: 'Metrics, feedback and continuous learning.',
        },
      ]
    : [
        {
          number: '01',
          title: 'Descubrir',
          description: 'No investigo solo usuarios: alineo negocio, tecnología y operación.',
        },
        {
          number: '02',
          title: 'Definir',
          description: 'Transformo ambigüedad en roadmaps accionables.',
        },
        {
          number: '03',
          title: 'Construir',
          description: 'Trabajo cerca de equipos reales, no desde PowerPoints.',
        },
        {
          number: '04',
          title: 'Medir',
          description: 'Métricas, feedback y aprendizaje continuo.',
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

  const newsCardSizes = [
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-3',
    'md:col-span-3',
    'md:col-span-2',
    'md:col-span-4',
  ];
  const profileContent = isEnglish
    ? {
        heroLine1: 'Between humans and algorithms,',
        heroLine2: 'I build what truly matters.',
        descLine1: '+10 years building digital products, supporting teams',
        descLine2: 'and connecting strategy with execution.',,
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
          <div className="card w-full max-w-xl relative overflow-hidden mx-auto">
            <div className="relative z-10 flex flex-col items-center text-center">

              <div className="w-full mb-6 rounded-xl px-4 py-4" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <h2 className="font-serif text-xl md:text-2xl leading-tight" style={{ color: '#1E2A38' }}>
                  {profileContent.heroLine1}
                  <br />
                  {profileContent.heroLine2}
                </h2>
                <p className="text-sm md:text-base leading-relaxed mt-3" style={{ color: '#4A5552' }}>
                  {profileContent.descLine1}
                  <br />
                  {profileContent.descLine2}
                </p>
              </div>

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 shadow-sm" style={{ borderColor: 'var(--border-base)' }}>
                <img 
                  src="/barbi.png" 
                  alt="Barbara Aceto" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Name & title */}
              <p className="text-lg mb-1 mt-4 font-bold" style={{ color: 'var(--accent-primary)' }}>
                Barbara Tamara Aceto
              </p>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                {profileContent.role}
              </p>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                Buenos Aires, Argentina
              </p>

              {/* Separator */}
              <div className="stationery-sep mb-6"></div>

              {/* Buttons */}
              <div className="w-full flex flex-col items-center gap-3">
                <Link 
                  to="/projects" 
                  className="btn-primary w-fit min-w-[190px] text-center px-6"
                >
                  {profileContent.projectsCta}
                </Link>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-ghost w-fit min-w-[190px] text-center px-6"
                >
                  {profileContent.contactCta}
                </button>
                <a
                  href="/one-sheet?pdf=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link text-center"
                >
                  {profileContent.cvCta}
                </a>
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
              <div className="rounded-3xl overflow-hidden border w-full max-w-xl mx-auto md:mx-0 md:col-span-5 h-full min-h-[640px]" style={{ borderColor: 'var(--border-base)' }}>
                <img
                  src="/barbi fuego.png"
                  alt="Barbara"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '18% center' }}
                />
              </div>

            <div className="text-center md:text-left w-full rounded-3xl border p-6 md:p-8 md:col-span-7 h-full min-h-[640px] flex flex-col" style={{ borderColor: 'var(--border-base)', background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--bg) 100%)' }}>
              <header className="mb-6 md:mb-7">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold leading-tight" style={{ color: 'var(--accent-primary)' }}>
                  {homeText.whyTitle}
                </h2>
              </header>
              <div
                className="space-y-4 rounded-2xl p-4 md:p-5"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-base)',
                }}
              >
                <div className="space-y-2.5">
                  <p>{homeText.whyLine1}</p>
                  <p>{homeText.whyLine2}</p>
                </div>
                <div className="border-l-2 pl-4 py-1" style={{ borderColor: 'var(--accent-primary)', color: 'var(--text-primary)' }}>
                  <p className="font-semibold">{homeText.whyHighlight}</p>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full content-start">
                  {workSteps.map((step) => (
                    <article
                      key={step.number}
                      className="group relative overflow-hidden rounded-xl px-4 py-3.5 min-h-[116px] transition-all duration-200 ease-out hover:-translate-y-0.5"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-base)',
                      }}
                    >
                      <span
                        className="absolute right-3 top-2 font-semibold pointer-events-none select-none"
                        style={{
                          fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
                          lineHeight: 1,
                          color: 'var(--accent-primary)',
                          opacity: 0.2,
                        }}
                      >
                        {step.number}
                      </span>

                      <div className="relative z-10 pt-0.5">
                        <h3 className="text-sm md:text-base font-serif font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>
                          {step.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {step.description.split('\n').map((line) => (
                            <span key={`${step.number}-${line}`} className="block">{line}</span>
                          ))}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════ */}
        {/* NOTICIAS */}
        {/* ════════════════════════════════════ */}
        <section id="news-start" className="w-full py-20 md:py-28 px-4" style={{ marginTop: '-5rem' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mt-1 mb-4">
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

              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-slate-900 mb-4">
                {homeText.newsTitle}
              </h2>
              <p className="text-slate-600 text-base max-w-xl mx-auto">
                {homeText.newsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-fr gap-5 mb-10 items-stretch">
              {localizedNewsCards.map((item, index) => (
                (() => {
                  const isHumanosYAlgoritmos = item.title.toLowerCase().includes('humanos y algoritmos');
                  const isGratitudMindset = item.title.toLowerCase().includes('gratitud: estrategia y mindset de producto');
                  const isVisionPost = isGratitudMindset;
                  return (
                <a
                  key={`${item.outlet}-${item.title}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block ${newsCardSizes[index] ?? 'md:col-span-2'}`}
                >
                  <article className="card h-full p-4 md:p-5 transition-colors duration-200 flex flex-col" style={{ borderColor: 'var(--border-base)' }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--accent-primary)' }}>
                      {item.outlet}
                    </p>
                    <h3 className="text-base md:text-lg font-serif font-semibold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className={`text-xs md:text-sm text-slate-700 leading-relaxed ${(isHumanosYAlgoritmos || isGratitudMindset) ? 'line-clamp-8' : 'line-clamp-4'}`}>
                      {item.excerpt}
                    </p>
                    {item.date && (
                      <time className="text-[11px] text-slate-500 mt-3 block">
                        {new Date(item.date).toLocaleDateString(dateLocale, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    )}
                    <span className="inline-block mt-3 text-xs font-medium transition-colors" style={{ color: 'var(--accent-primary)' }}>
                      {homeText.readArticle}
                    </span>
                    {item.image && (
                      <div className={`w-full flex-1 ${isVisionPost ? 'min-h-[140px]' : 'min-h-[120px]'} rounded-lg overflow-hidden mt-3 border`} style={{ borderColor: 'var(--border-base)', backgroundColor: '#F3F2EF' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full h-full ${(isHumanosYAlgoritmos || isVisionPost) ? 'object-contain p-1' : 'object-cover'}`}
                          loading="lazy"
                        />
                      </div>
                    )}
                  </article>
                </a>
                  );
                })()
              ))}
            </div>

            <div className="w-full flex justify-end">
              <Link
                to="/news-links"
                className="text-sm md:text-base font-medium underline"
                style={{ color: 'var(--accent-primary)' }}
              >
                {isEnglish ? 'Know more' : 'Conocé más'}
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border p-4 md:p-5" style={{ borderColor: 'var(--border-base)', backgroundColor: '#FFFFFF' }}>
              <p className="text-sm md:text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                {homeText.trainingNoteTitle}
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                {homeText.trainingNoteBody}
              </p>
              <video
                className="w-full mt-3 rounded-xl border"
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
                className="inline-flex mt-2 text-sm font-medium underline"
                style={{ color: 'var(--accent-primary)' }}
              >
                {homeText.trainingNoteCta}
              </a>
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
