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

export const assistantBasePrompt = `Tu objetivo no es repetir el portfolio de Barbi.
Tu objetivo es pensar como una versión artificial de Barbi: directa, curiosa, pragmática y con criterio.

Respondé en primera persona cuando representes su mirada.
Priorizá respuestas breves, conversacionales, con opinión propia y una pregunta útil para seguir.`

const prevContext: Record<string, string> = {
  current_work: 'banking_experience',
  banking_experience: 'ecommerce_experience',
  ecommerce_experience: 'insurtech_growth',
  insurtech_growth: 'early_career',
  early_career: 'experience',
  fintech: 'experience',
}

const followUpPatternsES = ['antes', 'anterior', 'previo', 'otra etapa', 'otro trabajo', 'y antes', 'que mas', 'qué más', 'que hizo antes']
const followUpPatternsEN = ['before', 'previous', 'prior', 'another stage', 'other work', 'and before', 'what else', 'what before']
const synonymsES: Record<string, string> = { gente: 'equipo', personas: 'equipo', contratar: 'disponible', contratarla: 'disponible', empleo: 'disponible', oferta: 'disponible', diferencia: 'diferenciador', diferente: 'diferenciador', titulo: 'educacion', estudio: 'educacion', idiomas: 'ingles', bilingue: 'ingles', apps: 'herramientas' }
const synonymsEN: Record<string, string> = { people: 'team', hire: 'available', hiring: 'available', opportunity: 'available', role: 'available', different: 'differentiator', unique: 'differentiator', degree: 'education', studied: 'education', languages: 'english', bilingual: 'english', apps: 'tools' }

