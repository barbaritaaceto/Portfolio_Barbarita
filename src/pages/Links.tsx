import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import '@fontsource/playfair-display/500-italic.css'
import { track } from '../lib/analytics'

// Tarjeta de links para la tarjeta NFC: una sola pantalla, pensada para el celular.
// Va sin header, footer ni Bocconcino, para que en un evento se abra y se use en segundos.

const PHONE = '+5491162093765'
const EMAIL = 'aceto.barbara@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/barbaraaceto'

const text = {
  es: {
    title: 'Barbara Aceto · Links',
    name: 'Hola, soy Barbi Aceto',
    rolePrefix: 'Manager en',
    greeting: '¡Qué bueno cruzarnos! 👋',
    phraseStart: 'Construyo productos',
    between: 'entre',
    humans: 'humanos',
    and: 'y',
    algorithms: 'algoritmos',
    saveContact: 'Guardar mi contacto',
    portfolio: 'Ver mi trabajo',
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
    email: 'Copiar mail',
    emailDone: '¡Copiado!',
    whatsappMsg: '¡Hola Barbi! 🙂',
    emailCopied: 'Mail copiado:',
    closing: '¿Seguimos la charla? ☕',
  },
  en: {
    title: 'Barbara Aceto · Links',
    name: 'Hi, I’m Barbi Aceto',
    rolePrefix: 'Manager at',
    greeting: 'So glad we crossed paths! 👋',
    phraseStart: 'Building products',
    between: 'between',
    humans: 'humans',
    and: 'and',
    algorithms: 'algorithms',
    saveContact: 'Save my contact',
    portfolio: 'See my work',
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
    email: 'Copy email',
    emailDone: 'Copied!',
    whatsappMsg: 'Hi Barbi! 🙂',
    emailCopied: 'Email copied:',
    closing: 'Shall we keep talking? ☕',
  },
}

const icons = {
  contact: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6" />,
  portfolio: <path d="M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />,
  whatsapp: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />,
  email: <path d="M9 9h11v11H9zM5 15H4V4h11v1" />,
  check: <path d="M5 12l5 5L20 7" />,
}

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

