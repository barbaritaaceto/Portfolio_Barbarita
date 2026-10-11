import { useEffect, useState } from 'react'
import { track } from '../lib/analytics'

// Navegación entre secciones del Home, estilo editorial. Solo en tablet y desktop (desde 768 px):
// en celular el Home queda como una sola página sin navegación.
//  - SectionIndex: el índice numerado que va debajo de la tarjeta de perfil
//  - SectionNav: la pastilla flotante en la que se convierte el índice al scrollear

const SECTIONS = [
  { id: 'home-profile-card', es: 'Inicio', en: 'Home', descEs: '', descEn: '' },
  { id: 'news-start', es: 'Ideas desde la trinchera', en: 'Ideas From The Field', descEs: 'Charlas, videos y reflexiones sobre producto, IA y liderazgo.', descEn: 'Talks, videos and reflections on product, AI and leadership.' },
  { id: 'why-work-start', es: 'Por qué construyo', en: 'Why I Build', descEs: 'Mi mirada, ocho aprendizajes del camino y cómo trabajo.', descEn: 'My view, eight lessons from the journey and how I work.' },
  { id: 'trayectoria', es: 'Trayectoria', en: 'Career path', descEs: 'Cada etapa, con qué hice y qué aprendí.', descEn: 'Each stage, with what I did and what I learned.' },
  { id: 'contacto', es: '¿Hablamos?', en: 'Let’s talk', descEs: 'Escribime, mirá mi perfil o seguime en LinkedIn.', descEn: 'Write to me, see my profile or follow me on LinkedIn.' },
]

function useActiveSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.innerHeight * 0.4
      let current = 0
      SECTIONS.forEach((section, i) => {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= marker) current = i
      })
      const max = document.documentElement.scrollHeight - window.innerHeight
      // Al llegar al final de la página, la última sección queda activa aunque sea corta
      if (max > 0 && window.scrollY >= max - 4) current = SECTIONS.length - 1
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return { active }
}

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = id === 'home-profile-card' ? 0 : el.getBoundingClientRect().top + window.scrollY - 64
  window.scrollTo({ top, behavior: 'smooth' })
  track.clickScrollToSection(id)
}

export default function SectionNav({ isEnglish }: { isEnglish: boolean }) {
  const { active } = useActiveSection()
  const label = (i: number) => (isEnglish ? SECTIONS[i].en : SECTIONS[i].es)
  const navLabel = isEnglish ? 'Page sections' : 'Secciones de la página'
  return <FloatingIndex active={active} label={label} navLabel={navLabel} />
}

// El índice editorial que va debajo de la tarjeta de perfil
export function SectionIndex({ isEnglish }: { isEnglish: boolean }) {
  return (
    <nav id="home-section-index" aria-label={isEnglish ? 'In this portfolio' : 'En este portfolio'} className="hidden md:block w-full px-4 pb-6 md:pb-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase text-center mb-4" style={{ color: 'var(--accent-primary)', letterSpacing: '0.14em' }}>
          {isEnglish ? 'In this portfolio' : 'En este portfolio'}
        </p>
        <ol className="list-none m-0 p-0 grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: '1px solid var(--border-base)' }}>
          {SECTIONS.slice(1).map((section, i) => (
            <li key={section.id} style={{ borderBottom: '1px solid var(--border-base)' }}>
              <button
                type="button"
                onClick={() => goTo(section.id)}
                className="group w-full h-full text-left px-3 py-4 md:px-4 md:py-5 transition-colors"
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                <span className="block font-serif text-2xl md:text-3xl leading-none" style={{ color: 'var(--accent-primary)', opacity: 0.45 }}>
                  0{i + 1}
                </span>
                <span className="block font-serif font-semibold text-base md:text-lg leading-snug mt-2" style={{ color: 'var(--text-primary)' }}>
                  {isEnglish ? section.en : section.es} <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-y-0.5" style={{ color: 'var(--accent-primary)' }}>↓</span>
                </span>
                <span className="block text-xs md:text-sm leading-snug mt-1" style={{ color: 'var(--text-muted)' }}>
                  {isEnglish ? section.descEn : section.descEs}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

// La pastilla flotante en la que se convierte el índice al scrollear
function FloatingIndex({ active, label, navLabel }: { active: number; label: (i: number) => string; navLabel: string }) {
  const [open, setOpen] = useState(false)
  const [indexVisible, setIndexVisible] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const el = document.getElementById('home-section-index')
    if (!el) { setIndexVisible(false); return }
    const observer = new IntersectionObserver(([entry]) => setIndexVisible(entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Al llegar al pie, la pastilla se esconde para no tapar sus botones
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0 })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => { setOpen(false) }, [active])

  const hidden = indexVisible || footerVisible || active === 0
  return (
    <nav
      aria-label={navLabel}
      className="hidden md:block fixed z-50 left-1/2 bottom-5 transition-all duration-300"
      style={{ transform: `translateX(-50%) translateY(${hidden ? '140%' : '0'})`, opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      {open && (
        <ol
          className="list-none m-0 mb-2 p-1.5 rounded-2xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.96)', border: '1px solid var(--border-base)', boxShadow: '0 12px 34px rgba(30,42,56,0.16)' }}
        >
          {SECTIONS.map((section, i) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => { goTo(section.id); setOpen(false) }}
                aria-current={active === i ? 'true' : undefined}
                className="w-full text-left text-sm whitespace-nowrap rounded-xl px-3 py-2 flex items-center gap-3"
                style={{ color: active === i ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: active === i ? 600 : 500, backgroundColor: active === i ? 'rgba(74,127,121,0.08)' : 'transparent' }}
              >
                <span className="font-serif text-xs w-4" style={{ opacity: 0.6 }}>{i === 0 ? '↑' : `0${i}`}</span>
                {label(i)}
              </button>
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="mx-auto flex items-center gap-2.5 rounded-full pl-4 pr-3.5 py-2.5 text-sm font-semibold whitespace-nowrap"
        style={{ backgroundColor: 'rgba(30,42,40,0.92)', color: '#F5F2EC', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', boxShadow: '0 10px 28px rgba(20,32,28,0.28)' }}
      >
        <span className="font-serif text-xs" style={{ opacity: 0.65 }}>0{active} / 04</span>
        {label(active)}
        <span aria-hidden="true" className="inline-block transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▴</span>
      </button>
    </nav>
  )
}