export const intents: AssistantIntent[] = [
  {
    id: 'team_not_delivering',
    keywordsES: ['mi equipo no esta entregando', 'mi equipo no está entregando', 'equipo no entrega', 'equipo trabado', 'no llegamos', 'no cumplen', 'no entregamos', 'delivery trabado', 'delivery lento', 'no estamos entregando'],
    keywordsEN: ['my team is not delivering', "my team isn't delivering", 'team not delivering', 'stuck team', 'delivery is slow', 'we are not delivering', "we're not delivering"],
    responseES: 'Antes de pedir más velocidad, trataría de entender **qué estamos llamando “problema de delivery”**.\n\nPuede significar cosas muy distintas: demasiadas cosas abiertas, historias mal definidas, decisiones que nadie toma, dependencias externas, QA convertido en cuello de botella, cambios permanentes de prioridad, deuda técnica o una capacidad que estamos fingiendo que existe.\n\nViví proyectos donde mirar solo velocity hubiera llevado exactamente a la conclusión equivocada.\n\nMi primera obsesión sería hacer visible el sistema: **qué entra, dónde espera, dónde vuelve para atrás y quién tiene que decidir para que avance**.\n\nMuchas veces la velocidad es el síntoma. No la causa.\n\nSi querés, contame cómo trabajan hoy y te digo dónde miraría primero.',
    responseEN: 'Before asking for more speed, I would try to understand **what we are calling a delivery problem**.\n\nIt can mean too much work in progress, poorly defined stories, decisions nobody is making, external dependencies, QA as a bottleneck, constant priority changes, technical debt or capacity we are pretending exists.\n\nOften speed is the symptom. Not the cause.',
    suggestionsES: ['¿Cómo liderás ambigüedad?', '¿Velocidad o calidad?', 'Stakeholders desalineados'],
    suggestionsEN: ['How do you lead ambiguity?', 'Speed or quality?', 'Misaligned stakeholders'],
  },
  {
    id: 'product_idea_validation',
    keywordsES: ['tengo una idea', 'idea de producto', 'validar idea', 'vale la pena construir', 'vale la pena construirla', 'como validar', 'cómo validar', 'validarias', 'validar si vale', 'pregunta antes de construir', 'que pregunta deberia hacer antes de construir', 'qué pregunta debería hacer antes de construir'],
    keywordsEN: ['i have a product idea', 'product idea', 'validate idea', 'worth building', 'how would you validate', 'validate whether', 'is it worth building', 'question before building', 'what question should i ask before building'],
    responseES: 'Me gustan las ideas. Pero me gustan todavía más cuando sobreviven al contacto con la realidad.\n\nAntes de construir preguntaría:\n\n**¿Qué tendría que ser verdad para que esta idea valga la pena?**\n\nDespués buscaría la forma más barata de comprobarlo. No necesariamente código: puede ser un prototipo, cinco conversaciones, una landing, datos existentes, una simulación o hacer manualmente durante una semana lo que después imaginamos automatizado.\n\nMi objetivo no sería demostrar que la idea es buena. Sería encontrar rápido **por qué podría estar equivocada**.\n\nSi sobrevive, recién ahí empezaría a enamorarme de la solución.',
    responseEN: 'I like ideas. But I like them even more when they survive contact with reality.\n\nBefore building, I would ask: **what would need to be true for this idea to be worth it?**\n\nThen I would look for the cheapest way to test it. Not necessarily code: a prototype, five conversations, a landing page, existing data, a simulation or doing manually for a week what we later imagine automating.',
    suggestionsES: ['¿Qué métricas mirarías?', '¿Discovery o delivery?', '¿Cómo construye producto?'],
    suggestionsEN: ['What metrics would you watch?', 'Discovery or delivery?', 'How she builds product?'],
  },
  {
    id: 'ai_pm_role',
    keywordsES: ['como cambia la ia el rol', 'cómo cambia la ia el rol', 'rol de product manager', 'rol del pm', 'ia cambia pm', 'ai cambia producto', 'futuro del product manager'],
    keywordsEN: ['how does ai change the product manager role', 'ai change pm role', 'product manager role', 'future of product manager', 'ai changes product management'],
    responseES: 'Para mí, la IA no achica el rol de Product. **Le saca escondites.**\n\nAntes podíamos consumir muchísimo tiempo escribiendo documentos, resumiendo reuniones, ordenando research, armando alternativas o produciendo artefactos. Todo eso se está acelerando brutalmente.\n\nEntonces queda mucho más expuesto lo difícil: elegir qué problema importa, hacer buenas preguntas, conectar señales contradictorias, entender negocio, conversar con tecnología, leer una organización y tomar decisiones con información incompleta.\n\nLa IA puede producir veinte opciones en segundos.\n\nEl desafío sigue siendo saber **cuál no construir**.',
    responseEN: 'For me, AI does not shrink the Product role. **It removes hiding places.**\n\nDocuments, summaries, research organization and alternatives are getting faster. So the hard part becomes more exposed: choosing which problem matters, asking better questions and deciding with incomplete information. AI can produce twenty options in seconds. The challenge is still knowing **which one not to build**.',
    suggestionsES: ['IA y equipos', '¿Qué no automatizarías?', 'Aprendizaje organizacional'],
    suggestionsEN: ['AI and teams', 'What would you not automate?', 'Organizational learning'],
  },
  {
    id: 'financial_products_learning',
    keywordsES: ['productos financieros', 'aprendiste construyendo productos financieros', 'banca', 'financiero', 'financieros', 'regulacion', 'regulación', 'compliance', 'pagos', 'cobranzas'],
    keywordsEN: ['financial products', 'building financial products', 'banking', 'financial', 'regulation', 'compliance', 'payments', 'collections'],
    responseES: 'La banca me enseñó que **algo puede funcionar perfectamente y aun así ser un mal producto**.\n\nEn productos financieros no alcanza con que la pantalla responda. Tiene que haber confianza, trazabilidad, seguridad, operación, regulación, soporte y claridad.\n\nY casi nunca diseñás sobre una hoja en blanco: hay legacy, múltiples sistemas, dependencias, compliance, riesgo y decisiones que cruzan varias áreas.\n\nEso cambió mucho mi manera de hacer producto. Dejé de pensar únicamente en “el usuario” y empecé a pensar en **el sistema completo que tiene que ser capaz de sostener esa experiencia**.\n\nLa complejidad interna puede ser enorme. El usuario no debería tener que pagar por ella.',
    responseEN: 'Banking taught me that **something can work perfectly and still be a bad product**.\n\nIn financial products, it is not enough for the screen to respond. There has to be trust, traceability, security, operations, regulation, support and clarity. The user should not have to pay for internal complexity.',
    suggestionsES: ['Productos financieros', '¿Qué métricas mirarías?', 'Stakeholders desalineados'],
    suggestionsEN: ['Financial products', 'What metrics would you watch?', 'Misaligned stakeholders'],
  },
  {
    id: 'speed_quality',
    keywordsES: ['velocidad y calidad', 'velocidad o calidad', 'equilibrar velocidad', 'balancear velocidad', 'rapido y bien', 'rápido y bien', 'calidad vs velocidad', 'speed quality'],
    keywordsEN: ['speed and quality', 'speed or quality', 'balance speed', 'quality vs speed', 'fast and good', 'move fast without breaking'],
    responseES: 'Tengo una pequeña pelea con esta pregunta porque presupone que velocidad y calidad siempre compiten.\n\nA veces sí. Pero muchísimas veces lo que nos hace lentos es precisamente **la mala calidad del sistema de trabajo**: requisitos ambiguos, demasiadas cosas abiertas, QA tardío, decisiones pendientes, dependencias sin dueño, refinamientos eternos.\n\nEso genera retrabajo. Y el retrabajo es carísimo.\n\nPara mí, moverse rápido no significa hacer más. Significa reducir el tiempo entre:\n\n**pregunta → decisión → evidencia → aprendizaje.**\n\nSi el riesgo es alto, aumento control. Si la incertidumbre es alta, reduzco alcance. Si ya sabemos qué construir, elimino fricción.\n\nNo optimizaría siempre la misma cosa.',
    responseEN: 'I have a small fight with this question because it assumes speed and quality always compete. Very often what makes us slow is precisely **the poor quality of the work system**: ambiguous requirements, too much open work, late QA and pending decisions. Moving fast means reducing the time between **question → decision → evidence → learning**.',
    suggestionsES: ['Tengo una idea de producto', 'Mi equipo no está entregando', '¿Qué no haría Barbi?'],
    suggestionsEN: ['I have a product idea', "My team isn't delivering", 'What would Barbi not do?'],
  },
  {
    id: 'ambiguity_leadership',
    keywordsES: ['contextos ambiguos', 'ambiguedad', 'ambigüedad', 'liderar en ambiguo', 'lideras en contextos', 'liderás en contextos', 'incertidumbre', 'no hay claridad'],
    keywordsEN: ['ambiguous contexts', 'ambiguity', 'lead in ambiguity', 'uncertainty', 'no clarity', 'leading ambiguous'],
    responseES: 'La ambigüedad no me molesta demasiado.\n\nLo que me preocupa es cuando hacemos de cuenta que no existe.\n\nEn contextos inciertos intento separar tres cosas:\n\n**lo que sabemos, lo que creemos y lo que todavía necesitamos descubrir.**\n\nParece simple. No lo es. Cuando eso no está explícito, negocio, UX, tecnología y liderazgo empiezan a rellenar los espacios vacíos con versiones distintas de la realidad.\n\nAhí aparecen discusiones que parecen de solución pero en realidad son de contexto.\n\nLiderar ambigüedad, para mí, no es tener todas las respuestas. Es conseguir que el equipo pueda avanzar **sin inventarse certezas**.',
    responseEN: 'Ambiguity does not bother me too much. What worries me is when we pretend it is not there. In uncertain contexts, I separate **what we know, what we believe and what we still need to discover**. Leading ambiguity is helping the team move forward **without inventing certainty**.',
    suggestionsES: ['Stakeholders desalineados', '¿Cómo lidera equipos?', 'Mi equipo no está entregando'],
    suggestionsEN: ['Misaligned stakeholders', 'How she leads teams', "My team isn't delivering"],
  },
  {
    id: 'misaligned_stakeholders',
    keywordsES: ['stakeholders desalineados', 'stakeholders', 'negocio y tecnologia', 'negocio y tecnología', 'areas desalineadas', 'áreas desalineadas', 'nadie decide', 'no se ponen de acuerdo', 'conflicto entre negocio', 'alineacion', 'alineación'],
    keywordsEN: ['misaligned stakeholders', 'stakeholders', 'business and technology', 'teams are misaligned', 'nobody decides', 'cannot agree', 'alignment', 'business tech conflict'],
    responseES: 'Si negocio y tecnología no se ponen de acuerdo, agregar otra reunión probablemente no sea mi primera elección 😅.\n\nIntentaría descubrir **qué está optimizando cada uno**.\n\nNegocio quizá está mirando time-to-market. Tecnología, estabilidad. Compliance, riesgo. UX, experiencia. Operaciones, sostenibilidad.\n\nY probablemente todos tengan una parte de razón.\n\nEl trabajo de Producto no es elegir un ganador. Es construir una decisión donde esos costos sean visibles.\n\nMuchas veces el desacuerdo desaparece cuando dejamos de discutir soluciones y explicitamos:\n\n**objetivo + restricciones + trade-offs + quién decide.**',
    responseEN: 'If business and technology cannot agree, adding another meeting is probably not my first choice 😅. I would try to understand **what each side is optimizing for**. Product’s job is not to choose a winner. It is to build a decision where the costs are visible: **objective + constraints + trade-offs + who decides**.',
    suggestionsES: ['¿Cómo liderás ambigüedad?', '¿Qué métricas mirarías?', 'Casos reales'],
    suggestionsEN: ['How do you lead ambiguity?', 'What metrics would you watch?', 'Real cases'],
  },
  {
    id: 'roadmap_chaos',
    keywordsES: ['roadmap caotico', 'roadmap caótico', 'roadmap desordenado', 'roadmap no se cumple', 'muchas prioridades', 'prioridades cambiantes', 'todo es urgente', 'no se que priorizar', 'no sé qué priorizar', 'todo es prioridad'],
    keywordsEN: ['roadmap chaos', 'chaotic roadmap', 'roadmap is messy', 'roadmap keeps changing', 'too many priorities', 'everything is urgent', 'do not know what to prioritize', "don't know what to prioritize"],
    responseES: 'Cuando todo es prioridad, el roadmap no está lleno.\n\n**Está roto el sistema de decisión.**\n\nYo empezaría preguntando quién puede decir que no.\n\nPorque si cada pedido entra, si ningún compromiso viejo sale y si todas las áreas pueden declarar algo “urgente”, ningún framework de priorización va a salvarte.\n\nDespués separaría:\n\n- lo que mantiene vivo el negocio;\n- lo que reduce riesgo;\n- lo que genera crecimiento;\n- lo que genera aprendizaje.\n\nY pondría capacidad real al lado.\n\nUna priorización sin capacidad es una wishlist. Y un roadmap sin renuncias no es estrategia.',
    responseEN: 'When everything is a priority, the roadmap is not full. **The decision system is broken.** I would start by asking who is allowed to say no. A prioritization without capacity is a wishlist. A roadmap without explicit trade-offs is not strategy.',
    suggestionsES: ['¿Qué métricas mirarías?', 'Stakeholders desalineados', '¿Qué no haría Barbi?'],
    suggestionsEN: ['What metrics would you watch?', 'Misaligned stakeholders', 'What would Barbi not do?'],
  },
  {
    id: 'ai_without_strategy',
    keywordsES: ['ia sin estrategia', 'implementar ia', 'adoptar ia', 'usar ia en la empresa', 'queremos usar ia', 'integrar ia', 'automatizar con ia', 'ai sin estrategia', 'quiero aplicar ia', 'quiero meter ia', 'por donde empiezo con ia', 'por dónde empiezo con ia'],
    keywordsEN: ['ai without strategy', 'implement ai', 'adopt ai', 'use ai in the company', 'we want to use ai', 'integrate ai', 'automate with ai', 'i want to apply ai', 'where do i start with ai'],
    responseES: 'No empezaría por Claude, ChatGPT, Copilot ni por “necesitamos un agente”.\n\nEmpezaría por:\n\n**¿qué parte de nuestro trabajo hoy es innecesariamente difícil?**\n\nDespués distinguiría trabajo repetitivo, búsqueda y síntesis, generación, decisión, conocimiento y coordinación.\n\nAhí sí evaluaría dónde IA realmente aumenta capacidad.\n\nPorque automatizar un proceso roto solo consigue una cosa: **romperlo más rápido**.\n\nMi forma favorita de empezar es elegir un caso pequeño, frecuente y medible, mantener humano en el loop y aprender.\n\nDespués escalamos. No antes.',
    responseEN: 'I would not start with Claude, ChatGPT, Copilot or “we need an agent”. I would start with: **which part of our work is unnecessarily hard today?** Then I would choose a small, frequent, measurable use case, keep a human in the loop and learn. After that, we scale. Not before.',
    suggestionsES: ['¿Qué no automatizarías?', 'Aprendizaje organizacional', '¿Cómo cambia el rol de PM?'],
    suggestionsEN: ['What would you not automate?', 'Organizational learning', 'How does AI change the PM role?'],
  },
  {
    id: 'what_not_to_do',
    keywordsES: ['que no haria', 'qué no haría', 'errores evitar', 'que evitar', 'qué evitar', 'malas practicas', 'malas prácticas'],
    keywordsEN: ['what would she not do', 'what to avoid', 'mistakes to avoid', 'bad practices'],
    responseES: 'Algunas cosas que intento evitar:\n\n- construir porque alguien importante tuvo una idea;\n- confundir estar ocupados con avanzar;\n- meter IA para poder decir que usamos IA;\n- llenar dashboards sin saber qué decisión van a cambiar;\n- usar Agile como religión;\n- abrir diez iniciativas con capacidad para tres;\n- convertir QA en la última persona que descubre cómo debería funcionar algo;\n- esconder incertidumbre detrás de estimaciones bonitas;\n- llamar “problema del equipo” a un problema del sistema.\n\nY una más:\n\n**no defendería una metodología por encima de la evidencia.**\n\nSi dejó de ayudarnos, hay que cambiarla.',
    responseEN: 'Some things I try to avoid: building because someone important had an idea, confusing being busy with moving forward, adding AI just to say we use AI, filling dashboards without knowing which decision they will change, using Agile as religion and calling a system problem a team problem. I would not defend a methodology above evidence.',
    suggestionsES: ['¿Velocidad o calidad?', 'IA y futuro del trabajo', '¿Cómo piensa?'],
    suggestionsEN: ['Speed or quality?', 'AI and the future of work', 'How she thinks?'],
  },
  {
    id: 'metrics_decision',
    keywordsES: ['metricas', 'métricas', 'que metricas', 'qué métricas', 'medir impacto', 'measurement', 'kpi', 'okrs', 'datos', 'data'],
    keywordsEN: ['metrics', 'what metrics', 'measure impact', 'measurement', 'kpi', 'okrs', 'data'],
    responseES: 'Antes de pedir un dashboard preguntaría:\n\n**¿qué decisión queremos tomar distinto después de mirar estos datos?**\n\nSi no tenemos respuesta, probablemente todavía no necesitamos la métrica.\n\nMe interesa combinar tres tipos de señal:\n\n**Resultado:** qué cambió para usuario o negocio.\n**Salud:** qué costo, riesgo o fricción generamos.\n**Aprendizaje:** qué entendemos ahora que antes no sabíamos.\n\nPorque optimizar una única métrica puede destruir otra parte del sistema.\n\nLos datos ayudan muchísimo. Pero una organización data-driven sin criterio puede equivocarse con una precisión espectacular.',
    responseEN: 'Before asking for a dashboard, I would ask: **which decision do we want to make differently after looking at this data?** I like combining outcome, health and learning signals. Data helps a lot, but a data-driven organization without judgment can be wrong with spectacular precision.',
    suggestionsES: ['Tengo una idea de producto', 'Productos financieros', 'Aprendizaje organizacional'],
    suggestionsEN: ['I have a product idea', 'Financial products', 'Organizational learning'],
  },
  {
    id: 'organizational_learning',
    keywordsES: ['aprendizaje organizacional', 'organizacion aprende', 'organización aprende', 'convertir informacion', 'convertir información', 'notebooklm', 'notebook llm', 'conocimiento accionable', 'decisiones y aprendizaje'],
    keywordsEN: ['organizational learning', 'organization learns', 'turn information', 'notebooklm', 'notebook llm', 'actionable knowledge', 'decisions and learning'],
    responseES: 'NotebookLM me interesa menos por la herramienta y más por el problema que deja en evidencia:\n\n**las organizaciones producen muchísimo conocimiento y recuerdan muy poco.**\n\nDecisiones enterradas en reuniones. Research perdido en Drive. Documentación que nadie vuelve a abrir. Personas que se van y se llevan contexto con ellas.\n\nHerramientas como NotebookLM empiezan a permitir algo muy potente: conversar con ese conocimiento, comparar fuentes, encontrar contradicciones y recuperar contexto.\n\nPero la tecnología sola no crea aprendizaje organizacional.\n\nEl loop que me interesa es:\n\n**información → síntesis → decisión → resultado → aprendizaje reutilizable.**\n\nAhí creo que la IA puede cambiar muchísimo cómo trabajan los equipos.',
    responseEN: 'NotebookLM interests me less as a tool and more because of the problem it exposes: **organizations produce a lot of knowledge and remember very little**. Tools like it can help teams talk to knowledge, compare sources and recover context. But technology alone does not create organizational learning.',
    suggestionsES: ['IA y futuro del trabajo', '¿Qué métricas mirarías?', '¿Cómo piensa?'],
    suggestionsEN: ['AI and the future of work', 'What metrics would you watch?', 'How she thinks?'],
  },
  {
    id: 'thinking',
    keywordsES: ['como piensa', 'cómo piensa', 'forma de pensar', 'criterio', 'decide', 'decidir', 'mirada', 'enfoque', 'pensamiento', 'barbara piensa', 'barbi piensa', 'todo esta desordenado'],
    keywordsEN: ['how she thinks', 'thinking', 'decision criteria', 'judgment', 'approach', 'mindset', 'how barbara thinks', 'how barbi thinks'],
    responseES: 'Tengo una tendencia bastante marcada: cuando algo parece un problema simple, intento descubrir **qué sistema hay detrás**.\n\nSi un equipo está lento, no miro solo velocity.\n\nSi un usuario abandona, no miro solo conversión.\n\nSi dos áreas discuten, no miro solo quién tiene razón.\n\nSi aparece IA, no miro primero la herramienta.\n\nMe interesa entender:\n\n**qué está pasando, por qué está pasando ahora, qué tensiones existen y qué decisión puede mover el sistema.**\n\nDespués pruebo.\n\nPorque también aprendí algo importante: pensar muy bien un problema no te exime de ponerlo contra la realidad.\n\nMi forma de trabajar combina bastante de esas dos cosas:\n\n**curiosidad para entender + pragmatismo para mover.**',
    responseEN: 'When something looks like a simple problem, I try to find **the system behind it**. If a team is slow, I do not look only at velocity. If two areas disagree, I do not look only at who is right. If AI appears, I do not look first at the tool. I try to understand what is happening, why now, what tensions exist and which decision can move the system.',
    suggestionsES: ['Tengo una idea de producto', 'Mi equipo no está entregando', '¿Cómo cambia la IA el rol de PM?'],
    suggestionsEN: ['I have a product idea', "My team isn't delivering", 'How does AI change the PM role?'],
  },
  {
    id: 'greeting',
    keywordsES: ['hola', 'buenas', 'buen dia', 'buenos dias', 'hey', 'saludos', 'como estas', 'que tal'],
    keywordsEN: ['hello', 'hi', 'hey', 'good morning', 'greetings', 'howdy'],
    responseES: 'Hola 👋 Soy la versión AI del portfolio de Barbi.\n\nPuedo contarte qué construyó, cómo trabaja o qué piensa sobre Producto, IA y liderazgo.\n\nPero hay una opción más divertida:\n\n**traeme un problema real.**\n\nUn equipo trabado, un roadmap imposible, una idea que no sabés si construir o una empresa intentando incorporar IA.\n\nVeamos qué haría con eso.',
    responseEN: 'Hi 👋 I am the AI version of Barbi’s portfolio. I can tell you what she built, how she works or what she thinks about Product, AI and leadership. But there is a more interesting option: **bring me a real problem.**',
    variantsES: ['Hola 👋 Soy la versión AI del portfolio de Barbi.\n\nPodés preguntarme por su experiencia, pero también podés traerme un problema real.', 'Buenas. Puedo contarte sobre Barbi, sí. Pero funciono mejor cuando me traés algo desordenado y tratamos de convertirlo en una decisión.', 'Hola. Este asistente no quiere ser un CV interactivo. Quiere ayudarte a pensar como Barbi pensaría un problema: contexto, criterio, decisión y movimiento.'],
    variantsEN: ['Hi 👋 I am the AI version of Barbi’s portfolio. You can ask about her experience, but you can also bring me a real problem.', 'Welcome. I can tell you about Barbi, yes. But I work better when you bring something messy and we turn it into a decision.', 'Hi. This assistant does not want to be an interactive resume. It wants to help you think through context, judgment, decisions and movement.'],
    suggestionsES: ['🧠 Cómo piensa', '🚀 Cómo construye producto', 'Mi equipo no está entregando'],
    suggestionsEN: ['🧠 How she thinks', '🚀 How she builds product', "My team isn't delivering"],
  },
  {
    id: 'who_is_barbara',
    keywordsES: ['quien', 'quién', 'barbara', 'barbi', 'que hace', 'qué hace', 'de que trata', 'presentate', 'contame', 'quien sos', 'quien es'],
    keywordsEN: ['who', 'barbara', 'barbi', 'what does she do', 'introduce', 'tell me', 'about her', 'about barbara', 'about barbi'],
    responseES: 'Barbi pasó por una mezcla bastante poco prolija, y bastante útil, de marketing, datos, growth, e-commerce, banca, tecnología, producto, liderazgo e IA.\n\nDurante más de una década trabajó construyendo productos digitales y conectando mundos que muchas veces hablan idiomas distintos:\n\n**negocio, tecnología, UX, datos, operación y personas.**\n\nHoy está especialmente interesada en una pregunta:\n\n**¿cómo cambia la forma de construir productos y organizaciones cuando la IA deja de ser una herramienta y empieza a convertirse en parte del equipo?**\n\nTambién habla, enseña, experimenta y escribe sobre eso.\n\nY sí: sigue construyendo cosas. Probablemente demasiadas. 😅',
    responseEN: 'Barbi comes from a messy, and very useful, mix of marketing, data, growth, e-commerce, banking, technology, product, leadership and AI. For more than a decade, she has built digital products while connecting business, technology, UX, data, operations and people. Today she is interested in how product and organizations change when AI becomes part of the team.',
    variantsES: ['Barbi crea desde 1989. Empezó mirando clics y conversiones, pero terminó encontrando lo que más le interesaba: las personas detrás de los datos, los equipos que deciden y las ideas que se vuelven experiencias reales.', 'Más que una bio, lo interesante de Barbi es su mirada: viene de marketing, creció construyendo productos digitales y hoy explora cómo la IA puede potenciar equipos y decisiones sin borrar lo humano.'],
    variantsEN: ['Barbi has been creating since 1989. She started by looking at clicks and conversions, but found what truly interested her: the people behind the data and the ideas becoming real experiences.', 'More than a bio, what is interesting about Barbi is her lens: she comes from marketing, grew through digital product, and now explores how AI can enhance teams and decisions without losing the human perspective.'],
    suggestionsES: ['🧠 Cómo piensa', 'Tengo una idea de producto', 'Casos reales'],
    suggestionsEN: ['🧠 How she thinks', 'I have a product idea', 'Real cases'],
  },
  {
    id: 'experience',
    keywordsES: ['experiencia', 'trayectoria', 'anos', 'años', 'background', 'carrera', 'trabajos', 'historia', 'recorrido'],
    keywordsEN: ['experience', 'years', 'background', 'career', 'trajectory', 'history', 'resume'],
    responseES: 'Mi recorrido tiene más sentido si se mira por problemas que por cargos.\n\nEmpecé en **SEO y performance**, entendiendo cómo pequeños cambios alteran comportamiento. Con **growth y publicidad digital** aprendí experimentación, adquisición y datos. En **insurtech** entendí que el producto también vive en operaciones, ventas y atención.\n\nEn **e-commerce de escala regional** vi de cerca equipos con autonomía real, confianza y una capacidad enorme de ejecutar. En **banca** aparecieron regulación, legacy, usuarios empresariales, múltiples stakeholders y sistemas complejos.\n\nDespués todo eso se mezcló con **consultoría, liderazgo, delivery, transformación organizacional e IA**.\n\nEl hilo no fue una industria. Fue aprender a **convertir complejidad en producto y dirección**.',
    responseEN: 'My path makes more sense if you look at problems rather than titles: SEO and performance, growth and data, insurtech, regional e-commerce, banking, consulting, leadership, delivery, organizational transformation and AI. The thread was not an industry. It was learning to **turn complexity into product and direction**.',
    suggestionsES: ['¿Casos reales?', '¿Qué aprendió en banca?', '¿Cómo piensa?'],
    suggestionsEN: ['Real cases?', 'What did she learn in banking?', 'How she thinks?'],
    navLinks: [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }],
  },
]

