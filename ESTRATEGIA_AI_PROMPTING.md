# Estrategia de Prompting y Uso de AI en el Portfolio
**Barbara Aceto — Detalle técnico**

---

## 1. Contexto general

El portfolio integra AI en dos dimensiones distintas:

1. **AI como herramienta de construcción** — GitHub Copilot fue usado durante todo el desarrollo para generar, refactorizar y depurar código.
2. **AI como funcionalidad del producto** — El asistente `barbara.ai` es una funcionalidad construida desde cero, sin conectar a ningún LLM externo, que implementa un pipeline de NLP propio para simular un asistente conversacional.

---

## 2. El asistente barbara.ai — Arquitectura sin LLM

### ¿Por qué sin LLM externo?

La decisión fue consciente: usar un LLM externo (OpenAI, Anthropic, etc.) habría implicado:
- Costo por request
- API key expuesta o proxy backend necesario
- Respuestas no controladas sobre el contenido de Barbara
- Latencia de red

La alternativa fue construir un **motor de intents con NLP liviano** completamente en el cliente. Las respuestas son controladas al 100%, el sitio es completamente estático, y la experiencia es instantánea.

---

## 3. El pipeline de matching — Cómo funciona el "motor"

El código en `src/data/assistant.ts` implementa un pipeline de 5 etapas:

### Etapa 1 — Normalización del input

```ts
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina tildes
    .replace(/[^a-z0-9\s]/g, ' ')   // elimina puntuación
    .replace(/\s+/g, ' ')
    .trim()
}
```

Antes de analizar cualquier input, se normaliza: minúsculas, sin tildes, sin signos. Esto permite que "¿Quién es Barbara?" y "quien es barbara" sean equivalentes.

### Etapa 2 — Expansión de sinónimos

```ts
const synonymsES: Record<string, string> = {
  'gente':       'equipo',
  'personas':    'equipo',
  'contratar':   'disponible',
  'contratarla': 'disponible',
  'diferencia':  'diferenciador',
}
```

Antes de buscar intents, se expande el input con sinónimos. Si el usuario escribe "quiero contratarla", la palabra "contratar" se mapea a "disponible" antes de hacer el scoring. Esto amplía el vocabulario reconocido sin tener que duplicar keywords en cada intent.

### Etapa 3 — Memoria de contexto (context chain)

```ts
const prevCompany: Record<string, string> = {
  redbee:       'santander',
  santander:    'mercadolibre',
  mercadolibre: 'fintech',
  fintech:      'experience',
}
```

El asistente recuerda el último intent respondido. Si el usuario escribe "¿y antes?" o "¿anterior?" después de haber preguntado por redbee, el sistema navega la cadena y responde sobre Santander automáticamente, sin necesitar que el usuario nombre la empresa. Esto replica el comportamiento conversacional de un contexto natural.

### Etapa 4 — Scoring por keywords

Cada intent tiene una lista de keywords. El algoritmo suma un score por cada keyword que aparece en el input:

```ts
for (const kw of keywords) {
  const kwWords = normKw.split(' ').filter(Boolean)
  if (kwWords.length === 1 && normKw.length <= 4) {
    // Keyword corta: solo match exacto de palabra
    if (expandedWords.includes(normKw)) score += 1
  } else {
    // Keyword larga o multi-palabra: substring, score por número de palabras
    if (expanded.includes(normKw)) score += kwWords.length
  }
}
```

Las keywords multi-palabra pesan más que las de una sola sílaba. Esto evita falsos positivos: "ai" no compite igual que "inteligencia artificial".

### Etapa 5 — Selección de variante

Cada intent puede tener múltiples variantes de respuesta (`variantsES`, `variantsEN`). Se selecciona una aleatoriamente en cada request, lo que hace que el asistente no repita exactamente la misma respuesta si el usuario pregunta lo mismo dos veces:

```ts
const pool = isEnglish
  ? (intent.variantsEN?.length ? intent.variantsEN : [intent.responseEN])
  : (intent.variantsES?.length ? intent.variantsES : [intent.responseES])
const text = pool[Math.floor(Math.random() * pool.length)]
```

---

