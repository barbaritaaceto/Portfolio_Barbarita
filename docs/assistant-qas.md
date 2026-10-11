# Bocconcino: mapa de preguntas y respuestas

Fuente: `src/data/assistant.ts` (datos y lógica de coincidencia) y `src/components/AIAssistant.tsx` (interfaz). Este documento se genera a partir de esos archivos; si cambian, hay que regenerarlo.

## Qué es

Bocconcino es el guía del portfolio. Responde sobre Barbi en tercera persona con **45 respuestas escritas a mano**. No usa un modelo de IA: elige la respuesta comparando el mensaje con las palabras clave de cada intención.

## Cómo elige una respuesta

1. Detecta el idioma del mensaje (español o inglés); si no puede, usa el del sitio.
2. Si es un "¿y antes?" corto después de hablar de una etapa laboral, salta a la etapa anterior.
3. Si es un "sí" u "ok" suelto, responde con un acuse.
4. Suma sinónimos y le pone puntaje a cada intención: 1 punto por palabra clave y 1 punto por cada palabra de una frase clave. La misma palabra con y sin acento cuenta una sola vez.
5. Gana la de más puntos; si empatan, la de la frase más específica. Un tema general cede ante uno específico que también coincidió.
6. Si la coincidencia es clara (2 puntos o más, o una pregunta de hasta 3 palabras con contenido), responde. Si es dudosa, pregunta por el tema mostrando hasta 3 opciones. Si no hay ninguna, prueba en el otro idioma y, si tampoco, dice que no tiene respuesta y ofrece escribirle a Barbi.

Las preguntas dudosas o sin respuesta se registran en Google Analytics como evento `ai_fallback` (texto recortado a 100 caracteres).

## Intenciones

### 👥 Equipo trabado (`team_not_delivering`)

**Palabras clave (ES):** mi equipo no esta entregando, mi equipo no está entregando, equipo no entrega, equipo trabado, no llegamos, no cumplen, no entregamos, delivery trabado, delivery lento, no estamos entregando

**Respuesta:**

> Antes de pedir más velocidad, Barbi trataría de entender **a qué le estamos llamando “problema de delivery”**.
>
> Puede ser muchas cosas: demasiado trabajo abierto, historias mal definidas, decisiones que nadie toma, dependencias externas, QA como cuello de botella, prioridades que cambian todo el tiempo o deuda técnica.
>
> Su primer paso sería hacer visible el sistema: **qué entra, dónde espera, dónde vuelve para atrás y quién tiene que decidir para que avance**.
>
> Para ella, muchas veces la velocidad es el síntoma, no la causa.

**Sugiere después:** Ambigüedad, Velocidad y calidad, Alineación

### 🚀 Validar producto (`product_idea_validation`)

**Palabras clave (ES):** tengo una idea, idea de producto, validar idea, vale la pena construir, vale la pena construirla, como validar, cómo validar, validarias, validar si vale, pregunta antes de construir, que pregunta deberia hacer antes de construir, qué pregunta debería hacer antes de construir

**Respuesta:**

> A Barbi le gustan las ideas, y más todavía cuando sobreviven al contacto con la realidad.
>
> Antes de construir, ella preguntaría: **¿qué tendría que ser verdad para que esta idea valga la pena?**
>
> Después buscaría la forma más barata de comprobarlo, que no siempre es código: un prototipo, cinco conversaciones, una landing, datos que ya existen o hacer a mano durante una semana lo que después se automatizaría.
>
> Su objetivo no es demostrar que la idea es buena, sino encontrar rápido **por qué podría estar equivocada**.

**Sugiere después:** Métricas, Metodología, Cómo piensa

### 🤖 IA y rol PM (`ai_pm_role`)

**Palabras clave (ES):** como cambia la ia el rol, cómo cambia la ia el rol, rol de product manager, rol del pm, ia cambia pm, ai cambia producto, futuro del product manager

**Respuesta:**

> Para Barbi, la IA no achica el rol de Producto: **le saca escondites**.
>
> Escribir documentos, resumir reuniones, ordenar research o armar alternativas es cada vez más rápido. Entonces queda más expuesto lo difícil: elegir qué problema importa, hacer buenas preguntas, conectar señales contradictorias, entender el negocio, conversar con tecnología y decidir con información incompleta.
>
> La IA puede producir veinte opciones en segundos. Para ella, el desafío sigue siendo saber **cuál no construir**.

**Sugiere después:** IA y trabajo, IA con criterio, Aprendizaje

### 🏦 Producto financiero (`financial_products_learning`)

**Palabras clave (ES):** productos financieros, aprendiste construyendo productos financieros, financiero, financieros, regulacion, regulación, compliance

**Respuesta:**

> La banca le enseñó a Barbi que **algo puede funcionar perfecto y aun así ser un mal producto**.
>
> En productos financieros no alcanza con que la pantalla responda: tiene que haber confianza, trazabilidad, seguridad, operación, regulación, soporte y claridad. Y casi nunca se diseña sobre una hoja en blanco: hay legacy, varios sistemas, compliance y decisiones que cruzan muchas áreas.
>
> Eso cambió su manera de hacer producto: dejó de pensar solo en “el usuario” y empezó a pensar en **el sistema completo que tiene que sostener esa experiencia**.