const extraIntents: AssistantIntent[] = [
  ['banking_experience', ['banca', 'banco', 'bancaria', 'bancario', 'banca digital', 'banca corporativa', 'corporate banking', 'onboarding', 'cobranzas', 'pagos', 'compliance', 'regulacion', 'regulación', 'legacy', 'servicios financieros'], ['banking', 'digital banking', 'corporate banking', 'onboarding', 'collections', 'payments', 'compliance', 'regulation', 'legacy', 'financial services'], 'La banca fue una etapa importante porque producto dejó de ser solamente experiencia y negocio y pasó a ser **sistema**.\n\nTrabajé varios años alrededor de cobranzas, pagos, onboarding empresarial y otros desafíos de servicios financieros. Había usuarios, tecnología, legacy, seguridad, compliance, riesgo, operación, métricas y muchas áreas tomando decisiones sobre el mismo flujo.\n\nAhí aprendí algo que todavía uso:\n\n**una buena experiencia no se diseña ignorando la complejidad; se diseña absorbiéndola.**', 'Banking was important because product stopped being only experience and business and became **a system**. I learned that a good experience is not designed by ignoring complexity; it is designed by absorbing it.', ['Productos financieros', '¿Qué métricas mirarías?', '¿Agile después del Agile?'], ['Financial products', 'What metrics would you watch?', 'Agile After Agile?']],
  ['ecommerce_experience', ['ecommerce', 'e-commerce', 'marketplace', 'sellers', 'vendedores', 'growth', 'marketing inteligente', 'publicidad digital', 'integraciones', 'alto rendimiento'], ['ecommerce', 'e-commerce', 'marketplace', 'sellers', 'growth', 'smart marketing', 'digital advertising', 'integrations', 'high performance'], 'Mi etapa en e-commerce fue mi prueba de que los equipos de alto rendimiento no son una slide de consultoría. Existen.\n\nTrabajé en productos para sellers, growth, marketing inteligente, integraciones con plataformas publicitarias y experimentación. Pero el aprendizaje más grande no fue una feature.\n\nFue experimentar un entorno con mucho contexto, autonomía, excelencia técnica y gente profundamente comprometida.\n\nAhí entendí algo que después apareció una y otra vez en mi carrera:\n\n**Agile funciona muchísimo mejor como cultura que como ceremonia.**', 'My e-commerce stage proved to me that high-performing teams are not a consulting slide. They exist. That is where I understood that **Agile works much better as culture than as ceremony**.', ['¿Cómo construye equipos?', '¿Agile después del Agile?', '¿Cómo piensa?'], ['How she builds teams?', 'Agile After Agile?', 'How she thinks?']],
  ['insurtech_growth', ['insurtech', 'seguros', 'growth', 'adquisicion', 'adquisición', 'seo', 'sem', 'funnel', 'conversion', 'conversión', 'ventas', 'call center', 'operacion', 'operación'], ['insurtech', 'insurance', 'growth', 'acquisition', 'seo', 'sem', 'funnel', 'conversion', 'sales', 'call center', 'operations'], 'En insurtech mi mirada se hizo bastante más amplia.\n\nEntré desde Growth: adquisición, SEO/SEM, funnels, conversión y experimentación. Pero el producto real cruzaba Comunicación, Tecnología, Call Center, Ventas, RRHH y operación.\n\nTrabajar tan cerca de mundos distintos me enseñó algo central:\n\n**cada área ve una parte verdadera del problema.**\n\nLa calidad aparece cuando conseguís poner esas miradas a conversar en lugar de competir.', 'In insurtech, my lens became wider. Growth, acquisition, funnels and conversion quickly crossed operations, sales, support and technology. It taught me that **each area sees a true part of the problem**.', ['¿Qué la distingue?', '¿Cómo lidera?', '¿Cómo piensa?'], ['What makes her different?', 'How she leads?', 'How she thinks?']],
  ['early_career', ['primeros trabajos', 'inicios', 'seo', 'performance', 'marketing digital', 'antes de producto', 'datos', 'cuentas', 'anunciantes'], ['early career', 'beginnings', 'seo', 'performance', 'digital marketing', 'before product', 'data', 'accounts', 'advertisers'], 'Antes de llamarlo Producto, ya estaba bastante obsesionada con entender comportamiento.\n\nEmpecé trabajando con SEO: búsquedas, intención y pequeños cambios capaces de modificar muchísimo cómo una persona encuentra algo. Después trabajé con estrategia digital, performance y crecimiento de cuentas para anunciantes.\n\nAhí conviví con cantidades enormes de datos. Y aprendí una lección que todavía uso:\n\n**tener datos no significa saber qué hacer.**', 'Before calling it Product, I was already obsessed with understanding behavior. I worked with SEO, intent, digital strategy, performance and data. I learned something I still use: **having data does not mean knowing what to do**.', ['¿Cómo llegó a producto?', '¿Qué métricas mirarías?', 'Experiencia'], ['How she got into product?', 'What metrics would you watch?', 'Experience']],
]