## 4. Diseño de la knowledge base — Esto ES prompting

La parte más importante del asistente no es el código de matching — es el contenido que Barbara escribió en cada intent. Esto es, en esencia, **prompt engineering aplicado a un sistema de recuperación**:

### Principios que guiaron la escritura de respuestas

**a) Voz en primera persona indirecta**  
Las respuestas hablan de Barbara en tercera persona pero con voz directa y sin corporativismo:
> *"Lo que la distingue no es una sola disciplina — es la intersección."*

**b) Respuestas estructuradas con jerarquía visual**  
Uso de `**bold**` para énfasis y `\n\n` para párrafos separados, pensando en cómo se va a renderizar en el asistente, no solo cómo se lee en el archivo de datos.

**c) Tono que refleja la personalidad real**  
Cada intent fue escrito para que suene como Barbara hablaría, no como un CV:
> *"Le cansa: la reunionitis, el producto decorativo, la estrategia que nunca llega a ejecución."*

**d) Suggestions como continuidad narrativa**  
Cada respuesta termina con 3 chips de sugerencia que guían la conversación hacia el siguiente tema lógico. No son aleatorios — fueron pensados para crear un flujo de descubrimiento:
```
Sobre Barbara → Experiencia → Santander → ¿Y antes? → Mercado Libre → ¿Proyectos?
```

**e) navLinks para puentes entre el asistente y el portfolio**  
Algunos intents incluyen links de navegación que cierran el asistente y llevan al usuario a la sección relevante del portfolio, evitando que el asistente sea un dead end:
```ts
navLinks: [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }]
```

---

## 5. Bilingüismo — Doble knowledge base

Cada intent tiene respuestas independientes en ES y EN, no una traducción automática. Esto fue una decisión de calidad: la traducción automática habría dado un tono genérico. En cambio, cada respuesta en inglés fue redactada pensando en cómo Barbara se presentaría ante una audiencia angloparlante:

```ts
// Español — tono más directo, más latinoamericano
responseES: 'Lo que la distingue no es una sola disciplina — es la intersección.'

// Inglés — mismo concepto, reformulado para audiencia global
responseEN: "What sets her apart isn't a single discipline — it's the intersection."
```

---

## 6. El efecto de "streaming" — UI que simula AI generativa

Aunque las respuestas son estáticas, el componente `AIAssistant.tsx` implementa un efecto de tipeo carácter por carácter que imita la experiencia de un LLM generando texto en tiempo real. Esto fue una decisión de UX deliberada: hace que el asistente se sienta dinámico aunque las respuestas estén pre-escritas.

---

## 7. Uso de GitHub Copilot para construir el portfolio

GitHub Copilot (este mismo asistente) fue usado durante todo el desarrollo del proyecto de formas específicas:

### Generación de estructura
Los primeros componentes, la configuración de Vite + TypeScript + Tailwind, y la estructura de routing fueron generados con prompts del tipo:
> *"Creá un componente de timeline vertical en React con TypeScript que muestre empresas como ítems seleccionables en la izquierda y contenido dinámico a la derecha"*

### Debugging en producción
Varios bugs específicos de Vercel (SPA routing, assets con espacios en nombre, tipos de TypeScript en configuraciones de PostCSS/Tailwind) fueron resueltos describiendo el error exacto y obteniendo la solución con contexto del archivo afectado.

### Recuperación de código perdido
En un punto del desarrollo, el componente `HomeTour.tsx` quedó vacío accidentalmente. Se usó `git show da1fefe:src/components/HomeTour.tsx` para recuperar la versión original desde el historial de git — el flujo completo fue asistido por Copilot.

### Iteración de contenido editorial
Los textos de la sección "Por qué construyo / Cómo trabajo" fueron reescritos múltiples veces con instrucciones de tono específicas:
> *"Reescribí estos textos con voz de senior product manager, sin corporativismo, en primera persona, más real y vivida"*

### Estrategia de prompting usada con Copilot

En cada sesión, los prompts más efectivos siguieron un patrón:

| Componente del prompt | Ejemplo |
|---|---|
| **Contexto del archivo** | "En el componente Projects.tsx..." |
| **Estado actual** | "...que actualmente tiene el logo con maxHeight 36px..." |
| **Resultado deseado** | "...quiero que Cognizant tenga maxHeight 26px y Globant 60px" |
| **Restricción** | "sin modificar el resto de la lógica" |

Los prompts vagos ("mejorá el componente") daban resultados amplios e impredecibles. Los prompts con contexto + estado actual + resultado deseado daban cambios quirúrgicos y precisos.

---

## 8. Conexión con "Humanos y Algoritmos"

El curso que Barbara dictó en redbee cubrió exactamente los principios que se aplicaron en este proyecto:

| Tema del curso | Aplicación en el portfolio |
|---|---|
| Fundamentos de LLMs | Comprender por qué construir sin LLM tenía sentido para este caso |
| Prompting estratégico | Instrucciones precisas a Copilot para generar código quirúrgico |
| Agentes y context memory | La cadena `prevCompany` que implementa memoria conversacional |
| Métricas de AI | Diseño de fallback y cobertura de intents como "tasa de acierto" |
| Ética | Respuestas controladas sobre contenido real de una persona real |

El portfolio no es solo un ejemplo de uso de AI — es la demostración práctica del criterio que Barbara enseña: saber cuándo usarla, cómo usarla y cuándo no.

---

## 9. Construcción del asistente barbara.ai — Decisiones técnicas y de diseño

### El problema de partida

Un portfolio es una pieza estática. La mayoría muestra información, pero no interactúa. La decisión fue agregar una capa conversacional que permitiera a quien visita el sitio explorar el contenido de forma activa, con sus propias palabras, sin tener que leer todo de corrido.

El desafío: hacerlo sin backend, sin costo por uso, sin exponer credenciales, y que se sintiera genuinamente como un asistente — no como un FAQ con botones.

---

### Capa 1 — La UI: un panel completo, no un chatbot

La primera decisión fue de forma: no un widget flotante de burbuja en la esquina, sino un panel que ocupa toda la pantalla con un backdrop oscuro. Esto cambia completamente el registro: en lugar de una nota al pie, es una conversación.

**En desktop:** aparece como un modal centrado de 580px de ancho, redondeado, con sombra profunda.  
**En mobile:** sube desde abajo como una bottom sheet con animación `translateY`, el patrón esperado en apps nativas.

El backdrop tiene blur: `backdropFilter: 'blur(6px)'`. Esto oscurece el sitio detrás sin taparlo del todo — el usuario sabe dónde estaba antes de abrir el asistente.

---

### Capa 2 — El efecto de streaming: percepción vs realidad

Las respuestas son texto estático. Pero el asistente no las muestra de golpe: las "escribe" palabra por palabra usando un `setInterval` de 32ms:

```ts
const words = responseText.split(' ')
let wordIdx = 0
streamIntervalRef.current = setInterval(() => {
  wordIdx++
  setMessages(prev => prev.map(m =>
    m.id === msgId ? { ...m, text: words.slice(0, wordIdx).join(' ') } : m
  ))
  if (wordIdx >= words.length) {
    clearInterval(streamIntervalRef.current!)
    setMessages(prev => prev.map(m =>
      m.id === msgId ? { ...m, streaming: false, navLinks, chips } : m
    ))
  }
}, 32)
```

Mientras escribe, aparece un cursor parpadeante (`ai-cursor`) con animación CSS. Los chips de sugerencia y los navLinks solo aparecen una vez que la respuesta termina de "escribirse" — para no distraer mientras el texto llega.

Hay un `delay` de 650ms antes de que empiece a escribir, durante el cual se muestran tres puntos animados (`TypingDots`). Ese medio segundo simula el "pensando..." de un LLM real.

---

### Capa 3 — El onboarding interno de 3 pasos

El asistente tiene su propio tour de onboarding independiente del HomeTour del portfolio. Se activa la primera vez que alguien abre el asistente y guía al usuario por las tres zonas funcionales del panel:

| Paso | Zona iluminada | Qué muestra |
|---|---|---|
| 0 | Campo de input | "Escribí algo o usá los chips" |
| 1 | Área de mensajes | "Tocá cualquier pastilla para explorar un tema" |
| 2 | Chips de sugerencias | Los chips temáticos visibles |