**Sugiere después:** Banca digital, Métricas, Alineación

### ⚖️ Velocidad y calidad (`speed_quality`)

**Palabras clave (ES):** velocidad y calidad, velocidad o calidad, equilibrar velocidad, balancear velocidad, rapido y bien, rápido y bien, calidad vs velocidad, speed quality

**Respuesta:**

> Barbi tiene una pequeña pelea con esta pregunta, porque supone que velocidad y calidad siempre compiten.
>
> A veces sí. Pero muchas veces lo que hace lento a un equipo es **la mala calidad del sistema de trabajo**: requisitos ambiguos, demasiadas cosas abiertas, QA tardío, decisiones pendientes y dependencias sin dueño. Eso genera retrabajo, y el retrabajo es carísimo.
>
> Para ella, moverse rápido no es hacer más: es acortar el tiempo entre **pregunta → decisión → evidencia → aprendizaje**.
>
> Si el riesgo es alto, suma control. Si la incertidumbre es alta, achica el alcance.

**Sugiere después:** Validar producto, Equipo trabado, Qué evitar

### 🌫️ Ambigüedad (`ambiguity_leadership`)

**Palabras clave (ES):** contextos ambiguos, ambiguedad, ambigüedad, liderar en ambiguo, lideras en contextos, liderás en contextos, incertidumbre, no hay claridad

**Respuesta:**

> A Barbi la ambigüedad no le molesta demasiado. Le preocupa cuando se hace de cuenta que no existe.
>
> En contextos inciertos intenta separar tres cosas: **lo que sabemos, lo que creemos y lo que todavía hay que descubrir**.
>
> Cuando eso no está explícito, negocio, UX, tecnología y liderazgo rellenan los huecos con versiones distintas de la realidad, y aparecen discusiones que parecen de solución pero en realidad son de contexto.
>
> Para ella, liderar en la ambigüedad no es tener todas las respuestas: es lograr que el equipo avance **sin inventarse certezas**.

**Sugiere después:** Alineación, Liderazgo, Equipo trabado

### 🧩 Alineación (`misaligned_stakeholders`)

**Palabras clave (ES):** stakeholders desalineados, stakeholders, negocio y tecnologia, negocio y tecnología, areas desalineadas, áreas desalineadas, nadie decide, no se ponen de acuerdo, conflicto entre negocio, alineacion, alineación

**Respuesta:**

> Si negocio y tecnología no se ponen de acuerdo, sumar otra reunión no sería la primera elección de Barbi. 😅
>
> Ella intentaría descubrir **qué está optimizando cada uno**: negocio quizá mira time-to-market; tecnología, estabilidad; compliance, riesgo; UX, experiencia; operaciones, sostenibilidad. Y probablemente todos tengan una parte de razón.
>
> Para ella, el trabajo de Producto no es elegir un ganador, sino construir una decisión donde esos costos sean visibles.
>
> Muchas veces el desacuerdo se disuelve al explicitar: **objetivo + restricciones + trade-offs + quién decide**.

**Sugiere después:** Ambigüedad, Métricas, Proyectos

### 🗺️ Roadmap (`roadmap_chaos`)

**Palabras clave (ES):** roadmap caotico, roadmap caótico, roadmap desordenado, roadmap no se cumple, muchas prioridades, prioridades cambiantes, todo es urgente, no se que priorizar, no sé qué priorizar, todo es prioridad

**Respuesta:**

> Para Barbi, cuando todo es prioridad el roadmap no está lleno: **está roto el sistema de decisión**.
>
> Ella empezaría preguntando quién puede decir que no. Si cada pedido entra, ningún compromiso viejo sale y todas las áreas pueden declarar algo “urgente”, ningún framework de priorización alcanza.
>
> Después separaría lo que mantiene vivo el negocio, lo que reduce riesgo, lo que genera crecimiento y lo que genera aprendizaje, y pondría la capacidad real al lado.
>
> Una priorización sin capacidad es una wishlist. Y un roadmap sin renuncias no es estrategia.

**Sugiere después:** Métricas, Alineación, Qué evitar

### 🤖 IA con criterio (`ai_without_strategy`)

**Palabras clave (ES):** ia sin estrategia, implementar ia, adoptar ia, usar ia en la empresa, queremos usar ia, integrar ia, automatizar con ia, ai sin estrategia, quiero aplicar ia, quiero meter ia, por donde empiezo con ia, por dónde empiezo con ia

**Respuesta:**

> Barbi no empezaría por Claude, ChatGPT, Copilot ni por “necesitamos un agente”.
>
> Empezaría por una pregunta: **¿qué parte de nuestro trabajo hoy es innecesariamente difícil?**
>
> Después distinguiría trabajo repetitivo, búsqueda y síntesis, generación, decisión, conocimiento y coordinación, y recién ahí evaluaría dónde la IA aumenta capacidad de verdad. Porque automatizar un proceso roto solo consigue **romperlo más rápido**.
>
> Su forma favorita de empezar: un caso chico, frecuente y medible, con una persona en el loop. Primero aprender, después escalar.

**Sugiere después:** Visión sobre IA, Aprendizaje, IA y rol PM

### ⛔ Qué evitar (`what_not_to_do`)

