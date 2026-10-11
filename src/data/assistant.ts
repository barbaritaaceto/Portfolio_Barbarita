// Datos de Bocconcino, el guía del portfolio.
// Responde sobre Barbi con respuestas fijas, en tercera persona. No hay un modelo de IA detrás:
// cada respuesta se elige comparando el mensaje con las palabras clave de cada intención.

export interface AssistantNavLink { labelES: string; labelEN: string; route: string }

export interface AssistantIntent {
  id: string
  keywordsES: string[]
  keywordsEN: string[]
  responseES: string
  responseEN: string
  variantsES?: string[]
  variantsEN?: string[]
  /** Ids de las intenciones que se sugieren como siguiente paso. */
  next: string[]
  navLinks?: AssistantNavLink[]
  /** Si es true, la respuesta ofrece un botón para escribirle a Barbi. */
  contact?: boolean
}

// Cadena para preguntas del tipo "¿y antes?" sobre la trayectoria.
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
    id: "team_not_delivering",
    keywordsES: ["mi equipo no esta entregando","mi equipo no está entregando","equipo no entrega","equipo trabado","no llegamos","no cumplen","no entregamos","delivery trabado","delivery lento","no estamos entregando"],
    keywordsEN: ["my team is not delivering","my team isn't delivering","team not delivering","stuck team","delivery is slow","we are not delivering","we're not delivering"],
    responseES: "Antes de pedir más velocidad, Barbi trataría de entender **a qué le estamos llamando “problema de delivery”**.\n\nPuede ser muchas cosas: demasiado trabajo abierto, historias mal definidas, decisiones que nadie toma, dependencias externas, QA como cuello de botella, prioridades que cambian todo el tiempo o deuda técnica.\n\nSu primer paso sería hacer visible el sistema: **qué entra, dónde espera, dónde vuelve para atrás y quién tiene que decidir para que avance**.\n\nPara ella, muchas veces la velocidad es el síntoma, no la causa.",
    responseEN: "Before asking for more speed, Barbi would try to understand **what we are calling a “delivery problem”**.\n\nIt can mean many things: too much work in progress, poorly defined stories, decisions nobody makes, external dependencies, QA as a bottleneck, priorities that keep changing, or technical debt.\n\nHer first step would be to make the system visible: **what comes in, where it waits, where it bounces back and who has to decide for it to move**.\n\nFor her, speed is often the symptom, not the cause.",
    next: ["ambiguity_leadership","speed_quality","misaligned_stakeholders"],
  },
  {
    id: "product_idea_validation",
    keywordsES: ["tengo una idea","idea de producto","validar idea","vale la pena construir","vale la pena construirla","como validar","cómo validar","validarias","validar si vale","pregunta antes de construir","que pregunta deberia hacer antes de construir","qué pregunta debería hacer antes de construir"],
    keywordsEN: ["i have a product idea","product idea","validate idea","worth building","how would you validate","validate whether","is it worth building","question before building","what question should i ask before building"],
    responseES: "A Barbi le gustan las ideas, y más todavía cuando sobreviven al contacto con la realidad.\n\nAntes de construir, ella preguntaría: **¿qué tendría que ser verdad para que esta idea valga la pena?**\n\nDespués buscaría la forma más barata de comprobarlo, que no siempre es código: un prototipo, cinco conversaciones, una landing, datos que ya existen o hacer a mano durante una semana lo que después se automatizaría.\n\nSu objetivo no es demostrar que la idea es buena, sino encontrar rápido **por qué podría estar equivocada**.",
    responseEN: "Barbi likes ideas, and even more when they survive contact with reality.\n\nBefore building, she would ask: **what would need to be true for this idea to be worth it?**\n\nThen she would look for the cheapest way to check it, which is not always code: a prototype, five conversations, a landing page, existing data, or doing by hand for a week what would later be automated.\n\nHer goal is not to prove the idea is good, but to quickly find **why it might be wrong**.",
    next: ["metrics_decision","methodology","thinking"],
  },
  {
    id: "ai_pm_role",
    keywordsES: ["como cambia la ia el rol","cómo cambia la ia el rol","rol de product manager","rol del pm","ia cambia pm","ai cambia producto","futuro del product manager"],
    keywordsEN: ["how does ai change the product manager role","ai change pm role","product manager role","future of product manager","ai changes product management"],
    responseES: "Para Barbi, la IA no achica el rol de Producto: **le saca escondites**.\n\nEscribir documentos, resumir reuniones, ordenar research o armar alternativas es cada vez más rápido. Entonces queda más expuesto lo difícil: elegir qué problema importa, hacer buenas preguntas, conectar señales contradictorias, entender el negocio, conversar con tecnología y decidir con información incompleta.\n\nLa IA puede producir veinte opciones en segundos. Para ella, el desafío sigue siendo saber **cuál no construir**.",
    responseEN: "For Barbi, AI does not shrink the Product role: **it removes hiding places**.\n\nWriting documents, summarizing meetings, organizing research or drafting alternatives keeps getting faster. That leaves the hard part more exposed: choosing which problem matters, asking good questions, connecting contradictory signals, understanding the business, talking with technology and deciding with incomplete information.\n\nAI can produce twenty options in seconds. For her, the challenge is still knowing **which one not to build**.",
    next: ["ai_product","ai_without_strategy","organizational_learning"],
  },
  {
    id: "financial_products_learning",
    keywordsES: ["productos financieros","aprendiste construyendo productos financieros","financiero","financieros","regulacion","regulación","compliance"],
    keywordsEN: ["financial products","building financial products","financial","regulation","compliance"],
    responseES: "La banca le enseñó a Barbi que **algo puede funcionar perfecto y aun así ser un mal producto**.\n\nEn productos financieros no alcanza con que la pantalla responda: tiene que haber confianza, trazabilidad, seguridad, operación, regulación, soporte y claridad. Y casi nunca se diseña sobre una hoja en blanco: hay legacy, varios sistemas, compliance y decisiones que cruzan muchas áreas.\n\nEso cambió su manera de hacer producto: dejó de pensar solo en “el usuario” y empezó a pensar en **el sistema completo que tiene que sostener esa experiencia**.",
    responseEN: "Banking taught Barbi that **something can work perfectly and still be a bad product**.\n\nIn financial products it is not enough for the screen to respond: there has to be trust, traceability, security, operations, regulation, support and clarity. And you almost never design on a blank page: there is legacy, several systems, compliance and decisions that cut across many areas.\n\nThat changed how she builds product: she stopped thinking only about “the user” and started thinking about **the whole system that has to sustain that experience**.",
    next: ["banking_experience","metrics_decision","misaligned_stakeholders"],
  },
  {
    id: "speed_quality",
    keywordsES: ["velocidad y calidad","velocidad o calidad","equilibrar velocidad","balancear velocidad","rapido y bien","rápido y bien","calidad vs velocidad","speed quality"],
    keywordsEN: ["speed and quality","speed or quality","balance speed","quality vs speed","fast and good","move fast without breaking"],
    responseES: "Barbi tiene una pequeña pelea con esta pregunta, porque supone que velocidad y calidad siempre compiten.\n\nA veces sí. Pero muchas veces lo que hace lento a un equipo es **la mala calidad del sistema de trabajo**: requisitos ambiguos, demasiadas cosas abiertas, QA tardío, decisiones pendientes y dependencias sin dueño. Eso genera retrabajo, y el retrabajo es carísimo.\n\nPara ella, moverse rápido no es hacer más: es acortar el tiempo entre **pregunta → decisión → evidencia → aprendizaje**.\n\nSi el riesgo es alto, suma control. Si la incertidumbre es alta, achica el alcance.",
    responseEN: "Barbi has a small quarrel with this question, because it assumes speed and quality always compete.\n\nSometimes they do. But very often what slows a team down is **the poor quality of the way of working**: ambiguous requirements, too many things open, late QA, pending decisions and dependencies without an owner. That creates rework, and rework is very expensive.\n\nFor her, moving fast is not doing more: it is shortening the time between **question → decision → evidence → learning**.\n\nIf risk is high, she adds control. If uncertainty is high, she reduces scope.",
    next: ["product_idea_validation","team_not_delivering","what_not_to_do"],
  },
  {
    id: "ambiguity_leadership",
    keywordsES: ["contextos ambiguos","ambiguedad","ambigüedad","liderar en ambiguo","lideras en contextos","liderás en contextos","incertidumbre","no hay claridad"],
    keywordsEN: ["ambiguous contexts","ambiguity","lead in ambiguity","uncertainty","no clarity","leading ambiguous"],
    responseES: "A Barbi la ambigüedad no le molesta demasiado. Le preocupa cuando se hace de cuenta que no existe.\n\nEn contextos inciertos intenta separar tres cosas: **lo que sabemos, lo que creemos y lo que todavía hay que descubrir**.\n\nCuando eso no está explícito, negocio, UX, tecnología y liderazgo rellenan los huecos con versiones distintas de la realidad, y aparecen discusiones que parecen de solución pero en realidad son de contexto.\n\nPara ella, liderar en la ambigüedad no es tener todas las respuestas: es lograr que el equipo avance **sin inventarse certezas**.",
    responseEN: "Ambiguity does not bother Barbi much. What worries her is when people pretend it is not there.\n\nIn uncertain contexts she tries to separate three things: **what we know, what we believe and what we still need to discover**.\n\nWhen that is not explicit, business, UX, technology and leadership fill the gaps with different versions of reality, and discussions appear that look like they are about solutions but are really about context.\n\nFor her, leading through ambiguity is not having all the answers: it is getting the team to move forward **without inventing certainties**.",
    next: ["misaligned_stakeholders","leadership","team_not_delivering"],
  },
  {
    id: "misaligned_stakeholders",
    keywordsES: ["stakeholders desalineados","stakeholders","negocio y tecnologia","negocio y tecnología","areas desalineadas","áreas desalineadas","nadie decide","no se ponen de acuerdo","conflicto entre negocio","alineacion","alineación"],
    keywordsEN: ["misaligned stakeholders","stakeholders","business and technology","teams are misaligned","nobody decides","cannot agree","alignment","business tech conflict"],
    responseES: "Si negocio y tecnología no se ponen de acuerdo, sumar otra reunión no sería la primera elección de Barbi. 😅\n\nElla intentaría descubrir **qué está optimizando cada uno**: negocio quizá mira time-to-market; tecnología, estabilidad; compliance, riesgo; UX, experiencia; operaciones, sostenibilidad. Y probablemente todos tengan una parte de razón.\n\nPara ella, el trabajo de Producto no es elegir un ganador, sino construir una decisión donde esos costos sean visibles.\n\nMuchas veces el desacuerdo se disuelve al explicitar: **objetivo + restricciones + trade-offs + quién decide**.",
    responseEN: "If business and technology cannot agree, adding another meeting would not be Barbi's first choice. 😅\n\nShe would try to find out **what each side is optimizing for**: business may be looking at time-to-market; technology, stability; compliance, risk; UX, experience; operations, sustainability. And they are probably all partly right.\n\nFor her, the job of Product is not to pick a winner, but to build a decision where those costs are visible.\n\nDisagreement often dissolves once you make explicit: **goal + constraints + trade-offs + who decides**.",
    next: ["ambiguity_leadership","metrics_decision","projects"],
  },
  {
    id: "roadmap_chaos",
    keywordsES: ["roadmap caotico","roadmap caótico","roadmap desordenado","roadmap no se cumple","muchas prioridades","prioridades cambiantes","todo es urgente","no se que priorizar","no sé qué priorizar","todo es prioridad"],
    keywordsEN: ["roadmap chaos","chaotic roadmap","roadmap is messy","roadmap keeps changing","too many priorities","everything is urgent","do not know what to prioritize","don't know what to prioritize"],
    responseES: "Para Barbi, cuando todo es prioridad el roadmap no está lleno: **está roto el sistema de decisión**.\n\nElla empezaría preguntando quién puede decir que no. Si cada pedido entra, ningún compromiso viejo sale y todas las áreas pueden declarar algo “urgente”, ningún framework de priorización alcanza.\n\nDespués separaría lo que mantiene vivo el negocio, lo que reduce riesgo, lo que genera crecimiento y lo que genera aprendizaje, y pondría la capacidad real al lado.\n\nUna priorización sin capacidad es una wishlist. Y un roadmap sin renuncias no es estrategia.",
    responseEN: "For Barbi, when everything is a priority the roadmap is not full: **the decision system is broken**.\n\nShe would start by asking who can say no. If every request gets in, no old commitment gets out and every area can declare something “urgent”, no prioritization framework is enough.\n\nThen she would separate what keeps the business alive, what reduces risk, what drives growth and what creates learning, and put real capacity next to it.\n\nPrioritization without capacity is a wishlist. And a roadmap without trade-offs is not strategy.",
    next: ["metrics_decision","misaligned_stakeholders","what_not_to_do"],
  },
  {
    id: "ai_without_strategy",
    keywordsES: ["ia sin estrategia","implementar ia","adoptar ia","usar ia en la empresa","queremos usar ia","integrar ia","automatizar con ia","ai sin estrategia","quiero aplicar ia","quiero meter ia","por donde empiezo con ia","por dónde empiezo con ia"],
    keywordsEN: ["ai without strategy","implement ai","adopt ai","use ai in the company","we want to use ai","integrate ai","automate with ai","i want to apply ai","where do i start with ai"],
    responseES: "Barbi no empezaría por Claude, ChatGPT, Copilot ni por “necesitamos un agente”.\n\nEmpezaría por una pregunta: **¿qué parte de nuestro trabajo hoy es innecesariamente difícil?**\n\nDespués distinguiría trabajo repetitivo, búsqueda y síntesis, generación, decisión, conocimiento y coordinación, y recién ahí evaluaría dónde la IA aumenta capacidad de verdad. Porque automatizar un proceso roto solo consigue **romperlo más rápido**.\n\nSu forma favorita de empezar: un caso chico, frecuente y medible, con una persona en el loop. Primero aprender, después escalar.",
    responseEN: "Barbi would not start with Claude, ChatGPT, Copilot or “we need an agent”.\n\nShe would start with a question: **which part of our work today is unnecessarily hard?**\n\nThen she would distinguish repetitive work, search and synthesis, generation, decision, knowledge and coordination, and only then assess where AI truly adds capacity. Because automating a broken process only manages to **break it faster**.\n\nHer favorite way to start: a small, frequent and measurable case, with a human in the loop. Learn first, scale later.",
    next: ["ai_opinion","organizational_learning","ai_pm_role"],
  },
  {
    id: "what_not_to_do",
    keywordsES: ["que no haria","qué no haría","errores evitar","que evitar","qué evitar","malas practicas","malas prácticas"],
    keywordsEN: ["what would she not do","what to avoid","mistakes to avoid","bad practices"],
    responseES: "Algunas cosas que Barbi intenta evitar:\n\n- construir porque alguien importante tuvo una idea;\n- confundir estar ocupados con avanzar;\n- meter IA para poder decir que se usa IA;\n- llenar dashboards sin saber qué decisión van a cambiar;\n- usar Agile como religión;\n- abrir diez iniciativas con capacidad para tres;\n- esconder incertidumbre detrás de estimaciones prolijas;\n- llamar “problema del equipo” a un problema del sistema.\n\nY una más: **no defendería una metodología por encima de la evidencia**. Si dejó de ayudar, hay que cambiarla.",
    responseEN: "Some things Barbi tries to avoid:\n\n- building because someone important had an idea;\n- confusing being busy with making progress;\n- adding AI just to be able to say AI is used;\n- filling dashboards without knowing which decision they will change;\n- treating Agile as a religion;\n- opening ten initiatives with capacity for three;\n- hiding uncertainty behind tidy estimates;\n- calling a system problem a “team problem”.\n\nAnd one more: **she would not defend a methodology over evidence**. If it stopped helping, it has to change.",
    next: ["speed_quality","ai_product","thinking"],
  },
  {
    id: "metrics_decision",
    keywordsES: ["metricas","métricas","que metricas","qué métricas","medir impacto","measurement","kpi","okrs","datos","data"],
    keywordsEN: ["metrics","what metrics","measure impact","measurement","kpi","okrs","data"],
    responseES: "Antes de pedir un dashboard, Barbi preguntaría: **¿qué decisión queremos tomar distinto después de mirar estos datos?** Si no hay respuesta, probablemente todavía no hace falta la métrica.\n\nLe interesa combinar tres tipos de señal:\n\n**Resultado:** qué cambió para el usuario o el negocio.\n**Salud:** qué costo, riesgo o fricción se generó.\n**Aprendizaje:** qué se entiende ahora que antes no.\n\nPara ella los datos ayudan muchísimo, pero una organización data-driven sin criterio puede equivocarse con una precisión espectacular.",
    responseEN: "Before asking for a dashboard, Barbi would ask: **which decision do we want to make differently after looking at this data?** If there is no answer, the metric is probably not needed yet.\n\nShe likes to combine three kinds of signal:\n\n**Outcome:** what changed for the user or the business.\n**Health:** what cost, risk or friction was created.\n**Learning:** what we understand now that we did not before.\n\nFor her, data helps enormously, but a data-driven organization without judgment can be wrong with spectacular precision.",
    next: ["product_idea_validation","financial_products_learning","organizational_learning"],
  },
  {
    id: "organizational_learning",
    keywordsES: ["aprendizaje organizacional","organizacion aprende","organización aprende","convertir informacion","convertir información","notebooklm","notebook llm","conocimiento accionable","decisiones y aprendizaje"],
    keywordsEN: ["organizational learning","organization learns","turn information","notebooklm","notebook llm","actionable knowledge","decisions and learning"],
    responseES: "A Barbi NotebookLM le interesa menos por la herramienta y más por el problema que deja en evidencia: **las organizaciones producen muchísimo conocimiento y recuerdan muy poco**.\n\nDecisiones enterradas en reuniones, research perdido en Drive, documentación que nadie vuelve a abrir y personas que se van con el contexto.\n\nHerramientas así permiten conversar con ese conocimiento, comparar fuentes y recuperar contexto. Pero, para ella, la tecnología sola no crea aprendizaje organizacional.\n\nEl ciclo que le interesa es: **información → síntesis → decisión → resultado → aprendizaje reutilizable**.",
    responseEN: "Barbi is less interested in NotebookLM as a tool than in the problem it exposes: **organizations produce a huge amount of knowledge and remember very little**.\n\nDecisions buried in meetings, research lost in Drive, documentation nobody opens again, and people who leave taking the context with them.\n\nTools like this let you talk with that knowledge, compare sources and recover context. But, for her, technology alone does not create organizational learning.\n\nThe loop she cares about is: **information → synthesis → decision → outcome → reusable learning**.",
    next: ["ai_product","metrics_decision","thinking"],
  },
  {
    id: "thinking",
    keywordsES: ["como piensa","cómo piensa","forma de pensar","criterio","decide","decidir","mirada","enfoque","pensamiento","barbara piensa","barbi piensa","todo esta desordenado"],
    keywordsEN: ["how she thinks","thinking","decision criteria","judgment","approach","mindset","how barbara thinks","how barbi thinks"],
    responseES: "Barbi tiene una tendencia marcada: cuando algo parece un problema simple, intenta descubrir **qué sistema hay detrás**.\n\nSi un equipo está lento, no mira solo velocity. Si un usuario abandona, no mira solo conversión. Si dos áreas discuten, no mira solo quién tiene razón. Si aparece IA, no mira primero la herramienta.\n\nLe interesa entender **qué está pasando, por qué ahora, qué tensiones existen y qué decisión puede mover el sistema**. Y después lo prueba contra la realidad.\n\nSu forma de trabajar combina **curiosidad para entender y pragmatismo para mover**.",
    responseEN: "Barbi has a strong habit: when something looks like a simple problem, she tries to find **the system behind it**.\n\nIf a team is slow, she does not look only at velocity. If a user drops off, she does not look only at conversion. If two areas argue, she does not look only at who is right. If AI shows up, she does not look at the tool first.\n\nShe wants to understand **what is happening, why now, which tensions exist and which decision can move the system**. And then she tests it against reality.\n\nHer way of working combines **curiosity to understand and pragmatism to move**.",
    next: ["product_idea_validation","team_not_delivering","ai_pm_role"],
  },
  {
    id: "greeting",
    keywordsES: ["hola","buenas","buen dia","buenos dias","hey","saludos","como estas","que tal"],
    keywordsEN: ["hello","hi","hey","good morning","greetings","howdy"],
    responseES: "¡Hola! 👋 Soy Bocconcino, el guía de este portfolio.\n\nTengo respuestas preparadas sobre Barbi: quién es, su trayectoria, cómo trabaja y qué piensa sobre producto, IA y liderazgo.\n\nElegí un tema de acá abajo o escribime tu pregunta.",
    responseEN: "Hi! 👋 I'm Bocconcino, the guide to this portfolio.\n\nI have prepared answers about Barbi: who she is, her career path, how she works and what she thinks about product, AI and leadership.\n\nPick a topic below or type your question.",
    variantsES: ["¡Hola! 👋 Soy Bocconcino, el guía de este portfolio. Podés preguntarme por la trayectoria de Barbi, por cómo trabaja o por sus ideas sobre producto, IA y liderazgo.","¡Buenas! Soy Bocconcino. Te puedo contar sobre Barbi: su recorrido, su forma de trabajar y lo que piensa sobre producto, IA y equipos. ¿Por dónde empezamos?"],
    variantsEN: ["Hi! 👋 I'm Bocconcino, the guide to this portfolio. You can ask me about Barbi's career path, how she works or her ideas on product, AI and leadership.","Hello! I'm Bocconcino. I can tell you about Barbi: her journey, her way of working and what she thinks about product, AI and teams. Where shall we start?"],
    next: ["who_is_barbara","experience","ai_product"],
  },
  {
    id: "who_is_barbara",
    keywordsES: ["quien","quién","barbara","barbi","que hace","qué hace","de que trata","presentate","quien sos","quien es"],
    keywordsEN: ["who","barbara","barbi","what does she do","introduce","tell me","about her","about barbara","about barbi"],
    responseES: "Barbi pasó por una mezcla poco prolija, y bastante útil, de marketing, datos, growth, e-commerce, banca, tecnología, producto, liderazgo e IA.\n\nHace más de una década que construye productos digitales y conecta mundos que suelen hablar idiomas distintos: **negocio, tecnología, UX, datos, operación y personas**.\n\nHoy le interesa especialmente una pregunta: **¿cómo cambia la forma de construir productos y organizaciones cuando la IA deja de ser una herramienta y empieza a ser parte del equipo?**\n\nTambién da charlas, enseña, experimenta y escribe sobre eso.",
    responseEN: "Barbi has been through a rather untidy, and quite useful, mix of marketing, data, growth, e-commerce, banking, technology, product, leadership and AI.\n\nFor more than a decade she has been building digital products and connecting worlds that usually speak different languages: **business, technology, UX, data, operations and people**.\n\nToday she is especially interested in one question: **how does the way we build products and organizations change when AI stops being a tool and starts being part of the team?**\n\nShe also speaks, teaches, experiments and writes about it.",
    variantsES: ["Barbi crea desde 1989. Empezó mirando clics y conversiones, pero terminó encontrando lo que más le interesaba: las personas detrás de los datos, los equipos que deciden y las ideas que se vuelven experiencias reales.","Más que una bio, lo interesante de Barbi es su mirada: viene de marketing, creció construyendo productos digitales y hoy explora cómo la IA puede potenciar equipos y decisiones sin borrar lo humano."],
    variantsEN: ["Barbi has been creating since 1989. She started out looking at clicks and conversions, but ended up finding what interested her most: the people behind the data, the teams that decide and the ideas that become real experiences.","More than a bio, what is interesting about Barbi is her perspective: she comes from marketing, grew up building digital products and today explores how AI can empower teams and decisions without erasing what is human."],
    next: ["thinking","experience","differentiator"],
  },
  {
    id: "experience",
    keywordsES: ["experiencia","trayectoria","anos","años","background","carrera","trabajos","historia","recorrido"],
    keywordsEN: ["experience","years","background","career","trajectory","history"],
    responseES: "El recorrido de Barbi se entiende mejor por problemas que por cargos.\n\nEmpezó en **SEO y performance**, viendo cómo pequeños cambios alteran el comportamiento. Con **growth y publicidad digital** aprendió experimentación, adquisición y datos. En **insurtech** entendió que el producto también vive en operaciones, ventas y atención.\n\nEn **e-commerce de escala regional** vio equipos con autonomía real y enorme capacidad de ejecutar. En **banca** aparecieron regulación, legacy y sistemas complejos. Después todo se mezcló con **consultoría, liderazgo, delivery e IA**.\n\nEl hilo no fue una industria: fue aprender a **convertir complejidad en producto y dirección**.",
    responseEN: "Barbi's path makes more sense by problems than by job titles.\n\nShe started in **SEO and performance**, seeing how small changes alter behavior. With **growth and digital advertising** she learned experimentation, acquisition and data. In **insurtech** she understood that product also lives in operations, sales and support.\n\nIn **regional-scale e-commerce** she saw teams with real autonomy and a huge capacity to execute. In **banking** came regulation, legacy and complex systems. Then it all blended with **consulting, leadership, delivery and AI**.\n\nThe common thread was not an industry: it was learning to **turn complexity into product and direction**.",
    next: ["banking_experience","ecommerce_experience","thinking"],
    navLinks: [{"labelES":"→ Ver Trayectoria","labelEN":"→ See career path","route":"/#trayectoria"}],
  },
  {
    id: "banking_experience",
    keywordsES: ["banca","banco","bancaria","bancario","banca digital","banca corporativa","corporate banking","onboarding","cobranzas","pagos","legacy","servicios financieros"],
    keywordsEN: ["banking","digital banking","corporate banking","onboarding","collections","payments","legacy","financial services"],
    responseES: "La banca fue una etapa clave para Barbi, porque el producto dejó de ser solo experiencia y negocio y pasó a ser **sistema**.\n\nTrabajó varios años alrededor de cobranzas, pagos y onboarding de empresas, entre otros desafíos de servicios financieros. Había usuarios, tecnología, legacy, seguridad, compliance, riesgo, operación y muchas áreas decidiendo sobre el mismo flujo.\n\nDe ahí se llevó algo que todavía usa: **una buena experiencia no se diseña ignorando la complejidad; se diseña absorbiéndola**.",
    responseEN: "Banking was a key stage for Barbi, because product stopped being only experience and business and became **system**.\n\nShe worked for several years around collections, payments and business onboarding, among other financial services challenges. There were users, technology, legacy, security, compliance, risk, operations and many areas deciding on the same flow.\n\nShe took away something she still uses: **a good experience is not designed by ignoring complexity; it is designed by absorbing it**.",
    next: ["financial_products_learning","ecommerce_experience","agile_after_agile"],
  },
  {
    id: "ecommerce_experience",
    keywordsES: ["ecommerce","e-commerce","marketplace","sellers","vendedores","marketing inteligente","publicidad digital","integraciones","alto rendimiento"],
    keywordsEN: ["ecommerce","e-commerce","marketplace","sellers","smart marketing","digital advertising","integrations","high performance"],
    responseES: "La etapa de e-commerce fue para Barbi la prueba de que los equipos de alto rendimiento no son una slide de consultoría: existen.\n\nTrabajó en productos para sellers, growth, marketing inteligente, integraciones con plataformas publicitarias y experimentación. Pero su mayor aprendizaje no fue una funcionalidad: fue vivir un entorno con mucho contexto, autonomía, excelencia técnica y gente muy comprometida.\n\nAhí entendió algo que volvió a aparecer en toda su carrera: **Agile funciona mucho mejor como cultura que como ceremonia**.",
    responseEN: "For Barbi, the e-commerce stage was proof that high-performing teams are not a consulting slide: they exist.\n\nShe worked on products for sellers, growth, smart marketing, integrations with advertising platforms and experimentation. But her biggest lesson was not a feature: it was living in an environment with lots of context, autonomy, technical excellence and deeply committed people.\n\nThere she understood something that kept showing up throughout her career: **Agile works much better as a culture than as a ceremony**.",
    next: ["insurtech_growth","leadership","agile_after_agile"],
  },
  {
    id: "insurtech_growth",
    keywordsES: ["insurtech","seguros","growth","adquisicion","adquisición","sem","funnel","conversion","conversión","ventas","call center","operacion","operación"],
    keywordsEN: ["insurtech","insurance","growth","acquisition","sem","funnel","conversion","sales","call center","operations"],
    responseES: "En insurtech la mirada de Barbi se hizo bastante más amplia.\n\nEntró desde Growth: adquisición, SEO/SEM, funnels, conversión y experimentación. Pero el producto real cruzaba Comunicación, Tecnología, Call Center, Ventas, RRHH y operación.\n\nTrabajar tan cerca de mundos distintos le enseñó algo central: **cada área ve una parte verdadera del problema**. Para ella, la calidad aparece cuando esas miradas conversan en lugar de competir.",
    responseEN: "In insurtech Barbi's perspective became considerably broader.\n\nShe came in through Growth: acquisition, SEO/SEM, funnels, conversion and experimentation. But the real product cut across Communications, Technology, Call Center, Sales, HR and operations.\n\nWorking so close to different worlds taught her something central: **each area sees a true part of the problem**. For her, quality appears when those views talk to each other instead of competing.",
    next: ["early_career","differentiator","leadership"],
  },
  {
    id: "early_career",
    keywordsES: ["primeros trabajos","inicios","seo","performance","marketing digital","antes de producto","cuentas","anunciantes"],
    keywordsEN: ["early career","beginnings","seo","performance","digital marketing","before product","accounts","advertisers"],
    responseES: "Antes de llamarlo Producto, Barbi ya estaba obsesionada con entender el comportamiento.\n\nEmpezó en SEO: búsquedas, intención y pequeños cambios capaces de modificar muchísimo cómo una persona encuentra algo. Después trabajó en estrategia digital, performance y crecimiento de cuentas para anunciantes.\n\nAhí convivió con cantidades enormes de datos y aprendió una lección que todavía usa: **tener datos no significa saber qué hacer**.",
    responseEN: "Before calling it Product, Barbi was already obsessed with understanding behavior.\n\nShe started in SEO: searches, intent and small changes that can hugely alter how a person finds something. Then she worked in digital strategy, performance and account growth for advertisers.\n\nThere she lived with enormous amounts of data and learned a lesson she still uses: **having data does not mean knowing what to do**.",
    next: ["experience","metrics_decision","education"],
  },
  {
    id: "education",
    keywordsES: ["formacion","formación","estudios","educacion","educación","certificaciones","certificacion","certificación","uade","mit","producthub","ai first","leadership agility","data analytics"],
    keywordsEN: ["education","studies","degree","certifications","certification","mit","producthub","ai first","leadership agility","data analytics"],
    responseES: "La formación de Barbi empezó en Relaciones Públicas e Institucionales, que con el tiempo resultó tener mucho que ver con Producto: comunicación, stakeholders, comportamiento y organizaciones.\n\nDespués fue armando una formación híbrida entre producto, liderazgo, datos y tecnología. Entre sus focos más recientes están **MIT xPRO — Designing and Building AI Products and Services**, **AI First Product Management**, Claude y Claude Code, Leadership Agility y Data Analytics.\n\nPero su formación más constante es otra: **construir, probar algo nuevo y obligarse a entender cómo funciona**.",
    responseEN: "Barbi's education started in Public and Institutional Relations, which over time turned out to have a lot to do with Product: communication, stakeholders, behavior and organizations.\n\nThen she built a hybrid education across product, leadership, data and technology. Her most recent focuses include **MIT xPRO — Designing and Building AI Products and Services**, **AI First Product Management**, Claude and Claude Code, Leadership Agility and Data Analytics.\n\nBut her most constant education is something else: **building, trying something new and forcing herself to understand how it works**.",
    next: ["tools_stack","methodology","thinking"],
  },
  {
    id: "current_work",
    keywordsES: ["que hace hoy","hace hoy","actualmente","actual","trabaja ahora","trabaja hoy","donde trabaja","dónde trabaja","consultoria","consultoría","actualmente","hoy trabaja","arquitectura","asistentes"],
    keywordsEN: ["doing now","doing today","currently","current","works now","where she works","currently","architecture","assistants"],
    responseES: "Hoy el rol de Barbi es bastante más amplio que “hacer producto”.\n\nTrabaja en contextos complejos donde conviven delivery, equipos, clientes, tecnología, UX, QA, arquitectura, liderazgo y negocio.\n\nTambién es donde más experimenta con IA aplicada al trabajo real: agentes, asistentes, generación de especificaciones, automatización de testing y nuevas formas de discovery.\n\nEsa mezcla conecta con las preguntas que hoy más le interesan: **cómo se lideran equipos aumentados por IA, qué se deja de hacer a mano y qué se vuelve todavía más humano**.",
    responseEN: "Today Barbi's role is considerably broader than “doing product”.\n\nShe works in complex contexts where delivery, teams, clients, technology, UX, QA, architecture, leadership and business all coexist.\n\nIt is also where she experiments most with AI applied to real work: agents, assistants, spec generation, test automation and new forms of discovery.\n\nThat mix connects with the questions that interest her most today: **how to lead AI-augmented teams, what we stop doing by hand and what becomes even more human**.",
    next: ["ai_agents","spec_driven_ai","qa_product"],
  },
  {
    id: "ai_product",
    keywordsES: ["ai","ia","inteligencia artificial","llm","llms","gpt","copilot","prompting","machine learning","humanos y algoritmos","humanos ia","algoritmos","chatgpt","openai","gemini","ia generativa","generativa","gen ai","asistente ia","herramienta ia"],
    keywordsEN: ["ai","artificial intelligence","llm","llms","gpt","copilot","prompting","machine learning","humans and algorithms","humans ai","chatgpt","openai","gemini","generative ai","ai assistant","ai tool"],
    responseES: "“Humanos + IA” nace de una incomodidad de Barbi.\n\nDurante mucho tiempo se habló de IA preguntando qué tareas puede hacer la máquina. A ella le interesa cada vez más la otra mitad: **¿qué deberíamos hacer mejor nosotros ahora que la máquina puede hacer todo esto?**\n\nMejor contexto, mejores preguntas, mejor criterio, más curiosidad y más aprendizaje.\n\nNo piensa la IA como reemplazo del humano ni como copiloto mágico, sino como una nueva pieza dentro del sistema de trabajo. Y cuando se suma una pieza tan potente, cambia todo el resto.",
    responseEN: "“Humans + AI” comes from something that makes Barbi uncomfortable.\n\nFor a long time people talked about AI by asking which tasks the machine can do. She is increasingly interested in the other half: **what should we do better now that the machine can do all this?**\n\nBetter context, better questions, better judgment, more curiosity and more learning.\n\nShe does not see AI as a replacement for humans or as a magic copilot, but as a new piece within the system of work. And when you add a piece that powerful, everything else changes.",
    next: ["ai_pm_role","ai_agents","organizational_learning"],
  },
  {
    id: "leadership",
    keywordsES: ["liderazgo","liderar","lidera","equipo","equipos","gestión","gestion","manage","management","cultura","colaboracion","colaboración","squad","squads","pm","product manager","product owner","po","lider","líder","feedback","empatia","empatía","mentoring","comunicacion","comunicación","dirigir","inclusion","inclusión","confianza","entorno","crecimiento profesional","acompanamiento","acompañamiento","retro","retrospectiva","one on one","1 a 1"],
    keywordsEN: ["leadership","lead","team","teams","management","culture","collaboration","squad","pm","product manager","product owner","leader","feedback","empathy","mentoring","communication","inclusion","trust","environment","professional growth","support","retrospective","one on one"],
    responseES: "Liderar le resultó a Barbi bastante distinto de lo que imaginaba.\n\nPensaba que tenía que tener más respuestas, y terminó aprendiendo que muchas veces su trabajo es **crear las condiciones para que otras personas las encuentren**.\n\nPara ella eso significa dar contexto, hacer visibles las tensiones, ayudar a priorizar, proteger el foco, decir verdades incómodas temprano y generar la confianza para que alguien pueda decir “esto no está funcionando”.\n\nIntenta equilibrar dos cosas que viven en tensión: **cuidar a las personas y cuidar el resultado**. ❤️",
    responseEN: "Leading turned out to be quite different from what Barbi imagined.\n\nShe thought she needed to have more answers, and ended up learning that her job is often to **create the conditions for other people to find them**.\n\nFor her that means giving context, making tensions visible, helping prioritize, protecting focus, saying uncomfortable truths early and building enough trust for someone to say “this is not working”.\n\nShe tries to balance two things that live in tension: **caring for people and caring for the outcome**. ❤️",
    next: ["team_not_delivering","ambiguity_leadership","speed_quality"],
  },
  {
    id: "methodology",
    keywordsES: ["discovery","delivery","roadmap","priorizar","priorización","metodologia","metodología","proceso","agile","agil","ágil","scrum","sprint","iteracion","iteración","decisiones","forma de trabajar","backlog","lean","design thinking","experimento","hipotesis","hipótesis","prioridad","mejora continua","ceremonias","historias de usuario","story mapping","construye producto","discovery o delivery","bajar estrategia a ejecucion"],
    keywordsEN: ["discovery","delivery","roadmap","prioritize","methodology","process","agile","scrum","sprint","decisions","work method","backlog","lean","design thinking","experiment","hypothesis","priority","ceremonies","user story","strategy to execution"],
    responseES: "Barbi no tiene demasiado apego a una metodología en particular. Tiene apego a algunas preguntas: **qué problema se resuelve, para quién, qué evidencia hay, qué se está asumiendo, qué riesgo se toma y cómo se sabrá si funcionó**.\n\nDespués puede usar discovery, story mapping, experimentos, métricas, Scrum, Kanban, prototipos, IA o una pizarra con post-its.\n\nPara ella el framework es una herramienta. El objetivo es que el equipo pase de **incertidumbre → decisión → ejecución → aprendizaje**, y que lo haga cada vez mejor.",
    responseEN: "Barbi is not very attached to any particular methodology. She is attached to a few questions: **which problem is being solved, for whom, what evidence there is, what is being assumed, what risk is taken and how we will know if it worked**.\n\nAfter that she may use discovery, story mapping, experiments, metrics, Scrum, Kanban, prototypes, AI or a whiteboard with sticky notes.\n\nFor her the framework is a tool. The goal is for the team to move from **uncertainty → decision → execution → learning**, and to do it better each time.",
    next: ["product_idea_validation","speed_quality","metrics_decision"],
  },
  {
    id: "tools_stack",
    keywordsES: ["herramientas","figma","jira","azure devops","notion","miro","confluence","amplitude","mixpanel","ga4","gtm","google tag manager","hotjar","looker","metabase","sql","sheets","slack","linear","asana","trello","stack","software","aplicaciones","programas","que usa","qué usa","analytics","figjam","github copilot","cursor","claude","claude code"],
    keywordsEN: ["tools","figma","jira","azure devops","notion","miro","confluence","amplitude","mixpanel","ga4","gtm","google tag manager","hotjar","looker","metabase","sql","sheets","slack","linear","asana","trello","stack","apps","analytics","figjam","github copilot","cursor","claude","claude code"],
    responseES: "El stack de Barbi cambia mucho según el contexto.\n\nPara producto y colaboración suele usar **Jira o Azure DevOps, Confluence, Miro o FigJam, Figma y Google Workspace**. Para datos: **Analytics, Tag Manager, dashboards y Sheets**.\n\nHoy gran parte de su exploración está en IA: **ChatGPT, Claude, Claude Code, NotebookLM, Gemini, Copilot** y herramientas de desarrollo asistido.\n\nPero tiene una regla simple: **no le interesa coleccionar herramientas**, sino qué capacidad nueva habilitan.",
    responseEN: "Barbi's stack changes a lot depending on the context.\n\nFor product and collaboration she usually works with **Jira or Azure DevOps, Confluence, Miro or FigJam, Figma and Google Workspace**. For data: **Analytics, Tag Manager, dashboards and Sheets**.\n\nToday a large part of her exploration is in AI: **ChatGPT, Claude, Claude Code, NotebookLM, Gemini, Copilot** and AI-assisted development tools.\n\nBut she has a simple rule: **she is not interested in collecting tools**, only in what new capability they enable.",
    next: ["methodology","ai_product","projects"],
  },
  {
    id: "fintech",
    keywordsES: ["fintech","pagos digitales","transformacion digital","transformación digital","cobro digital","aseguradora","medios de pago","sector financiero","onboarding digital"],
    keywordsEN: ["fintech","digital payments","digital transformation","banking sector","payment methods","financial sector","digital onboarding"],
    responseES: "Barbi trabajó varios años alrededor de banca, pagos, cobranzas, onboarding, insurtech y canales digitales.\n\nSi tuviera que resumir qué hace distintos a estos productos, diría: **la confianza forma parte de la UX**.\n\nSeguridad, regulación, trazabilidad, disponibilidad y operación no son temas “de atrás”: el usuario los siente aunque nunca vea una arquitectura ni una regla de compliance. Eso obliga a construir producto mirando el sistema completo.",
    responseEN: "Barbi worked for several years around banking, payments, collections, onboarding, insurtech and digital channels.\n\nIf she had to sum up what makes these products different, she would say: **trust is part of the UX**.\n\nSecurity, regulation, traceability, availability and operations are not “back-office” topics: the user feels them even without ever seeing an architecture or a compliance rule. That forces you to build product looking at the whole system.",
    next: ["banking_experience","metrics_decision","financial_products_learning"],
  },
  {
    id: "projects",
    keywordsES: ["proyectos","casos","ver","portfolio","portafolio","case study","case studies","trabajo","ejemplos","que construyo","qué construyó"],
    keywordsEN: ["projects","cases","see","portfolio","case study","case studies","work","examples","what she built"],
    responseES: "En la trayectoria de Barbi hay proyectos muy distintos: **banca digital y corporate banking**, **e-commerce y growth**, **IA aplicada**, **transformación de equipos** e **ideas que terminaron en charlas**.\n\nEn cada caso, lo que intenta mostrar no es solo **qué se construyó**, sino **qué problema había, qué se decidió y qué aprendió**.\n\nPodés recorrer cada etapa en la sección Trayectoria.",
    responseEN: "Barbi's career includes very different projects: **digital and corporate banking**, **e-commerce and growth**, **applied AI**, **team transformation** and **ideas that ended up as talks**.\n\nIn each case, what she tries to show is not only **what was built**, but **what the problem was, what was decided and what she learned**.\n\nYou can walk through each stage in the Career path section.",
    next: ["banking_experience","ecommerce_experience","ai_product"],
    navLinks: [{"labelES":"→ Ver Trayectoria","labelEN":"→ See career path","route":"/#trayectoria"}],
  },
  {
    id: "contact_cv",
    keywordsES: ["contacto","contactar","email","mail","cv","curriculum","descargar","linkedin","one sheet","onesheet","whatsapp","llamar","llamada","escribirle","escribirla","reunion","reunión","hablar","telefono","teléfono","mensaje","como contactar"],
    keywordsEN: ["contact","reach out","email","mail","cv","resume","download","linkedin","one sheet","whatsapp","call","meeting","phone","message","how to contact"],
    responseES: "Si algo de lo que viste acá te disparó una conversación, lo mejor es escribirle directo a Barbi.\n\n**LinkedIn:** Barbara Aceto\n**Email:** aceto.barbara@gmail.com\n\nUn consejo: contale primero **qué problema estás intentando resolver**. Suele ser el comienzo de una conversación mucho más interesante. 🙂",
    responseEN: "If something you saw here sparked a conversation, the best thing is to write to Barbi directly.\n\n**LinkedIn:** Barbara Aceto\n**Email:** aceto.barbara@gmail.com\n\nA tip: tell her first **which problem you are trying to solve**. It is usually the start of a much more interesting conversation. 🙂",
    next: ["availability","experience","who_is_barbara"],
    navLinks: [{"labelES":"→ Ver su perfil","labelEN":"→ See her profile","route":"/one-sheet"}],
    contact: true,
  },
  {
    id: "motivation",
    keywordsES: ["motiva","motivacion","motivación","te gusta","le gusta","disfruta","por que hace","por qué hace","pasion","pasión","que le apasiona","qué le apasiona"],
    keywordsEN: ["motivation","motivates","likes","enjoys","why she does it","passion","what she loves"],
    responseES: "Hay un momento del trabajo que a Barbi le encanta: cuando algo que parecía un lío enorme empieza a tener forma.\n\nCuando el equipo entiende el problema, aparecen palabras en común, una discusión eterna se vuelve una decisión, o alguien que pedía permiso para todo empieza a decidir solo.\n\nLo que la desgasta: **reuniones sin decisión, frameworks por inercia, política organizacional disfrazada de proceso y estrategia que nunca llega a producción**.",
    responseEN: "There is a moment at work that Barbi loves: when something that looked like a huge mess starts to take shape.\n\nWhen the team understands the problem, shared words appear, an endless discussion becomes a decision, or someone who asked permission for everything starts deciding on their own.\n\nWhat wears her down: **meetings without decisions, frameworks by inertia, organizational politics disguised as process and strategy that never reaches production**.",
    next: ["leadership","differentiator","challenge"],
  },
  {
    id: "ai_opinion",
    keywordsES: ["opinion","opinión","futuro","robots","reemplazar","automatizacion","automatización","perder trabajo","reemplaza","ai reemplaza","inteligencia artificial reemplaza","que piensa","qué piensa","vision","visión","vision ai","visión ai","su vision","su visión","vision sobre"],
    keywordsEN: ["opinion","future","robots","replace","automation","lose jobs","ai replace","artificial intelligence replace","what she thinks","vision","ai vision"],
    responseES: "Para Barbi, la discusión más interesante no es si “la IA va a reemplazar personas”.\n\nLa transformación ya empezó: está cambiando cómo buscamos, escribimos, analizamos, programamos, diseñamos y aprendemos.\n\nLa pregunta que le parece relevante es: **¿qué hacemos con la capacidad que acaba de quedar liberada?** Se puede usar para producir diez veces más cosas, o para pensar mejor, probar más y resolver problemas que antes eran demasiado caros. A ella le interesa mucho más lo segundo.\n\nLa IA amplifica capacidad, y también mediocridad. Por eso cree que el criterio humano importa más, no menos.",
    responseEN: "For Barbi, the most interesting discussion is not whether “AI will replace people”.\n\nThe transformation has already started: it is changing how we search, write, analyze, code, design and learn.\n\nThe question she finds relevant is: **what do we do with the capacity that has just been freed up?** It can be used to produce ten times more things, or to think better, test more and solve problems that used to be too expensive. She is far more interested in the second.\n\nAI amplifies capacity, and also mediocrity. That is why she believes human judgment matters more, not less.",
    next: ["ai_product","organizational_learning","ai_without_strategy"],
  },
  {
    id: "talks",
    keywordsES: ["talks","charlas","speaker","conferencia","conferencias","cursos","workshop","workshops","ensenar","enseñar"],
    keywordsEN: ["talks","speaker","conference","conferences","courses","workshop","workshops","teach"],
    responseES: "Las charlas de Barbi suelen empezar con algo que la incomoda.\n\n**Agile después del Agile** nació de una pregunta: si cambiaron la tecnología, los equipos, los productos y la velocidad del contexto, **¿por qué seguimos trabajando exactamente igual?** Su conclusión: iteramos el producto; quizás también deberíamos iterar el sistema con el que lo construimos.\n\nEn su curso **Humanos + Algoritmos** la pregunta es otra: si la IA puede hacer cada vez más, **¿qué necesitamos aprender nosotros?**\n\nNo le interesa que la gente salga diciendo “qué interesante”. Prefiere que salga pensando: **“mañana voy a cambiar algo”**.",
    responseEN: "Barbi's talks usually start with something that makes her uncomfortable.\n\n**Agile After Agile** came from a question: if technology, teams, products and the speed of context have changed, **why do we keep working exactly the same way?** Her conclusion: we iterate the product; maybe we should also iterate the system we build it with.\n\nIn her course **Humans + Algorithms** the question is different: if AI can do more and more, **what do we need to learn?**\n\nShe is not interested in people leaving saying “how interesting”. She would rather they leave thinking: **“tomorrow I am going to change something”**.",
    next: ["agile_after_agile","ai_product","availability"],
    navLinks: [{"labelES":"→ Ver Ideas desde la trinchera","labelEN":"→ See Ideas From The Field","route":"/#news-start"}],
  },
  {
    id: "notes_press",
    keywordsES: ["notas","nota","articulos","artículos","articulo","escribe","escrito","publica","reflexiones","contenido","prensa","noticias","women in tech","mujeres en tech","mujeres","diversidad","reinventandome","reinventándome","reinvencion","reinvención","product ops","operaciones de producto","data strategy","estrategia de datos","design systems","scaling teams","escalar equipos"],
    keywordsEN: ["notes","note","articles","article","writes","written","posts","content","reflections","press","news","women in tech","women","diversity","reinventing","reinvention","product ops","data strategy","design systems","scaling teams"],
    responseES: "Barbi escribe principalmente para pensar.\n\nMuchas notas empiezan con algo que vivió, algo que salió mal, una conversación o una idea que todavía no tiene resuelta. Los temas se repiten: **Producto, IA, equipos, liderazgo, Agile y aprendizaje**.\n\nEl hilo común es otro: cómo seguir construyendo cosas valiosas en un contexto que cambia cada vez más rápido.\n\nNo escribe desde tener todas las respuestas, sino desde **estar buscando mejores preguntas**.",
    responseEN: "Barbi writes mostly to think.\n\nMany notes start with something she lived, something that went wrong, a conversation or an idea she has not fully worked out. The topics recur: **Product, AI, teams, leadership, Agile and learning**.\n\nThe common thread is something else: how to keep building valuable things in a context that changes faster and faster.\n\nShe does not write from having all the answers, but from **looking for better questions**.",
    next: ["ai_product","leadership","methodology"],
    navLinks: [{"labelES":"→ Ver Ideas desde la trinchera","labelEN":"→ See Ideas From The Field","route":"/#news-start"}],
  },
  {
    id: "challenge",
    keywordsES: ["desafio","desafío","reto","problema complejo","dificil","difícil","mas complejo","más complejo","caso complejo","situacion dificil","situación difícil","problema dificil","problema difícil"],
    keywordsEN: ["challenge","complex","difficult","hard problem","toughest","most complex","hardest"],
    responseES: "Yo soy el guía del portfolio y trabajo con respuestas ya escritas, así que no puedo analizar tu caso puntual. Pero sí te puedo contar cómo lo encararía Barbi.\n\nAntes de buscar soluciones, ella haría cinco preguntas:\n\n**1. ¿Qué está pasando?**\n**2. ¿Por qué es un problema ahora?**\n**3. ¿Quiénes están involucrados?**\n**4. ¿Qué intentaron?**\n**5. ¿Qué decisión está trabada?**\n\nDespués separaría síntomas, causas, tensiones y restricciones. Si querés pensarlo con ella, escribile.",
    responseEN: "I am the portfolio guide and I work with pre-written answers, so I cannot analyze your specific case. But I can tell you how Barbi would approach it.\n\nBefore looking for solutions, she would ask five questions:\n\n**1. What is happening?**\n**2. Why is it a problem now?**\n**3. Who is involved?**\n**4. What have you tried?**\n**5. Which decision is stuck?**\n\nThen she would separate symptoms, causes, tensions and constraints. If you want to think it through with her, write to her.",
    next: ["thinking","misaligned_stakeholders","team_not_delivering"],
    contact: true,
  },
  {
    id: "availability",
    keywordsES: ["trabajar juntos","trabajar con ella","trabajar con barbi","disponible","disponibilidad","busca trabajo","open to work","contratar","contratarla","trabajo nuevo","buscando trabajo","oportunidad","oportunidades","entrevistar","hablar con ella","empleo","oferta","oferta laboral","proyecto nuevo","freelance","consulting"],
    keywordsEN: ["work together","work with her","work with barbi","available","availability","looking for work","open to work","hire","hiring","job opportunity","new role","new project","interview","freelance","consulting","contract"],
    responseES: "Puede ser. 🙂\n\nA Barbi le interesan especialmente los proyectos donde hay que conectar varias piezas: **producto + negocio + tecnología + personas + IA**.\n\nPuede aportar desde liderazgo de producto, workshops, capacitación, diagnóstico de equipos, adopción de IA o desafíos concretos de producto y transformación.\n\nSu consejo: mandale contexto antes que un brief perfecto. El resto se construye en la conversación.",
    responseEN: "It could be. 🙂\n\nBarbi is especially interested in projects where several pieces need connecting: **product + business + technology + people + AI**.\n\nShe can contribute through product leadership, workshops, training, team diagnosis, AI adoption or specific product and transformation challenges.\n\nHer advice: send her context rather than a perfect brief. The rest gets built in the conversation.",
    next: ["methodology","contact_cv","location_remote"],
    navLinks: [{"labelES":"→ Ver su perfil","labelEN":"→ See her profile","route":"/one-sheet"}],
    contact: true,
  },
  {
    id: "location_remote",
    keywordsES: ["donde vive","dónde vive","donde esta","dónde está","ubicacion","ubicación","pais","país","ciudad","argentina","buenos aires","remoto","hibrido","híbrido","presencial","trabaja remoto","zona horaria","timezone","idioma","idiomas","ingles","inglés","habla ingles","bilingue","bilingüe","relocation","remota","trabaja desde","italiano"],
    keywordsEN: ["where is she","where she lives","location","country","city","argentina","buenos aires","remote","hybrid","in-person","timezone","language","languages","english","speaks english","bilingual","based","relocation","work from","italian"],
    responseES: "Barbi está en **Buenos Aires, Argentina (UTC-3)** y trabaja con equipos locales, regionales y distribuidos.\n\nPuede trabajar remoto, híbrido o presencial según el proyecto.\n\nIdiomas:\n**Español:** nativo\n**Inglés:** profesional\n**Italiano:** en aprendizaje\n\nPara proyectos internacionales, el trabajo remoto le resulta totalmente natural.",
    responseEN: "Barbi is based in **Buenos Aires, Argentina (UTC-3)** and works with local, regional and distributed teams.\n\nShe can work remotely, hybrid or on-site depending on the project.\n\nLanguages:\n**Spanish:** native\n**English:** professional\n**Italian:** learning\n\nFor international projects, remote work comes completely naturally to her.",
    next: ["availability","contact_cv","methodology"],
  },
  {
    id: "differentiator",
    keywordsES: ["diferencia","diferenciador","diferente","unico","único","por que producto","por qué producto","que la hace distinta","qué la hace distinta","valor diferencial","propuesta de valor","fortaleza","fortalezas","distingue","distinta"],
    keywordsEN: ["differentiator","different","unique","why product","what makes her different","value proposition","strength","strengths","stand out","stands out","sets her apart"],
    responseES: "Probablemente el diferencial de Barbi venga de haber estado muchas veces **en el medio**: entre negocio y tecnología, entre estrategia y ejecución, entre usuario y operación, entre velocidad y calidad, entre equipos y management. Y ahora, entre humanos y algoritmos.\n\nAprendió a traducir esos mundos sin simplificarlos demasiado. Y **no se queda cómoda en la teoría**: le gusta convertir conversaciones en decisiones y decisiones en algo que llegue a producción.\n\nSu lugar favorito: **cuando todavía hay bastante caos, pero ya se puede empezar a construir dirección**.",
    responseEN: "Barbi's differentiator probably comes from having been **in the middle** so many times: between business and technology, between strategy and execution, between user and operations, between speed and quality, between teams and management. And now, between humans and algorithms.\n\nShe learned to translate those worlds without oversimplifying them. And **she does not stay comfortable in theory**: she likes turning conversations into decisions and decisions into something that reaches production.\n\nHer favorite place: **when there is still quite a lot of chaos, but you can already start building direction**.",
    next: ["projects","thinking","availability"],
  },
  {
    id: "help_menu",
    keywordsES: ["menu","que me podes contar","que podes decirme","que podes","que podés","opciones","ayuda","que preguntar","temas","lista","que sabe","qué sabe","que temas","qué temas"],
    keywordsEN: ["menu","what can you tell","what can you do","what can you say","options","help","what to ask","what do you know","topics","list of topics","what do you cover"],
    responseES: "Soy Bocconcino, el guía de este portfolio. Tengo respuestas preparadas sobre estos temas:\n\n**👋 Conocer a Barbi:** quién es, qué la diferencia, qué la motiva.\n**🧭 Trayectoria:** banca, e-commerce, seguros, inicios y trabajo actual.\n**🚀 Producto:** cómo valida ideas, prioriza y mide.\n**👥 Equipos:** liderazgo, ambigüedad, QA y forma de trabajo.\n**🤖 IA:** Humanos + IA, agentes y por dónde empezar.\n**🎤 Charlas y notas:** Agile después del Agile y más.\n**📩 Contacto:** disponibilidad y cómo escribirle.",
    responseEN: "I'm Bocconcino, the guide to this portfolio. I have prepared answers on these topics:\n\n**👋 Get to know Barbi:** who she is, what sets her apart, what motivates her.\n**🧭 Career path:** banking, e-commerce, insurance, early career and current work.\n**🚀 Product:** how she validates ideas, prioritizes and measures.\n**👥 Teams:** leadership, ambiguity, QA and ways of working.\n**🤖 AI:** Humans + AI, agents and where to start.\n**🎤 Talks and notes:** Agile After Agile and more.\n**📩 Contact:** availability and how to reach her.",
    next: ["who_is_barbara","experience","ai_product"],
  },
  {
    id: "short_ack",
    keywordsES: ["dale","joya","copado","genial","perfecto","excelente","gracias","buenisimo","buenísimo","entendido","listo","okey"],
    keywordsEN: ["thanks","thank you","great","perfect","cool","awesome","got it","nice","understood","sure"],
    responseES: "💛 ¡Gracias! ¿Seguimos con otro tema?",
    responseEN: "💛 Thank you! Shall we move on to another topic?",
    variantsES: ["💛 ¡Gracias! ¿Seguimos con otro tema?","¡Buenísimo! ¿Qué más querés saber sobre Barbi?","¡Genial! Si querés, elegí otro tema de acá abajo."],
    variantsEN: ["💛 Thank you! Shall we move on to another topic?","Great! What else would you like to know about Barbi?","Lovely! If you like, pick another topic below."],
    next: ["who_is_barbara","experience","talks"],
  },
  {
    id: "agile_after_agile",
    keywordsES: ["agile después del agile","agile despues del agile","nueva agilidad","futuro de agile","agile ya no sirve","cambiar ceremonias","iterar agile","evolucionar agile"],
    keywordsEN: ["agile after agile","new agility","future of agile","agile does not work","change ceremonies","iterate agile","evolve agile"],
    responseES: "Para Barbi, Agile resolvió un problema enorme: dejar de construir durante meses sin mirar la realidad.\n\nPero el contexto volvió a cambiar: hoy hay IA, nuevos roles, equipos distribuidos, DevOps, Design Systems, automatización y datos en tiempo real. Y aun así muchas organizaciones siguen ejecutando Agile casi igual que hace diez años.\n\nSu propuesta es simple: **aplicar Agile sobre Agile**. Inspeccionar también las ceremonias, los roles, los artefactos y las formas de decidir.\n\nLa frase que lo resume: **iteramos el producto, pero también hay que iterar el sistema con el que lo construimos**.",
    responseEN: "For Barbi, Agile solved a huge problem: stopping months of building without looking at reality.\n\nBut the context changed again: today there is AI, new roles, distributed teams, DevOps, Design Systems, automation and real-time data. And yet many organizations still run Agile almost exactly as they did ten years ago.\n\nHer proposal is simple: **apply Agile to Agile**. Inspect the ceremonies, roles, artifacts and ways of deciding too.\n\nThe line that sums it up: **we iterate the product, but we also have to iterate the system we build it with**.",
    next: ["what_not_to_do","methodology","speaker_story"],
    navLinks: [{"labelES":"→ Ver Ideas desde la trinchera","labelEN":"→ See Ideas From The Field","route":"/#news-start"}],
  },
  {
    id: "spec_driven_ai",
    keywordsES: ["spec driven","spec driven development","especificaciones ia","specs con ia","historias de usuario con ia","requirements ai","ai delivery","documentacion con ia","documentación con ia","agentes y especificaciones"],
    keywordsEN: ["spec driven","spec driven development","ai specifications","specs with ai","user stories with ai","requirements ai","ai delivery","documentation with ai","agents and specifications"],
    responseES: "Una de las cosas que Barbi más está explorando es cómo cambia el delivery cuando las especificaciones dejan de ser solo documentos para personas y pasan a ser también **contexto operativo para agentes de IA**.\n\nSpecs más claras pueden alimentar toda la cadena: producto → desarrollo → testing → documentación → automatización.\n\nEso cambia incluso la conversación sobre historias de usuario. Para ella, quizás el futuro no sea escribirlas más rápido con IA, sino dejar de pensar el proceso como una cadena de documentos manuales.",
    responseEN: "One of the things Barbi is exploring most is how delivery changes when specifications stop being only documents for people and also become **operational context for AI agents**.\n\nClearer specs can feed the whole chain: product → development → testing → documentation → automation.\n\nThat even changes the conversation about user stories. For her, maybe the future is not writing them faster with AI, but no longer thinking of the process as a chain of manual documents.",
    next: ["ai_agents","qa_product","ai_pm_role"],
  },
  {
    id: "ai_agents",
    keywordsES: ["agentes","agentes de ia","ai agents","agentes autonomos","agentes autónomos","agentic ai","workflows con ia","humano en el loop","human in the loop"],
    keywordsEN: ["agents","ai agents","autonomous agents","agentic ai","workflows with ai","human in the loop"],
    responseES: "A Barbi un agente no le interesa porque “hace cosas solo”, sino cuando puede ocupar un lugar concreto dentro de un flujo de trabajo: leer contexto → interpretar una especificación → ejecutar una tarea → validar → devolver evidencia.\n\nEstá experimentando bastante con agentes alrededor de producto, especificaciones y testing.\n\nPara ella, el desafío más interesante no es construir el agente, sino diseñar **qué puede decidir, qué contexto necesita, cuándo tiene que pedir ayuda y quién responde por el resultado**. Son preguntas muy parecidas a las de diseñar equipos humanos.",
    responseEN: "Barbi is not interested in an agent because it “does things on its own”, but when it can take a specific place within a workflow: read context → interpret a specification → execute a task → validate → return evidence.\n\nShe is experimenting quite a lot with agents around product, specifications and testing.\n\nFor her, the most interesting challenge is not building the agent, but designing **what it can decide, what context it needs, when it has to ask for help and who answers for the result**. They are very similar questions to those of designing human teams.",
    next: ["spec_driven_ai","qa_product","ai_without_strategy"],
  },
  {
    id: "three_amigos",
    keywordsES: ["three amigos","tres amigos","3 amigos","qa dev producto","producto desarrollo qa","refinamiento","refinamiento tecnico","refinamiento técnico","refinamiento funcional","definition ready","ready to dev"],
    keywordsEN: ["three amigos","3 amigos","qa dev product","product development qa","refinement","technical refinement","functional refinement","definition ready","ready to dev"],
    responseES: "A Barbi le gusta el concepto de **Three Amigos** porque resuelve un problema frecuente: descubrir demasiado tarde que cada disciplina entendió una cosa distinta.\n\nAntes de desarrollar, ella sentaría alrededor del mismo problema a **Producto o Negocio, Desarrollo y QA**, y según el caso, UX.\n\nNo para sumar otra ceremonia, sino para responder juntos qué se espera, qué puede fallar, cómo se va a construir y cómo se sabrá que está bien.\n\nSu idea de fondo: **la calidad empieza antes del código**.",
    responseEN: "Barbi likes the **Three Amigos** concept because it solves a common problem: discovering too late that each discipline understood something different.\n\nBefore development, she would sit **Product or Business, Development and QA** around the same problem, and UX depending on the case.\n\nNot to add another ceremony, but to answer together what is expected, what can fail, how it will be built and how we will know it is right.\n\nHer underlying idea: **quality starts before the code**.",
    next: ["qa_product","spec_driven_ai","speed_quality"],
  },
  {
    id: "qa_product",
    keywordsES: ["qa","calidad","quality assurance","testing","casos de prueba","casos qa","qa ownership","ambiente qa","qa desde origen","shift left testing","calidad temprana"],
    keywordsEN: ["qa","quality","quality assurance","testing","test cases","qa cases","qa ownership","qa environment","shift left testing","early quality"],
    responseES: "Durante mucho tiempo se trató a QA como una etapa. Barbi cree cada vez más que hay que tratarlo como una **capacidad del equipo**.\n\nSi los casos aparecen después de desarrollar, QA valida. Si aparecen mientras se entiende el problema, QA ayuda a diseñar. Esa diferencia cambia requisitos, casos borde, retrabajo, automatización y velocidad.\n\nPara ella, una historia realmente lista debería permitir que Producto, Desarrollo y QA entiendan qué comportamiento se está construyendo antes de empezar.\n\n**La calidad tardía es cara.**",
    responseEN: "For a long time QA was treated as a stage. Barbi increasingly believes it should be treated as a **team capability**.\n\nIf the cases appear after development, QA validates. If they appear while the problem is being understood, QA helps design. That difference changes requirements, edge cases, rework, automation and speed.\n\nFor her, a truly ready story should let Product, Development and QA understand which behavior is being built before starting.\n\n**Late quality is expensive.**",
    next: ["three_amigos","spec_driven_ai","speed_quality"],
  },
  {
    id: "speaker_story",
    keywordsES: ["primera conferencia","hablar en publico","hablar en público","agile summit uruguay","uruguay","como empezo a dar charlas","cómo empezó a dar charlas"],
    keywordsEN: ["first conference","public speaking","agile summit uruguay","uruguay","how she started speaking"],
    responseES: "Durante años Barbi construyó productos y lideró conversaciones puertas adentro. En 2026 empezó a llevar algunas de esas preguntas afuera.\n\nEn Uruguay dio su primera conferencia: **Agile después del Agile**, en Agile Summit Uruguay. La primera, y en otro país: empezar de a poco nunca fue demasiado lo suyo. 😅\n\nAhí descubrió algo que le encantó: convertir experiencias desordenadas en una idea que otra persona pueda llevarse y usar. Probablemente por eso hoy disfruta tanto enseñar y diseñar capacitaciones.",
    responseEN: "For years Barbi built products and led conversations behind closed doors. In 2026 she started taking some of those questions outside.\n\nIn Uruguay she gave her first conference talk: **Agile After Agile**, at Agile Summit Uruguay. Her first one, and in another country: starting small was never really her thing. 😅\n\nThere she discovered something she loved: turning messy experiences into an idea someone else can take away and use. That is probably why she now enjoys teaching and designing training so much.",
    next: ["agile_after_agile","talks","availability"],
    navLinks: [{"labelES":"→ Ver Ideas desde la trinchera","labelEN":"→ See Ideas From The Field","route":"/#news-start"}],
  },
]

