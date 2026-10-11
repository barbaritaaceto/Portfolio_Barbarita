import { describe, expect, it } from 'vitest'
import { defaultNext, intents, resolveIntent } from './assistant'

// Pruebas de Bocconcino, el guía del portfolio.
// Si se cambian palabras clave o respuestas, estas pruebas avisan cuando una pregunta
// típica deja de llegar al tema correcto.

const ids = new Set(intents.map(i => i.id))

describe('datos del guía', () => {
  it('cada intención tiene respuesta y palabras clave en los dos idiomas', () => {
    for (const intent of intents) {
      expect(intent.responseES.trim(), intent.id).not.toBe('')
      expect(intent.responseEN.trim(), intent.id).not.toBe('')
      expect(intent.keywordsES.length, intent.id).toBeGreaterThan(0)
      expect(intent.keywordsEN.length, intent.id).toBeGreaterThan(0)
    }
  })

  it('no hay ids repetidos', () => {
    expect(ids.size).toBe(intents.length)
  })

  it('los temas sugeridos existen', () => {
    for (const intent of intents) {
      for (const next of intent.next) expect(ids.has(next), `${intent.id} → ${next}`).toBe(true)
    }
    for (const next of defaultNext) expect(ids.has(next), next).toBe(true)
  })

  it('ninguna palabra clave pertenece a dos intenciones', () => {
    for (const field of ['keywordsES', 'keywordsEN'] as const) {
      const owners = new Map<string, string>()
      for (const intent of intents) {
        for (const keyword of intent[field]) {
          const previous = owners.get(keyword)
          expect(previous === undefined || previous === intent.id, `"${keyword}": ${previous} y ${intent.id}`).toBe(true)
          owners.set(keyword, intent.id)
        }
      }
    }
  })

  it('los links apuntan a secciones o páginas que existen', () => {
    const allowed = new Set(['/#trayectoria', '/#news-start', '/one-sheet'])
    for (const intent of intents) {
      for (const link of intent.navLinks ?? []) expect(allowed.has(link.route), `${intent.id}: ${link.route}`).toBe(true)
    }
  })
})

describe('preguntas en español', () => {
  const cases: [string, string][] = [
    ['hola', 'greeting'],
    ['quién es barbi', 'who_is_barbara'],
    ['agile después del agile', 'agile_after_agile'],
    ['agile summit uruguay', 'speaker_story'],
    ['notebooklm', 'organizational_learning'],
    ['seo', 'early_career'],
    ['cómo lidera equipos', 'leadership'],
    ['quiero contratar a barbi', 'availability'],
    ['podemos trabajar juntos', 'availability'],
    ['banca', 'banking_experience'],
    ['hola, qué aprendió en banca', 'banking_experience'],
    ['experiencia en ecommerce', 'ecommerce_experience'],
    ['mi equipo no está entregando', 'team_not_delivering'],
    ['tengo una idea de producto, ¿cómo la valido?', 'product_idea_validation'],
    ['todo es prioridad en mi roadmap', 'roadmap_chaos'],
    ['velocidad o calidad', 'speed_quality'],
    ['qué herramientas usa', 'tools_stack'],
    ['claude code', 'tools_stack'],
    ['dónde vive', 'location_remote'],
    ['qué piensa de la ia', 'ai_opinion'],
    ['cómo usa agentes de ia en su trabajo', 'ai_agents'],
    ['qué es three amigos', 'three_amigos'],
    ['cómo la contacto', 'contact_cv'],
    ['charlas', 'talks'],
    ['mujeres en tech', 'notes_press'],
    ['qué estudió', 'education'],
    ['qué hace hoy', 'current_work'],
    ['qué la diferencia', 'differentiator'],
    ['metricas', 'metrics_decision'],
    ['gracias', 'short_ack'],
  ]
  it.each(cases)('"%s" → %s', (question, expected) => {
    expect(resolveIntent(question, false).intent?.id).toBe(expected)
  })
})

describe('preguntas en inglés', () => {
  const cases: [string, string][] = [
    ['hello', 'greeting'],
    ['who is barbara', 'who_is_barbara'],
    ['tell me about her experience in banking', 'banking_experience'],
    ['agile after agile', 'agile_after_agile'],
    ['can we work together', 'availability'],
    ['what tools does she use', 'tools_stack'],
    ['where is she based', 'location_remote'],
    ['how can I contact her', 'contact_cv'],
    ['what is she doing now', 'current_work'],
  ]
  it.each(cases)('"%s" → %s', (question, expected) => {
    expect(resolveIntent(question, true).intent?.id).toBe(expected)
  })
})

describe('cuando no hay una respuesta clara', () => {
  it('una pregunta ajena al portfolio no devuelve nada', () => {
    const result = resolveIntent('cuál es su color favorito', false)
    expect(result.intent).toBeNull()
    expect(result.candidates).toHaveLength(0)
  })

  it('una pregunta larga con una sola palabra suelta pide aclaración en vez de responder', () => {
    const result = resolveIntent('qué opina del futuro del fútbol argentino en los próximos años', false)
    expect(result.intent).toBeNull()
    expect(result.candidates.length).toBeGreaterThan(0)
  })

  it('un "¿y antes?" después de una etapa lleva a la etapa anterior', () => {
    expect(resolveIntent('y antes?', false, 'banking_experience').intent?.id).toBe('ecommerce_experience')
  })
})