**Palabras clave (ES):** que no haria, qué no haría, errores evitar, que evitar, qué evitar, malas practicas, malas prácticas

**Respuesta:**

> Algunas cosas que Barbi intenta evitar:
>
> - construir porque alguien importante tuvo una idea;
> - confundir estar ocupados con avanzar;
> - meter IA para poder decir que se usa IA;
> - llenar dashboards sin saber qué decisión van a cambiar;
> - usar Agile como religión;
> - abrir diez iniciativas con capacidad para tres;
> - esconder incertidumbre detrás de estimaciones prolijas;
> - llamar “problema del equipo” a un problema del sistema.
>
> Y una más: **no defendería una metodología por encima de la evidencia**. Si dejó de ayudar, hay que cambiarla.

**Sugiere después:** Velocidad y calidad, IA y trabajo, Cómo piensa

### 📊 Métricas (`metrics_decision`)

**Palabras clave (ES):** metricas, métricas, que metricas, qué métricas, medir impacto, measurement, kpi, okrs, datos, data

**Respuesta:**

> Antes de pedir un dashboard, Barbi preguntaría: **¿qué decisión queremos tomar distinto después de mirar estos datos?** Si no hay respuesta, probablemente todavía no hace falta la métrica.
>
> Le interesa combinar tres tipos de señal:
>
> **Resultado:** qué cambió para el usuario o el negocio.
> **Salud:** qué costo, riesgo o fricción se generó.
> **Aprendizaje:** qué se entiende ahora que antes no.
>
> Para ella los datos ayudan muchísimo, pero una organización data-driven sin criterio puede equivocarse con una precisión espectacular.

**Sugiere después:** Validar producto, Producto financiero, Aprendizaje

### 🔁 Aprendizaje (`organizational_learning`)

**Palabras clave (ES):** aprendizaje organizacional, organizacion aprende, organización aprende, convertir informacion, convertir información, notebooklm, notebook llm, conocimiento accionable, decisiones y aprendizaje

**Respuesta:**

> A Barbi NotebookLM le interesa menos por la herramienta y más por el problema que deja en evidencia: **las organizaciones producen muchísimo conocimiento y recuerdan muy poco**.
>
> Decisiones enterradas en reuniones, research perdido en Drive, documentación que nadie vuelve a abrir y personas que se van con el contexto.
>
> Herramientas así permiten conversar con ese conocimiento, comparar fuentes y recuperar contexto. Pero, para ella, la tecnología sola no crea aprendizaje organizacional.
>
> El ciclo que le interesa es: **información → síntesis → decisión → resultado → aprendizaje reutilizable**.

**Sugiere después:** IA y trabajo, Métricas, Cómo piensa

### 🧠 Cómo piensa (`thinking`)

**Palabras clave (ES):** como piensa, cómo piensa, forma de pensar, criterio, decide, decidir, mirada, enfoque, pensamiento, barbara piensa, barbi piensa, todo esta desordenado

**Respuesta:**

> Barbi tiene una tendencia marcada: cuando algo parece un problema simple, intenta descubrir **qué sistema hay detrás**.
>
> Si un equipo está lento, no mira solo velocity. Si un usuario abandona, no mira solo conversión. Si dos áreas discuten, no mira solo quién tiene razón. Si aparece IA, no mira primero la herramienta.
>
> Le interesa entender **qué está pasando, por qué ahora, qué tensiones existen y qué decisión puede mover el sistema**. Y después lo prueba contra la realidad.
>
> Su forma de trabajar combina **curiosidad para entender y pragmatismo para mover**.

**Sugiere después:** Validar producto, Equipo trabado, IA y rol PM

### 👋 Hola (`greeting`)

**Palabras clave (ES):** hola, buenas, buen dia, buenos dias, hey, saludos, como estas, que tal

**Respuesta:**

> ¡Hola! 👋 Soy Bocconcino, el guía de este portfolio.
>
> Tengo respuestas preparadas sobre Barbi: quién es, su trayectoria, cómo trabaja y qué piensa sobre producto, IA y liderazgo.
>
> Elegí un tema de acá abajo o escribime tu pregunta.

**Variantes:** 2

**Sugiere después:** Sobre Barbi, Trayectoria, IA y trabajo

### 👩‍💼 Sobre Barbi (`who_is_barbara`)

**Palabras clave (ES):** quien, quién, barbara, barbi, que hace, qué hace, de que trata, presentate, quien sos, quien es

**Respuesta:**

> Barbi pasó por una mezcla poco prolija, y bastante útil, de marketing, datos, growth, e-commerce, banca, tecnología, producto, liderazgo e IA.
>
> Hace más de una década que construye productos digitales y conecta mundos que suelen hablar idiomas distintos: **negocio, tecnología, UX, datos, operación y personas**.
>
> Hoy le interesa especialmente una pregunta: **¿cómo cambia la forma de construir productos y organizaciones cuando la IA deja de ser una herramienta y empieza a ser parte del equipo?**
>
> También da charlas, enseña, experimenta y escribe sobre eso.

**Variantes:** 2

**Sugiere después:** Cómo piensa, Trayectoria, Diferenciador

### 📋 Trayectoria (`experience`)

**Palabras clave (ES):** experiencia, trayectoria, anos, años, background, carrera, trabajos, historia, recorrido