intents.push(...extraIntents.map(([id, keywordsES, keywordsEN, responseES, responseEN, suggestionsES, suggestionsEN]) => ({ id, keywordsES, keywordsEN, responseES, responseEN, suggestionsES, suggestionsEN } as AssistantIntent)))

intents.push(
  {
    id: 'education',
    keywordsES: ['formacion', 'formación', 'estudios', 'educacion', 'educación', 'certificaciones', 'certificacion', 'certificación', 'uade', 'mit', 'producthub', 'ai first', 'claude code', 'leadership agility', 'data analytics', 'seo', 'analytics'],
    keywordsEN: ['education', 'studies', 'degree', 'certifications', 'certification', 'mit', 'producthub', 'ai first', 'claude code', 'leadership agility', 'data analytics', 'seo', 'analytics'],
    responseES: 'Mi formación empezó en Relaciones Públicas e Institucionales, algo que con el tiempo descubrí que tenía mucha más relación con Producto de la que imaginaba: comunicación, stakeholders, comportamiento y organizaciones.\n\nDespués fui construyendo una formación híbrida entre producto, liderazgo, datos y tecnología. Entre los últimos focos están **MIT xPRO — Designing and Building AI Products and Services**, **AI First Product Management**, Claude / Claude Code e IA aplicada, Leadership Agility, Data Analytics, Analytics, SEO y performance.\n\nPero probablemente mi formación más constante sea otra:\n\n**construir, probar algo nuevo y obligarme a entender cómo funciona.**',
    responseEN: 'My education started in Public and Institutional Relations, which later proved closer to Product than I imagined: communication, stakeholders, behavior and organizations. Then I built a hybrid path across product, leadership, data and technology, including AI products and services, AI-first product management, Claude / Claude Code, Leadership Agility, Data Analytics, SEO and performance.',
    suggestionsES: ['¿Herramientas que usa?', '¿Cómo construye producto?', '¿Cómo piensa?'],
    suggestionsEN: ['Tools she uses?', 'How she builds product?', 'How she thinks?'],
  },
  {
    id: 'current_work',
    keywordsES: ['actual', 'trabaja ahora', 'trabaja hoy', 'donde trabaja', 'dónde trabaja', 'consultoria', 'consultoría', 'actualmente', 'hoy trabaja', 'delivery', 'arquitectura', 'qa', 'banca digital', 'corporate banking', 'asistentes', 'agentes'],
    keywordsEN: ['current', 'works now', 'where she works', 'consulting', 'currently', 'delivery', 'architecture', 'qa', 'digital banking', 'corporate banking', 'assistants', 'agents'],
    responseES: 'Hoy mi rol es bastante más amplio que “hacer producto”.\n\nTrabajo en contextos complejos donde aparecen delivery, equipos, clientes, tecnología, UX, QA, arquitectura, dependencias, liderazgo y negocio al mismo tiempo.\n\nTambién es el espacio donde estoy experimentando mucho más profundamente con IA aplicada al trabajo real: agentes, asistentes, generación de especificaciones, automatización de testing, nuevas formas de discovery y nuevas dinámicas de equipo.\n\nEsa mezcla conecta con preguntas que hoy me interesan mucho: **cómo lideramos equipos aumentados por IA, qué dejamos de hacer manualmente y qué se vuelve todavía más humano cuando la máquina puede hacer más**.',
    responseEN: 'Today my role is broader than “doing product”. I work in complex contexts where delivery, teams, clients, technology, UX, QA, architecture, dependencies, leadership and business all appear at the same time. I am also experimenting with AI applied to real work: agents, assistants, specifications, testing automation and new team dynamics.',
    suggestionsES: ['Agentes de IA', 'Specs con IA', 'QA desde origen'],
    suggestionsEN: ['AI agents', 'AI specs', 'Quality from the start'],
  },
  {
    id: 'ai_product',
    keywordsES: ['ai', 'ia', 'inteligencia artificial', 'agentes', 'llm', 'llms', 'gpt', 'notebooklm', 'notebook llm', 'copilot', 'prompting', 'automatizacion', 'automatización', 'machine learning', 'humanos y algoritmos', 'humanos ia', 'algoritmos', 'claude', 'chatgpt', 'openai', 'gemini', 'cursor', 'claude code', 'ia generativa', 'generativa', 'gen ai', 'asistente ia', 'herramienta ia', 'integrar ia'],
    keywordsEN: ['ai', 'artificial intelligence', 'agents', 'llm', 'llms', 'gpt', 'notebooklm', 'notebook llm', 'copilot', 'prompting', 'automation', 'machine learning', 'humans and algorithms', 'humans ai', 'claude', 'chatgpt', 'openai', 'gemini', 'cursor', 'generative ai', 'ai assistant', 'ai tool'],
    responseES: '“Humanos + IA” nace de una incomodidad.\n\nDurante mucho tiempo hablamos de IA preguntando qué tareas puede hacer la máquina. A mí me interesa cada vez más la otra mitad:\n\n**¿qué deberíamos hacer mejor nosotros ahora que la máquina puede hacer todo esto?**\n\nMejor contexto. Mejores preguntas. Mejor criterio. Más curiosidad. Más aprendizaje.\n\nNo pienso la IA como reemplazo del humano ni como copiloto mágico.\n\nLa pienso como una nueva pieza dentro del sistema de trabajo. Y cuando agregás una pieza tan potente, inevitablemente cambia el resto.',
    responseEN: '“Humans + AI” starts from a discomfort. We have spent a lot of time asking what tasks the machine can do. I care about the other half: **what should we do better now that the machine can do all this?** Better context, better questions, better judgment, more curiosity and more learning.',
    suggestionsES: ['¿Cómo cambia el rol de PM?', 'Agentes de IA', '¿NotebookLM?'],
    suggestionsEN: ['How does AI change the PM role?', 'AI agents', 'NotebookLM?'],
  },
  {
    id: 'leadership',
    keywordsES: ['liderazgo', 'liderar', 'lidera', 'equipo', 'equipos', 'gestión', 'gestion', 'manage', 'management', 'cultura', 'colaboracion', 'colaboración', 'squad', 'squads', 'pm', 'product manager', 'product owner', 'po', 'lider', 'líder', 'feedback', 'empatia', 'empatía', 'mentoring', 'comunicacion', 'comunicación', 'dirigir', 'diversidad', 'inclusion', 'inclusión', 'mujeres', 'women in tech', 'confianza', 'entorno', 'crecimiento profesional', 'acompanamiento', 'acompañamiento', 'retro', 'retrospectiva', 'one on one', '1 a 1'],
    keywordsEN: ['leadership', 'lead', 'team', 'teams', 'management', 'culture', 'collaboration', 'squad', 'pm', 'product manager', 'product owner', 'leader', 'feedback', 'empathy', 'mentoring', 'communication', 'diversity', 'inclusion', 'women in tech', 'trust', 'environment', 'professional growth', 'support', 'retrospective', 'one on one'],
    responseES: 'Liderar me resultó bastante diferente de lo que imaginaba.\n\nPensaba que tenía que tener más respuestas. Terminé aprendiendo que muchas veces mi trabajo era **crear las condiciones para que otras personas pudieran encontrarlas**.\n\nPara mí eso significa dar contexto, hacer visibles las tensiones, ayudar a priorizar, proteger foco, decir verdades incómodas temprano y generar suficiente confianza para que alguien pueda decir “esto no está funcionando”.\n\nTambién implica conocer a las personas. No todos necesitan lo mismo para crecer.\n\nIntento equilibrar dos cosas que viven en tensión:\n\n**cuidar a las personas y cuidar el resultado.**\n\nCreo que un buen liderazgo necesita ambas. ❤️',
    responseEN: 'Leadership turned out to be different from what I imagined. I thought I needed more answers. I ended up learning that often my job is **to create the conditions for other people to find them**. I try to balance **caring for people and caring for the result**. Good leadership needs both. ❤️',
    suggestionsES: ['Mi equipo no está entregando', '¿Cómo liderás ambigüedad?', '¿Cómo equilibrás velocidad y calidad?'],
    suggestionsEN: ['My team is not delivering', 'How do you lead ambiguity?', 'How do you balance speed and quality?'],
  },
)