export default function Links() {
  const [isEnglish, setIsEnglish] = useState(() => {
    try { return window.localStorage.getItem('lang') === 'en' } catch { return false }
  })
  const t = isEnglish ? text.en : text.es

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'es'
  }, [isEnglish])

  useEffect(() => {
    track.pageView('/hola', document.title, isEnglish ? 'en' : 'es')
  }, [])

  const setLanguage = (english: boolean) => {
    setIsEnglish(english)
    try { window.localStorage.setItem('lang', english ? 'en' : 'es') } catch { /* sin almacenamiento */ }
  }

  const external = (label: string, url: string) => () => track.clickExternalLink(label, url, 'links')

  // El mail se copia en vez de abrir la app de correo: si el celular no tiene una configurada,
  // un link mailto: no hace nada. El aviso muestra la dirección por si el portapapeles falla.
  const [emailCopied, setEmailCopied] = useState(false)
  useEffect(() => {
    if (!emailCopied) return
    const timer = window.setTimeout(() => setEmailCopied(false), 4000)
    return () => window.clearTimeout(timer)
  }, [emailCopied])
  const onEmail = () => {
    track.clickExternalLink('Copiar mail', EMAIL, 'links')
    try { void navigator.clipboard?.writeText(EMAIL) } catch { /* sin portapapeles: igual se muestra el mail */ }
    setEmailCopied(true)
  }

  const secondary: { key: string; label: string; href: string; icon: keyof typeof icons; newTab: boolean }[] = [
    { key: 'linkedin', label: t.linkedin, href: LINKEDIN, icon: 'linkedin', newTab: true },
    { key: 'whatsapp', label: t.whatsapp, href: `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(t.whatsappMsg)}`, icon: 'whatsapp', newTab: true },
  ]

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content="Barbara Aceto — Product & AI Leader. Portfolio, LinkedIn, WhatsApp y email." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://portfolio-barbarita.vercel.app/hola" />
      </Helmet>

      <main className="w-full max-w-md flex flex-col" style={{ minHeight: '100svh' }}>
        {/* Franja de limones, como el banner de LinkedIn */}
        <div className="relative" style={{ height: 124 }}>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundImage: "url('/fodo limones.webp')", backgroundSize: '118% auto', backgroundPosition: '45% 92%', backgroundRepeat: 'no-repeat' }}
          />
          <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: 'var(--bg)', opacity: 0.3 }} />

          <div className="absolute top-3 right-3 inline-flex rounded-full p-1" style={{ backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid var(--border-base)' }}>
            {(['es', 'en'] as const).map(lang => {
              const active = (lang === 'en') === isEnglish
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang === 'en')}
                  aria-pressed={active}
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                  style={{ backgroundColor: active ? 'var(--accent-primary)' : 'transparent', color: active ? '#FFFFFF' : 'var(--text-secondary)' }}
                >
                  {lang}
                </button>
              )
            })}
          </div>

          {/* Foto recortada a la cara: el círculo muestra hasta los hombros */}
          <div
            className="absolute left-1/2 rounded-full overflow-hidden"
            style={{ bottom: -68, width: 136, height: 136, transform: 'translateX(-50%)', border: '5px solid var(--bg)', backgroundColor: 'var(--bg-alt)' }}
          >
            <img
              src="/limones saco.webp"
              alt="Barbara Aceto"
              width={214}
              height={225}
              fetchPriority="high"
              className="absolute max-w-none"
              style={{ width: 214, height: 225, left: -54, top: 0 }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col px-6 pt-[84px] pb-6">
          <header className="text-center">
            <h1 className="font-serif font-semibold text-2xl leading-tight" style={{ color: 'var(--text-primary)' }}>{t.name}</h1>
            <p className="text-xl leading-tight mt-1" style={{ color: 'var(--text-secondary)' }}>
              {t.rolePrefix} <strong style={{ color: '#E2231A', fontWeight: 700 }}>redbee</strong>
            </p>
            <p className="font-serif text-lg leading-snug mt-4" style={{ color: 'var(--text-primary)' }}>
              {t.phraseStart}<br />
              {t.between}{' '}
              <em style={{ color: 'var(--accent-primary)' }}>{t.humans}</em> {t.and}{' '}
              <em style={{ color: 'var(--accent-primary)' }}>{t.algorithms}</em>.
            </p>
          </header>

          <nav aria-label={isEnglish ? 'Links' : 'Links'} className="mt-6 flex flex-col gap-2.5">
            <a
              href="/barbara-aceto.vcf"
              download="Barbara Aceto.vcf"
              onClick={external('Guardar mi contacto', '/barbara-aceto.vcf')}
              className="flex items-center justify-center gap-3 rounded-2xl px-5 font-semibold text-base"
              style={{ minHeight: 52, backgroundColor: 'var(--accent-primary)', color: '#FFFFFF', boxShadow: '0 8px 22px rgba(74,127,121,0.28)' }}
            >
              <Icon name="contact" />
              {t.saveContact}
            </a>

            <Link
              to="/"
              onClick={external('Portfolio', '/')}
              className="flex items-center justify-center gap-3 rounded-2xl px-5 font-semibold text-base"
              style={{ minHeight: 52, backgroundColor: '#FFFFFF', color: 'var(--accent-primary)', border: '1.5px solid var(--accent-primary)' }}
            >
              <Icon name="portfolio" />
              {t.portfolio}
            </Link>

            <div className="grid grid-cols-3 gap-2.5">
              {secondary.map(item => (
                <a
                  key={item.key}
                  href={item.href}
                  {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={external(item.label, item.href)}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-2xl text-sm font-medium"
                  style={{ minHeight: 68, backgroundColor: '#FFFFFF', color: 'var(--text-primary)', border: '1px solid var(--border-base)' }}
                >
                  <span style={{ color: 'var(--accent-primary)' }}><Icon name={item.icon} /></span>
                  {item.label}
                </a>
              ))}
              {/* Copia el mail en lugar de abrir un link: borde punteado para que se note que es otra acción */}
              <button
                type="button"
                onClick={onEmail}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl text-sm font-medium transition-colors"
                style={{
                  minHeight: 68,
                  backgroundColor: emailCopied ? 'rgba(74,127,121,0.10)' : 'var(--bg)',
                  color: emailCopied ? 'var(--accent-primary)' : 'var(--text-primary)',
                  border: '1.5px dashed var(--accent-primary)',
                }}
              >
                <span style={{ color: 'var(--accent-primary)' }}><Icon name={emailCopied ? 'check' : 'email'} /></span>
                {emailCopied ? t.emailDone : t.email}
              </button>
            </div>
          </nav>

          <p className="font-serif text-xl leading-tight text-center mt-6" style={{ color: 'var(--text-primary)' }}>{t.greeting}</p>
          <p className="font-serif italic text-lg text-center mt-1" style={{ color: 'var(--text-secondary)' }}>
            {t.closing}
          </p>
        </div>
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 bottom-6 px-4 py-3 rounded-2xl text-sm text-center transition-all duration-300"
          style={{
            transform: `translateX(-50%) translateY(${emailCopied ? '0' : '16px'})`,
            opacity: emailCopied ? 1 : 0,
            pointerEvents: emailCopied ? 'auto' : 'none',
            backgroundColor: 'rgba(30,42,40,0.94)',
            color: '#F5F2EC',
            boxShadow: '0 10px 28px rgba(20,32,28,0.28)',
            width: 'max-content',
            maxWidth: 'calc(100% - 32px)',
          }}
        >
          {emailCopied && (
            <>
              {t.emailCopied}{' '}
              <span className="font-semibold" style={{ color: '#FFFFFF', userSelect: 'all' }}>{EMAIL}</span>
            </>
          )}
        </div>
      </main>
      <Analytics />
    </div>
  )
}
