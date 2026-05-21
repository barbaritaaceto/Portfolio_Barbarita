# Plan de Tracking — Analytics GA4
**Portfolio de Bárbara Aceto** · Measurement ID: `G-5TKFXFTX24`

> Todos los eventos pasan por `src/lib/analytics.ts`. Ningún `gtag()` directo fuera de ese archivo.

---

## Convenciones

| Campo | Descripción |
|---|---|
| `page_path` | Ruta de React Router (`/`, `/projects`, etc.) |
| `language` | `"es"` o `"en"` |
| `source_section` | Slug de la sección donde ocurrió la acción |
| `content_type` | `"note"`, `"article"`, `"press"` |

---

## Tabla de Eventos

### Navegación

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `page_view_custom` | `Layout.tsx` — `useEffect` en cambio de ruta | `page_path`, `page_title`, `language` | Medir tráfico por página y por idioma | 🔴 Alta |
| `section_view` | `Home.tsx` (IntersectionObserver), `Projects.tsx`, `Press.tsx` | `section_name` | Saber qué secciones realmente se ven | 🔴 Alta |
| `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90` | `useScrollDepth` hook — todas las páginas | `depth` | Engagement por página | 🟡 Media |
| `click_scroll_to_section` | Botones "↓" del Hero en `Home.tsx` | `target_section` | Interés en contenido más profundo | 🟡 Media |

---

### Hero / Perfil

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `hero_view` | `Home.tsx` — `useEffect` on mount | — | Confirmar carga real de la página | 🟡 Media |
| `click_view_projects` | Botón "Ver proyectos" en `ProfileCard` | `source_section` | Conversión de perfil a proyectos | 🔴 Alta |
| `click_contact` | Botón "Contacto" en Hero | `source_section` | Interés en contactar | 🔴 Alta |
| `click_download_cv` | Link de descarga del CV | `source_section`, `file_name` | Descarga de CV (micro-conversión) | 🔴 Alta |

---

### Cómo Trabajo (How I Work)

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `discovery_view` | IntersectionObserver al revelar sección + hover en card | — | Interés en metodología | 🟢 Baja |
| `hypothesis_view` | ídem | — | ídem | 🟢 Baja |
| `delivery_view` | ídem | — | ídem | 🟢 Baja |
| `learning_loop_view` | ídem | — | ídem | 🟢 Baja |

---

### Noticias / Contenido

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `click_content_card` | Cards de notas LinkedIn y artículos en `Home.tsx`; PressCards en `Press.tsx` | `content_title`, `content_type`, `destination_url`, `source_section` | Qué contenido genera más interés | 🔴 Alta |
| `click_external_link` | Link "Cómo se construyó" en `Footer.tsx` | `link_text`, `destination_url`, `source_section` | Interés en el proceso de construcción | 🟡 Media |

---

### Proyectos

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `project_card_view` | `Projects.tsx` — `useEffect([selectedSlug])` | `project_name`, `project_year`, `project_company` | Proyectos más vistos | 🔴 Alta |
| `click_project_card` | Click en botón de empresa/año en timeline | `project_name`, `project_year`, `project_company` | Proyectos más seleccionados activamente | 🔴 Alta |
| `expand_project_detail` | (disponible, no conectado aún) | `project_name`, `project_company` | Profundidad de lectura por proyecto | 🟡 Media |
| `click_project_cta` | Links de post / demo / repo en panel de detalle | `project_name`, `project_company`, `destination_url` | Conversión a evidencia real del trabajo | 🔴 Alta |

---

### Modal de Contacto

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `open_contact_modal` | Botón "Contacto" en `Home.tsx` | `source_section` | Intención de contactar | 🔴 Alta |
| `close_contact_modal` | Backdrop click o botón X | — | Abandono del modal | 🟡 Media |
| `click_contact_option` | Links de WhatsApp, Email, LinkedIn dentro del modal | `contact_type`, `source_section` | Canal de contacto preferido | 🔴 Alta |

---

### Idioma

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `change_language` | Toggle de idioma en `Layout.tsx` | `from_language`, `to_language` | Audiencia: hispanohablante vs anglohablante | 🟡 Media |

---

### Asistente AI (Boconcino)

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `open_ai_assistant` | Botón flotante en `Layout.tsx` | `source_section` | Interés en el asistente | 🔴 Alta |
| `close_ai_assistant` | Callback `onClose` en `Layout.tsx` | — | Duración de sesión con el asistente | 🟡 Media |
| `ai_question_sent` | `AIAssistant.tsx` — `sendMessage` | `question_length`, `language` | Qué tan activos son los usuarios | 🔴 Alta |
| `ai_suggested_question_click` | Click en chip de sugerencia | `question_length`, `language` | Utilidad de las sugerencias predefinidas | 🟡 Media |
| `ai_response_received` | Fin de streaming de respuesta | `question_type` (intent id), `language` | Tasa de respuesta exitosa e intents más usados | 🔴 Alta |
| `ai_error` | (disponible, no conectado aún) | — | Tasa de error del asistente | 🟡 Media |

---

### Feedback

| Evento | Dónde se dispara | Parámetros clave | Objetivo | Prioridad |
|---|---|---|---|---|
| `open_feedback` | Botón en `Footer.tsx` | — | Interés en dar feedback | 🟡 Media |
| `close_feedback` | Función `reset()` en `FeedbackDialog.tsx` | — | Abandono antes de enviar | 🟡 Media |
| `submit_feedback` | `handleSubmit` en `FeedbackDialog.tsx` | `feedback_comment_submitted` (bool) | Tasa de envío y si incluyen comentario | 🔴 Alta |

---

## Embudo de conversión principal

```
page_view_custom
  → hero_view
    → click_view_projects  →  project_card_view  →  click_project_cta
    → open_contact_modal   →  click_contact_option
    → click_download_cv
```

## Segmentos recomendados en GA4

| Segmento | Definición |
|---|---|
| Visitantes de habla inglesa | `language = "en"` en `page_view_custom` |
| Usuarios de AI | Tuvieron al menos 1 evento `open_ai_assistant` |
| Prospectos de alto interés | `click_download_cv` OR `click_contact_option` |
| Lectores profundos | `scroll_75` en al menos 1 página |

---

*Última actualización: generado automáticamente al completar la instrumentación del portfolio.*