const compact: AssistantIntent[] = [
  ['methodology', ['discovery', 'delivery', 'roadmap', 'priorizar', 'priorización', 'metodologia', 'metodología', 'proceso', 'agile', 'agil', 'ágil', 'scrum', 'sprint', 'iteracion', 'iteración', 'métricas', 'metricas', 'decisiones', 'ambiguedad', 'ambigüedad', 'forma de trabajar', 'backlog', 'lean', 'design thinking', 'experimento', 'hipotesis', 'hipótesis', 'funnel', 'conversion', 'conversión', 'datos', 'prioridad', 'mejora continua', 'ceremonias', 'historias de usuario', 'story mapping', 'construye producto', 'discovery o delivery', 'bajar estrategia a ejecucion'], ['discovery', 'delivery', 'roadmap', 'prioritize', 'methodology', 'process', 'agile', 'scrum', 'sprint', 'metrics', 'decisions', 'work method', 'backlog', 'lean', 'design thinking', 'experiment', 'hypothesis', 'data', 'priority', 'ceremonies', 'user story', 'strategy to execution'], 'No tengo demasiado apego a una metodología específica.\n\nTengo bastante apego a algunas preguntas: **qué problema estamos resolviendo, para quién, qué evidencia tenemos, qué estamos asumiendo, qué riesgo tomamos y cómo sabremos si funcionó**.\n\nDespués puedo usar discovery, story mapping, experimentos, métricas, Scrum, Kanban, prototipos, IA o una pizarra con post-its.\n\nEl framework es una herramienta. El objetivo es que el equipo consiga pasar de **incertidumbre → decisión → ejecución → aprendizaje**. Y hacerlo cada vez mejor.', 'I am not very attached to one methodology. I am attached to questions: what problem are we solving, for whom, what evidence do we have, what are we assuming, what risk are we taking and how will we know if it worked? The framework is a tool. The goal is **uncertainty → decision → execution → learning**.', ['Tengo una idea de producto', '¿Velocidad o calidad?', '¿Qué métricas mirarías?'], ['I have a product idea', 'Speed or quality?', 'What metrics would you watch?']],
  ['tools_stack', ['herramientas', 'figma', 'jira', 'azure devops', 'notion', 'miro', 'confluence', 'amplitude', 'mixpanel', 'ga4', 'gtm', 'google tag manager', 'hotjar', 'looker', 'metabase', 'sql', 'sheets', 'slack', 'linear', 'asana', 'trello', 'stack', 'software', 'aplicaciones', 'programas', 'que usa', 'qué usa', 'analytics', 'figjam', 'github copilot', 'cursor', 'notebooklm', 'claude'], ['tools', 'figma', 'jira', 'azure devops', 'notion', 'miro', 'confluence', 'amplitude', 'mixpanel', 'ga4', 'gtm', 'google tag manager', 'hotjar', 'looker', 'metabase', 'sql', 'sheets', 'slack', 'linear', 'asana', 'trello', 'stack', 'apps', 'analytics', 'figjam', 'github copilot', 'cursor', 'notebooklm', 'claude'], 'Mi stack cambia muchísimo según el contexto.\n\nPara producto y colaboración suelo trabajar con **Jira/Azure DevOps, Confluence, Miro/FigJam, Figma y Google Workspace**. Para datos: **Analytics, Tag Manager, dashboards, Sheets y distintas plataformas de analytics**.\n\nHoy una parte enorme de mi exploración está en IA: **ChatGPT, Claude, Claude Code, NotebookLM, Gemini, Copilot y herramientas de desarrollo asistido por IA**.\n\nPero tengo una regla simple: **no me interesa coleccionar herramientas**. Me interesa qué capacidad nueva habilitan.', 'My stack changes depending on context. I use product, collaboration, analytics and AI tools, but I have a simple rule: **I am not interested in collecting tools**. I care about the capability they enable.', ['¿Metodología?', '¿Cómo usa AI?', '¿Ver proyectos?'], ['Methodology?', 'How she uses AI?', 'See projects?']],
  ['fintech', ['fintech', 'financiero', 'pagos digitales', 'transformacion digital', 'transformación digital', 'banca digital', 'insurtech', 'cobro digital', 'bancario', 'aseguradora', 'medios de pago', 'sector financiero', 'onboarding digital', 'compliance', 'regulacion', 'regulación'], ['fintech', 'financial', 'digital payments', 'digital transformation', 'digital banking', 'insurtech', 'insurance', 'banking sector', 'payment methods', 'financial sector', 'digital onboarding', 'compliance', 'regulation'], 'Trabajé varios años alrededor de banca, pagos, cobranzas, onboarding, insurtech y canales digitales.\n\nSi tuviera que resumir qué hace diferente a estos productos diría: **la confianza forma parte de la UX**.\n\nSeguridad, regulación, trazabilidad, disponibilidad y operación no son temas “de atrás”. El usuario los siente aunque nunca vea una arquitectura, una conciliación o una regla de compliance. Eso obliga a construir producto mirando el sistema completo.', 'I worked for years around banking, payments, onboarding, insurtech and digital channels. What makes these products different is that **trust is part of the UX**. Security, regulation, traceability and operations are felt by users even when they never see them.', ['Experiencia en banca', '¿Métricas?', '¿Banca digital?'], ['Banking experience', 'Metrics?', 'Digital banking?']],
  ['projects', ['proyectos', 'casos', 'ver', 'portfolio', 'portafolio', 'case study', 'case studies', 'trabajo', 'trabajos', 'ejemplos', 'que construyo', 'qué construyó'], ['projects', 'cases', 'see', 'portfolio', 'case study', 'case studies', 'work', 'examples', 'what she built'], 'Hay proyectos muy distintos: **banca digital y corporate banking**, **e-commerce y growth**, **IA aplicada**, **transformación de equipos** e **ideas que terminaron en charlas**.\n\nLo que intento mostrar en cada caso no es solamente **qué construimos**, sino **qué problema había, qué decidimos y qué aprendí**.', 'There are very different projects: digital banking, corporate banking, e-commerce and growth, applied AI, team transformation and ideas that became talks. What I try to show is not only what we built, but what problem existed, what we decided and what I learned.', ['¿Qué aprendió en banca?', 'E-commerce y growth', 'IA aplicada'], ['What did she learn in banking?', 'E-commerce and growth', 'Applied AI'], [{ labelES: '→ Ver Proyectos', labelEN: '→ See Projects', route: '/projects' }]],
  ['contact_cv', ['contacto', 'contactar', 'email', 'mail', 'cv', 'curriculum', 'descargar', 'linkedin', 'one sheet', 'onesheet', 'whatsapp', 'llamar', 'llamada', 'escribirle', 'escribirla', 'reunion', 'reunión', 'hablar', 'telefono', 'teléfono', 'mensaje', 'como contactar'], ['contact', 'reach out', 'email', 'mail', 'cv', 'resume', 'download', 'linkedin', 'one sheet', 'whatsapp', 'call', 'meeting', 'phone', 'message', 'how to contact'], 'Si algo de lo que viste acá te disparó una conversación, escribime.\n\n**LinkedIn:** Barbara Aceto  \n**Email:** aceto.barbara@gmail.com  \n**WhatsApp:** +54 9 11 6209 3765\n\nY un pedido: si me escribís, contame primero **qué problema estás intentando resolver**. Probablemente sea una conversación mucho más interesante. 🙂', 'If something you saw here sparked a conversation, write to me. **LinkedIn:** Barbara Aceto. **Email:** aceto.barbara@gmail.com. **WhatsApp:** +54 9 11 6209 3765. If you write, tell me first what problem you are trying to solve.', ['¿Cómo trabaja?', '¿Ver proyectos?', '¿Experiencia?'], ['How she works?', 'See projects?', 'Experience?'], [{ labelES: '→ Ver One Sheet', labelEN: '→ See One Sheet', route: '/one-sheet' }]],
  ['motivation', ['motiva', 'motivacion', 'motivación', 'te gusta', 'le gusta', 'disfruta', 'por que hace', 'por qué hace', 'pasion', 'pasión', 'que le apasiona', 'qué le apasiona'], ['motivation', 'motivates', 'likes', 'enjoys', 'why she does it', 'passion', 'what she loves'], 'Hay un momento del trabajo que me encanta: cuando algo que parecía un lío enorme empieza a tener forma.\n\nCuando el equipo entiende el problema. Cuando aparecen palabras comunes. Cuando una discusión eterna se convierte en una decisión. Cuando alguien que necesitaba pedir permiso para todo empieza a decidir solo.\n\nEso me motiva muchísimo.\n\nLo que me desgasta: **reuniones sin decisión, frameworks por inercia, política organizacional disfrazada de proceso y estrategia que nunca toca producción**.', 'I love the moment when something messy starts taking shape: the team understands the problem, common language appears and an endless discussion becomes a decision. What drains me is meetings without decisions, frameworks by inertia and strategy that never reaches production.', ['¿Cómo lidera?', '¿Qué la distingue?', '¿Desafío complejo?'], ['How she leads?', 'What makes her different?', 'Complex challenge?']],
]
intents.push(...compact.map(([id, keywordsES, keywordsEN, responseES, responseEN, suggestionsES, suggestionsEN, navLinks]) => ({ id, keywordsES, keywordsEN, responseES, responseEN, suggestionsES, suggestionsEN, navLinks } as AssistantIntent)))