**Respuesta:**

> El recorrido de Barbi se entiende mejor por problemas que por cargos.
>
> Empezó en **SEO y performance**, viendo cómo pequeños cambios alteran el comportamiento. Con **growth y publicidad digital** aprendió experimentación, adquisición y datos. En **insurtech** entendió que el producto también vive en operaciones, ventas y atención.
>
> En **e-commerce de escala regional** vio equipos con autonomía real y enorme capacidad de ejecutar. En **banca** aparecieron regulación, legacy y sistemas complejos. Después todo se mezcló con **consultoría, liderazgo, delivery e IA**.
>
> El hilo no fue una industria: fue aprender a **convertir complejidad en producto y dirección**.

**Sugiere después:** Banca digital, E-commerce, Cómo piensa

**Link:** → Ver Trayectoria (/#trayectoria)

### 🏦 Banca digital (`banking_experience`)

**Palabras clave (ES):** banca, banco, bancaria, bancario, banca digital, banca corporativa, corporate banking, onboarding, cobranzas, pagos, legacy, servicios financieros

**Respuesta:**

> La banca fue una etapa clave para Barbi, porque el producto dejó de ser solo experiencia y negocio y pasó a ser **sistema**.
>
> Trabajó varios años alrededor de cobranzas, pagos y onboarding de empresas, entre otros desafíos de servicios financieros. Había usuarios, tecnología, legacy, seguridad, compliance, riesgo, operación y muchas áreas decidiendo sobre el mismo flujo.
>
> De ahí se llevó algo que todavía usa: **una buena experiencia no se diseña ignorando la complejidad; se diseña absorbiéndola**.

**Sugiere después:** Producto financiero, E-commerce, Agile después del Agile

### 🛍️ E-commerce (`ecommerce_experience`)

**Palabras clave (ES):** ecommerce, e-commerce, marketplace, sellers, vendedores, marketing inteligente, publicidad digital, integraciones, alto rendimiento

**Respuesta:**

> La etapa de e-commerce fue para Barbi la prueba de que los equipos de alto rendimiento no son una slide de consultoría: existen.
>
> Trabajó en productos para sellers, growth, marketing inteligente, integraciones con plataformas publicitarias y experimentación. Pero su mayor aprendizaje no fue una funcionalidad: fue vivir un entorno con mucho contexto, autonomía, excelencia técnica y gente muy comprometida.
>
> Ahí entendió algo que volvió a aparecer en toda su carrera: **Agile funciona mucho mejor como cultura que como ceremonia**.

**Sugiere después:** Growth, Liderazgo, Agile después del Agile

### 📈 Growth (`insurtech_growth`)

**Palabras clave (ES):** insurtech, seguros, growth, adquisicion, adquisición, sem, funnel, conversion, conversión, ventas, call center, operacion, operación

**Respuesta:**

> En insurtech la mirada de Barbi se hizo bastante más amplia.
>
> Entró desde Growth: adquisición, SEO/SEM, funnels, conversión y experimentación. Pero el producto real cruzaba Comunicación, Tecnología, Call Center, Ventas, RRHH y operación.
>
> Trabajar tan cerca de mundos distintos le enseñó algo central: **cada área ve una parte verdadera del problema**. Para ella, la calidad aparece cuando esas miradas conversan en lugar de competir.

**Sugiere después:** Inicios, Diferenciador, Liderazgo

### 🔎 Inicios (`early_career`)

**Palabras clave (ES):** primeros trabajos, inicios, seo, performance, marketing digital, antes de producto, cuentas, anunciantes

**Respuesta:**

> Antes de llamarlo Producto, Barbi ya estaba obsesionada con entender el comportamiento.
>
> Empezó en SEO: búsquedas, intención y pequeños cambios capaces de modificar muchísimo cómo una persona encuentra algo. Después trabajó en estrategia digital, performance y crecimiento de cuentas para anunciantes.
>
> Ahí convivió con cantidades enormes de datos y aprendió una lección que todavía usa: **tener datos no significa saber qué hacer**.

**Sugiere después:** Trayectoria, Métricas, Formación

### 🎓 Formación (`education`)

**Palabras clave (ES):** formacion, formación, estudios, educacion, educación, certificaciones, certificacion, certificación, uade, mit, producthub, ai first, leadership agility, data analytics

**Respuesta:**

> La formación de Barbi empezó en Relaciones Públicas e Institucionales, que con el tiempo resultó tener mucho que ver con Producto: comunicación, stakeholders, comportamiento y organizaciones.
>
> Después fue armando una formación híbrida entre producto, liderazgo, datos y tecnología. Entre sus focos más recientes están **MIT xPRO — Designing and Building AI Products and Services**, **AI First Product Management**, Claude y Claude Code, Leadership Agility y Data Analytics.
>
> Pero su formación más constante es otra: **construir, probar algo nuevo y obligarse a entender cómo funciona**.

**Sugiere después:** Herramientas, Metodología, Cómo piensa

### 🧭 Trabajo actual (`current_work`)

**Palabras clave (ES):** que hace hoy, hace hoy, actualmente, actual, trabaja ahora, trabaja hoy, donde trabaja, dónde trabaja, consultoria, consultoría, actualmente, hoy trabaja, arquitectura, asistentes

**Respuesta:**

> Hoy el rol de Barbi es bastante más amplio que “hacer producto”.
>
> Trabaja en contextos complejos donde conviven delivery, equipos, clientes, tecnología, UX, QA, arquitectura, liderazgo y negocio.
>
> También es donde más experimenta con IA aplicada al trabajo real: agentes, asistentes, generación de especificaciones, automatización de testing y nuevas formas de discovery.
>
> Esa mezcla conecta con las preguntas que hoy más le interesan: **cómo se lideran equipos aumentados por IA, qué se deja de hacer a mano y qué se vuelve todavía más humano**.

**Sugiere después:** Agentes de IA, Specs con IA, QA y producto

### 🤖 IA y trabajo (`ai_product`)

**Palabras clave (ES):** ai, ia, inteligencia artificial, llm, llms, gpt, copilot, prompting, machine learning, humanos y algoritmos, humanos ia, algoritmos, chatgpt, openai, …

**Respuesta:**

> “Humanos + IA” nace de una incomodidad de Barbi.
>
> Durante mucho tiempo se habló de IA preguntando qué tareas puede hacer la máquina. A ella le interesa cada vez más la otra mitad: **¿qué deberíamos hacer mejor nosotros ahora que la máquina puede hacer todo esto?**
>
> Mejor contexto, mejores preguntas, mejor criterio, más curiosidad y más aprendizaje.
>
> No piensa la IA como reemplazo del humano ni como copiloto mágico, sino como una nueva pieza dentro del sistema de trabajo. Y cuando se suma una pieza tan potente, cambia todo el resto.

**Sugiere después:** IA y rol PM, Agentes de IA, Aprendizaje

### ❤️ Liderazgo (`leadership`)

**Palabras clave (ES):** liderazgo, liderar, lidera, equipo, equipos, gestión, gestion, manage, management, cultura, colaboracion, colaboración, squad, squads, …

**Respuesta:**

> Liderar le resultó a Barbi bastante distinto de lo que imaginaba.
>
> Pensaba que tenía que tener más respuestas, y terminó aprendiendo que muchas veces su trabajo es **crear las condiciones para que otras personas las encuentren**.
>
> Para ella eso significa dar contexto, hacer visibles las tensiones, ayudar a priorizar, proteger el foco, decir verdades incómodas temprano y generar la confianza para que alguien pueda decir “esto no está funcionando”.
>
> Intenta equilibrar dos cosas que viven en tensión: **cuidar a las personas y cuidar el resultado**. ❤️

**Sugiere después:** Equipo trabado, Ambigüedad, Velocidad y calidad

### 🎯 Metodología (`methodology`)

**Palabras clave (ES):** discovery, delivery, roadmap, priorizar, priorización, metodologia, metodología, proceso, agile, agil, ágil, scrum, sprint, iteracion, …

**Respuesta:**

> Barbi no tiene demasiado apego a una metodología en particular. Tiene apego a algunas preguntas: **qué problema se resuelve, para quién, qué evidencia hay, qué se está asumiendo, qué riesgo se toma y cómo se sabrá si funcionó**.
>
> Después puede usar discovery, story mapping, experimentos, métricas, Scrum, Kanban, prototipos, IA o una pizarra con post-its.
>
> Para ella el framework es una herramienta. El objetivo es que el equipo pase de **incertidumbre → decisión → ejecución → aprendizaje**, y que lo haga cada vez mejor.

**Sugiere después:** Validar producto, Velocidad y calidad, Métricas

### 🛠️ Herramientas (`tools_stack`)

**Palabras clave (ES):** herramientas, figma, jira, azure devops, notion, miro, confluence, amplitude, mixpanel, ga4, gtm, google tag manager, hotjar, looker, …

**Respuesta:**

> El stack de Barbi cambia mucho según el contexto.
>
> Para producto y colaboración suele usar **Jira o Azure DevOps, Confluence, Miro o FigJam, Figma y Google Workspace**. Para datos: **Analytics, Tag Manager, dashboards y Sheets**.
>
> Hoy gran parte de su exploración está en IA: **ChatGPT, Claude, Claude Code, NotebookLM, Gemini, Copilot** y herramientas de desarrollo asistido.
>
> Pero tiene una regla simple: **no le interesa coleccionar herramientas**, sino qué capacidad nueva habilitan.

**Sugiere después:** Metodología, IA y trabajo, Proyectos

### 💳 Fintech (`fintech`)

**Palabras clave (ES):** fintech, pagos digitales, transformacion digital, transformación digital, cobro digital, aseguradora, medios de pago, sector financiero, onboarding digital

**Respuesta:**

> Barbi trabajó varios años alrededor de banca, pagos, cobranzas, onboarding, insurtech y canales digitales.
>
> Si tuviera que resumir qué hace distintos a estos productos, diría: **la confianza forma parte de la UX**.
>
> Seguridad, regulación, trazabilidad, disponibilidad y operación no son temas “de atrás”: el usuario los siente aunque nunca vea una arquitectura ni una regla de compliance. Eso obliga a construir producto mirando el sistema completo.

**Sugiere después:** Banca digital, Métricas, Producto financiero

### 🚀 Proyectos (`projects`)

**Palabras clave (ES):** proyectos, casos, ver, portfolio, portafolio, case study, case studies, trabajo, ejemplos, que construyo, qué construyó

**Respuesta:**

> En la trayectoria de Barbi hay proyectos muy distintos: **banca digital y corporate banking**, **e-commerce y growth**, **IA aplicada**, **transformación de equipos** e **ideas que terminaron en charlas**.
>
> En cada caso, lo que intenta mostrar no es solo **qué se construyó**, sino **qué problema había, qué se decidió y qué aprendió**.
>
> Podés recorrer cada etapa en la sección Trayectoria.

**Sugiere después:** Banca digital, E-commerce, IA y trabajo

**Link:** → Ver Trayectoria (/#trayectoria)

### 📩 Contacto (`contact_cv`)

**Palabras clave (ES):** contacto, contactar, email, mail, cv, curriculum, descargar, linkedin, one sheet, onesheet, whatsapp, llamar, llamada, escribirle, …

**Respuesta:**

> Si algo de lo que viste acá te disparó una conversación, lo mejor es escribirle directo a Barbi.
>
> **LinkedIn:** Barbara Aceto
> **Email:** aceto.barbara@gmail.com
>
> Un consejo: contale primero **qué problema estás intentando resolver**. Suele ser el comienzo de una conversación mucho más interesante. 🙂

**Sugiere después:** Conversar con Barbi, Trayectoria, Sobre Barbi

**Link:** → Ver su perfil (/one-sheet)

**Botón de contacto:** sí

### ✨ Motivación (`motivation`)

**Palabras clave (ES):** motiva, motivacion, motivación, te gusta, le gusta, disfruta, por que hace, por qué hace, pasion, pasión, que le apasiona, qué le apasiona

**Respuesta:**

> Hay un momento del trabajo que a Barbi le encanta: cuando algo que parecía un lío enorme empieza a tener forma.
>
> Cuando el equipo entiende el problema, aparecen palabras en común, una discusión eterna se vuelve una decisión, o alguien que pedía permiso para todo empieza a decidir solo.
>
> Lo que la desgasta: **reuniones sin decisión, frameworks por inercia, política organizacional disfrazada de proceso y estrategia que nunca llega a producción**.

**Sugiere después:** Liderazgo, Diferenciador, Desafío

### 💡 Visión sobre IA (`ai_opinion`)

**Palabras clave (ES):** opinion, opinión, futuro, robots, reemplazar, automatizacion, automatización, perder trabajo, reemplaza, ai reemplaza, inteligencia artificial reemplaza, que piensa, qué piensa, vision, …

**Respuesta:**

> Para Barbi, la discusión más interesante no es si “la IA va a reemplazar personas”.
>
> La transformación ya empezó: está cambiando cómo buscamos, escribimos, analizamos, programamos, diseñamos y aprendemos.
>
> La pregunta que le parece relevante es: **¿qué hacemos con la capacidad que acaba de quedar liberada?** Se puede usar para producir diez veces más cosas, o para pensar mejor, probar más y resolver problemas que antes eran demasiado caros. A ella le interesa mucho más lo segundo.
>
> La IA amplifica capacidad, y también mediocridad. Por eso cree que el criterio humano importa más, no menos.

**Sugiere después:** IA y trabajo, Aprendizaje, IA con criterio

### 🎙️ Charlas (`talks`)

**Palabras clave (ES):** talks, charlas, speaker, conferencia, conferencias, cursos, workshop, workshops, ensenar, enseñar

**Respuesta:**

> Las charlas de Barbi suelen empezar con algo que la incomoda.
>
> **Agile después del Agile** nació de una pregunta: si cambiaron la tecnología, los equipos, los productos y la velocidad del contexto, **¿por qué seguimos trabajando exactamente igual?** Su conclusión: iteramos el producto; quizás también deberíamos iterar el sistema con el que lo construimos.
>
> En su curso **Humanos + Algoritmos** la pregunta es otra: si la IA puede hacer cada vez más, **¿qué necesitamos aprender nosotros?**
>
> No le interesa que la gente salga diciendo “qué interesante”. Prefiere que salga pensando: **“mañana voy a cambiar algo”**.

**Sugiere después:** Agile después del Agile, IA y trabajo, Conversar con Barbi

**Link:** → Ver Ideas desde la trinchera (/#news-start)

### 📝 Notas & Prensa (`notes_press`)

**Palabras clave (ES):** notas, nota, articulos, artículos, articulo, escribe, escrito, publica, reflexiones, contenido, prensa, noticias, women in tech, mujeres en tech, …

**Respuesta:**

> Barbi escribe principalmente para pensar.
>
> Muchas notas empiezan con algo que vivió, algo que salió mal, una conversación o una idea que todavía no tiene resuelta. Los temas se repiten: **Producto, IA, equipos, liderazgo, Agile y aprendizaje**.
>
> El hilo común es otro: cómo seguir construyendo cosas valiosas en un contexto que cambia cada vez más rápido.
>
> No escribe desde tener todas las respuestas, sino desde **estar buscando mejores preguntas**.

**Sugiere después:** IA y trabajo, Liderazgo, Metodología

**Link:** → Ver Notas (/#news-start)

### ⚡ Desafío (`challenge`)

**Palabras clave (ES):** desafio, desafío, reto, problema complejo, dificil, difícil, mas complejo, más complejo, caso complejo, situacion dificil, situación difícil, problema dificil, problema difícil

**Respuesta:**

> Yo soy el guía del portfolio y trabajo con respuestas ya escritas, así que no puedo analizar tu caso puntual. Pero sí te puedo contar cómo lo encararía Barbi.
>
> Antes de buscar soluciones, ella haría cinco preguntas:
>
> **1. ¿Qué está pasando?**
> **2. ¿Por qué es un problema ahora?**
> **3. ¿Quiénes están involucrados?**
> **4. ¿Qué intentaron?**
> **5. ¿Qué decisión está trabada?**
>
> Después separaría síntomas, causas, tensiones y restricciones. Si querés pensarlo con ella, escribile.

**Sugiere después:** Cómo piensa, Alineación, Equipo trabado

**Botón de contacto:** sí

### 🤝 Conversar con Barbi (`availability`)

**Palabras clave (ES):** trabajar juntos, trabajar con ella, trabajar con barbi, disponible, disponibilidad, busca trabajo, open to work, contratar, contratarla, trabajo nuevo, buscando trabajo, oportunidad, oportunidades, entrevistar, …

**Respuesta:**

> Barbi hoy no está buscando trabajo: está en **redbee**. 🙂
>
> Lo que sí le gusta es conversar. Está abierta a hablar sobre **charlas, workshops y capacitaciones**, o simplemente a intercambiar ideas sobre producto, IA y equipos.
>
> Su consejo: contale qué te está dando vueltas, sin necesidad de un brief perfecto. El resto se construye en la conversación.

**Sugiere después:** Metodología, Contacto, Ubicación

**Link:** → Ver su perfil (/one-sheet)

**Botón de contacto:** sí

### 📍 Ubicación (`location_remote`)

**Palabras clave (ES):** donde vive, dónde vive, donde esta, dónde está, ubicacion, ubicación, pais, país, ciudad, argentina, buenos aires, remoto, hibrido, híbrido, …

**Respuesta:**

> Barbi está en **Buenos Aires, Argentina (UTC-3)** y trabaja con equipos locales, regionales y distribuidos.
>
> Puede trabajar remoto, híbrido o presencial según el proyecto.
>
> Idiomas:
> **Español:** nativo
> **Inglés:** profesional
> **Italiano:** en aprendizaje
>
> Para proyectos internacionales, el trabajo remoto le resulta totalmente natural.

**Sugiere después:** Conversar con Barbi, Contacto, Metodología

### ⭐ Diferenciador (`differentiator`)

**Palabras clave (ES):** diferencia, diferenciador, diferente, unico, único, por que producto, por qué producto, que la hace distinta, qué la hace distinta, valor diferencial, propuesta de valor, fortaleza, fortalezas, distingue, …

**Respuesta:**

> Probablemente el diferencial de Barbi venga de haber estado muchas veces **en el medio**: entre negocio y tecnología, entre estrategia y ejecución, entre usuario y operación, entre velocidad y calidad, entre equipos y management. Y ahora, entre humanos y algoritmos.
>
> Aprendió a traducir esos mundos sin simplificarlos demasiado. Y **no se queda cómoda en la teoría**: le gusta convertir conversaciones en decisiones y decisiones en algo que llegue a producción.
>
> Su lugar favorito: **cuando todavía hay bastante caos, pero ya se puede empezar a construir dirección**.

**Sugiere después:** Proyectos, Cómo piensa, Conversar con Barbi

### 📋 Menú (`help_menu`)

**Palabras clave (ES):** menu, que me podes contar, que podes decirme, que podes, que podés, opciones, ayuda, que preguntar, temas, lista, que sabe, qué sabe, que temas, qué temas

**Respuesta:**

> Soy Bocconcino, el guía de este portfolio. Tengo respuestas preparadas sobre estos temas:
>
> **👋 Conocer a Barbi:** quién es, qué la diferencia, qué la motiva.
> **🧭 Trayectoria:** banca, e-commerce, seguros, inicios y trabajo actual.
> **🚀 Producto:** cómo valida ideas, prioriza y mide.
> **👥 Equipos:** liderazgo, ambigüedad, QA y forma de trabajo.
> **🤖 IA:** Humanos + IA, agentes y por dónde empezar.
> **🎤 Charlas y notas:** Agile después del Agile y más.
> **📩 Contacto:** disponibilidad y cómo escribirle.

**Sugiere después:** Sobre Barbi, Trayectoria, IA y trabajo

### ✅ short_ack (`short_ack`)

**Palabras clave (ES):** dale, joya, copado, genial, perfecto, excelente, gracias, buenisimo, buenísimo, entendido, listo, okey

**Respuesta:**

> 💛 ¡Gracias! ¿Seguimos con otro tema?

**Variantes:** 3

**Sugiere después:** Sobre Barbi, Trayectoria, Charlas

### 🔄 Agile después del Agile (`agile_after_agile`)

**Palabras clave (ES):** agile después del agile, agile despues del agile, nueva agilidad, futuro de agile, agile ya no sirve, cambiar ceremonias, iterar agile, evolucionar agile

**Respuesta:**

> Para Barbi, Agile resolvió un problema enorme: dejar de construir durante meses sin mirar la realidad.
>
> Pero el contexto volvió a cambiar: hoy hay IA, nuevos roles, equipos distribuidos, DevOps, Design Systems, automatización y datos en tiempo real. Y aun así muchas organizaciones siguen ejecutando Agile casi igual que hace diez años.
>
> Su propuesta es simple: **aplicar Agile sobre Agile**. Inspeccionar también las ceremonias, los roles, los artefactos y las formas de decidir.
>
> La frase que lo resume: **iteramos el producto, pero también hay que iterar el sistema con el que lo construimos**.

**Sugiere después:** Qué evitar, Metodología, Speaker

**Link:** → Ver Ideas desde la trinchera (/#news-start)

### 🧾 Specs con IA (`spec_driven_ai`)

**Palabras clave (ES):** spec driven, spec driven development, especificaciones ia, specs con ia, historias de usuario con ia, requirements ai, ai delivery, documentacion con ia, documentación con ia, agentes y especificaciones

**Respuesta:**

> Una de las cosas que Barbi más está explorando es cómo cambia el delivery cuando las especificaciones dejan de ser solo documentos para personas y pasan a ser también **contexto operativo para agentes de IA**.
>
> Specs más claras pueden alimentar toda la cadena: producto → desarrollo → testing → documentación → automatización.
>
> Eso cambia incluso la conversación sobre historias de usuario. Para ella, quizás el futuro no sea escribirlas más rápido con IA, sino dejar de pensar el proceso como una cadena de documentos manuales.

**Sugiere después:** Agentes de IA, QA y producto, IA y rol PM

### 🤖 Agentes de IA (`ai_agents`)

**Palabras clave (ES):** agentes, agentes de ia, ai agents, agentes autonomos, agentes autónomos, agentic ai, workflows con ia, humano en el loop, human in the loop

**Respuesta:**

> A Barbi un agente no le interesa porque “hace cosas solo”, sino cuando puede ocupar un lugar concreto dentro de un flujo de trabajo: leer contexto → interpretar una especificación → ejecutar una tarea → validar → devolver evidencia.
>
> Está experimentando bastante con agentes alrededor de producto, especificaciones y testing.
>
> Para ella, el desafío más interesante no es construir el agente, sino diseñar **qué puede decidir, qué contexto necesita, cuándo tiene que pedir ayuda y quién responde por el resultado**. Son preguntas muy parecidas a las de diseñar equipos humanos.

**Sugiere después:** Specs con IA, QA y producto, IA con criterio

### 👥 Three Amigos (`three_amigos`)

**Palabras clave (ES):** three amigos, tres amigos, 3 amigos, qa dev producto, producto desarrollo qa, refinamiento, refinamiento tecnico, refinamiento técnico, refinamiento funcional, definition ready, ready to dev

**Respuesta:**

> A Barbi le gusta el concepto de **Three Amigos** porque resuelve un problema frecuente: descubrir demasiado tarde que cada disciplina entendió una cosa distinta.
>
> Antes de desarrollar, ella sentaría alrededor del mismo problema a **Producto o Negocio, Desarrollo y QA**, y según el caso, UX.
>
> No para sumar otra ceremonia, sino para responder juntos qué se espera, qué puede fallar, cómo se va a construir y cómo se sabrá que está bien.
>
> Su idea de fondo: **la calidad empieza antes del código**.

**Sugiere después:** QA y producto, Specs con IA, Velocidad y calidad

### ✅ QA y producto (`qa_product`)

**Palabras clave (ES):** qa, calidad, quality assurance, testing, casos de prueba, casos qa, qa ownership, ambiente qa, qa desde origen, shift left testing, calidad temprana

**Respuesta:**

> Durante mucho tiempo se trató a QA como una etapa. Barbi cree cada vez más que hay que tratarlo como una **capacidad del equipo**.
>
> Si los casos aparecen después de desarrollar, QA valida. Si aparecen mientras se entiende el problema, QA ayuda a diseñar. Esa diferencia cambia requisitos, casos borde, retrabajo, automatización y velocidad.
>
> Para ella, una historia realmente lista debería permitir que Producto, Desarrollo y QA entiendan qué comportamiento se está construyendo antes de empezar.
>
> **La calidad tardía es cara.**

**Sugiere después:** Three Amigos, Specs con IA, Velocidad y calidad

### 🎤 Speaker (`speaker_story`)

**Palabras clave (ES):** primera conferencia, hablar en publico, hablar en público, agile summit uruguay, uruguay, como empezo a dar charlas, cómo empezó a dar charlas

**Respuesta:**

> Durante años Barbi construyó productos y lideró conversaciones puertas adentro. En 2026 empezó a llevar algunas de esas preguntas afuera.
>
> En Uruguay dio su primera conferencia: **Agile después del Agile**, en Agile Summit Uruguay. La primera, y en otro país: empezar de a poco nunca fue demasiado lo suyo. 😅
>
> Ahí descubrió algo que le encantó: convertir experiencias desordenadas en una idea que otra persona pueda llevarse y usar. Probablemente por eso hoy disfruta tanto enseñar y diseñar capacitaciones.

**Sugiere después:** Agile después del Agile, Charlas, Conversar con Barbi

**Link:** → Ver Ideas desde la trinchera (/#news-start)

