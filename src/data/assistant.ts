export interface AssistantIntent {
  id: string
  keywordsES: string[]
  keywordsEN: string[]
  responseES: string
  responseEN: string
  variantsES?: string[]
  variantsEN?: string[]
  suggestionsES: string[]
  suggestionsEN: string[]
  navLinks?: { labelES: string; labelEN: string; route: string }[]
}

// Context memory chain: "¿y antes?" follows company history
const prevCompany: Record<string, string> = {
  redbee: 'santander',
  santander: 'mercadolibre',
  mercadolibre: 'seguro123',
  seguro123: 'cognizant',
  cognizant: 'experience',
  fintech: 'experience',
}

const followUpPatternsES = ['antes', 'anterior', 'previo', 'otra empresa', 'otro trabajo', 'y antes', 'que mas', 'que hizo antes']
const followUpPatternsEN = ['before', 'previous', 'prior', 'another company', 'other job', 'and before', 'what else', 'what before']

// Synonym expansion
const synonymsES: Record<string, string> = {
  'gente': 'equipo',
  'personas': 'equipo',
  'contratar': 'disponible',
  'contratarla': 'disponible',
  'empleo': 'disponible',
  'oferta': 'disponible',
  'diferencia': 'diferenciador',
  'diferente': 'diferenciador',
  'titulo': 'educacion',
  'estudio': 'educacion',
  'idiomas': 'ingles',
  'bilingue': 'ingles',
  'apps': 'herramientas',
}

const synonymsEN: Record<string, string> = {
  'people': 'team',
  'hire': 'available',
  'hiring': 'available',
  'opportunity': 'available',
  'role': 'available',
  'different': 'differentiator',
  'unique': 'differentiator',
  'degree': 'education',
  'studied': 'education',
  'languages': 'english',
  'bilingual': 'english',
  'apps': 'tools',
}