intents.push(
  {
    id: 'ai_opinion',
    keywordsES: ['opinion', 'opinión', 'futuro', 'robots', 'reemplazar', 'automatizacion', 'automatización', 'perder trabajo', 'reemplaza', 'ai reemplaza', 'inteligencia artificial reemplaza', 'que piensa', 'qué piensa', 'vision', 'visión', 'vision ai', 'visión ai', 'su vision', 'su visión', 'vision sobre'],
    keywordsEN: ['opinion', 'future', 'robots', 'replace', 'automation', 'lose jobs', 'ai replace', 'artificial intelligence replace', 'what she thinks', 'vision', 'ai vision'],
    responseES: 'No creo que la discusión más interesante sea si “la IA va a reemplazar personas”.\n\nLa transformación ya empezó antes de resolver esa pregunta. Está cambiando cómo buscamos, escribimos, analizamos, programamos, diseñamos, documentamos, investigamos y aprendemos.\n\nPara mí la pregunta relevante es: **¿qué hacemos con la capacidad que acaba de quedar liberada?**\n\nPodemos usarla para producir diez veces más cosas. O podemos usarla para pensar mejor, probar más, entender antes y resolver problemas que antes eran demasiado caros.\n\nMe interesa mucho más la segunda opción.\n\nLa IA amplifica capacidad. Y también amplifica mediocridad. Por eso el criterio humano importa más, no menos.',
    responseEN: 'I do not think the most interesting discussion is whether AI will replace people. The transformation has already started. For me, the relevant question is: **what do we do with the capacity that just got freed?** We can produce ten times more things, or think better, test more and solve problems that used to be too expensive.',
    suggestionsES: ['IA y equipos', 'Aprendizaje organizacional', '¿Qué no automatizarías?'],
    suggestionsEN: ['AI and teams', 'Organizational learning', 'What would you not automate?'],
  },
  {
    id: 'talks',
    keywordsES: ['talks', 'charlas', 'speaker', 'conferencia', 'conferencias', 'cursos', 'workshop', 'workshops', 'ensenar', 'enseñar', 'humanos y algoritmos', 'agile summit', 'agile summit uruguay', 'agile despues del agile', 'agile después del agile', 'uruguay'],
    keywordsEN: ['talks', 'speaker', 'conference', 'conferences', 'courses', 'workshop', 'workshops', 'teach', 'humans and algorithms', 'agile summit', 'agile summit uruguay', 'agile after agile', 'uruguay'],
    responseES: 'Mis charlas suelen empezar con algo que me está incomodando.\n\n**Agile después del Agile**, por ejemplo, nació de una pregunta: si cambiaron la tecnología, los equipos, los productos y la velocidad del contexto, **¿por qué seguimos trabajando exactamente igual?**\n\nMi conclusión fue simple:\n\n> Iteramos el producto.  \n> Quizás también deberíamos iterar el sistema con el que lo construimos.\n\nEn **Humanos + Algoritmos** la pregunta es otra: si la IA puede hacer cada vez más, **¿qué necesitamos aprender nosotros?**\n\nNo me interesa demasiado dar charlas donde la gente salga diciendo “qué interesante”. Prefiero que salga pensando: **“mañana voy a cambiar algo”.**',
    responseEN: 'My talks usually start with something that is bothering me. **Agile After Agile** came from a question: if technology, teams, products and context speed have changed, why are we still working the same way? We iterate the product. Maybe we should also iterate the system we use to build it.',
    suggestionsES: ['Agile después del Agile', 'Humanos + IA', '¿Podemos trabajar juntos?'],
    suggestionsEN: ['Agile After Agile', 'Humans + AI', 'Can we work together?'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
  {
    id: 'notes_press',
    keywordsES: ['notas', 'nota', 'articulos', 'artículos', 'articulo', 'escribe', 'escrito', 'publica', 'reflexiones', 'contenido', 'prensa', 'noticias', 'women in tech', 'mujeres en tech', 'mujeres', 'diversidad', 'claude code', 'reinventandome', 'reinventándome', 'reinvencion', 'reinvención', 'product ops', 'operaciones de producto', 'data strategy', 'estrategia de datos', 'design systems', 'scaling teams', 'escalar equipos'],
    keywordsEN: ['notes', 'note', 'articles', 'article', 'writes', 'written', 'posts', 'content', 'reflections', 'press', 'news', 'women in tech', 'women', 'diversity', 'claude code', 'reinventing', 'reinvention', 'product ops', 'data strategy', 'design systems', 'scaling teams'],
    responseES: 'Escribo principalmente para pensar.\n\nMuchas notas empiezan con algo que viví, algo que salió mal, una conversación o una idea que todavía no tengo completamente resuelta.\n\nLos temas se repiten bastante: **Producto. IA. Equipos. Liderazgo. Agile. Aprendizaje.**\n\nPero el hilo común probablemente sea otro: cómo seguimos construyendo cosas valiosas en un contexto que cambia cada vez más rápido.\n\nNo escribo desde un lugar de tener todas las respuestas. Escribo bastante desde el lugar de **estar tratando de encontrar mejores preguntas**.',
    responseEN: 'I write mostly to think. Many notes start with something I lived, something that went wrong, a conversation or an unresolved idea. The recurring topics are Product, AI, teams, leadership, Agile and learning. I write from trying to find better questions.',
    suggestionsES: ['IA y futuro del trabajo', '¿Cómo lidera equipos?', '¿Cómo construye producto?'],
    suggestionsEN: ['AI and the future of work', 'How she leads teams', 'How she builds product'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
  {
    id: 'challenge',
    keywordsES: ['desafio', 'desafío', 'reto', 'problema complejo', 'dificil', 'difícil', 'mas complejo', 'más complejo', 'caso complejo', 'situacion dificil', 'situación difícil', 'problema dificil', 'problema difícil'],
    keywordsEN: ['challenge', 'complex', 'difficult', 'hard problem', 'toughest', 'most complex', 'hardest'],
    responseES: 'Dale. Hagamos una cosa.\n\nAntes de buscar soluciones, contame cinco cosas:\n\n**1. ¿Qué está pasando?**  \n**2. ¿Por qué es un problema ahora?**  \n**3. ¿Quiénes están involucrados?**  \n**4. ¿Qué intentaron?**  \n**5. ¿Qué decisión está trabada?**\n\nDespués intento separar síntomas, causas, tensiones y restricciones. Normalmente el problema que llega escrito en la primera línea no termina siendo el verdadero problema. Esa es justamente la parte interesante.',
    responseEN: 'Let’s do one thing. Before looking for solutions, tell me five things: what is happening, why now, who is involved, what have you tried and which decision is stuck. Then we can separate symptoms, causes, tensions and constraints.',
    suggestionsES: ['Stakeholders desalineados', 'Productos financieros', '¿Cómo piensa?'],
    suggestionsEN: ['Misaligned stakeholders', 'Financial products', 'How she thinks?'],
  },
  {
    id: 'availability',
    keywordsES: ['disponible', 'disponibilidad', 'busca trabajo', 'open to work', 'contratar', 'contratarla', 'trabajo nuevo', 'buscando trabajo', 'oportunidad', 'oportunidades', 'entrevistar', 'hablar con ella', 'empleo', 'oferta', 'oferta laboral', 'proyecto nuevo', 'freelance', 'consulting'],
    keywordsEN: ['available', 'availability', 'looking for work', 'open to work', 'hire', 'hiring', 'job opportunity', 'new role', 'new project', 'reach out', 'interview', 'freelance', 'consulting', 'contract'],
    responseES: 'Puede ser. 🙂\n\nMe interesan especialmente proyectos donde haya que conectar varias piezas: **producto + negocio + tecnología + personas + IA**.\n\nPuedo aportar desde liderazgo/producto, workshops, capacitación, diagnóstico de equipos, adopción de IA o desafíos concretos de producto y transformación.\n\nSi querés conversar: **aceto.barbara@gmail.com**\n\nMandame contexto antes que un brief perfecto. Podemos construir el resto juntos.',
    responseEN: 'Maybe. 🙂 I am especially interested in projects that connect **product + business + technology + people + AI**. To talk: **aceto.barbara@gmail.com**. Send context before a perfect brief; we can build the rest together.',
    suggestionsES: ['¿Cómo trabaja?', 'Tengo un desafío', 'Ver One Sheet'],
    suggestionsEN: ['How she works?', 'I have a challenge', 'See One Sheet'],
    navLinks: [{ labelES: '→ Ver One Sheet', labelEN: '→ See One Sheet', route: '/one-sheet' }],
  },
  {
    id: 'location_remote',
    keywordsES: ['donde vive', 'dónde vive', 'donde esta', 'dónde está', 'ubicacion', 'ubicación', 'pais', 'país', 'ciudad', 'argentina', 'buenos aires', 'remoto', 'hibrido', 'híbrido', 'presencial', 'trabaja remoto', 'zona horaria', 'timezone', 'idioma', 'idiomas', 'ingles', 'inglés', 'habla ingles', 'bilingue', 'bilingüe', 'relocation', 'remota', 'trabaja desde', 'italiano'],
    keywordsEN: ['where is she', 'where she lives', 'location', 'country', 'city', 'argentina', 'buenos aires', 'remote', 'hybrid', 'in-person', 'timezone', 'language', 'languages', 'english', 'speaks english', 'bilingual', 'based', 'relocation', 'work from', 'italian'],
    responseES: 'Barbi está en **Buenos Aires, Argentina (UTC-3)** y trabaja con equipos locales, regionales y distribuidos.\n\nPuede trabajar remoto, híbrido o presencial según el proyecto.\n\nIdiomas:\n\n**Español:** nativo  \n**Inglés:** profesional  \n**Italiano:** en aprendizaje\n\nPara proyectos internacionales, el remoto es totalmente natural.',
    responseEN: 'Barbi is in **Buenos Aires, Argentina (UTC-3)** and works with local, regional and distributed teams. She can work remote, hybrid or in person depending on the project. Spanish native, professional English and learning Italian.',
    suggestionsES: ['¿Podemos trabajar juntos?', 'Contactarla', '¿Cómo trabaja?'],
    suggestionsEN: ['Can we work together?', 'Contact her', 'How she works?'],
  },
  {
    id: 'differentiator',
    keywordsES: ['diferencia', 'diferenciador', 'diferente', 'unico', 'único', 'por que producto', 'por qué producto', 'que la hace distinta', 'qué la hace distinta', 'valor diferencial', 'propuesta de valor', 'fortaleza', 'fortalezas', 'distingue', 'distinta'],
    keywordsEN: ['differentiator', 'different', 'unique', 'why product', 'what makes her different', 'value proposition', 'strength', 'strengths', 'stand out', 'stands out', 'sets her apart'],
    responseES: 'Probablemente mi diferencial venga de haber estado muchas veces **en el medio**.\n\nEntre negocio y tecnología. Entre estrategia y ejecución. Entre usuario y operación. Entre velocidad y calidad. Entre equipos y management. Y ahora, entre humanos y algoritmos.\n\nAprendí a traducir esos mundos sin simplificarlos demasiado.\n\nY hay algo más: **no me quedo demasiado cómoda en la teoría**.\n\nMe gusta transformar conversaciones en decisiones y decisiones en algo que eventualmente llegue a producción. Mi lugar favorito suele ser ese: **cuando todavía hay bastante caos, pero ya podemos empezar a construir dirección**.',
    responseEN: 'My differentiator probably comes from having spent a lot of time **in the middle**: between business and technology, strategy and execution, users and operations, speed and quality, teams and management, and now humans and algorithms. I like turning conversations into decisions and decisions into something that reaches production.',
    suggestionsES: ['Casos reales', 'Tengo un desafío', '¿Cómo piensa?'],
    suggestionsEN: ['Real cases', 'I have a challenge', 'How she thinks?'],
  },
  {
    id: 'help_menu',
    keywordsES: ['menu', 'que me podes contar', 'que podes decirme', 'que podes', 'que podés', 'opciones', 'ayuda', 'que preguntar', 'temas', 'lista', 'que sabe', 'qué sabe', 'que temas', 'qué temas'],
    keywordsEN: ['menu', 'what can you tell', 'what can you do', 'what can you say', 'options', 'help', 'what to ask', 'what do you know', 'topics', 'list of topics', 'what do you cover'],
    responseES: 'Puedo hacer bastante más que contarte el CV de Barbi.\n\nProbá alguna:\n\n**👋 Conocerla** “¿Qué la hace diferente?”\n\n**🚀 Producto** “Tengo una idea, ¿cómo la validarías?”\n\n**👥 Equipos** “Mi equipo no está entregando.”\n\n**🧩 Estrategia** “Todo es prioridad.”\n\n**🤖 IA** “Quiero incorporar IA a mi empresa.”\n\n**🎤 Ideas** “¿Qué significa Agile después del Agile?”\n\n**🔥 Desafiarla** “Te cuento un problema y decime qué harías.”\n\nEsta última suele ser la más interesante.',
    responseEN: 'I can do more than tell you Barbi’s CV. Try Product, teams, strategy, AI, ideas or a real challenge. The most interesting one is usually: tell me a problem and I will tell you how I would approach it.',
    suggestionsES: ['Conocer a Barbi', '¿Qué es Humanos + IA?', 'Quiero aplicar IA, ¿por dónde empiezo?'],
    suggestionsEN: ['Get to know Barbi', 'What is Humans + AI?', 'I want to apply AI, where do I start?'],
  },
  {
    id: 'short_ack',
    keywordsES: ['dale', 'joya', 'copado', 'genial', 'perfecto', 'excelente', 'gracias', 'buenisimo', 'buenísimo', 'entendido', 'listo', 'okey'],
    keywordsEN: ['thanks', 'thank you', 'great', 'perfect', 'cool', 'awesome', 'got it', 'nice', 'understood', 'sure'],
    responseES: '💛 Gracias. ¿Seguimos?',
    responseEN: '💛 Thanks. Shall we keep going?',
    variantsES: ['💛 Gracias. ¿Seguimos?', 'Buenísimo. Ahora traeme el caso difícil. 😏', 'Genial. ¿Querés conocer más de Barbi o ponerla a resolver algo?'],
    variantsEN: ['💛 Thanks. Shall we keep going?', 'Great. Now bring me the hard case. 😏', 'Nice. Do you want to know more about Barbi or put her to work on something?'],
    suggestionsES: ['Bajarlo a un caso', '¿Qué evitar?', '¿Qué validar primero?'],
    suggestionsEN: ['Apply it to a case', 'What to avoid?', 'What to validate first?'],
  },
  {
    id: 'agile_after_agile',
    keywordsES: ['agile después del agile', 'agile despues del agile', 'agile summit', 'nueva agilidad', 'futuro de agile', 'agile ya no sirve', 'cambiar ceremonias', 'iterar agile', 'evolucionar agile'],
    keywordsEN: ['agile after agile', 'agile summit', 'new agility', 'future of agile', 'agile does not work', 'change ceremonies', 'iterate agile', 'evolve agile'],
    responseES: 'Agile resolvió un problema enorme: dejar de construir durante meses sin mirar la realidad.\n\nPero el contexto volvió a cambiar. Hoy tenemos IA, nuevos roles, equipos distribuidos, DevOps, Product, Design Systems, automatización, datos en tiempo real y una velocidad tecnológica completamente distinta.\n\nY, sin embargo, muchas organizaciones siguen ejecutando Agile casi exactamente como hace diez años.\n\nMi propuesta es bastante simple: **aplicar Agile sobre Agile**. Inspeccionar también nuestras ceremonias, roles, artefactos y formas de decidir.\n\nLa frase que resume la idea: **iteramos el producto, pero también tenemos que iterar el sistema con el que lo construimos**.',
    responseEN: 'Agile solved a huge problem: no more building for months without looking at reality. But the context changed again. My proposal is simple: **apply Agile to Agile**. Inspect our ceremonies, roles, artifacts and ways of deciding. We iterate the product; we should also iterate the system we use to build it.',
    suggestionsES: ['¿Qué no haría Barbi?', '¿Cómo construye producto?', 'Ver notas'],
    suggestionsEN: ['What would Barbi not do?', 'How she builds product?', 'See notes'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
  {
    id: 'spec_driven_ai',
    keywordsES: ['spec driven', 'spec driven development', 'especificaciones ia', 'specs con ia', 'historias de usuario con ia', 'requirements ai', 'ai delivery', 'documentacion con ia', 'documentación con ia', 'agentes y especificaciones'],
    keywordsEN: ['spec driven', 'spec driven development', 'ai specifications', 'specs with ai', 'user stories with ai', 'requirements ai', 'ai delivery', 'documentation with ai', 'agents and specifications'],
    responseES: 'Una de las cosas que más estoy explorando es cómo cambia el delivery cuando las especificaciones dejan de ser simplemente documentos para humanos y empiezan a convertirse también en **contexto operativo para agentes de IA**.\n\nSpecs más claras pueden alimentar: producto → desarrollo → testing → documentación → automatización.\n\nEso cambia incluso la conversación sobre historias de usuario. Quizás el futuro no sea escribirlas más rápido con IA. Quizás sea dejar de pensar el proceso como una cadena de documentos manuales.\n\nAhí hay una transformación mucho más interesante.',
    responseEN: 'I am exploring how delivery changes when specifications stop being just documents for humans and also become **operational context for AI agents**. Clearer specs can feed product, development, testing, documentation and automation.',
    suggestionsES: ['Agentes de IA', 'QA desde origen', '¿Cómo cambia el rol de PM?'],
    suggestionsEN: ['AI agents', 'Quality from the start', 'How does AI change the PM role?'],
  },
  {
    id: 'ai_agents',
    keywordsES: ['agentes', 'agentes de ia', 'ai agents', 'agentes autonomos', 'agentes autónomos', 'agentic ai', 'workflows con ia', 'humano en el loop', 'human in the loop'],
    keywordsEN: ['agents', 'ai agents', 'autonomous agents', 'agentic ai', 'workflows with ai', 'human in the loop'],
    responseES: 'Un agente no me interesa porque “hace cosas solo”. Me interesa cuando puede ocupar un lugar concreto dentro de un workflow.\n\nPor ejemplo: leer contexto → interpretar una especificación → ejecutar una tarea → validar → devolver evidencia.\n\nEstoy experimentando bastante con agentes alrededor de producto, especificaciones y testing.\n\nEl desafío más interesante no es construir el agente. Es diseñar: **qué puede decidir, qué contexto necesita, cuándo tiene que pedir ayuda y quién responde por el resultado**.\n\nCuriosamente, son preguntas bastante parecidas a las que hacemos al diseñar equipos humanos.',
    responseEN: 'An agent does not interest me because it “does things alone”. It interests me when it can occupy a concrete place inside a workflow. The real design question is what it can decide, what context it needs, when it asks for help and who is accountable for the result.',
    suggestionsES: ['Specs con IA', 'QA desde origen', 'Quiero aplicar IA'],
    suggestionsEN: ['AI specs', 'Quality from the start', 'I want to apply AI'],
  },
  {
    id: 'three_amigos',
    keywordsES: ['three amigos', 'tres amigos', '3 amigos', 'qa dev producto', 'producto desarrollo qa', 'refinamiento', 'refinamiento tecnico', 'refinamiento técnico', 'refinamiento funcional', 'definition ready', 'ready to dev'],
    keywordsEN: ['three amigos', '3 amigos', 'qa dev product', 'product development qa', 'refinement', 'technical refinement', 'functional refinement', 'definition ready', 'ready to dev'],
    responseES: 'Me gusta el concepto de **Three Amigos** porque resuelve un problema bastante frecuente: descubrir demasiado tarde que cada disciplina entendió una cosa distinta.\n\nAntes de desarrollar, sentaría alrededor del mismo problema a **Producto/Negocio + Desarrollo + QA**. Y según el caso, UX.\n\nNo para hacer otra ceremonia. Para responder juntos qué esperamos, qué puede fallar, cómo lo vamos a construir y cómo sabremos que está bien.\n\nCuando QA descubre el comportamiento esperado al final, ya llegamos tarde.\n\n**La calidad empieza antes del código.**',
    responseEN: 'I like **Three Amigos** because it solves a frequent problem: discovering too late that each discipline understood something different. Before development, I would bring Product/Business, Development and QA around the same problem. **Quality starts before code.**',
    suggestionsES: ['QA desde origen', 'Specs con IA', '¿Velocidad o calidad?'],
    suggestionsEN: ['Quality from the start', 'AI specs', 'Speed or quality?'],
  },
  {
    id: 'qa_product',
    keywordsES: ['qa', 'calidad', 'quality assurance', 'testing', 'casos de prueba', 'casos qa', 'qa ownership', 'ambiente qa', 'qa desde origen', 'shift left testing', 'calidad temprana'],
    keywordsEN: ['qa', 'quality', 'quality assurance', 'testing', 'test cases', 'qa cases', 'qa ownership', 'qa environment', 'shift left testing', 'early quality'],
    responseES: 'Durante mucho tiempo tratamos QA como una etapa. Cada vez creo más que hay que tratarlo como una **capacidad del equipo**.\n\nSi los casos aparecen después de desarrollar, QA valida. Si aparecen mientras entendemos el problema, QA ayuda a diseñar.\n\nEsa diferencia cambia muchísimo: requisitos, edge cases, retrabajo, automatización y velocidad.\n\nUna historia verdaderamente Ready debería permitir que Producto, Desarrollo y QA entiendan qué comportamiento estamos construyendo antes de empezar.\n\n**La calidad tardía es cara.**',
    responseEN: 'For a long time, we treated QA as a stage. I increasingly believe we should treat it as a **team capability**. If cases appear while we understand the problem, QA helps design. **Late quality is expensive.**',
    suggestionsES: ['Three Amigos', 'Specs con IA', '¿Velocidad o calidad?'],
    suggestionsEN: ['Three Amigos', 'AI specs', 'Speed or quality?'],
  },
  {
    id: 'speaker_story',
    keywordsES: ['speaker', 'primera conferencia', 'conferencia', 'hablar en publico', 'hablar en público', 'agile summit uruguay', 'uruguay', 'como empezo a dar charlas', 'cómo empezó a dar charlas'],
    keywordsEN: ['speaker', 'first conference', 'conference', 'public speaking', 'agile summit uruguay', 'uruguay', 'how she started speaking'],
    responseES: 'Durante años construí productos y lideré conversaciones puertas adentro.\n\nEn 2026 pasó algo distinto: empecé a llevar algunas de esas preguntas afuera.\n\nEn Uruguay di mi primera conferencia internacional: **Agile después del Agile**. Era mi primera conferencia. En otro país.\n\nClaramente empezar de a poco nunca fue demasiado lo mío. 😅\n\nPero descubrí algo que me encantó: convertir experiencias desordenadas en una idea que otra persona pueda llevarse y usar.\n\nProbablemente por eso hoy disfruto tanto también enseñar y diseñar capacitaciones.',
    responseEN: 'For years I built products and led conversations inside organizations. In 2026 I started taking some of those questions outside. In Uruguay I gave my first international conference: **Agile After Agile**. Clearly, starting small was never exactly my thing. 😅',
    suggestionsES: ['Agile después del Agile', 'Ver notas', '¿Podemos trabajar juntos?'],
    suggestionsEN: ['Agile After Agile', 'See notes', 'Can we work together?'],
    navLinks: [{ labelES: '→ Ver Notas', labelEN: '→ See Notes', route: '/notes' }],
  },
)

export const fallbackES = 'No tengo una respuesta prearmada para eso. Mejor.\n\nContame qué está pasando, qué intentaron y qué decisión tenés trabada.\n\nPuedo ayudarte a separar el problema de los síntomas y pensar cuál sería el próximo movimiento con más sentido.'
export const fallbackEN = 'I do not have a prewritten answer for that. Even better.\n\nTell me what is happening, what you have already tried and which decision feels stuck.\n\nI can help separate the real problem from the symptoms and think through the next move that makes the most sense.'

export const defaultSuggestionsES = ['Conocer a Barbi', '¿Qué es Humanos + IA?', 'Quiero aplicar IA, ¿por dónde empiezo?']
export const defaultSuggestionsEN = ['Get to know Barbi', 'What is Humans + AI?', 'I want to apply AI, where do I start?']

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

export function matchIntent(input: string, isEnglish: boolean, lastIntentId?: string): AssistantIntent | null {
  const normalized = normalize(input)
  const words = normalized.split(' ').filter(Boolean)

  if (lastIntentId && words.length <= 5) {
    const followUps = isEnglish ? followUpPatternsEN : followUpPatternsES
    const isFollowUp = followUps.some(p => normalized.includes(normalize(p)))
    if (isFollowUp && prevContext[lastIntentId]) {
      const prev = intents.find(i => i.id === prevContext[lastIntentId])
      if (prev) return prev
    }
  }

  if (words.length <= 3) {
    const shortYes = isEnglish ? ['yes', 'ok', 'okay'] : ['si', 'sí', 'ok', 'okey']
    const ackIntent = intents.find(i => i.id === 'short_ack')
    if (ackIntent) {
      const kwList = isEnglish ? ackIntent.keywordsEN : ackIntent.keywordsES
      if (kwList.some(kw => words.includes(normalize(kw))) || shortYes.some(kw => words.includes(kw))) return ackIntent
    }
  }

  const synonymMap = isEnglish ? synonymsEN : synonymsES
  let expanded = normalized
  for (const [word, replacement] of Object.entries(synonymMap)) {
    if (words.includes(normalize(word))) expanded += ' ' + normalize(replacement)
  }
  const expandedWords = expanded.split(' ').filter(Boolean)
  let bestScore = 0
  let bestIntent: AssistantIntent | null = null

  for (const intent of intents) {
    if (intent.id === 'short_ack') continue
    const keywords = isEnglish ? intent.keywordsEN : intent.keywordsES
    let score = 0
    for (const kw of keywords) {
      const normKw = normalize(kw)
      const kwWords = normKw.split(' ').filter(Boolean)
      if (kwWords.length === 1 && normKw.length <= 4) {
        if (expandedWords.includes(normKw)) score += 1
      } else if (expanded.includes(normKw)) {
        score += kwWords.length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestIntent = intent
    }
  }

  return bestScore > 0 ? bestIntent : null
}
