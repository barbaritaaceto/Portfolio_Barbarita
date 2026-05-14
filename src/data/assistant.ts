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
  mercadolibre: 'fintech',
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
}

const synonymsEN: Record<string, string> = {
  'people': 'team',
  'hire': 'available',
  'hiring': 'available',
  'opportunity': 'available',
  'role': 'available',
  'different': 'differentiator',
  'unique': 'differentiator',
}

export const intents: AssistantIntent[] = [
  {
    id: 'greeting',
    keywordsES: ['hola', 'buenas', 'buen dia', 'buenos dias', 'hey', 'saludos', 'como estas', 'que tal'],
    keywordsEN: ['hello', 'hi', 'hey', 'good morning', 'greetings', 'howdy'],
    responseES: 'Hola! Soy el asistente de Barbara.\n\nPuedo contarte sobre su experiencia, cómo trabaja, qué proyectos lideró y cómo piensa sobre AI y producto.\n\n¿Por dónde empezamos?',
    responseEN: "Hi! I'm Barbara's assistant.\n\nI can tell you about her experience, how she works, the projects she led, and her thinking on AI and product.\n\nWhere would you like to start?",
    variantsES: [
      'Hola! Soy el asistente de Barbara.\n\nPuedo contarte sobre su experiencia, cómo trabaja, qué proyectos lideró y cómo piensa sobre AI y producto.\n\n¿Por dónde empezamos?',
      '¡Buenas! Estás en el portfolio de Barbara Aceto — PM con más de 10 años construyendo productos digitales.\n\nPreguntame lo que quieras: su trayectoria, forma de trabajo, visión sobre AI o cómo contactarla.\n\n¿Por dónde arrancamos?',
    ],
    variantsEN: [
      "Hi! I'm Barbara's assistant.\n\nI can tell you about her experience, how she works, the projects she led, and her thinking on AI and product.\n\nWhere would you like to start?",
      "Welcome! You're in Barbara Aceto's portfolio — a PM with 10+ years building digital products.\n\nAsk me anything: her background, how she works, her take on AI, or how to reach her.\n\nWhat would you like to know?",
    ],
    suggestionsES: ['¿Qué tipo de productos lideró?', '¿Qué hizo en Santander?', '¿Cómo usa AI en producto?'],
    suggestionsEN: ['What kind of products did she lead?', 'What did she do at Santander?', 'How does she use AI in product?'],
  },
  {
    id: 'who_is_barbara',
    keywordsES: ['quien', 'quién', 'barbara', 'que hace', 'qué hace', 'de que trata', 'presentate', 'contame', 'quien sos', 'quien es'],
    keywordsEN: ['who', 'barbara', 'what does she do', 'introduce', 'tell me', 'about her', 'about barbara'],
    responseES: 'Barbara es Product Manager con +10 años construyendo productos digitales.\n\nTrabajó en banca (Santander), ecommerce (Mercado Libre), insurtech (123Seguro) y consultoría digital (redbee). Conecta estrategia, tecnología y equipos — con un enfoque sistémico y humano.\n\nHoy lidera desde redbee, con foco en AI aplicada a producto y equipos.',
    responseEN: 'Barbara is a Product Manager with 10+ years building digital products.\n\nShe has worked in banking (Santander), e-commerce (Mercado Libre), insurtech (123Seguro), and digital consulting (redbee). She connects strategy, technology, and teams — with a systemic and human-centered approach.\n\nToday she leads at redbee, focused on AI applied to product and teams.',
    variantsES: [
      'Barbara es Product Manager con +10 años construyendo productos digitales.\n\nTrabajó en banca (Santander), ecommerce (Mercado Libre), insurtech (123Seguro) y consultoría digital (redbee). Conecta estrategia, tecnología y equipos — con un enfoque sistémico y humano.\n\nHoy lidera desde redbee, con foco en AI aplicada a producto y equipos.',
      'Barbara es la persona rara que entiende tanto de negocio como de tecnología — y sabe traducir entre los dos mundos.\n\nMás de 10 años construyendo productos en banca, ecommerce, insurtech y consultoría digital. Hoy lidera en redbee con foco en AI aplicada a producto.\n\nLo que la define: no acumula features. Diseña sistemas que resuelven problemas reales.',
    ],
    variantsEN: [
      'Barbara is a Product Manager with 10+ years building digital products.\n\nShe has worked in banking (Santander), e-commerce (Mercado Libre), insurtech (123Seguro), and digital consulting (redbee). She connects strategy, technology, and teams — with a systemic and human-centered approach.\n\nToday she leads at redbee, focused on AI applied to product and teams.',
      "Barbara is the rare person who understands both business and technology — and knows how to translate between the two.\n\n10+ years building products in banking, e-commerce, insurtech, and digital consulting. Today she leads at redbee with a focus on AI applied to product.\n\nWhat defines her: she doesn't stack features. She designs systems that solve real problems.",
    ],
    suggestionsES: ['¿Cuál es su experiencia en fintech?', '¿Cómo lidera equipos?', '¿Qué proyectos lideró?'],
    suggestionsEN: ['What is her fintech experience?', 'How does she lead teams?', 'What projects did she lead?'],
  },
  {
    id: 'experience',
    keywordsES: ['experiencia', 'trayectoria', 'anos', 'años', 'background', 'carrera', 'trabajos', 'historia', 'recorrido', 'cv', 'curriculum'],
    keywordsEN: ['experience', 'years', 'background', 'career', 'trajectory', 'history', 'resume', 'cv'],
    responseES: 'Lleva más de 10 años en producto digital. Su trayectoria:\n\n- **redbee studios** · Product leadership en ecosistema digital\n- **Santander Argentina** · Product Manager — Cobranzas y Pagos (4 años)\n- **Mercado Libre** · Product Senior — Darwin Project LATAM (2 años)\n- **123Seguro** · Growth Marketing Manager — insurtech\n- **Cognizant** · Account Strategist — proyecto Google (2 años)\n\nEmpezó en marketing digital, migró a producto y lleva varios años liderando squads cross-funcionales.',
    responseEN: 'She has 10+ years in digital product. Her trajectory:\n\n- **redbee studios** · Product leadership in digital ecosystem\n- **Santander Argentina** · Product Manager — Collections & Payments (4 years)\n- **Mercado Libre** · Senior Product — Darwin Project LATAM (2 years)\n- **123Seguro** · Growth Marketing Manager — insurtech\n- **Cognizant** · Account Strategist — Google project (2 years)\n\nShe started in digital marketing, moved into product, and has been leading cross-functional squads for several years.',
    suggestionsES: ['¿Qué hizo en Santander?', '¿Qué hizo en Mercado Libre?', '¿Cómo es su forma de trabajar?'],
    suggestionsEN: ['What did she do at Santander?', 'What did she do at Mercado Libre?', 'How does she work?'],
    navLinks: [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }],
  },
  {
    id: 'santander',
    keywordsES: ['santander', 'banco', 'bancaria', 'onboarding', 'cobranzas', 'pagos', 'cobro', 'banca'],
    keywordsEN: ['santander', 'bank', 'banking', 'onboarding', 'collections', 'payments'],
    responseES: 'En Santander lideró el Squad de Onboarding del ecosistema de Cobranzas y Pagos durante 4 años.\n\nAlgunos focos clave:\n- Digitalización end-to-end de flujos de onboarding empresarial\n- Liderazgo de equipos cross-funcionales: UX, Tech, Data, Compliance\n- Frameworks de medición para optimizar conversión\n- Oportunidades de cross-selling vía integración de ecosistema\n\nAntes fue Senior Product Lead: roadmapping, alineación de stakeholders y métricas de iteración.',
    responseEN: 'At Santander she led the Onboarding Squad within the Collections & Payments ecosystem for 4 years.\n\nKey areas:\n- End-to-end digitalization of business onboarding flows\n- Cross-functional team leadership: UX, Tech, Data, Compliance\n- Measurement frameworks to optimize conversion\n- Cross-selling opportunities through ecosystem integration\n\nBefore that, she was Senior Product Lead: roadmapping, stakeholder alignment, and iteration metrics.',
    suggestionsES: ['¿Cómo lideró equipos en Santander?', '¿Qué métricas usaba?', '¿Qué hizo en Mercado Libre?'],
    suggestionsEN: ['How did she lead teams at Santander?', 'What metrics did she use?', 'What did she do at Mercado Libre?'],
  },
  {
    id: 'mercadolibre',
    keywordsES: ['mercado libre', 'mercadolibre', 'meli', 'ecommerce', 'darwin', 'shops', 'sellers', 'marketplace'],
    keywordsEN: ['mercado libre', 'mercadolibre', 'meli', 'ecommerce', 'darwin', 'shops', 'sellers', 'marketplace'],
    responseES: 'En Mercado Libre fue Product Senior en Mercado Shops durante 2 años. Lideró el Proyecto Darwin para LATAM — una iniciativa de marketing inteligente para sellers.\n\nAlgunas cosas que construyó:\n- Smart Shopping integration\n- Facebook Shop e Instagram tagging\n- Integraciones de Google Analytics, Facebook Pixel, Google Ads\n- Experimentos de ROAS y Darwin roadmap\n\nTrabajar en MeLi fue aprender producto con escala real y equipos de altísimo nivel.',
    responseEN: 'At Mercado Libre she was Senior Product at Mercado Shops for 2 years. She led the Darwin Project for LATAM — a smart marketing initiative for sellers.\n\nSome things she built:\n- Smart Shopping integration\n- Facebook Shop and Instagram tagging\n- Google Analytics, Facebook Pixel, Google Ads integrations\n- ROAS experiments and Darwin roadmap\n\nWorking at MeLi meant learning product at real scale with top-tier teams.',
    suggestionsES: ['¿Qué hizo en Santander?', '¿Qué proyectos puede ver?', '¿Cómo trabaja con equipos grandes?'],
    suggestionsEN: ['What did she do at Santander?', 'Where can I see her projects?', 'How does she work with large teams?'],
  },
  {
    id: 'redbee',
    keywordsES: ['redbee', 'redbee studios', 'actual', 'empresa actual', 'trabaja ahora', 'trabaja hoy', 'donde trabaja', 'dónde trabaja'],
    keywordsEN: ['redbee', 'redbee studios', 'current', 'current company', 'where she works', 'works now'],
    responseES: 'Hoy trabaja en redbee studios — una empresa de consultoría digital de alto impacto.\n\nAllí combina liderazgo de producto con pensamiento sistémico: diseñar y entregar productos que realmente importan, con equipos colaborativos y cultura human-centered.\n\nUna iniciativa destacada: "Humanos y Algoritmos", un curso sobre IA aplicada a producto, UX y tecnología. Cubrió fundamentos de LLMs, prompting estratégico, agentes, métricas de AI y ética.',
    responseEN: 'She currently works at redbee studios — a high-impact digital consulting firm.\n\nThere she combines product leadership with systems thinking: designing and delivering products that truly matter, with collaborative teams and a human-centered culture.\n\nA notable initiative: "Humans and Algorithms", a course on AI applied to product, UX, and technology. It covered LLM fundamentals, strategic prompting, agents, AI metrics, and ethics.',
    suggestionsES: ['¿Qué es "Humanos y Algoritmos"?', '¿Cómo usa AI en producto?', '¿Qué tipo de proyectos lleva?'],
    suggestionsEN: ['What is "Humans and Algorithms"?', 'How does she use AI in product?', 'What kind of projects does she lead?'],
  },
  {
    id: 'ai_product',
    keywordsES: ['ai', 'ia', 'inteligencia artificial', 'agentes', 'llm', 'llms', 'gpt', 'notebooklm', 'copilot', 'prompting', 'automatizacion', 'automatización', 'machine learning', 'humanos y algoritmos', 'algoritmos'],
    keywordsEN: ['ai', 'artificial intelligence', 'agents', 'llm', 'llms', 'gpt', 'notebooklm', 'copilot', 'prompting', 'automation', 'machine learning', 'humans and algorithms'],
    responseES: 'Cree que la AI es un acelerador — no un reemplazo.\n\nDictó "Humanos y Algoritmos" en redbee: LLMs, prompting estratégico, agentes, métricas y ética. Y reflexionó sobre NotebookLM y el desafío real de las organizaciones: no es falta de información, es falta de capacidad para procesarla.\n\nSu visión de AI aplicada a producto:\n- Saber cuándo usarla y cuándo no\n- Mantener el humano en el loop del diseño\n- Medir impacto real, no solo el hype\n- Simplificar primero, automatizar después',
    responseEN: 'She believes AI is an accelerator — not a replacement.\n\nShe taught "Humans and Algorithms" at redbee: LLMs, strategic prompting, agents, metrics, and ethics. She also wrote about NotebookLM and the real challenge for organizations: it\'s not a lack of information — it\'s the lack of capacity to process it.\n\nHer view on AI applied to product:\n- Know when to use it and when not to\n- Keep humans in the design loop\n- Measure real impact, not just hype\n- Simplify first, automate second',
    suggestionsES: ['¿Qué piensa sobre AI y equipos?', '¿Cómo integra AI en un producto?', '¿Qué es "Humanos y Algoritmos"?'],
    suggestionsEN: ['What does she think about AI and teams?', 'How does she integrate AI into a product?', 'What is "Humans and Algorithms"?'],
  },
  {
    id: 'leadership',
    keywordsES: ['liderazgo', 'liderar', 'lidera', 'equipo', 'equipos', 'gestión', 'gestion', 'manage', 'management', 'cultura', 'colaboracion', 'colaboración'],
    keywordsEN: ['leadership', 'lead', 'leads', 'team', 'teams', 'management', 'culture', 'collaboration'],
    responseES: 'Lidera desde la claridad y la dirección, no desde el control.\n\nAlgunos principios que la definen:\n- Dar contexto antes de dar instrucciones\n- Confiar en los equipos para ejecutar\n- Hacer preguntas antes de dar soluciones\n- Conectar el "qué" con el "por qué"\n\nLideró equipos cross-funcionales en Santander (UX, Tech, Data, Compliance) y colaboró con partners en MeLi a escala LATAM.',
    responseEN: 'She leads from clarity and direction, not from control.\n\nSome principles that define her:\n- Give context before giving instructions\n- Trust teams to execute\n- Ask questions before offering solutions\n- Connect the "what" with the "why"\n\nShe led cross-functional teams at Santander (UX, Tech, Data, Compliance) and collaborated with partners at MeLi across LATAM.',
    suggestionsES: ['¿Cómo maneja ambigüedad?', '¿Cómo tomás decisiones de producto?', '¿Cómo es su proceso de trabajo?'],
    suggestionsEN: ['How does she handle ambiguity?', 'How does she make product decisions?', 'What is her working process like?'],
  },
  {
    id: 'methodology',
    keywordsES: ['discovery', 'delivery', 'roadmap', 'priorizar', 'priorización', 'metodologia', 'metodología', 'proceso', 'agile', 'agil', 'ágil', 'scrum', 'sprint', 'iteracion', 'iteración', 'metrica', 'métricas', 'metricas', 'decisiones', 'ambiguedad', 'ambigüedad'],
    keywordsEN: ['discovery', 'delivery', 'roadmap', 'prioritize', 'prioritization', 'methodology', 'process', 'agile', 'scrum', 'sprint', 'iteration', 'metrics', 'decisions', 'ambiguity'],
    responseES: 'Su proceso empieza por entender el problema real antes de hablar de soluciones.\n\n**En discovery:** escucha, datos, síntesis y definición de hipótesis claras.\n**En delivery:** prioridades explícitas, ceremonias útiles (no rituales vacíos) y métricas que importan.\n\nUsa un marco de 4 pasos: Descubrir → Definir → Construir → Medir.\n\nLo que más valora: la alineación. Un equipo alineado ejecuta 10x mejor que uno brillante pero desconectado.',
    responseEN: 'Her process starts by understanding the real problem before talking about solutions.\n\n**In discovery:** listening, data, synthesis, and clear hypothesis definition.\n**In delivery:** explicit priorities, useful ceremonies (not empty rituals), and metrics that matter.\n\nShe uses a 4-step framework: Discover → Define → Build → Measure.\n\nWhat she values most: alignment. An aligned team executes 10x better than a brilliant but disconnected one.',
    suggestionsES: ['¿Cómo lidera equipos?', '¿Cómo conecta estrategia y ejecución?', '¿Qué métricas usás?'],
    suggestionsEN: ['How does she lead teams?', 'How does she connect strategy and execution?', 'What metrics does she use?'],
  },
  {
    id: 'fintech',
    keywordsES: ['fintech', 'financiero', 'pagos digitales', 'transformacion digital', 'transformación digital', 'banca digital', 'insurtech', 'seguro', 'cobro digital'],
    keywordsEN: ['fintech', 'financial', 'digital payments', 'digital transformation', 'digital banking', 'insurtech', 'insurance'],
    responseES: 'Tiene experiencia sólida en fintech y banca digital.\n\n**Santander:** transformación digital del ecosistema de Cobranzas y Pagos. Onboarding empresarial, compliance, métricas de conversión.\n\n**123Seguro:** insurtech, adquisición digital, embudos de conversión y growth.\n\nSu perspectiva: los productos fintech más difíciles no son los técnicamente complejos — son los que necesitan generar confianza en cada paso del flujo.',
    responseEN: 'She has solid experience in fintech and digital banking.\n\n**Santander:** digital transformation of the Collections & Payments ecosystem. Business onboarding, compliance, conversion metrics.\n\n**123Seguro:** insurtech, digital acquisition, conversion funnels, and growth.\n\nHer take: the hardest fintech products aren\'t the technically complex ones — they\'re the ones that need to build trust at every step of the flow.',
    suggestionsES: ['¿Qué hizo en Santander?', '¿Cómo maneja compliance en producto?', '¿Cómo mide éxito en fintech?'],
    suggestionsEN: ['What did she do at Santander?', 'How does she handle compliance in product?', 'How does she measure success in fintech?'],
  },
  {
    id: 'projects',
    keywordsES: ['proyectos', 'casos', 'ver', 'portfolio', 'portafolio', 'case study', 'case studies', 'trabajo', 'trabajos', 'ejemplos'],
    keywordsEN: ['projects', 'cases', 'see', 'portfolio', 'case study', 'case studies', 'work', 'examples'],
    responseES: 'Podés ver sus proyectos principales en la sección **Proyectos** del portfolio:\n\n- **redbee studios** — Liderazgo de producto en ecosistema digital\n- **Santander Argentina** — Cobranzas y Pagos, transformación digital\n- **Mercado Libre** — Darwin Project, Mercado Shops LATAM\n- **123Seguro** — Growth e insurtech\n- **Cognizant / Google** — Account Strategy\n\n¿Querés que te cuente más sobre alguno en particular?',
    responseEN: 'You can explore her main projects in the **Projects** section of the portfolio:\n\n- **redbee studios** — Product leadership in digital ecosystem\n- **Santander Argentina** — Collections & Payments, digital transformation\n- **Mercado Libre** — Darwin Project, Mercado Shops LATAM\n- **123Seguro** — Growth and insurtech\n- **Cognizant / Google** — Account Strategy\n\nWould you like more detail on any of them?',
    suggestionsES: ['¿Qué hizo en Santander?', '¿Qué hizo en Mercado Libre?', '¿Cuál fue un desafío complejo?'],
    suggestionsEN: ['What did she do at Santander?', 'What did she do at Mercado Libre?', 'What was a complex challenge she solved?'],
    navLinks: [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }],
  },
  {
    id: 'contact_cv',
    keywordsES: ['contacto', 'contactar', 'email', 'mail', 'cv', 'curriculum', 'descargar', 'linkedin', 'one sheet', 'onesheet'],
    keywordsEN: ['contact', 'email', 'cv', 'resume', 'download', 'linkedin', 'one sheet', 'onesheet'],
    responseES: 'Podés contactar a Barbara por email: **aceto.barbara@gmail.com**\n\nO descargar su CV desde la sección **One Sheet** del portfolio.\n\nTambién está activa en LinkedIn si querés conectar profesionalmente.',
    responseEN: 'You can contact Barbara by email: **aceto.barbara@gmail.com**\n\nOr download her CV from the **One Sheet** section of the portfolio.\n\nShe\'s also active on LinkedIn if you\'d like to connect professionally.',
    suggestionsES: ['¿Cómo trabaja?', '¿Qué proyectos lideró?', '¿Dónde ver su experiencia?'],
    suggestionsEN: ['How does she work?', 'What projects did she lead?', 'Where can I see her experience?'],
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
    suggestionsES: ['¿Cómo lidera equipos?', '¿Qué tipo de problemas resuelve?', '¿Cuál fue un desafío complejo?'],
    suggestionsEN: ['How does she lead teams?', 'What kind of problems does she solve?', 'What was a complex challenge?'],
  },
  {
    id: 'ai_opinion',
    keywordsES: ['opinion', 'opinión', 'futuro', 'robots', 'reemplazar', 'automatizacion', 'automatización', 'perder trabajo', 'reemplaza', 'ai reemplaza', 'inteligencia artificial reemplaza', 'que piensa', 'qué piensa'],
    keywordsEN: ['opinion', 'future', 'robots', 'replace', 'automation', 'lose job', 'replaces', 'ai replaces', 'what she thinks', 'thoughts on ai'],
    responseES: 'Su postura es práctica: la AI no reemplaza el criterio, lo amplifica.\n\nLo que le interesa no es la tecnología en sí — es qué problemas reales puede resolver. Cuando enseñó "Humanos y Algoritmos" arrancó exactamente ahí: no desde el hype, sino desde el problema organizacional.\n\nSu preocupación real: organizaciones que adoptan AI sin cambiar sus procesos de fondo. La herramienta no transforma sola.',
    responseEN: "Her stance is practical: AI doesn't replace judgment, it amplifies it.\n\nWhat interests her isn't the technology itself — it's what real problems it can solve. When she taught \"Humans and Algorithms\" she started exactly there: not from the hype, but from the organizational problem.\n\nHer real concern: organizations that adopt AI without changing their underlying processes. The tool doesn't transform on its own.",
    suggestionsES: ['¿Cómo usa AI en producto?', '¿Qué es "Humanos y Algoritmos"?', '¿Cómo integrás AI en un equipo?'],
    suggestionsEN: ['How does she use AI in product?', 'What is "Humans and Algorithms"?', 'How do you integrate AI into a team?'],
  },
  {
    id: 'talks',
    keywordsES: ['talks', 'charlas', 'speaker', 'conferencia', 'conferencias', 'cursos', 'workshop', 'workshops', 'ensenar', 'enseñar', 'notas', 'articulos', 'artículos', 'prensa', 'humanos y algoritmos'],
    keywordsEN: ['talks', 'speaker', 'conference', 'conferences', 'courses', 'workshop', 'workshops', 'teach', 'notes', 'articles', 'press', 'humans and algorithms'],
    responseES: 'Dió charlas y workshops sobre:\n\n- **"Humanos y Algoritmos"** — AI aplicada a producto y equipos\n- Fundamentos de producto para Product Owners\n- Token App para empresas (Santander)\n- Métricas y frameworks de medición\n- Google Analytics, GA4 y GTM\n- UX básico para equipos de producto\n- Estrategia y mindset de producto\n\nPodés ver artículos y reflexiones en la sección **Notas** del portfolio.',
    responseEN: 'She gave talks and workshops on:\n\n- **"Humans and Algorithms"** — AI applied to product and teams\n- Product fundamentals for Product Owners\n- Token App for businesses (Santander)\n- Metrics and measurement frameworks\n- Google Analytics, GA4, and GTM\n- UX basics for product teams\n- Product strategy and mindset\n\nYou can find articles and reflections in the **Notes** section of the portfolio.',
    suggestionsES: ['¿Cómo usa AI en producto?', '¿Cómo enseña a equipos?', '¿Dónde ver sus notas?'],
    suggestionsEN: ['How does she use AI in product?', 'How does she teach teams?', 'Where can I see her notes?'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
  {
    id: 'challenge',
    keywordsES: ['desafio', 'desafío', 'reto', 'problema complejo', 'dificil', 'difícil', 'mas complejo', 'más complejo', 'caso complejo', 'situacion dificil', 'situación difícil'],
    keywordsEN: ['challenge', 'complex', 'difficult', 'hard problem', 'toughest', 'most complex', 'hardest'],
    responseES: 'Uno de los desafíos más complejos: digitalizar procesos de onboarding empresarial en un banco, con restricciones de compliance, múltiples sistemas legacy y stakeholders con prioridades distintas.\n\nLo que lo hizo difícil no fue la tecnología — fue alinear a un equipo cross-funcional en un entorno donde cada área defendía su propia lógica.\n\nLo que lo resolvió: empezar por definir métricas compartidas y claridad de decisión antes de hablar de roadmap.',
    responseEN: 'One of the most complex challenges: digitalizing business onboarding processes at a bank, with compliance constraints, multiple legacy systems, and stakeholders with competing priorities.\n\nWhat made it hard wasn\'t the technology — it was aligning a cross-functional team in an environment where every area defended its own logic.\n\nWhat resolved it: starting with shared metrics and decision clarity before talking about the roadmap.',
    suggestionsES: ['¿Cómo lidera en entornos complejos?', '¿Qué hizo en Santander?', '¿Cómo tomás decisiones difíciles?'],
    suggestionsEN: ['How does she lead in complex environments?', 'What did she do at Santander?', 'How does she make tough decisions?'],
  },
  {
    id: 'availability',
    keywordsES: ['disponible', 'disponibilidad', 'busca trabajo', 'open to work', 'contratar', 'contratarla', 'trabajo nuevo', 'buscando trabajo', 'oportunidad', 'oportunidades', 'entrevistar', 'hablar con ella', 'empleo', 'oferta', 'oferta laboral', 'proyecto nuevo', 'freelance', 'consulting'],
    keywordsEN: ['available', 'availability', 'looking for work', 'open to work', 'hire', 'hiring', 'job opportunity', 'new role', 'new project', 'reach out', 'interview', 'freelance', 'consulting', 'contract'],
    responseES: 'Barbara está siempre dispuesta a escuchar — ya sea una propuesta, un proyecto o simplemente conocerse.\n\nNo hay barrera de entrada: si algo resuena, responde.\n\nEl mejor primer paso es escribirle directamente:\n**aceto.barbara@gmail.com**\n\nTambién está activa en LinkedIn para conectar profesionalmente.',
    responseEN: "Barbara is always open to new conversations — whether it's a role, a project, or just getting to know each other.\n\nNo gatekeeping: if it resonates, she responds.\n\nThe best move is to reach out directly:\n**aceto.barbara@gmail.com**\n\nShe's also active on LinkedIn for professional connections.",
    suggestionsES: ['¿Cómo trabaja?', '¿Qué proyectos lideró?', '¿Cómo descargar su CV?'],
    suggestionsEN: ['How does she work?', 'What projects did she lead?', 'How to download her CV?'],
    navLinks: [{ labelES: '→ Ver One Sheet', labelEN: '→ See One Sheet', route: '/one-sheet' }],
  },
  {
    id: 'differentiator',
    keywordsES: ['diferencia', 'diferenciador', 'diferente', 'unico', 'por que producto', 'por qué producto', 'que la hace distinta', 'qué la hace distinta', 'valor diferencial', 'propuesta de valor', 'fortaleza', 'fortalezas', 'distingue', 'distinta'],
    keywordsEN: ['differentiator', 'different', 'unique', 'why product', 'not a designer', 'not a developer', 'what makes her different', 'value proposition', 'strength', 'strengths', 'stand out', 'stands out'],
    responseES: 'Lo que la distingue no es una sola disciplina — es la intersección.\n\nNo es diseñadora, no es desarrolladora, no es solo estratega. Es la persona que puede hablar con cada uno de ellos en su idioma y traducir eso en decisiones de producto que tienen sentido.\n\nDiez años construyendo en esa intersección le dieron algo difícil de enseñar: criterio. Saber qué preguntar antes de saber qué construir.',
    responseEN: "What sets her apart isn't a single discipline — it's the intersection.\n\nShe's not a designer, not a developer, not just a strategist. She's the person who can speak each of their languages and translate that into product decisions that actually make sense.\n\nTen years working at that intersection gave her something hard to teach: judgment. Knowing what to ask before knowing what to build.",
    suggestionsES: ['¿Cómo lidera equipos?', '¿Cuál es su metodología?', '¿Qué la motiva?'],
    suggestionsEN: ['How does she lead teams?', 'What is her methodology?', 'What motivates her?'],
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
    suggestionsES: ['¿Cómo trabaja?', '¿Qué proyectos lideró?', '¿Cómo contactarla?'],
    suggestionsEN: ['How does she work?', 'What projects did she lead?', 'How to contact her?'],
  },
]

export const fallbackES = 'No encontré eso exactamente — probá con algo más concreto 🙂\n\n¿Te puedo ayudar con alguno de estos temas?'
export const fallbackEN = "I didn't quite catch that — try asking something more specific 🙂\n\nCan I help you with one of these topics?"

export const defaultSuggestionsES = [
  '¿Qué tipo de productos lideró?',
  '¿Cómo usa AI en producto?',
  '¿Qué hizo en Santander?',
  '¿Cómo trabaja con equipos?',
]
export const defaultSuggestionsEN = [
  'What kind of products did she lead?',
  'How does she use AI in product?',
  'What did she do at Santander?',
  'How does she work with teams?',
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