La técnica de spotlight no usa SVG mask (como el HomeTour) — usa **opacidad diferencial**: las zonas que no son el foco actual bajan a `opacity: 0.12` con `filter: blur(0.5px)`. El resultado visual es similar pero más simple de implementar dentro de un componente con layout fijo.

```ts
const sectionDim = (spotlight: 'messages' | 'input' | 'chips'): React.CSSProperties => {
  if (tourStep < 0) return {}
  const active = tourStep === 0 ? 'input' : tourStep === 1 ? 'messages' : 'chips'
  if (active === spotlight) return { transition: 'opacity 0.25s' }
  return { opacity: 0.12, pointerEvents: 'none', filter: 'blur(0.5px)', transition: 'opacity 0.25s, filter 0.25s' }
}
```

El estado del tour se guarda en `sessionStorage` con la key `ai-tour-done`. Si el usuario cierra y reabre el asistente en la misma sesión, no vuelve a ver el onboarding.

---

### Capa 4 — La renderización del texto: Markdown propio sin librerías

El texto de las respuestas usa una sintaxis mínima de Markdown (`**bold**`, `-` para listas, `\n\n` para párrafos). En lugar de importar una librería como `react-markdown` o `marked`, se implementaron dos funciones propias:

**`renderInline(text)`** — convierte `**texto**` en `<strong>` y números con unidades en `<span>` de color accent:
```ts
// "10 años" → <span style={{ color: 'var(--accent-primary)' }}>10 años</span>
const numParts = seg.split(/(\+\d+[\d,.]*|\d+[\d,.]*\s*(?:años?|meses?)|\d+%|\d+x\b)/g)
```

**`renderText(text)`** — divide el texto en líneas, detecta si empieza con `- ` (lista) o es la primera línea (headline con `fontWeight: 600`), y renderiza cada una con la jerarquía visual correcta. Las listas tienen un pequeño indicador vertical de 2px en color accent en lugar de bullet points, que va con el design system del portfolio.

El resultado: las respuestas del asistente tienen el mismo lenguaje visual que el resto del sitio, sin dependencias externas.

---

### Capa 5 — El label de intent: contexto visible

Cada respuesta muestra, sobre el texto, un pequeño label con emoji que identifica el tema que se respondió:

```tsx
{msg.intentId && intentMeta[msg.intentId] && (
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <span>{intentMeta[msg.intentId].emoji}</span>
    <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
      {isEnglish ? intentMeta[msg.intentId].labelEN : intentMeta[msg.intentId].labelES}
    </span>
  </div>
)}
```

Por ejemplo, una pregunta sobre Santander muestra `🏦 SANTANDER` antes de la respuesta. Sirve como breadcrumb conversacional: el usuario ve de qué habló en cada turno sin releer todo el texto.

---

### Capa 6 — El chip de tour del portfolio

Dentro del asistente existe un chip especial: **"Tour del portfolio"**. Al tocarlo, el asistente:

1. Guarda `home-tour-requested = '1'` en `sessionStorage`
2. Dispara el custom event `start-home-tour` en `window`
3. Navega a `/` con React Router
4. Se cierra

```ts
onClick={() => {
  window.sessionStorage.setItem('home-tour-requested', '1')
  window.dispatchEvent(new CustomEvent('start-home-tour'))
  navigate('/')
  onClose()
}}
```

El `HomeTour` en `Home.tsx` escucha ese evento y arranca el tour automáticamente. Esto conecta dos componentes completamente desacoplados (uno en `components/`, el otro en `pages/`) sin pasar props ni usar un store global — solo con un evento del DOM.

---

### Capa 7 — Accesibilidad

El panel tiene `role="dialog"` y `aria-modal="true"`. El backdrop captura los clicks de cierre. `Escape` cierra el asistente via event listener. El input recibe foco automáticamente al abrir (`inputRef.current?.focus()` con 100ms de delay para que complete la animación de entrada). Los botones de chips y navLinks tienen `type="button"` explícito para no disparar el `form submit`.

---

