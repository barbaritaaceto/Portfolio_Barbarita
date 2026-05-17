# Portfolio Profesional — Barbara Aceto  
**Presentación técnica del proyecto**  
Mayo 2026

---

## 1. Descripción del proyecto

Un portfolio profesional construido como SPA (Single Page Application) desde cero, pensado no solo para mostrar información sino para **ser en sí mismo un producto digital**: con experiencia de usuario diseñada, contenido editorial, interactividad real y deploy continuo en producción.

El sitio está en línea en producción, deployado en Vercel con CI/CD automático desde GitHub.

---

## 2. Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework UI | React | 18.2.0 |
| Lenguaje | TypeScript | ^5 |
| Bundler / Dev server | Vite | ^5 |
| Estilos | Tailwind CSS | ^3 |
| Routing | React Router DOM | 6.11.2 |
| SEO | react-helmet-async | 1.3.0 |
| Email sin backend | EmailJS | 4.3.3 |
| Deploy / Hosting | Vercel | — |
| Control de versiones | Git + GitHub | — |

**Sin backend propio.** El sitio es completamente estático: los datos viven en archivos TypeScript, el formulario de contacto usa EmailJS como servicio externo, y el deploy es automático en cada push.

---

## 3. Arquitectura del código

```
src/
├── components/     → Componentes reutilizables de UI
│                     (Navbar, Footer, Cards, AIAssistant, HomeTour, Sidebar…)
├── pages/          → Una página por ruta
│                     (Home, Projects, About, Notes, Press, NotFound, OneSheet…)
├── data/           → Archivos .ts con todo el contenido
│                     (projects.ts, notes.ts, press.ts, profile.ts, types.ts)
├── routes/         → Layout.tsx — shell global compartido por todas las páginas
└── index.css       → Design tokens CSS propios
```

**Principio principal:** separación de datos y presentación. Todo el contenido vive en `data/`, lo que permite editar textos, logos o proyectos sin tocar lógica de componentes.

### Design tokens

En lugar de usar una librería de UI externa, se definieron variables CSS propias en `index.css`:

```css
--bg: #FAF8F5
--text-primary: #1F2E2A
--accent-primary: #4A7F79
--border-base: #E6E2DD
--card-bg: (color de tarjetas)
```

Esto permite cambiar todo el estilo visual del sitio desde un solo archivo.

---

## 4. Funcionalidades construidas

### Página Home
- Hero con foto, headline y descripción editorial
- Sección "Por qué construyo / Cómo trabajo" con metodología de trabajo en 4 pasos
- Sección de publicaciones curada con layout tipo revista
- Tour guiado de 6 pasos con **spotlight overlay** sobre elementos reales del DOM (sin librerías externas, usando SVG masks)

### Página Projects (la más compleja)
- Timeline editorial vertical ordenada cronológicamente
- Selector de empresa con panel de contenido dinámico
- Slider de comparación de fotos interactivo (1989 vs 2026) construido a medida
- Contexto de empresa, roles, responsabilidades, skills y aprendizajes por entrada
- Toggle "Inicios" para mostrar/ocultar carrera temprana
- Soporte bilingüe completo (ES/EN) con mapa de traducciones interno

### AI Assistant
- Asistente flotante con knowledge base sobre Barbara
- Respuestas por intents: quién es, disponibilidad, metodología, tour del portfolio
- Chips de sugerencias con animaciones
- Tour de onboarding propio de 2 pasos
- Construido completamente a medida, sin librerías de chatbot

### Bilingüismo (ES/EN)
- Toggle persistido en `localStorage`
- Custom event `app-language-change` para sincronizar idioma entre componentes desacoplados

### Formulario de feedback
- EmailJS como backend-as-a-service: los mensajes llegan a un email real
- Sin servidor propio, sin base de datos
- Botón en el footer presente en todas las páginas

### SEO
- Meta tags dinámicas por página usando `react-helmet-async`
- Título, descripción e idioma distintos en cada ruta

---

## 5. Deploy en producción

**Plataforma:** Vercel  
**Repositorio:** GitHub — `barbaritaaceto/Portfolio_Barbarita`  
**Branch de producción:** `main`

### Flujo de trabajo

```
Desarrollo local (VS Code + Vite dev server)
            ↓
  git add → git commit → git push origin main
            ↓
  Vercel detecta el push automáticamente
            ↓
  Build: vite build (genera carpeta dist/)
            ↓
  Deploy en producción en ~60 segundos
```

### Problema resuelto: SPA y routing en Vercel

Las SPAs con React Router generan error 404 cuando el usuario navega directamente a una URL como `/projects` o hace refresh, porque el servidor no tiene esa ruta — solo existe `index.html`.

**Solución:** archivo `vercel.json` con rewrite que redirige todo el tráfico a `index.html`, dejando que React Router maneje la navegación:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 6. Proceso de desarrollo — 44 commits documentados

El proyecto se construyó de forma iterativa, por fases. El historial de commits documenta cada decisión:

### Fase 1 — Infraestructura base
`Initial commit` → `scaffold portfolio` → `fix SPA routing` → `connect EmailJS`

Configuración de Vite + React + TypeScript, Tailwind, React Router, deploy en Vercel y primer formulario de contacto funcional.

### Fase 2 — Diseño editorial y contenido
`redesign why/how section` → `redesign editorial news section` → `rewrite copy`

Transformar una plantilla genérica en algo con voz propia: copy en primera persona, layout tipo revista, decisiones visuales deliberadas.

### Fase 3 — AI Assistant
`replace chatbot button` → `AI Assistant with knowledge base` → `major upgrade`

Construido en 3 iteraciones: primero un botón flotante, luego panel full-screen con knowledge base, luego chips, animaciones, variantes de respuesta y manejo de contexto.

### Fase 4 — Projects timeline
`redesign Projects as editorial career timeline` → `slider` → `vertical timeline` → `responsive`

La página de proyectos fue refactoreada completamente: de cards simples a una timeline vertical editorial con slider interactivo y navegación por empresa.

### Fase 5 — Polish y producción
`update logos` → `redbee content overhaul` → `fix tour spotlight`

Iteraciones sobre contenido real, logos, sizing, responsive y el tour guiado con spotlight sobre componentes reales del DOM.

---

## 7. Números del proyecto

| Métrica | Valor |
|---|---|
| Commits en producción | 44 |
| Componentes React | ~15 |
| Páginas con routing | 8 |
| Idiomas | 2 (ES / EN) |
| Backends propios | 0 |
| Librerías de UI externas | 0 |

---

## 8. Aprendizajes

### Técnicos
- Cómo estructurar una SPA real con separación entre datos, lógica y presentación
- Design tokens en CSS como alternativa a librerías de UI
- Deploy continuo: qué rompe una SPA en producción y cómo resolverlo
- Estado cross-componente con `sessionStorage`, `localStorage` y custom events del DOM
- SVG masks para efectos visuales complejos sin dependencias externas

### De producto
- Iterar sobre contenido propio requiere criterio editorial además de técnica
- El bilingüismo no es solo traducir: cambia el tono, el ritmo y la estructura
- Un portfolio es un producto: tiene usuarios, hipótesis y objetivos comunicacionales

### De proceso
- Los commits semánticos (`feat:`, `fix:`, `refactor:`, `copy:`) obligan a pensar con precisión qué se está cambiando y por qué
- El historial de git es la documentación del proyecto — 44 commits son 44 decisiones registradas
- Iterar rápido en local y deployar solo cuando está validado reduce el riesgo de romper producción

---

*Proyecto desarrollado por Barbara Aceto — Mayo 2026*