export const clarifyES = 'No estoy seguro de haber entendido bien tu pregunta. ¿Va por alguno de estos temas?'
export const clarifyEN = 'I am not sure I understood your question. Is it about one of these topics?'

export const fallbackES = 'Para eso no tengo una respuesta preparada.\n\nSoy el guía del portfolio: respondo sobre Barbi, su trayectoria y sus ideas con respuestas ya escritas, así que no puedo improvisar.\n\nPodés probar con alguno de estos temas o **escribirle directo a Barbi**, que seguro te responde mejor que yo. 🙂'
export const fallbackEN = 'I do not have a prepared answer for that.\n\nI am the portfolio guide: I answer about Barbi, her career path and her ideas with pre-written answers, so I cannot improvise.\n\nYou can try one of these topics or **write to Barbi directly**, who will surely answer better than I can. 🙂'

export const defaultNext = ['who_is_barbara', 'experience', 'help_menu']

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

const generalIntents = new Set(['greeting', 'who_is_barbara', 'experience', 'projects', 'help_menu'])
const stopwordsES = new Set('a al algo como con cual cuales cuando de del donde el ella en es esta este esto hace hay la las le lo los me mi mis muy no o para por que quien se si sobre su sus te tiene tu un una uno y ya barbi barbara'.split(' '))
const stopwordsEN = new Set('a about an and are at be by can could did do does for from has have her hers how i in is it me my of on or she that the their they this to was what when where which who why with would you your barbi barbara'.split(' '))

