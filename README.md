# Portfolio de Barbara Aceto

Sitio personal de Barbara Aceto, Product & AI Leader: https://portfolio-barbarita.vercel.app

Es una sola página que recorre quién es, sus ideas, por qué construye y su trayectoria, con un guía conversacional (Bocconcino) y un CV descargable (One Sheet). Está disponible en español e inglés.

## Stack

React 18, TypeScript, Vite y Tailwind CSS. No tiene backend: los contenidos viven en archivos TypeScript y el formulario de feedback usa EmailJS. Se publica en Vercel.

## Cómo correrlo

```bash
npm install
npm run dev        # servidor local
npm run typecheck  # revisión de tipos
npm test           # pruebas del guía (preguntas típicas → respuesta esperada)
npm run build      # revisión de tipos + pruebas + build de producción
```

El formulario de feedback necesita tres variables de entorno en `.env.local`: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY`.

## Estructura

- `src/pages/Home.tsx`: la página principal y sus secciones.
- `src/pages/Trayectoria.tsx`: la sección Trayectoria, incrustada en el Home.
- `src/pages/OneSheet.tsx`: el CV en una hoja, imprimible como PDF.
- `src/components/AIAssistant.tsx` y `src/data/assistant.ts`: Bocconcino, el guía del portfolio. Responde con respuestas fijas elegidas por palabras clave; no usa un modelo de IA.
- `src/components/HomeTour.tsx`: el tour de bienvenida.
- `docs/assistant-qas.md`: el mapa de preguntas y respuestas del guía.
- `docs/presentacion-proyecto/`: la fuente de la presentación "Cómo se construyó este portfolio".

## Publicación

Cada push a `main` publica el sitio en Vercel. El build se detiene si la revisión de tipos encuentra errores o si falla una prueba.