export const intents: AssistantIntent[] = [
  {
    id: 'greeting',
    keywordsES: ['hola', 'buenas', 'buen dia', 'buenos dias', 'hey', 'saludos', 'como estas', 'que tal'],
    keywordsEN: ['hello', 'hi', 'hey', 'good morning', 'greetings', 'howdy'],
    responseES: 'Hola! Soy Boconcino, tu guía en el portfolio de Barbara.\n\nPuedo contarte sobre su experiencia, cómo trabaja, qué proyectos lideró y cómo piensa sobre AI.\n\n¿Por dónde empezamos?',
    responseEN: "Hi! I'm Boconcino, Barbara's guide.\n\nI can tell you about her experience, how she works, the projects she led, and her thinking on AI and product.\n\nWhere would you like to start?",
    variantsES: [
      'Hola! Soy Boconcino, tu guía en el portfolio de Barbara.\n\nPuedo contarte sobre su experiencia, cómo trabaja, qué proyectos lideró y cómo piensa sobre AI.\n\n¿Por dónde empezamos?',
      '¡Buenas! Soy Boconcino. Barbara tiene más de 10 años construyendo productos digitales en banca, ecommerce e IA.\n\nPreguntame lo que quieras — trayectoria, proyectos, forma de liderar, visión sobre AI, disponibilidad.\n\n¿Arrancamos?',
      '¡Hola! Boconcino por acá. Estás en el portfolio de Barbara Aceto — PM con visión sistémica y un gusto particular por los problemas difíciles.\n\n¿Qué querés saber?',
    ],
    variantsEN: [
      "Hi! I'm Boconcino, Barbara's guide.\n\nI can tell you about her experience, how she works, the projects she led, and her thinking on AI and product.\n\nWhere would you like to start?",
      "Welcome! I'm Boconcino. Barbara Aceto is a PM with 10+ years building digital products in banking, e-commerce, and AI.\n\nAsk me anything: background, projects, how she leads, her AI vision, or availability.\n\nWhat would you like to know?",
      "Hey! Boconcino here. You're in Barbara Aceto's portfolio — a product leader with a systemic mindset and a taste for hard problems.\n\nWhat would you like to know?",
    ],
    suggestionsES: ['¿Qué hizo en Santander?', '¿Cómo usa AI?', '¿Está disponible?'],
    suggestionsEN: ['Santander experience', 'How she uses AI', 'Is she available?'],
  },
  {
    id: 'who_is_barbara',
    keywordsES: ['quien', 'quién', 'barbara', 'que hace', 'qué hace', 'de que trata', 'presentate', 'contame', 'quien sos', 'quien es'],
    keywordsEN: ['who', 'barbara', 'what does she do', 'introduce', 'tell me', 'about her', 'about barbara'],
    responseES: 'Barbara es Product Manager con +10 años construyendo productos digitales.\n\nTrabajó en banca (Santander), ecommerce (Mercado Libre), insurtech (123Seguro) y consultoría digital (redbee). Conecta estrategia, tecnología y equipos — con un enfoque sistémico y humano.\n\nHoy lidera desde redbee, con foco en AI aplicada a producto y equipos.',
    responseEN: 'Barbara is a Product Manager with 10+ years building digital products.\n\nShe has worked in banking (Santander), e-commerce (Mercado Libre), insurtech (123Seguro), and digital consulting (redbee). She connects strategy, technology, and teams — with a systemic and human-centered approach.\n\nToday she leads at redbee, focused on AI applied to product and teams.',
    variantsES: [
      'Barbara es Product Manager con +10 años construyendo productos digitales.\n\nTrabajó en banca (Santander), ecommerce (Mercado Libre), insurtech (123Seguro) y consultoría digital (redbee). Conecta estrategia, tecnología y equipos — con un enfoque sistémico y humano.\n\nHoy lidera desde redbee, con foco en AI aplicada a producto y equipos.',
      'Barbara conecta los puntos donde negocio, tecnología y usuarios suelen hablar idiomas distintos.\n\nMás de 10 años construyendo productos en banca, ecommerce, insurtech y consultoría digital. Hoy lidera en redbee con foco en AI aplicada a producto.\n\nLo que la define: no acumula features. Diseña sistemas que resuelven problemas reales.',
    ],
    variantsEN: [
      'Barbara is a Product Manager with 10+ years building digital products.\n\nShe has worked in banking (Santander), e-commerce (Mercado Libre), insurtech (123Seguro), and digital consulting (redbee). She connects strategy, technology, and teams — with a systemic and human-centered approach.\n\nToday she leads at redbee, focused on AI applied to product and teams.',
      "Barbara connects the dots where business, technology, and users tend to speak different languages.\n\n10+ years building products in banking, e-commerce, insurtech, and digital consulting. Today she leads at redbee with a focus on AI applied to product.\n\nWhat defines her: she doesn't stack features. She designs systems that solve real problems.",
    ],
    suggestionsES: ['¿Fintech?', '¿Cómo lidera?', '¿Ver proyectos?'],
    suggestionsEN: ['Fintech?', 'How she leads?', 'See her projects?'],
  },
  {
    id: 'experience',
    keywordsES: ['experiencia', 'trayectoria', 'anos', 'años', 'background', 'carrera', 'trabajos', 'historia', 'recorrido'],
    keywordsEN: ['experience', 'years', 'background', 'career', 'trajectory', 'history', 'resume'],
    responseES: 'Lleva más de 10 años en producto digital. Su trayectoria:\n\n- **redbee studios** · Product leadership en ecosistema digital\n- **Santander Argentina** · Product Manager — Cobranzas y Pagos (4 años)\n- **Mercado Libre** · Product Senior — Darwin Project LATAM (2 años)\n- **123Seguro** · Growth Marketing Manager — insurtech\n- **Cognizant** · Account Strategist — proyecto Google (2 años)\n- **MeLi · Globant** · SEO Semi Senior Analyst — primeros pasos en digital\n\nEmpezó en SEO y marketing digital, migró a producto y lleva varios años liderando squads cross-funcionales.',
    responseEN: 'She has 10+ years in digital product. Her trajectory:\n\n- **redbee studios** · Product leadership in digital ecosystem\n- **Santander Argentina** · Product Manager — Collections & Payments (4 years)\n- **Mercado Libre** · Senior Product — Darwin Project LATAM (2 years)\n- **123Seguro** · Growth Marketing Manager — insurtech\n- **Cognizant** · Account Strategist — Google project (2 years)\n- **MeLi · Globant** · SEO Semi Senior Analyst — first steps in digital\n\nShe started in SEO and digital marketing, moved into product, and has been leading cross-functional squads for several years.',
    suggestionsES: ['¿Santander?', '¿Mercado Libre?', '¿Cómo trabaja?'],
    suggestionsEN: ['Santander?', 'Mercado Libre?', 'How she works?'],
    navLinks: [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }],
  },
  {
    id: 'santander',
    keywordsES: ['santander', 'banco', 'bancaria', 'onboarding', 'cobranzas', 'pagos', 'cobro', 'banca', 'token', 'token app', 'squad', 'bancario', 'transformacion', 'empresarial', 'pyme', 'ecosistema pagos', 'digital bank'],
    keywordsEN: ['santander', 'bank', 'banking', 'onboarding', 'collections', 'payments', 'token', 'token app', 'squad', 'digital transformation', 'enterprise', 'sme', 'banking ecosystem'],
    responseES: 'En Santander lideró el Squad de Onboarding del ecosistema de Cobranzas y Pagos durante 4 años.\n\nAlgunos focos clave:\n- Digitalización end-to-end de flujos de onboarding empresarial\n- Liderazgo de equipos cross-funcionales: UX, Tech, Data, Compliance\n- Frameworks de medición para optimizar conversión\n- Oportunidades de cross-selling vía integración de ecosistema\n\nAntes fue Senior Product Lead: roadmapping, alineación de stakeholders y métricas de iteración.',
    responseEN: 'At Santander she led the Onboarding Squad within the Collections & Payments ecosystem for 4 years.\n\nKey areas:\n- End-to-end digitalization of business onboarding flows\n- Cross-functional team leadership: UX, Tech, Data, Compliance\n- Measurement frameworks to optimize conversion\n- Cross-selling opportunities through ecosystem integration\n\nBefore that, she was Senior Product Lead: roadmapping, stakeholder alignment, and iteration metrics.',
    suggestionsES: ['¿Cómo lidera?', '¿Qué métricas usaba?', '¿Mercado Libre?'],
    suggestionsEN: ['How she leads?', 'What metrics?', 'Mercado Libre?'],
  },
  {
    id: 'mercadolibre',
    keywordsES: ['mercado libre', 'mercadolibre', 'meli', 'ecommerce', 'darwin', 'shops', 'sellers', 'marketplace', 'smart shopping', 'facebook shop', 'instagram shop', 'roas', 'mercado shops', 'tienda online', 'anunciantes'],
    keywordsEN: ['mercado libre', 'mercadolibre', 'meli', 'ecommerce', 'darwin', 'shops', 'sellers', 'marketplace', 'smart shopping', 'facebook shop', 'instagram shop', 'roas', 'mercado shops', 'online store', 'advertisers'],
    responseES: 'En Mercado Libre fue Product Senior en Mercado Shops durante 2 años. Lideró el Proyecto Darwin para LATAM — una iniciativa de marketing inteligente para sellers.\n\nAlgunas cosas que construyó:\n- Smart Shopping integration\n- Facebook Shop e Instagram tagging\n- Integraciones de Google Analytics, Facebook Pixel, Google Ads\n- Experimentos de ROAS y Darwin roadmap\n\nTrabajar en MeLi fue aprender producto con escala real y equipos de altísimo nivel.',
    responseEN: 'At Mercado Libre she was Senior Product at Mercado Shops for 2 years. She led the Darwin Project for LATAM — a smart marketing initiative for sellers.\n\nSome things she built:\n- Smart Shopping integration\n- Facebook Shop and Instagram tagging\n- Google Analytics, Facebook Pixel, Google Ads integrations\n- ROAS experiments and Darwin roadmap\n\nWorking at MeLi meant learning product at real scale with top-tier teams.',
    suggestionsES: ['¿Ver proyectos?', '¿Cómo lidera?', '¿Santander?'],
    suggestionsEN: ['See her projects?', 'How she leads?', 'Santander?'],
  },
  {
    id: 'seguro123',
    keywordsES: ['123seguro', '123 seguro', 'seguro', 'seguros'],
    keywordsEN: ['123seguro', '123 seguro', 'insurance'],
    responseES: 'En 123Seguro fue Growth Marketing Manager — una insurtech para comparar y contratar seguros de auto, moto y hogar online.\n\nSus focos ahí:\n- Estrategia de adquisición digital\n- Embudos de conversión y landing page optimization\n- SEO, SEM y campañas de performance\n- Análisis de cohortes y métricas de growth\n\nFue una etapa bisagra: consolidó la visión de negocio y growth que después volcó en roles de producto.',
    responseEN: 'At 123Seguro she was Growth Marketing Manager — an insurtech for comparing and hiring car, motorcycle, and home insurance online.\n\nHer focus there:\n- Digital acquisition strategy\n- Conversion funnels and landing page optimization\n- SEO, SEM, and performance campaigns\n- Cohort analysis and growth metrics\n\nA pivotal stage: she built the business and growth mindset she later brought into product roles.',
    suggestionsES: ['¿Mercado Libre?', '¿Fintech?', '¿Cómo lidera?'],
    suggestionsEN: ['Mercado Libre?', 'Fintech?', 'How she leads?'],
  },
  {
    id: 'cognizant',
    keywordsES: ['cognizant', 'google', 'account strategist', 'account strategy', 'globant', 'meli globant', 'inicios', 'comienzos', 'primeros trabajos', 'primera empresa', 'imanaging', 'fulbright', 'inicio carrera', 'carrera inicial', 'seo analyst', 'semi senior'],
    keywordsEN: ['cognizant', 'google', 'account strategist', 'account strategy', 'globant', 'early career', 'first jobs', 'first company', 'imanaging', 'fulbright', 'career start', 'beginnings', 'seo analyst', 'semi senior'],
    responseES: 'En **Cognizant** fue Account Strategist en un proyecto para Google durante 2 años — estrategia digital y crecimiento de cuentas para anunciantes de Google Ads.\n\nAntes de eso, fue **SEO Semi Senior Analyst en Globant / MeLi** — sus primeros pasos en el mundo digital, construyendo bases en analytics, SEO y marketing de performance.\n\nEsa etapa le dio la visión de negocio y el contexto de escala que hoy aplica en producto.',
    responseEN: 'At **Cognizant** she was Account Strategist on a Google project for 2 years — digital strategy and account growth for Google Ads advertisers.\n\nBefore that, she was **SEO Semi Senior Analyst at Globant / MeLi** — her first steps in the digital world, building her foundations in analytics, SEO, and performance marketing.\n\nThat stage gave her the business vision and scale context she applies to product today.',
    suggestionsES: ['¿123Seguro?', '¿Mercado Libre?', '¿Trayectoria completa?'],
    suggestionsEN: ['123Seguro?', 'Mercado Libre?', 'Full background?'],
  },
  {
    id: 'education',
    keywordsES: ['educacion', 'educación', 'formacion', 'formación', 'estudios', 'universidad', 'titulo', 'título', 'uade', 'relaciones publicas', 'relaciones públicas', 'certificacion', 'certificaciones', 'certificado', 'diploma', 'digital house', 'coderhouse', 'leadership agility', 'data analytics', 'google analytics curso', 'donde estudio', 'dónde estudió', 'aprendizaje', 'formacion academica'],
    keywordsEN: ['education', 'formation', 'university', 'degree', 'studied', 'uade', 'certifications', 'certified', 'public relations', 'digital house', 'coderhouse', 'leadership agility', 'data analytics', 'where she studied', 'learning', 'academic background', 'google analytics course'],
    responseES: 'Su formación combina base académica con certificaciones prácticas.\n\n**Grado:**\n- Lic. Relaciones Públicas e Institucionales — UADE (2008–2012)\n\n**Certificaciones:**\n- Claude Code para Product Managers (2025)\n- Leadership Agility Certified (2024)\n- IA para Project Managers (2024)\n- Data Analytics — Digital House (2020)\n- Google Analytics Avanzado — Coderhouse (2020)\n- SEO — CAMSEO · Coderhouse (2019)\n\nToda su formación técnica fue autodidacta y orientada a aplicación real.',
    responseEN: 'Her training combines an academic foundation with practical certifications.\n\n**Degree:**\n- Public & Institutional Relations — UADE (2008–2012)\n\n**Certifications:**\n- Claude Code for Product Managers (2025)\n- Leadership Agility Certified (2024)\n- AI for Project Managers (2024)\n- Data Analytics — Digital House (2020)\n- Advanced Google Analytics — Coderhouse (2020)\n- SEO — CAMSEO · Coderhouse (2019)\n\nAll her technical training was self-directed and applied.',
    suggestionsES: ['¿Herramientas que usa?', '¿Metodología?', '¿Experiencia?'],
    suggestionsEN: ['Tools she uses?', 'Her methodology?', 'Experience?'],
  },
  {
    id: 'redbee',
    keywordsES: ['redbee', 'redbee studios', 'actual', 'empresa actual', 'trabaja ahora', 'trabaja hoy', 'donde trabaja', 'dónde trabaja', 'consultora', 'consultoría', 'actualmente', 'hoy trabaja', 'empresa hoy'],
    keywordsEN: ['redbee', 'redbee studios', 'current', 'current company', 'where she works', 'works now', 'consulting', 'consulting firm', 'currently', 'studio'],
    responseES: 'Hoy trabaja en redbee studios — una empresa de consultoría digital de alto impacto.\n\nAllí combina liderazgo de producto con pensamiento sistémico: diseñar y entregar productos que realmente importan, con equipos colaborativos y cultura human-centered.\n\nUna iniciativa destacada: "Humanos y Algoritmos", un curso sobre IA aplicada a producto, UX y tecnología. Cubrió fundamentos de LLMs, prompting estratégico, agentes, métricas de AI y ética.',
    responseEN: 'She currently works at redbee studios — a high-impact digital consulting firm.\n\nThere she combines product leadership with systems thinking: designing and delivering products that truly matter, with collaborative teams and a human-centered culture.\n\nA notable initiative: "Humans and Algorithms", a course on AI applied to product, UX, and technology. It covered LLM fundamentals, strategic prompting, agents, AI metrics, and ethics.',
    suggestionsES: ['¿Humanos y Algoritmos?', '¿Cómo usa AI?', '¿Sus proyectos?'],
    suggestionsEN: ['Humans & Algorithms?', 'How she uses AI?', 'Her projects?'],
  },
  {
    id: 'ai_product',
    keywordsES: ['ai', 'ia', 'inteligencia artificial', 'agentes', 'llm', 'llms', 'gpt', 'notebooklm', 'copilot', 'prompting', 'automatizacion', 'automatización', 'machine learning', 'humanos y algoritmos', 'algoritmos', 'claude', 'chatgpt', 'openai', 'gemini', 'cursor', 'claude code', 'ia generativa', 'generativa', 'gen ai', 'asistente ia', 'herramienta ia', 'integrar ia'],
    keywordsEN: ['ai', 'artificial intelligence', 'agents', 'llm', 'llms', 'gpt', 'notebooklm', 'copilot', 'prompting', 'automation', 'machine learning', 'humans and algorithms', 'claude', 'chatgpt', 'openai', 'gemini', 'cursor', 'claude code', 'generative ai', 'gen ai', 'ai tools', 'integrating ai'],
    responseES: 'Cree que la AI es un acelerador — no un reemplazo.\n\nDictó "Humanos y Algoritmos" en redbee: LLMs, prompting estratégico, agentes, métricas y ética. Y reflexionó sobre NotebookLM y el desafío real de las organizaciones: no es falta de información, es falta de capacidad para procesarla.\n\nSu visión de AI aplicada a producto:\n- Saber cuándo usarla y cuándo no\n- Mantener el humano en el loop del diseño\n- Medir impacto real, no solo el hype\n- Simplificar primero, automatizar después',
    responseEN: 'She believes AI is an accelerator — not a replacement.\n\nShe taught "Humans and Algorithms" at redbee: LLMs, strategic prompting, agents, metrics, and ethics. She also wrote about NotebookLM and the real challenge for organizations: it\'s not a lack of information — it\'s the lack of capacity to process it.\n\nHer view on AI applied to product:\n- Know when to use it and when not to\n- Keep humans in the design loop\n- Measure real impact, not just hype\n- Simplify first, automate second',
    suggestionsES: ['¿AI y equipos?', '¿Humanos y Algoritmos?', '¿Integrar AI?'],
    suggestionsEN: ['AI & teams?', 'Humans & Algorithms?', 'Integrating AI?'],
  },
  {
    id: 'leadership',
    keywordsES: ['liderazgo', 'liderar', 'lidera', 'equipo', 'equipos', 'gestión', 'gestion', 'manage', 'management', 'cultura', 'colaboracion', 'colaboración', 'squad', 'squads', 'pm', 'product manager', 'product owner', 'po', 'lider', 'líder', 'feedback', 'empatia', 'empatía', 'mentoring', 'comunicacion', 'comunicación', 'dirigir'],
    keywordsEN: ['leadership', 'lead', 'leads', 'team', 'teams', 'management', 'culture', 'collaboration', 'squad', 'squads', 'pm', 'product manager', 'product owner', 'po', 'leader', 'feedback', 'empathy', 'mentoring', 'communication'],
    responseES: 'Lidera desde la claridad y la dirección, no desde el control.\n\nAlgunos principios que la definen:\n- Dar contexto antes de dar instrucciones\n- Confiar en los equipos para ejecutar\n- Hacer preguntas antes de dar soluciones\n- Conectar el "qué" con el "por qué"\n\nLideró equipos cross-funcionales en Santander (UX, Tech, Data, Compliance) y colaboró con partners en MeLi a escala LATAM.',
    responseEN: 'She leads from clarity and direction, not from control.\n\nSome principles that define her:\n- Give context before giving instructions\n- Trust teams to execute\n- Ask questions before offering solutions\n- Connect the "what" with the "why"\n\nShe led cross-functional teams at Santander (UX, Tech, Data, Compliance) and collaborated with partners at MeLi across LATAM.',
    suggestionsES: ['¿Metodología?', '¿Maneja ambigüedad?', '¿Cómo lidera?'],
    suggestionsEN: ['Her methodology?', 'Handling ambiguity?', 'How she leads?'],
  },
  {
    id: 'methodology',
    keywordsES: ['discovery', 'delivery', 'roadmap', 'priorizar', 'priorización', 'metodologia', 'metodología', 'proceso', 'agile', 'agil', 'ágil', 'scrum', 'sprint', 'iteracion', 'iteración', 'metrica', 'métricas', 'metricas', 'decisiones', 'ambiguedad', 'ambigüedad', 'trabaja', 'forma de trabajar', 'okr', 'kpi', 'nps', 'backlog', 'lean', 'design thinking', 'ab test', 'experimento', 'hipotesis', 'hipótesis', 'funnel', 'conversion', 'conversión', 'insight', 'datos', 'prioridad'],
    keywordsEN: ['discovery', 'delivery', 'roadmap', 'prioritize', 'prioritization', 'methodology', 'process', 'agile', 'scrum', 'sprint', 'iteration', 'metrics', 'decisions', 'ambiguity', 'works', 'how she works', 'way of working', 'okr', 'kpi', 'nps', 'backlog', 'lean', 'design thinking', 'ab test', 'experiment', 'hypothesis', 'funnel', 'conversion', 'insight', 'data', 'priority'],
    responseES: 'Su proceso empieza por entender el problema real antes de hablar de soluciones.\n\n**En discovery:** escucha, datos, síntesis y definición de hipótesis claras.\n**En delivery:** prioridades explícitas, ceremonias útiles (no rituales vacíos) y métricas que importan.\n\nUsa un marco de 4 pasos: Descubrir → Definir → Construir → Medir.\n\nLo que más valora: la alineación. Un equipo alineado ejecuta 10x mejor que uno brillante pero desconectado.',
    responseEN: 'Her process starts by understanding the real problem before talking about solutions.\n\n**In discovery:** listening, data, synthesis, and clear hypothesis definition.\n**In delivery:** explicit priorities, useful ceremonies (not empty rituals), and metrics that matter.\n\nShe uses a 4-step framework: Discover → Define → Build → Measure.\n\nWhat she values most: alignment. An aligned team executes 10x better than a brilliant but disconnected one.',
    suggestionsES: ['¿Cómo lidera?', '¿Qué métricas usa?', '¿Ver proyectos?'],
    suggestionsEN: ['How she leads?', 'What metrics?', 'See projects?'],
  },
  {
    id: 'tools_stack',
    keywordsES: ['herramientas', 'figma', 'jira', 'notion', 'miro', 'confluence', 'amplitude', 'mixpanel', 'ga4', 'gtm', 'google tag manager', 'hotjar', 'looker', 'metabase', 'sql', 'sheets', 'slack', 'linear', 'asana', 'trello', 'stack', 'software', 'aplicaciones', 'programas', 'que usa', 'qué usa', 'que utiliza', 'analytics', 'google analytics'],
    keywordsEN: ['tools', 'figma', 'jira', 'notion', 'miro', 'confluence', 'amplitude', 'mixpanel', 'ga4', 'gtm', 'google tag manager', 'hotjar', 'looker', 'metabase', 'sql', 'sheets', 'slack', 'linear', 'asana', 'trello', 'tech stack', 'software', 'applications', 'programs', 'what she uses', 'analytics', 'google analytics'],
    responseES: 'Trabaja con un stack orientado a producto y datos:\n\n**Producto & Colaboración:**\n- Jira · Confluence · Notion · Linear\n- Miro · FigJam (workshops y mapas de flujo)\n- Figma (revisión y handoff, no diseño)\n\n**Analytics & Datos:**\n- Google Analytics 4 · Google Tag Manager\n- Amplitude · Mixpanel · Hotjar\n- Looker · Metabase · Google Sheets\n\n**AI (uso diario):**\n- Claude · ChatGPT · Cursor · NotebookLM\n- GitHub Copilot · Gemini\n\nElige las herramientas que reducen fricción para su equipo, no las que están de moda.',
    responseEN: 'She works with a product and data-oriented stack:\n\n**Product & Collaboration:**\n- Jira · Confluence · Notion · Linear\n- Miro · FigJam (workshops and flow maps)\n- Figma (review and handoff, not design)\n\n**Analytics & Data:**\n- Google Analytics 4 · Google Tag Manager\n- Amplitude · Mixpanel · Hotjar\n- Looker · Metabase · Google Sheets\n\n**AI (daily use):**\n- Claude · ChatGPT · Cursor · NotebookLM\n- GitHub Copilot · Gemini\n\nShe picks what reduces friction for her team, not what\'s trending.',,
    suggestionsES: ['¿Metodología?', '¿Cómo usa AI?', '¿Ver proyectos?'],
    suggestionsEN: ['Her methodology?', 'How she uses AI?', 'See projects?'],
  },
  {
    id: 'fintech',
    keywordsES: ['fintech', 'financiero', 'pagos digitales', 'transformacion digital', 'transformación digital', 'banca digital', 'insurtech', 'cobro digital', 'bancario', 'aseguradora', 'medios de pago', 'billetera digital', 'sector financiero'],
    keywordsEN: ['fintech', 'financial', 'digital payments', 'digital transformation', 'digital banking', 'insurtech', 'insurance', 'banking sector', 'payment methods', 'digital wallet', 'financial sector'],
    responseES: 'Tiene experiencia sólida en fintech y banca digital.\n\n**Santander:** transformación digital del ecosistema de Cobranzas y Pagos. Onboarding empresarial, compliance, métricas de conversión.\n\n**123Seguro:** insurtech, adquisición digital, embudos de conversión y growth.\n\nSu perspectiva: los productos fintech más difíciles no son los técnicamente complejos — son los que necesitan generar confianza en cada paso del flujo.',
    responseEN: 'She has solid experience in fintech and digital banking.\n\n**Santander:** digital transformation of the Collections & Payments ecosystem. Business onboarding, compliance, conversion metrics.\n\n**123Seguro:** insurtech, digital acquisition, conversion funnels, and growth.\n\nHer take: the hardest fintech products aren\'t the technically complex ones — they\'re the ones that need to build trust at every step of the flow.',
    suggestionsES: ['¿Santander?', '¿Métricas?', '¿Banca digital?'],
    suggestionsEN: ['Santander?', 'Metrics?', 'Digital banking?'],
  },
  {
    id: 'projects',
    keywordsES: ['proyectos', 'casos', 'ver', 'portfolio', 'portafolio', 'case study', 'case studies', 'trabajo', 'trabajos', 'ejemplos'],
    keywordsEN: ['projects', 'cases', 'see', 'portfolio', 'case study', 'case studies', 'work', 'examples'],
    responseES: 'Podés ver sus proyectos principales en la sección **Proyectos** del portfolio:\n\n- **redbee studios** — Liderazgo de producto en ecosistema digital\n- **Santander Argentina** — Cobranzas y Pagos, transformación digital\n- **Mercado Libre** — Darwin Project, Mercado Shops LATAM\n- **123Seguro** — Growth e insurtech\n- **Cognizant / Google** — Account Strategy\n\n¿Querés que te cuente más sobre alguno en particular?',
    responseEN: 'You can explore her main projects in the **Projects** section of the portfolio:\n\n- **redbee studios** — Product leadership in digital ecosystem\n- **Santander Argentina** — Collections & Payments, digital transformation\n- **Mercado Libre** — Darwin Project, Mercado Shops LATAM\n- **123Seguro** — Growth and insurtech\n- **Cognizant / Google** — Account Strategy\n\nWould you like more detail on any of them?',
    suggestionsES: ['¿Santander?', '¿Mercado Libre?', '¿Desafío complejo?'],
    suggestionsEN: ['Santander?', 'Mercado Libre?', 'Complex challenge?'],
    navLinks: [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }],
  },
  {
    id: 'contact_cv',
    keywordsES: ['contacto', 'contactar', 'email', 'mail', 'cv', 'curriculum', 'descargar', 'linkedin', 'one sheet', 'onesheet', 'whatsapp', 'llamar', 'llamada', 'escribirle', 'escribirla', 'reunion', 'reunión', 'hablar', 'telefono', 'teléfono', 'mensaje', 'como contactar'],
    keywordsEN: ['contact', 'email', 'cv', 'resume', 'download', 'linkedin', 'one sheet', 'onesheet', 'whatsapp', 'call', 'write', 'reach out', 'meeting', 'phone', 'message', 'how to contact'],
    responseES: 'Podés contactar a Barbara por:\n\n- **WhatsApp:** +54 9 11 6209 3765\n- **Email:** aceto.barbara@gmail.com\n- **LinkedIn:** /in/barbaraaceto\n\nO descargar su CV desde la sección **One Sheet** del portfolio.',
    responseEN: 'You can contact Barbara via:\n\n- **WhatsApp:** +54 9 11 6209 3765\n- **Email:** aceto.barbara@gmail.com\n- **LinkedIn:** /in/barbaraaceto\n\nOr download her CV from the **One Sheet** section of the portfolio.',
    suggestionsES: ['¿Cómo trabaja?', '¿Ver proyectos?', '¿Experiencia?'],
    suggestionsEN: ['How she works?', 'Her projects?', 'Her background?'],
    navLinks: [{ labelES: '→ Ver One Sheet', labelEN: '→ See One Sheet', route: '/one-sheet' }],
  },
  {
    id: 'motivation',
    keywordsES: ['motiva', 'motivacion', 'motivación', 'te gusta', 'le gusta', 'disfruta', 'por que hace', 'por qué hace', 'pasion', 'pasión', 'que le apasiona', 'qué le apasiona'],
    keywordsEN: ['motivates', 'motivation', 'enjoy', 'like', 'passion', 'why she does', 'what drives'],
    responseES: 'Le motiva transformar ambigüedad en dirección clara. Y trabajar con equipos donde se pueda construir en serio sin perder humanidad.\n\nLo que más disfruta: el momento en que un equipo entendió el problema de verdad y puede tomar decisiones sin necesitar respuesta para cada cosa.\n\nLe cansa: la reunionitis, el producto decorativo, la estrategia que nunca llega a ejecución.',
    responseEN: "She's motivated by transforming ambiguity into clear direction. And working with teams where you can build seriously without losing humanity.\n\nWhat she enjoys most: the moment a team truly understands the problem and can make decisions without needing an answer for every little thing.\n\nWhat drains her: meeting theater, decorative product, strategy that never reaches execution.",
    variantsES: [
      'Le motiva transformar ambigüedad en dirección clara. Y trabajar con equipos donde se pueda construir en serio sin perder humanidad.\n\nLo que más disfruta: el momento en que un equipo entendió el problema de verdad y puede tomar decisiones sin necesitar respuesta para cada cosa.\n\nLe cansa: la reunionitis, el producto decorativo, la estrategia que nunca llega a ejecución.',
      'Le apasiona el momento en que la complejidad se convierte en claridad — cuando alguien dice “ahora entiendo” y el equipo puede avanzar solo.\n\nConstruye lo opuesto al producto por acumulación: foco, contexto y propósito.\n\nLo que le cansa: la estrategia bonita que nunca llega a ejecución.',
    ],
    variantsEN: [
      "She's motivated by transforming ambiguity into clear direction. And working with teams where you can build seriously without losing humanity.\n\nWhat she enjoys most: the moment a team truly understands the problem and can make decisions without needing an answer for every little thing.\n\nWhat drains her: meeting theater, decorative product, strategy that never reaches execution.",
      "She's passionate about the moment complexity becomes clarity — when someone says 'now I get it' and the team can move forward on its own.\n\nShe builds the opposite of feature accumulation: focus, context, and purpose.\n\nWhat drains her: beautiful strategy that never reaches execution.",
    ],
    suggestionsES: ['¿Cómo lidera?', '¿Qué la distingue?', '¿Desafío complejo?'],
    suggestionsEN: ['How she leads?', 'What sets her apart?', 'Complex challenge?'],
  },
  {
    id: 'ai_opinion',
    keywordsES: ['opinion', 'opinión', 'futuro', 'robots', 'reemplazar', 'automatizacion', 'automatización', 'perder trabajo', 'reemplaza', 'ai reemplaza', 'inteligencia artificial reemplaza', 'que piensa', 'qué piensa', 'vision', 'visión', 'vision ai', 'visión ai', 'su vision', 'su visión', 'vision sobre'],
    keywordsEN: ['opinion', 'future', 'robots', 'replace', 'automation', 'lose job', 'replaces', 'ai replaces', 'what she thinks', 'thoughts on ai', 'vision', 'ai vision', 'her vision', 'her take', 'her view'],
    responseES: 'Su postura es práctica: la AI no reemplaza el criterio, lo amplifica.\n\nLo que le interesa no es la tecnología en sí — es qué problemas reales puede resolver. Cuando enseñó "Humanos y Algoritmos" arrancó exactamente ahí: no desde el hype, sino desde el problema organizacional.\n\nSu preocupación real: organizaciones que adoptan AI sin cambiar sus procesos de fondo. La herramienta no transforma sola.',
    responseEN: "Her stance is practical: AI doesn't replace judgment, it amplifies it.\n\nWhat interests her isn't the technology itself — it's what real problems it can solve. When she taught \"Humans and Algorithms\" she started exactly there: not from the hype, but from the organizational problem.\n\nHer real concern: organizations that adopt AI without changing their underlying processes. The tool doesn't transform on its own.",
    suggestionsES: ['¿Cómo usa AI?', '¿Humanos y Algoritmos?', '¿Integrar AI?'],
    suggestionsEN: ['How she uses AI?', 'Humans & Algorithms?', 'Integrating AI?'],
  },
  {
    id: 'talks',
    keywordsES: ['talks', 'charlas', 'speaker', 'conferencia', 'conferencias', 'cursos', 'workshop', 'workshops', 'ensenar', 'enseñar', 'humanos y algoritmos'],
    keywordsEN: ['talks', 'speaker', 'conference', 'conferences', 'courses', 'workshop', 'workshops', 'teach', 'humans and algorithms'],
    responseES: 'Dió charlas y workshops sobre:\n\n- **"Humanos y Algoritmos"** — AI aplicada a producto y equipos\n- Fundamentos de producto para Product Owners\n- Token App para empresas (Santander)\n- Métricas y frameworks de medición\n- Google Analytics, GA4 y GTM\n- UX básico para equipos de producto\n- Estrategia y mindset de producto\n\nPodés ver artículos y reflexiones en la sección **Notas** del portfolio.',
    responseEN: 'She gave talks and workshops on:\n\n- **"Humans and Algorithms"** — AI applied to product and teams\n- Product fundamentals for Product Owners\n- Token App for businesses (Santander)\n- Metrics and measurement frameworks\n- Google Analytics, GA4, and GTM\n- UX basics for product teams\n- Product strategy and mindset\n\nYou can find articles and reflections in the **Notes** section of the portfolio.',
    suggestionsES: ['¿Cómo usa AI?', '¿Charlas?', '¿Sus notas?'],
    suggestionsEN: ['How she uses AI?', 'Her talks?', 'Her notes?'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
  {
    id: 'notes_press',
    keywordsES: ['notas', 'nota', 'articulos', 'artículos', 'articulo', 'escribe', 'escrito', 'publica', 'reflexiones', 'contenido', 'prensa', 'noticias'],
    keywordsEN: ['notes', 'note', 'articles', 'article', 'writes', 'written', 'posts', 'content', 'reflections', 'press', 'news'],
    responseES: 'Barbara escribe sobre producto, liderazgo y aprendizaje en público.\n\nSus notas más recientes:\n- **IA y el desafío humano** — NotebookLM y las organizaciones\n- **Humanos y Algoritmos** — AI aplicada a producto y equipos\n- **Mujeres en Tech** — reflexiones sobre diversidad\n- **Reinventándome** — cambiar de dirección con intención\n\nPodés leerlas en la sección **Notas**. También tiene cobertura en medios en la sección **Prensa**.',
    responseEN: 'Barbara writes about product, leadership, and learning in public.\n\nHer recent notes:\n- **AI and the human challenge** — NotebookLM and organizations\n- **Humans and Algorithms** — AI applied to product and teams\n- **Women in Tech** — reflections on diversity\n- **Reinventing myself** — changing direction with intention\n\nYou can read them in the **Notes** section. She also has media coverage in the **Press** section.',
    suggestionsES: ['¿Sus charlas?', '¿Humanos y Algoritmos?', '¿Cómo usa AI?'],
    suggestionsEN: ['Her talks?', 'Humans & Algorithms?', 'How she uses AI?'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
  {
    id: 'challenge',
    keywordsES: ['desafio', 'desafío', 'reto', 'problema complejo', 'dificil', 'difícil', 'mas complejo', 'más complejo', 'caso complejo', 'situacion dificil', 'situación difícil'],
    keywordsEN: ['challenge', 'complex', 'difficult', 'hard problem', 'toughest', 'most complex', 'hardest'],
    responseES: 'Uno de los desafíos más complejos: digitalizar procesos de onboarding empresarial en un banco, con restricciones de compliance, múltiples sistemas legacy y stakeholders con prioridades distintas.\n\nLo que lo hizo difícil no fue la tecnología — fue alinear a un equipo cross-funcional en un entorno donde cada área defendía su propia lógica.\n\nLo que lo resolvió: empezar por definir métricas compartidas y claridad de decisión antes de hablar de roadmap.',
    responseEN: 'One of the most complex challenges: digitalizing business onboarding processes at a bank, with compliance constraints, multiple legacy systems, and stakeholders with competing priorities.\n\nWhat made it hard wasn\'t the technology — it was aligning a cross-functional team in an environment where every area defended its own logic.\n\nWhat resolved it: starting with shared metrics and decision clarity before talking about the roadmap.',
    suggestionsES: ['¿Cómo lidera?', '¿Santander?', '¿Metodología?'],
    suggestionsEN: ['How she leads?', 'Santander?', 'Her methodology?'],
  },
  {
    id: 'availability',
    keywordsES: ['disponible', 'disponibilidad', 'busca trabajo', 'open to work', 'contratar', 'contratarla', 'trabajo nuevo', 'buscando trabajo', 'oportunidad', 'oportunidades', 'entrevistar', 'hablar con ella', 'empleo', 'oferta', 'oferta laboral', 'proyecto nuevo', 'freelance', 'consulting'],
    keywordsEN: ['available', 'availability', 'looking for work', 'open to work', 'hire', 'hiring', 'job opportunity', 'new role', 'new project', 'reach out', 'interview', 'freelance', 'consulting', 'contract'],
    responseES: 'Barbara está siempre dispuesta a escuchar — ya sea una propuesta, un proyecto o simplemente conocerse.\n\nNo hay barrera de entrada: si algo resuena, responde.\n\nEl mejor primer paso es escribirle directamente:\n**aceto.barbara@gmail.com**\n\nTambién está activa en LinkedIn para conectar profesionalmente.',
    responseEN: "Barbara is always open to new conversations — whether it's a role, a project, or just getting to know each other.\n\nNo gatekeeping: if it resonates, she responds.\n\nThe best move is to reach out directly:\n**aceto.barbara@gmail.com**\n\nShe's also active on LinkedIn for professional connections.",
    suggestionsES: ['¿Cómo trabaja?', '¿Ver proyectos?', '¿Descargar CV?'],
    suggestionsEN: ['How she works?', 'See projects?', 'Download CV?'],
    navLinks: [{ labelES: '→ Ver One Sheet', labelEN: '→ See One Sheet', route: '/one-sheet' }],
  },
  {
    id: 'location_remote',
    keywordsES: ['donde vive', 'dónde vive', 'donde esta', 'dónde está', 'ubicacion', 'ubicación', 'pais', 'país', 'ciudad', 'argentina', 'buenos aires', 'remoto', 'hibrido', 'híbrido', 'presencial', 'trabaja remoto', 'zona horaria', 'timezone', 'idioma', 'idiomas', 'ingles', 'inglés', 'habla ingles', 'bilingue', 'bilingüe', 'relocation', 'remota', 'trabaja desde'],
    keywordsEN: ['where is she', 'where she lives', 'location', 'country', 'city', 'argentina', 'buenos aires', 'remote', 'hybrid', 'in-person', 'timezone', 'language', 'languages', 'english', 'speaks english', 'bilingual', 'based', 'relocation', 'work from'],
    responseES: 'Barbara vive en **Buenos Aires, Argentina** (UTC-3).\n\nModalidades de trabajo:\n- **Remoto** — experiencia con equipos distribuidos en LATAM y globales\n- **Híbrido** — lo más habitual en sus últimas empresas\n- **Presencial** — Buenos Aires principalmente\n\nIdiomas:\n- **Español** nativo\n- **Inglés** profesional (B2/C1) — reuniones, documentación, presentaciones\n\nNo busca relocation activamente, pero está abierta a proyectos globales en remoto.',
    responseEN: 'Barbara is based in **Buenos Aires, Argentina** (UTC-3).\n\nWork modes:\n- **Remote** — experienced with distributed LATAM and global teams\n- **Hybrid** — most common in her recent companies\n- **On-site** — Buenos Aires primarily\n\nLanguages:\n- **Spanish** native\n- **English** professional (B2/C1) — meetings, documentation, presentations\n\nNot actively seeking relocation, but open to global remote projects.',
    suggestionsES: ['¿Disponibilidad?', '¿Contactarla?', '¿Cómo trabaja?'],
    suggestionsEN: ['Availability?', 'Contact her?', 'How she works?'],
  },
  {
    id: 'differentiator',
    keywordsES: ['diferencia', 'diferenciador', 'diferente', 'unico', 'por que producto', 'por qué producto', 'que la hace distinta', 'qué la hace distinta', 'valor diferencial', 'propuesta de valor', 'fortaleza', 'fortalezas', 'distingue', 'distinta'],
    keywordsEN: ['differentiator', 'different', 'unique', 'why product', 'not a designer', 'not a developer', 'what makes her different', 'value proposition', 'strength', 'strengths', 'stand out', 'stands out', 'sets her apart'],
    responseES: 'Lo que la distingue no es una sola disciplina — es la intersección.\n\nNo es diseñadora, no es desarrolladora, no es solo estratega. Es la persona que puede hablar con cada uno de ellos en su idioma y traducir eso en decisiones de producto que tienen sentido.\n\nDiez años construyendo en esa intersección le dieron algo difícil de enseñar: criterio. Saber qué preguntar antes de saber qué construir.',
    responseEN: "What sets her apart isn't a single discipline — it's the intersection.\n\nShe's not a designer, not a developer, not just a strategist. She's the person who can speak each of their languages and translate that into product decisions that actually make sense.\n\nTen years working at that intersection gave her something hard to teach: judgment. Knowing what to ask before knowing what to build.",
    suggestionsES: ['¿Cómo lidera?', '¿Metodología?', '¿Qué la motiva?'],
    suggestionsEN: ['How she leads?', 'Her methodology?', 'What motivates her?'],
  },
  {
    id: 'help_menu',
    keywordsES: ['menu', 'que me podes contar', 'que podes decirme', 'que podes', 'que podés', 'opciones', 'ayuda', 'que preguntar', 'temas', 'lista', 'que sabe', 'qué sabe', 'que temas', 'qué temas'],
    keywordsEN: ['menu', 'what can you tell', 'what can you do', 'what can you say', 'options', 'help', 'what to ask', 'what do you know', 'topics', 'list of topics', 'what do you cover'],
    responseES: 'Puedo contarte sobre:\n\n- **Experiencia** — trayectoria, empresas, roles\n- **Proyectos** — Santander, Mercado Libre, redbee, 123Seguro, Cognizant\n- **Cómo trabaja** — metodología, liderazgo, equipos\n- **Herramientas** — stack de producto, analytics, AI tools\n- **Formación** — grado universitario y certificaciones\n- **AI y Producto** — cómo aplica inteligencia artificial\n- **Visión AI** — qué piensa sobre el futuro de la tecnología\n- **Notas y Prensa** — artículos y reflexiones que publica\n- **Charlas** — workshops y cursos que dictó\n- **Disponibilidad** — si está abierta a nuevos proyectos\n- **Ubicación** — dónde vive, idiomas, modalidad de trabajo\n- **Contacto** — cómo escribirle o descargar su CV\n\n¿Por dónde arrancamos?',
    responseEN: 'I can tell you about:\n\n- **Experience** — trajectory, companies, roles\n- **Projects** — Santander, Mercado Libre, redbee, 123Seguro, Cognizant\n- **How she works** — methodology, leadership, teams\n- **Tools** — product stack, analytics, AI tools\n- **Education** — university degree and certifications\n- **AI & Product** — how she applies artificial intelligence\n- **AI Vision** — her take on the future of technology\n- **Notes & Press** — articles and reflections she publishes\n- **Talks** — workshops and courses she has given\n- **Availability** — whether she\'s open to new projects\n- **Location** — where she\'s based, languages, work modes\n- **Contact** — how to reach her or download her CV\n\nWhere would you like to start?',
    suggestionsES: ['¿Experiencia?', '¿Cómo usa AI?', '¿Disponibilidad?'],
    suggestionsEN: ['Experience?', 'How she uses AI?', 'Availability?'],
  },
  {
    id: 'short_ack',
    keywordsES: ['dale', 'joya', 'copado', 'genial', 'perfecto', 'excelente', 'gracias', 'buenisimo', 'buenísimo', 'entendido', 'listo', 'okey'],
    keywordsEN: ['thanks', 'thank you', 'great', 'perfect', 'cool', 'awesome', 'got it', 'nice', 'understood', 'sure'],
    responseES: 'Buenísimo.\n\n¿Hay algo más sobre lo que pueda contarte?',
    responseEN: "Great!\n\nAnything else you'd like to know?",
    variantsES: [
      'Buenísimo.\n\n¿Hay algo más sobre lo que pueda contarte?',
      'Con gusto.\n\n¿Querés saber algo más sobre Barbara o su forma de trabajar?',
      '¡Perfecto! ¿Seguimos explorando?',
    ],
    variantsEN: [
      "Great!\n\nAnything else you'd like to know?",
      "Of course.\n\nWant to explore more about Barbara or how she works?",
      "Glad to help!\n\nIs there anything else you'd like to know?",
    ],
    suggestionsES: ['¿Cómo trabaja?', '¿Ver proyectos?', '¿Contactarla?'],
    suggestionsEN: ['How she works?', 'See projects?', 'Contact her?'],
  },
]

export const fallbackES = 'Mmm, no llegué a entender eso. Podés preguntarme sobre experiencia, proyectos, cómo trabaja, su visión sobre AI o cómo contactarla.\n\n¿Por cuál empezamos?'
export const fallbackEN = "Hmm, I didn't quite get that. You can ask about her experience, projects, how she works, her AI vision, or how to reach her.\n\nWhere would you like to start?"

export const defaultSuggestionsES = [
  '¿Quién es Barbara?',
  '¿Está disponible?',
  '¿Qué la diferencia?',
]
export const defaultSuggestionsEN = [
  'Who is Barbara?',
  'Is she available?',
  'What sets her apart?',
]

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchIntent(input: string, isEnglish: boolean, lastIntentId?: string): AssistantIntent | null {
  const normalized = normalize(input)
  const words = normalized.split(' ').filter(Boolean)

  // Context memory: short follow-up → chain to previous company/topic
  if (lastIntentId && words.length <= 5) {
    const followUps = isEnglish ? followUpPatternsEN : followUpPatternsES
    const isFollowUp = followUps.some(p => normalized.includes(normalize(p)))
    if (isFollowUp && prevCompany[lastIntentId]) {
      const prev = intents.find(i => i.id === prevCompany[lastIntentId])
      if (prev) return prev
    }
  }

  // Short acknowledgments: only for very short inputs (≤3 words)
  if (words.length <= 3) {
    const shortYesES = ['si', 'sí', 'ok', 'okey']
    const shortYesEN = ['yes', 'ok', 'okay']
    const shortYes = isEnglish ? shortYesEN : shortYesES
    const ackIntent = intents.find(i => i.id === 'short_ack')
    if (ackIntent) {
      const kwList = isEnglish ? ackIntent.keywordsEN : ackIntent.keywordsES
      if (kwList.some(kw => words.includes(normalize(kw))) || shortYes.some(kw => words.includes(kw))) {
        return ackIntent
      }
    }
  }

  // Synonym expansion: add mapped words to the input before scoring
  const synonymMap = isEnglish ? synonymsEN : synonymsES
  let expanded = normalized
  for (const [word, replacement] of Object.entries(synonymMap)) {
    if (words.includes(normalize(word))) {
      expanded += ' ' + normalize(replacement)
    }
  }
  const expandedWords = expanded.split(' ').filter(Boolean)

  let bestScore = 0
  let bestIntent: AssistantIntent | null = null

  for (const intent of intents) {
    if (intent.id === 'short_ack') continue // already handled above
    const keywords = isEnglish ? intent.keywordsEN : intent.keywordsES
    let score = 0
    for (const kw of keywords) {
      const normKw = normalize(kw)
      const kwWords = normKw.split(' ').filter(Boolean)
      if (kwWords.length === 1 && normKw.length <= 4) {
        // Short single-word keywords: require exact word match (not substring)
        if (expandedWords.includes(normKw)) {
          score += 1
        }
      } else {
        // Longer or multi-word keywords: substring match scores by word count
        if (expanded.includes(normKw)) {
          score += kwWords.length
        }
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestIntent = intent
    }
  }

  return bestScore > 0 ? bestIntent : null
}