export interface IntentResolution {
  /** Intención elegida, si la coincidencia es suficientemente clara. */
  intent: AssistantIntent | null
  /** Si no hay una elegida pero sí coincidencias débiles, los temas posibles para preguntar. */
  candidates: AssistantIntent[]
}

export function resolveIntent(input: string, isEnglish: boolean, lastIntentId?: string): IntentResolution {
  const normalized = normalize(input)
  const words = normalized.split(' ').filter(Boolean)

  if (lastIntentId && words.length <= 5) {
    const followUps = isEnglish ? followUpPatternsEN : followUpPatternsES
    const isFollowUp = followUps.some(p => normalized.includes(normalize(p)))
    if (isFollowUp && prevContext[lastIntentId]) {
      const prev = intents.find(i => i.id === prevContext[lastIntentId])
      if (prev) return { intent: prev, candidates: [] }
    }
  }

  if (words.length <= 3) {
    const shortYes = isEnglish ? ['yes', 'ok', 'okay'] : ['si', 'ok', 'okey']
    const ackIntent = intents.find(i => i.id === 'short_ack')
    if (ackIntent) {
      const kwList = isEnglish ? ackIntent.keywordsEN : ackIntent.keywordsES
      if (kwList.some(kw => words.includes(normalize(kw))) || shortYes.some(kw => words.includes(kw))) return { intent: ackIntent, candidates: [] }
    }
  }

  const synonymMap = isEnglish ? synonymsEN : synonymsES
  let expanded = normalized
  for (const [word, replacement] of Object.entries(synonymMap)) {
    if (words.includes(normalize(word))) expanded += ' ' + normalize(replacement)
  }
  const expandedWords = expanded.split(' ').filter(Boolean)

  // Puntaje por intención. Para desempatar gana la coincidencia más específica:
  // la frase clave más larga y, después, la mayor cantidad de claves encontradas.
  const ranked: { intent: AssistantIntent; score: number; longest: number; hits: number }[] = []
  for (const intent of intents) {
    if (intent.id === 'short_ack') continue
    const keywords = isEnglish ? intent.keywordsEN : intent.keywordsES
    let score = 0
    let longest = 0
    let hits = 0
    const seen = new Set<string>()
    for (const kw of keywords) {
      const normKw = normalize(kw)
      // "métricas" y "metricas" son la misma clave una vez normalizadas: se cuenta una sola vez
      if (seen.has(normKw)) continue
      seen.add(normKw)
      const kwWords = normKw.split(' ').filter(Boolean)
      const matched = kwWords.length === 1 && normKw.length <= 4
        ? expandedWords.includes(normKw)
        : expanded.includes(normKw)
      if (!matched) continue
      score += kwWords.length
      longest = Math.max(longest, kwWords.length)
      hits += 1
    }
    if (score > 0) ranked.push({ intent, score, longest, hits })
  }
  ranked.sort((a, b) => b.score - a.score || b.longest - a.longest || b.hits - a.hits)
  if (!ranked.length) return { intent: null, candidates: [] }

  // Un tema general ("quién es", "experiencia") cede ante uno específico que también coincidió.
  let best = ranked[0]
  if (generalIntents.has(best.intent.id)) {
    const specific = ranked.find(r => !generalIntents.has(r.intent.id))
    if (specific) best = specific
  }
  // Una sola palabra suelta alcanza si la pregunta es corta; en una pregunta larga es una señal débil.
  const stopwords = isEnglish ? stopwordsEN : stopwordsES
  const contentWords = words.filter(w => !stopwords.has(w))
  const confident = best.score >= 2 || contentWords.length <= 3
  if (confident) return { intent: best.intent, candidates: [] }
  return { intent: null, candidates: ranked.slice(0, 3).map(r => r.intent) }
}

export function matchIntent(input: string, isEnglish: boolean, lastIntentId?: string): AssistantIntent | null {
  return resolveIntent(input, isEnglish, lastIntentId).intent
}