### Resumen de decisiones

| Decisión | Alternativa descartada | Por qué |
|---|---|---|
| Sin LLM externo | OpenAI API | Costo, API key expuesta, respuestas no controladas |
| Bottom sheet en mobile | Modal igual que desktop | Patrón nativo, más cómodo para touch |
| Streaming simulado | Mostrar texto completo de golpe | Experiencia percibida más dinámica |
| Markdown propio | react-markdown | Cero dependencias, control total del estilo |
| Custom events para tour | Props / context global | Desacoplamiento total entre componentes |
| sessionStorage para tour visto | localStorage | Se resetea por sesión, no de forma permanente |

---

## 10. El loop continuo de iteración — Cómo evolucionó el proyecto

El portfolio no fue construido de una vez. Fue el resultado de un loop deliberado de construir → observar → corregir → volver a construir, donde cada vuelta mejoró algo concreto.

### El ciclo base

```
Observar un problema o tener una idea
        ↓
Describírselo a Copilot con contexto preciso
        ↓
Recibir una propuesta de código
        ↓
Probarla en local (Vite dev server en localhost:5173)
        ↓
¿Funciona como esperaba?
    ↓ sí                    ↓ no
git commit           Corregir el prompt o el código
    ↓                       ↓
git push              Volver a probar
    ↓
Vercel deploya en ~60s
        ↓
Observar en producción
        ↓
Nuevo ciclo
```

### Ejemplos concretos del loop en acción

**Loop 1 — Logos que no tenían el tamaño correcto**  
Iteración inicial: todos los logos en el mismo `maxHeight`. Observación: Cognizant se veía enorme, Globant muy chico. Corrección: sizing condicional por empresa. Resultado en 2 commits. No fue un problema de código — fue un problema de criterio visual que requirió ojo humano para detectar.

**Loop 2 — El AI Assistant construido en 3 etapas**  
Primera versión: botón flotante sin contenido. Segunda: panel con knowledge base básica. Tercera: chips, variantes, animaciones, contexto memory. Cada versión fue un commit separado y un ciclo completo de observación → decisión → construcción. El asistente mejoró porque se pudo probar en vivo, no solo en papel.

**Loop 3 — La página Projects refactoreada dos veces**  
Primero fue un grid de cards. Luego una timeline horizontal. Luego una timeline vertical con slider. Cada rediseño empezó porque la versión anterior se sentía bien en código pero no en el navegador. Ver el producto en real (no en el editor) fue lo que disparó cada cambio.

**Loop 4 — El HomeTour que se perdió y se recuperó**  
Un edit accidental dejó el componente vacío. El loop de observación detectó el problema en producción. La solución: `git show da1fefe:src/components/HomeTour.tsx` para recuperar la versión anterior desde el historial. Sin git, eso habría sido trabajo perdido. El loop de iteración también incluye saber cuándo volver atrás.

### La cadencia real del loop

El historial de 44 commits tiene una cadencia irregular que refleja el proceso real:

- Algunos días: 4-5 commits seguidos (sesiones intensas de iteración rápida)
- Algunos días: 0 commits (proceso de observación, sin código)
- Semanas con muchos `fix:` seguidos de un `feat:` grande (acumulación de aprendizaje)

Esa irregularidad no es desorden — es el ritmo natural de un proceso donde la observación y la decisión valen tanto como la ejecución.

### Lo que el loop reveló sobre trabajar con AI

Trabajar con Copilot en un loop continuo dejó aprendizajes concretos sobre cómo sacarle partido:

- **El AI genera, el humano evalúa.** Cada propuesta de código requirió criterio para decidir si era correcta, si era demasiado amplia, o si resolvía el problema equivocado.
- **El contexto es todo.** Cuanto más específico fue el prompt, menos ciclos de corrección hicieron falta.
- **El loop corto es más eficiente que el plan largo.** Construir algo pequeño, verlo, corregirlo, fue más útil que diseñar todo en el papel antes de escribir una línea.
- **El historial de git es la memoria del loop.** Cada commit es un checkpoint. Si algo se rompe, siempre hay un punto de retorno.

---

*Barbara Aceto — Mayo 2026*
