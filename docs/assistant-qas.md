# Mapa de Preguntas y Respuestas del Asistente

Fuente: `src/data/assistant.ts` y `src/components/AIAssistant.tsx`.

Este documento lista todas las intenciones mapeadas actualmente en Bocconcino. Cada intención se activa por frases o keywords; cuando una respuesta tiene variantes, el asistente puede elegir cualquiera de ellas.

## Chips Iniciales

### Español
- Conocer a Barbi
- ¿Qué es Humanos + IA?
- ¿Qué plantea Agile después del Agile?
- ¿Qué dice sobre NotebookLM?
- ¿Qué piensa sobre liderazgo?
- Quiero aplicar IA, ¿por dónde empiezo?

### Inglés
- Get to know Barbi
- What is Humans + AI?
- What is Agile After Agile about?
- What does she say about NotebookLM?
- What does she think about leadership?
- I want to apply AI, where do I start?

## Atajos Directos de Chips

- `conocer a barbi` -> `who_is_barbara`
- `conocer a barbara` -> `who_is_barbara`
- `get to know barbi` -> `who_is_barbara`
- `get to know barbara` -> `who_is_barbara`
- `que es humanos ia` -> `ai_product`
- `what is humans ai` -> `ai_product`
- `que aprendio en agile summit uruguay` -> `speaker_story`
- `what did she learn at agile summit uruguay` -> `speaker_story`
- `que plantea agile despues del agile` -> `agile_after_agile`
- `what is agile after agile about` -> `agile_after_agile`
- `que dice sobre notebooklm` -> `organizational_learning`
- `what does she say about notebooklm` -> `organizational_learning`
- `que piensa sobre liderazgo` -> `leadership`
- `what does she think about leadership` -> `leadership`
- `quiero aplicar ia por donde empiezo` -> `ai_without_strategy`
- `i want to apply ai where do i start` -> `ai_without_strategy`
- `tengo muchas ideas como priorizo` -> `roadmap_chaos`
- `i have too many ideas how do i prioritize` -> `roadmap_chaos`
- `negocio y tecnologia no estan alineados que hago` -> `misaligned_stakeholders`
- `business and technology are not aligned what should i do` -> `misaligned_stakeholders`
- `como bajo una estrategia a ejecucion` -> `methodology`
- `how do i turn strategy into execution` -> `methodology`
- `que pregunta deberia hacer antes de construir` -> `product_idea_validation`
- `what question should i ask before building` -> `product_idea_validation`
- `como piensa` -> `thinking`
- `how she thinks` -> `thinking`
- `como construye producto` -> `methodology`
- `how she builds product` -> `methodology`
- `ia y futuro del trabajo` -> `ai_product`
- `ai and the future of work` -> `ai_product`
- `como lidera equipos` -> `leadership`
- `how she leads teams` -> `leadership`
- `casos reales y aprendizajes` -> `projects`
- `real cases and learnings` -> `projects`
- `podemos trabajar juntos` -> `availability`
- `can we work together` -> `availability`
- `mi equipo no esta entregando por donde empezarias` -> `team_not_delivering`
- `my team isn t delivering where would you start` -> `team_not_delivering`
- `tengo una idea de producto como validarias si vale la pena construirla` -> `product_idea_validation`
- `i have a product idea how would you validate whether it is worth building` -> `product_idea_validation`
- `como cambia la ia el rol de product manager` -> `ai_pm_role`
- `how does ai change the product manager role` -> `ai_pm_role`
- `que aprendiste construyendo productos financieros` -> `financial_products_learning`
- `what did you learn building financial products` -> `financial_products_learning`
- `como equilibras velocidad y calidad` -> `speed_quality`
- `how do you balance speed and quality` -> `speed_quality`
- `como lideras en contextos ambiguos` -> `ambiguity_leadership`
- `how do you lead in ambiguous contexts` -> `ambiguity_leadership`
- `stakeholders desalineados` -> `misaligned_stakeholders`
- `misaligned stakeholders` -> `misaligned_stakeholders`
- `roadmap caotico` -> `roadmap_chaos`
- `chaotic roadmap` -> `roadmap_chaos`
- `ia sin estrategia` -> `ai_without_strategy`
- `ai without strategy` -> `ai_without_strategy`
- `que no haria barbara` -> `what_not_to_do`
- `what would barbara not do` -> `what_not_to_do`
- `que metricas mirarias` -> `metrics_decision`
- `what metrics would you watch` -> `metrics_decision`
- `aprendizaje organizacional` -> `organizational_learning`
- `organizational learning` -> `organizational_learning`
- `specs con ia` -> `spec_driven_ai`
- `ai specs` -> `spec_driven_ai`
- `agentes de ia` -> `ai_agents`
- `ai agents` -> `ai_agents`
- `qa desde origen` -> `qa_product`
- `quality from the start` -> `qa_product`
- `three amigos` -> `three_amigos`

## Fallback Cuando No Sabe

### Español

No tengo una respuesta prearmada para eso. Mejor.

Contame qué está pasando, qué intentaron y qué decisión tenés trabada.

Puedo ayudarte a separar el problema de los síntomas y pensar cuál sería el próximo movimiento con más sentido.

### Inglés

I do not have a prewritten answer for that. Even better.

Tell me what is happening, what you have already tried and which decision feels stuck.

I can help separate the real problem from the symptoms and think through the next move that makes the most sense.

## Sugerencias por Default

### Español
- Conocer a Barbi
- ¿Qué es Humanos + IA?
- Quiero aplicar IA, ¿por dónde empiezo?

### Inglés
- Get to know Barbi
- What is Humans + AI?
- I want to apply AI, where do I start?

## Intenciones Mapeadas

### 1. team_not_delivering

**Preguntas/frases que dispara en español**

- mi equipo no esta entregando
- mi equipo no está entregando
- equipo no entrega
- equipo trabado
- no llegamos
- no cumplen
- no entregamos
- delivery trabado
- delivery lento
- no estamos entregando

**Questions/phrases that trigger it in English**

- my team is not delivering
- my team isn't delivering
- team not delivering
- stuck team
- delivery is slow
- we are not delivering
- we're not delivering

**Respuesta principal ES**

Antes de pedir más velocidad, trataría de entender **qué estamos llamando “problema de delivery”**.

Puede significar cosas muy distintas: demasiadas cosas abiertas, historias mal definidas, decisiones que nadie toma, dependencias externas, QA convertido en cuello de botella, cambios permanentes de prioridad, deuda técnica o una capacidad que estamos fingiendo que existe.

Viví proyectos donde mirar solo velocity hubiera llevado exactamente a la conclusión equivocada.

Mi primera obsesión sería hacer visible el sistema: **qué entra, dónde espera, dónde vuelve para atrás y quién tiene que decidir para que avance**.

Muchas veces la velocidad es el síntoma. No la causa.

Si querés, contame cómo trabajan hoy y te digo dónde miraría primero.

**Main Response EN**

Before asking for more speed, I would try to understand **what we are calling a delivery problem**.

It can mean too much work in progress, poorly defined stories, decisions nobody is making, external dependencies, QA as a bottleneck, constant priority changes, technical debt or capacity we are pretending exists.

Often speed is the symptom. Not the cause.

**Sugerencias siguientes ES**

- ¿Cómo liderás ambigüedad?
- ¿Velocidad o calidad?
- Stakeholders desalineados

**Next Suggestions EN**

- How do you lead ambiguity?
- Speed or quality?
- Misaligned stakeholders

---

### 2. product_idea_validation

**Preguntas/frases que dispara en español**

- tengo una idea
- idea de producto
- validar idea
- vale la pena construir
- vale la pena construirla
- como validar
- cómo validar
- validarias
- validar si vale
- pregunta antes de construir
- que pregunta deberia hacer antes de construir
- qué pregunta debería hacer antes de construir

**Questions/phrases that trigger it in English**

- i have a product idea
- product idea
- validate idea
- worth building
- how would you validate
- validate whether
- is it worth building
- question before building
- what question should i ask before building

**Respuesta principal ES**

Me gustan las ideas. Pero me gustan todavía más cuando sobreviven al contacto con la realidad.

Antes de construir preguntaría:

**¿Qué tendría que ser verdad para que esta idea valga la pena?**

Después buscaría la forma más barata de comprobarlo. No necesariamente código: puede ser un prototipo, cinco conversaciones, una landing, datos existentes, una simulación o hacer manualmente durante una semana lo que después imaginamos automatizado.

Mi objetivo no sería demostrar que la idea es buena. Sería encontrar rápido **por qué podría estar equivocada**.

Si sobrevive, recién ahí empezaría a enamorarme de la solución.

**Main Response EN**

I like ideas. But I like them even more when they survive contact with reality.

Before building, I would ask: **what would need to be true for this idea to be worth it?**

Then I would look for the cheapest way to test it. Not necessarily code: a prototype, five conversations, a landing page, existing data, a simulation or doing manually for a week what we later imagine automating.

**Sugerencias siguientes ES**

- ¿Qué métricas mirarías?
- ¿Discovery o delivery?
- ¿Cómo construye producto?

**Next Suggestions EN**

- What metrics would you watch?
- Discovery or delivery?
- How she builds product?

---

### 3. ai_pm_role

**Preguntas/frases que dispara en español**

- como cambia la ia el rol
- cómo cambia la ia el rol
- rol de product manager
- rol del pm
- ia cambia pm
- ai cambia producto
- futuro del product manager

**Questions/phrases that trigger it in English**

- how does ai change the product manager role
- ai change pm role
- product manager role
- future of product manager
- ai changes product management

**Respuesta principal ES**

Para mí, la IA no achica el rol de Product. **Le saca escondites.**

Antes podíamos consumir muchísimo tiempo escribiendo documentos, resumiendo reuniones, ordenando research, armando alternativas o produciendo artefactos. Todo eso se está acelerando brutalmente.

Entonces queda mucho más expuesto lo difícil: elegir qué problema importa, hacer buenas preguntas, conectar señales contradictorias, entender negocio, conversar con tecnología, leer una organización y tomar decisiones con información incompleta.

La IA puede producir veinte opciones en segundos.

El desafío sigue siendo saber **cuál no construir**.

**Main Response EN**

For me, AI does not shrink the Product role. **It removes hiding places.**

Documents, summaries, research organization and alternatives are getting faster. So the hard part becomes more exposed: choosing which problem matters, asking better questions and deciding with incomplete information. AI can produce twenty options in seconds. The challenge is still knowing **which one not to build**.

**Sugerencias siguientes ES**

- IA y equipos
- ¿Qué no automatizarías?
- Aprendizaje organizacional

**Next Suggestions EN**

- AI and teams
- What would you not automate?
- Organizational learning

---

### 4. financial_products_learning

**Preguntas/frases que dispara en español**

- productos financieros
- aprendiste construyendo productos financieros
- banca
- financiero
- financieros
- regulacion
- regulación
- compliance
- pagos
- cobranzas

**Questions/phrases that trigger it in English**

- financial products
- building financial products
- banking
- financial
- regulation
- compliance
- payments
- collections

**Respuesta principal ES**

La banca me enseñó que **algo puede funcionar perfectamente y aun así ser un mal producto**.

En productos financieros no alcanza con que la pantalla responda. Tiene que haber confianza, trazabilidad, seguridad, operación, regulación, soporte y claridad.

Y casi nunca diseñás sobre una hoja en blanco: hay legacy, múltiples sistemas, dependencias, compliance, riesgo y decisiones que cruzan varias áreas.

Eso cambió mucho mi manera de hacer producto. Dejé de pensar únicamente en “el usuario” y empecé a pensar en **el sistema completo que tiene que ser capaz de sostener esa experiencia**.

La complejidad interna puede ser enorme. El usuario no debería tener que pagar por ella.

**Main Response EN**

Banking taught me that **something can work perfectly and still be a bad product**.

In financial products, it is not enough for the screen to respond. There has to be trust, traceability, security, operations, regulation, support and clarity. The user should not have to pay for internal complexity.

**Sugerencias siguientes ES**

- Productos financieros
- ¿Qué métricas mirarías?
- Stakeholders desalineados

**Next Suggestions EN**

- Financial products
- What metrics would you watch?
- Misaligned stakeholders

---

### 5. speed_quality

**Preguntas/frases que dispara en español**

- velocidad y calidad
- velocidad o calidad
- equilibrar velocidad
- balancear velocidad
- rapido y bien
- rápido y bien
- calidad vs velocidad
- speed quality

**Questions/phrases that trigger it in English**

- speed and quality
- speed or quality
- balance speed
- quality vs speed
- fast and good
- move fast without breaking

**Respuesta principal ES**

Tengo una pequeña pelea con esta pregunta porque presupone que velocidad y calidad siempre compiten.

A veces sí. Pero muchísimas veces lo que nos hace lentos es precisamente **la mala calidad del sistema de trabajo**: requisitos ambiguos, demasiadas cosas abiertas, QA tardío, decisiones pendientes, dependencias sin dueño, refinamientos eternos.

Eso genera retrabajo. Y el retrabajo es carísimo.

Para mí, moverse rápido no significa hacer más. Significa reducir el tiempo entre:

**pregunta → decisión → evidencia → aprendizaje.**

Si el riesgo es alto, aumento control. Si la incertidumbre es alta, reduzco alcance. Si ya sabemos qué construir, elimino fricción.

No optimizaría siempre la misma cosa.

**Main Response EN**

I have a small fight with this question because it assumes speed and quality always compete. Very often what makes us slow is precisely **the poor quality of the work system**: ambiguous requirements, too much open work, late QA and pending decisions. Moving fast means reducing the time between **question → decision → evidence → learning**.

**Sugerencias siguientes ES**

- Tengo una idea de producto
- Mi equipo no está entregando
- ¿Qué no haría Barbi?

**Next Suggestions EN**

- I have a product idea
- My team isn't delivering
- What would Barbi not do?

---

### 6. ambiguity_leadership

**Preguntas/frases que dispara en español**

- contextos ambiguos
- ambiguedad
- ambigüedad
- liderar en ambiguo
- lideras en contextos
- liderás en contextos
- incertidumbre
- no hay claridad

**Questions/phrases that trigger it in English**

- ambiguous contexts
- ambiguity
- lead in ambiguity
- uncertainty
- no clarity
- leading ambiguous

**Respuesta principal ES**

La ambigüedad no me molesta demasiado.

Lo que me preocupa es cuando hacemos de cuenta que no existe.

En contextos inciertos intento separar tres cosas:

**lo que sabemos, lo que creemos y lo que todavía necesitamos descubrir.**

Parece simple. No lo es. Cuando eso no está explícito, negocio, UX, tecnología y liderazgo empiezan a rellenar los espacios vacíos con versiones distintas de la realidad.

Ahí aparecen discusiones que parecen de solución pero en realidad son de contexto.

Liderar ambigüedad, para mí, no es tener todas las respuestas. Es conseguir que el equipo pueda avanzar **sin inventarse certezas**.

**Main Response EN**

Ambiguity does not bother me too much. What worries me is when we pretend it is not there. In uncertain contexts, I separate **what we know, what we believe and what we still need to discover**. Leading ambiguity is helping the team move forward **without inventing certainty**.

**Sugerencias siguientes ES**

- Stakeholders desalineados
- ¿Cómo lidera equipos?
- Mi equipo no está entregando

**Next Suggestions EN**

- Misaligned stakeholders
- How she leads teams
- My team isn't delivering

---

### 7. misaligned_stakeholders

**Preguntas/frases que dispara en español**

- stakeholders desalineados
- stakeholders
- negocio y tecnologia
- negocio y tecnología
- areas desalineadas
- áreas desalineadas
- nadie decide
- no se ponen de acuerdo
- conflicto entre negocio
- alineacion
- alineación

**Questions/phrases that trigger it in English**

- misaligned stakeholders
- stakeholders
- business and technology
- teams are misaligned
- nobody decides
- cannot agree
- alignment
- business tech conflict

**Respuesta principal ES**

Si negocio y tecnología no se ponen de acuerdo, agregar otra reunión probablemente no sea mi primera elección 😅.

Intentaría descubrir **qué está optimizando cada uno**.

Negocio quizá está mirando time-to-market. Tecnología, estabilidad. Compliance, riesgo. UX, experiencia. Operaciones, sostenibilidad.

Y probablemente todos tengan una parte de razón.

El trabajo de Producto no es elegir un ganador. Es construir una decisión donde esos costos sean visibles.

Muchas veces el desacuerdo desaparece cuando dejamos de discutir soluciones y explicitamos:

**objetivo + restricciones + trade-offs + quién decide.**

**Main Response EN**

If business and technology cannot agree, adding another meeting is probably not my first choice 😅. I would try to understand **what each side is optimizing for**. Product’s job is not to choose a winner. It is to build a decision where the costs are visible: **objective + constraints + trade-offs + who decides**.

**Sugerencias siguientes ES**

- ¿Cómo liderás ambigüedad?
- ¿Qué métricas mirarías?
- Casos reales

**Next Suggestions EN**

- How do you lead ambiguity?
- What metrics would you watch?
- Real cases

---

### 8. roadmap_chaos

**Preguntas/frases que dispara en español**

- roadmap caotico
- roadmap caótico
- roadmap desordenado
- roadmap no se cumple
- muchas prioridades
- prioridades cambiantes
- todo es urgente
- no se que priorizar
- no sé qué priorizar
- todo es prioridad

**Questions/phrases that trigger it in English**

- roadmap chaos
- chaotic roadmap
- roadmap is messy
- roadmap keeps changing
- too many priorities
- everything is urgent
- do not know what to prioritize
- don't know what to prioritize

**Respuesta principal ES**

Cuando todo es prioridad, el roadmap no está lleno.

**Está roto el sistema de decisión.**

Yo empezaría preguntando quién puede decir que no.

Porque si cada pedido entra, si ningún compromiso viejo sale y si todas las áreas pueden declarar algo “urgente”, ningún framework de priorización va a salvarte.

Después separaría:

- lo que mantiene vivo el negocio;
- lo que reduce riesgo;
- lo que genera crecimiento;
- lo que genera aprendizaje.

Y pondría capacidad real al lado.

Una priorización sin capacidad es una wishlist. Y un roadmap sin renuncias no es estrategia.

**Main Response EN**

When everything is a priority, the roadmap is not full. **The decision system is broken.** I would start by asking who is allowed to say no. A prioritization without capacity is a wishlist. A roadmap without explicit trade-offs is not strategy.

**Sugerencias siguientes ES**

- ¿Qué métricas mirarías?
- Stakeholders desalineados
- ¿Qué no haría Barbi?

**Next Suggestions EN**

- What metrics would you watch?
- Misaligned stakeholders
- What would Barbi not do?

---

### 9. ai_without_strategy

**Preguntas/frases que dispara en español**

- ia sin estrategia
- implementar ia
- adoptar ia
- usar ia en la empresa
- queremos usar ia
- integrar ia
- automatizar con ia
- ai sin estrategia
- quiero aplicar ia
- quiero meter ia
- por donde empiezo con ia
- por dónde empiezo con ia

**Questions/phrases that trigger it in English**

- ai without strategy
- implement ai
- adopt ai
- use ai in the company
- we want to use ai
- integrate ai
- automate with ai
- i want to apply ai
- where do i start with ai

**Respuesta principal ES**

No empezaría por Claude, ChatGPT, Copilot ni por “necesitamos un agente”.

Empezaría por:

**¿qué parte de nuestro trabajo hoy es innecesariamente difícil?**

Después distinguiría trabajo repetitivo, búsqueda y síntesis, generación, decisión, conocimiento y coordinación.

Ahí sí evaluaría dónde IA realmente aumenta capacidad.

Porque automatizar un proceso roto solo consigue una cosa: **romperlo más rápido**.

Mi forma favorita de empezar es elegir un caso pequeño, frecuente y medible, mantener humano en el loop y aprender.

Después escalamos. No antes.

**Main Response EN**

I would not start with Claude, ChatGPT, Copilot or “we need an agent”. I would start with: **which part of our work is unnecessarily hard today?** Then I would choose a small, frequent, measurable use case, keep a human in the loop and learn. After that, we scale. Not before.

**Sugerencias siguientes ES**

- ¿Qué no automatizarías?
- Aprendizaje organizacional
- ¿Cómo cambia el rol de PM?

**Next Suggestions EN**

- What would you not automate?
- Organizational learning
- How does AI change the PM role?

---

### 10. what_not_to_do

**Preguntas/frases que dispara en español**

- que no haria
- qué no haría
- errores evitar
- que evitar
- qué evitar
- malas practicas
- malas prácticas

**Questions/phrases that trigger it in English**

- what would she not do
- what to avoid
- mistakes to avoid
- bad practices

**Respuesta principal ES**

Algunas cosas que intento evitar:

- construir porque alguien importante tuvo una idea;
- confundir estar ocupados con avanzar;
- meter IA para poder decir que usamos IA;
- llenar dashboards sin saber qué decisión van a cambiar;
- usar Agile como religión;
- abrir diez iniciativas con capacidad para tres;
- convertir QA en la última persona que descubre cómo debería funcionar algo;
- esconder incertidumbre detrás de estimaciones bonitas;
- llamar “problema del equipo” a un problema del sistema.

Y una más:

**no defendería una metodología por encima de la evidencia.**

Si dejó de ayudarnos, hay que cambiarla.

**Main Response EN**

Some things I try to avoid: building because someone important had an idea, confusing being busy with moving forward, adding AI just to say we use AI, filling dashboards without knowing which decision they will change, using Agile as religion and calling a system problem a team problem. I would not defend a methodology above evidence.

**Sugerencias siguientes ES**

- ¿Velocidad o calidad?
- IA y futuro del trabajo
- ¿Cómo piensa?

**Next Suggestions EN**

- Speed or quality?
- AI and the future of work
- How she thinks?

---

### 11. metrics_decision

**Preguntas/frases que dispara en español**

- metricas
- métricas
- que metricas
- qué métricas
- medir impacto
- measurement
- kpi
- okrs
- datos
- data

**Questions/phrases that trigger it in English**

- metrics
- what metrics
- measure impact
- measurement
- kpi
- okrs
- data

**Respuesta principal ES**

Antes de pedir un dashboard preguntaría:

**¿qué decisión queremos tomar distinto después de mirar estos datos?**

Si no tenemos respuesta, probablemente todavía no necesitamos la métrica.

Me interesa combinar tres tipos de señal:

**Resultado:** qué cambió para usuario o negocio.
**Salud:** qué costo, riesgo o fricción generamos.
**Aprendizaje:** qué entendemos ahora que antes no sabíamos.

Porque optimizar una única métrica puede destruir otra parte del sistema.

Los datos ayudan muchísimo. Pero una organización data-driven sin criterio puede equivocarse con una precisión espectacular.

**Main Response EN**

Before asking for a dashboard, I would ask: **which decision do we want to make differently after looking at this data?** I like combining outcome, health and learning signals. Data helps a lot, but a data-driven organization without judgment can be wrong with spectacular precision.

**Sugerencias siguientes ES**

- Tengo una idea de producto
- Productos financieros
- Aprendizaje organizacional

**Next Suggestions EN**

- I have a product idea
- Financial products
- Organizational learning

---

### 12. organizational_learning

**Preguntas/frases que dispara en español**

- aprendizaje organizacional
- organizacion aprende
- organización aprende
- convertir informacion
- convertir información
- notebooklm
- notebook llm
- conocimiento accionable
- decisiones y aprendizaje

**Questions/phrases that trigger it in English**

- organizational learning
- organization learns
- turn information
- notebooklm
- notebook llm
- actionable knowledge
- decisions and learning

**Respuesta principal ES**

NotebookLM me interesa menos por la herramienta y más por el problema que deja en evidencia:

**las organizaciones producen muchísimo conocimiento y recuerdan muy poco.**

Decisiones enterradas en reuniones. Research perdido en Drive. Documentación que nadie vuelve a abrir. Personas que se van y se llevan contexto con ellas.

Herramientas como NotebookLM empiezan a permitir algo muy potente: conversar con ese conocimiento, comparar fuentes, encontrar contradicciones y recuperar contexto.

Pero la tecnología sola no crea aprendizaje organizacional.

El loop que me interesa es:

**información → síntesis → decisión → resultado → aprendizaje reutilizable.**

Ahí creo que la IA puede cambiar muchísimo cómo trabajan los equipos.

**Main Response EN**

NotebookLM interests me less as a tool and more because of the problem it exposes: **organizations produce a lot of knowledge and remember very little**. Tools like it can help teams talk to knowledge, compare sources and recover context. But technology alone does not create organizational learning.

**Sugerencias siguientes ES**

- IA y futuro del trabajo
- ¿Qué métricas mirarías?
- ¿Cómo piensa?

**Next Suggestions EN**

- AI and the future of work
- What metrics would you watch?
- How she thinks?

---

### 13. thinking

**Preguntas/frases que dispara en español**

- como piensa
- cómo piensa
- forma de pensar
- criterio
- decide
- decidir
- mirada
- enfoque
- pensamiento
- barbara piensa
- barbi piensa
- todo esta desordenado

**Questions/phrases that trigger it in English**

- how she thinks
- thinking
- decision criteria
- judgment
- approach
- mindset
- how barbara thinks
- how barbi thinks

**Respuesta principal ES**

Tengo una tendencia bastante marcada: cuando algo parece un problema simple, intento descubrir **qué sistema hay detrás**.

Si un equipo está lento, no miro solo velocity.

Si un usuario abandona, no miro solo conversión.

Si dos áreas discuten, no miro solo quién tiene razón.

Si aparece IA, no miro primero la herramienta.

Me interesa entender:

**qué está pasando, por qué está pasando ahora, qué tensiones existen y qué decisión puede mover el sistema.**

Después pruebo.

Porque también aprendí algo importante: pensar muy bien un problema no te exime de ponerlo contra la realidad.

Mi forma de trabajar combina bastante de esas dos cosas:

**curiosidad para entender + pragmatismo para mover.**

**Main Response EN**

When something looks like a simple problem, I try to find **the system behind it**. If a team is slow, I do not look only at velocity. If two areas disagree, I do not look only at who is right. If AI appears, I do not look first at the tool. I try to understand what is happening, why now, what tensions exist and which decision can move the system.

**Sugerencias siguientes ES**

- Tengo una idea de producto
- Mi equipo no está entregando
- ¿Cómo cambia la IA el rol de PM?

**Next Suggestions EN**

- I have a product idea
- My team isn't delivering
- How does AI change the PM role?

---

### 14. greeting

**Preguntas/frases que dispara en español**

- hola
- buenas
- buen dia
- buenos dias
- hey
- saludos
- como estas
- que tal

**Questions/phrases that trigger it in English**

- hello
- hi
- hey
- good morning
- greetings
- howdy

**Respuesta principal ES**

Hola 👋 Soy la versión AI del portfolio de Barbi.

Puedo contarte qué construyó, cómo trabaja o qué piensa sobre Producto, IA y liderazgo.

Pero hay una opción más divertida:

**traeme un problema real.**

Un equipo trabado, un roadmap imposible, una idea que no sabés si construir o una empresa intentando incorporar IA.

Veamos qué haría con eso.

**Variantes ES**

**Variante 1:**

Hola 👋 Soy la versión AI del portfolio de Barbi.

Podés preguntarme por su experiencia, pero también podés traerme un problema real.

**Variante 2:**

Buenas. Puedo contarte sobre Barbi, sí. Pero funciono mejor cuando me traés algo desordenado y tratamos de convertirlo en una decisión.

**Variante 3:**

Hola. Este asistente no quiere ser un CV interactivo. Quiere ayudarte a pensar como Barbi pensaría un problema: contexto, criterio, decisión y movimiento.

**Main Response EN**

Hi 👋 I am the AI version of Barbi’s portfolio. I can tell you what she built, how she works or what she thinks about Product, AI and leadership. But there is a more interesting option: **bring me a real problem.**

**Variants EN**

**Variant 1:**

Hi 👋 I am the AI version of Barbi’s portfolio. You can ask about her experience, but you can also bring me a real problem.

**Variant 2:**

Welcome. I can tell you about Barbi, yes. But I work better when you bring something messy and we turn it into a decision.

**Variant 3:**

Hi. This assistant does not want to be an interactive resume. It wants to help you think through context, judgment, decisions and movement.

**Sugerencias siguientes ES**

- 🧠 Cómo piensa
- 🚀 Cómo construye producto
- Mi equipo no está entregando

**Next Suggestions EN**

- 🧠 How she thinks
- 🚀 How she builds product
- My team isn't delivering

---

### 15. who_is_barbara

**Preguntas/frases que dispara en español**

- quien
- quién
- barbara
- barbi
- que hace
- qué hace
- de que trata
- presentate
- contame
- quien sos
- quien es

**Questions/phrases that trigger it in English**

- who
- barbara
- barbi
- what does she do
- introduce
- tell me
- about her
- about barbara
- about barbi

**Respuesta principal ES**

Barbi pasó por una mezcla bastante poco prolija, y bastante útil, de marketing, datos, growth, e-commerce, banca, tecnología, producto, liderazgo e IA.

Durante más de una década trabajó construyendo productos digitales y conectando mundos que muchas veces hablan idiomas distintos:

**negocio, tecnología, UX, datos, operación y personas.**

Hoy está especialmente interesada en una pregunta:

**¿cómo cambia la forma de construir productos y organizaciones cuando la IA deja de ser una herramienta y empieza a convertirse en parte del equipo?**

También habla, enseña, experimenta y escribe sobre eso.

Y sí: sigue construyendo cosas. Probablemente demasiadas. 😅

**Variantes ES**

**Variante 1:**

Barbi crea desde 1989. Empezó mirando clics y conversiones, pero terminó encontrando lo que más le interesaba: las personas detrás de los datos, los equipos que deciden y las ideas que se vuelven experiencias reales.

**Variante 2:**

Más que una bio, lo interesante de Barbi es su mirada: viene de marketing, creció construyendo productos digitales y hoy explora cómo la IA puede potenciar equipos y decisiones sin borrar lo humano.

**Main Response EN**

Barbi comes from a messy, and very useful, mix of marketing, data, growth, e-commerce, banking, technology, product, leadership and AI. For more than a decade, she has built digital products while connecting business, technology, UX, data, operations and people. Today she is interested in how product and organizations change when AI becomes part of the team.

**Variants EN**

**Variant 1:**

Barbi has been creating since 1989. She started by looking at clicks and conversions, but found what truly interested her: the people behind the data and the ideas becoming real experiences.

**Variant 2:**

More than a bio, what is interesting about Barbi is her lens: she comes from marketing, grew through digital product, and now explores how AI can enhance teams and decisions without losing the human perspective.

**Sugerencias siguientes ES**

- 🧠 Cómo piensa
- Tengo una idea de producto
- Casos reales

**Next Suggestions EN**

- 🧠 How she thinks
- I have a product idea
- Real cases

---

### 16. experience

**Preguntas/frases que dispara en español**

- experiencia
- trayectoria
- anos
- años
- background
- carrera
- trabajos
- historia
- recorrido

**Questions/phrases that trigger it in English**

- experience
- years
- background
- career
- trajectory
- history
- resume

**Respuesta principal ES**

Mi recorrido tiene más sentido si se mira por problemas que por cargos.

Empecé en **SEO y performance**, entendiendo cómo pequeños cambios alteran comportamiento. Con **growth y publicidad digital** aprendí experimentación, adquisición y datos. En **insurtech** entendí que el producto también vive en operaciones, ventas y atención.

En **e-commerce de escala regional** vi de cerca equipos con autonomía real, confianza y una capacidad enorme de ejecutar. En **banca** aparecieron regulación, legacy, usuarios empresariales, múltiples stakeholders y sistemas complejos.

Después todo eso se mezcló con **consultoría, liderazgo, delivery, transformación organizacional e IA**.

El hilo no fue una industria. Fue aprender a **convertir complejidad en producto y dirección**.

**Main Response EN**

My path makes more sense if you look at problems rather than titles: SEO and performance, growth and data, insurtech, regional e-commerce, banking, consulting, leadership, delivery, organizational transformation and AI. The thread was not an industry. It was learning to **turn complexity into product and direction**.

**Sugerencias siguientes ES**

- ¿Casos reales?
- ¿Qué aprendió en banca?
- ¿Cómo piensa?

**Next Suggestions EN**

- Real cases?
- What did she learn in banking?
- How she thinks?

**Links de navegación**

- → Ver Proyectos / → See Projects: `/projects`

---

### 17. banking_experience

**Preguntas/frases que dispara en español**

- banca
- banco
- bancaria
- bancario
- banca digital
- banca corporativa
- corporate banking
- onboarding
- cobranzas
- pagos
- compliance
- regulacion
- regulación
- legacy
- servicios financieros

**Questions/phrases that trigger it in English**

- banking
- digital banking
- corporate banking
- onboarding
- collections
- payments
- compliance
- regulation
- legacy
- financial services

**Respuesta principal ES**

La banca fue una etapa importante porque producto dejó de ser solamente experiencia y negocio y pasó a ser **sistema**.

Trabajé varios años alrededor de cobranzas, pagos, onboarding empresarial y otros desafíos de servicios financieros. Había usuarios, tecnología, legacy, seguridad, compliance, riesgo, operación, métricas y muchas áreas tomando decisiones sobre el mismo flujo.

Ahí aprendí algo que todavía uso:

**una buena experiencia no se diseña ignorando la complejidad; se diseña absorbiéndola.**

**Main Response EN**

Banking was important because product stopped being only experience and business and became **a system**. I learned that a good experience is not designed by ignoring complexity; it is designed by absorbing it.

**Sugerencias siguientes ES**

- Productos financieros
- ¿Qué métricas mirarías?
- ¿Agile después del Agile?

**Next Suggestions EN**

- Financial products
- What metrics would you watch?
- Agile After Agile?

---

### 18. ecommerce_experience

**Preguntas/frases que dispara en español**

- ecommerce
- e-commerce
- marketplace
- sellers
- vendedores
- growth
- marketing inteligente
- publicidad digital
- integraciones
- alto rendimiento

**Questions/phrases that trigger it in English**

- ecommerce
- e-commerce
- marketplace
- sellers
- growth
- smart marketing
- digital advertising
- integrations
- high performance

**Respuesta principal ES**

Mi etapa en e-commerce fue mi prueba de que los equipos de alto rendimiento no son una slide de consultoría. Existen.

Trabajé en productos para sellers, growth, marketing inteligente, integraciones con plataformas publicitarias y experimentación. Pero el aprendizaje más grande no fue una feature.

Fue experimentar un entorno con mucho contexto, autonomía, excelencia técnica y gente profundamente comprometida.

Ahí entendí algo que después apareció una y otra vez en mi carrera:

**Agile funciona muchísimo mejor como cultura que como ceremonia.**

**Main Response EN**

My e-commerce stage proved to me that high-performing teams are not a consulting slide. They exist. That is where I understood that **Agile works much better as culture than as ceremony**.

**Sugerencias siguientes ES**

- ¿Cómo construye equipos?
- ¿Agile después del Agile?
- ¿Cómo piensa?

**Next Suggestions EN**

- How she builds teams?
- Agile After Agile?
- How she thinks?

---

### 19. insurtech_growth

**Preguntas/frases que dispara en español**

- insurtech
- seguros
- growth
- adquisicion
- adquisición
- seo
- sem
- funnel
- conversion
- conversión
- ventas
- call center
- operacion
- operación

**Questions/phrases that trigger it in English**

- insurtech
- insurance
- growth
- acquisition
- seo
- sem
- funnel
- conversion
- sales
- call center
- operations

**Respuesta principal ES**

En insurtech mi mirada se hizo bastante más amplia.

Entré desde Growth: adquisición, SEO/SEM, funnels, conversión y experimentación. Pero el producto real cruzaba Comunicación, Tecnología, Call Center, Ventas, RRHH y operación.

Trabajar tan cerca de mundos distintos me enseñó algo central:

**cada área ve una parte verdadera del problema.**

La calidad aparece cuando conseguís poner esas miradas a conversar en lugar de competir.

**Main Response EN**

In insurtech, my lens became wider. Growth, acquisition, funnels and conversion quickly crossed operations, sales, support and technology. It taught me that **each area sees a true part of the problem**.

**Sugerencias siguientes ES**

- ¿Qué la distingue?
- ¿Cómo lidera?
- ¿Cómo piensa?

**Next Suggestions EN**

- What makes her different?
- How she leads?
- How she thinks?

---

### 20. early_career

**Preguntas/frases que dispara en español**

- primeros trabajos
- inicios
- seo
- performance
- marketing digital
- antes de producto
- datos
- cuentas
- anunciantes

**Questions/phrases that trigger it in English**

- early career
- beginnings
- seo
- performance
- digital marketing
- before product
- data
- accounts
- advertisers

**Respuesta principal ES**

Antes de llamarlo Producto, ya estaba bastante obsesionada con entender comportamiento.

Empecé trabajando con SEO: búsquedas, intención y pequeños cambios capaces de modificar muchísimo cómo una persona encuentra algo. Después trabajé con estrategia digital, performance y crecimiento de cuentas para anunciantes.

Ahí conviví con cantidades enormes de datos. Y aprendí una lección que todavía uso:

**tener datos no significa saber qué hacer.**

**Main Response EN**

Before calling it Product, I was already obsessed with understanding behavior. I worked with SEO, intent, digital strategy, performance and data. I learned something I still use: **having data does not mean knowing what to do**.

**Sugerencias siguientes ES**

- ¿Cómo llegó a producto?
- ¿Qué métricas mirarías?
- Experiencia

**Next Suggestions EN**

- How she got into product?
- What metrics would you watch?
- Experience

---

### 21. education

**Preguntas/frases que dispara en español**

- formacion
- formación
- estudios
- educacion
- educación
- certificaciones
- certificacion
- certificación
- uade
- mit
- producthub
- ai first
- claude code
- leadership agility
- data analytics
- seo
- analytics

**Questions/phrases that trigger it in English**

- education
- studies
- degree
- certifications
- certification
- mit
- producthub
- ai first
- claude code
- leadership agility
- data analytics
- seo
- analytics

**Respuesta principal ES**

Mi formación empezó en Relaciones Públicas e Institucionales, algo que con el tiempo descubrí que tenía mucha más relación con Producto de la que imaginaba: comunicación, stakeholders, comportamiento y organizaciones.

Después fui construyendo una formación híbrida entre producto, liderazgo, datos y tecnología. Entre los últimos focos están **MIT xPRO — Designing and Building AI Products and Services**, **AI First Product Management**, Claude / Claude Code e IA aplicada, Leadership Agility, Data Analytics, Analytics, SEO y performance.

Pero probablemente mi formación más constante sea otra:

**construir, probar algo nuevo y obligarme a entender cómo funciona.**

**Main Response EN**

My education started in Public and Institutional Relations, which later proved closer to Product than I imagined: communication, stakeholders, behavior and organizations. Then I built a hybrid path across product, leadership, data and technology, including AI products and services, AI-first product management, Claude / Claude Code, Leadership Agility, Data Analytics, SEO and performance.

**Sugerencias siguientes ES**

- ¿Herramientas que usa?
- ¿Cómo construye producto?
- ¿Cómo piensa?

**Next Suggestions EN**

- Tools she uses?
- How she builds product?
- How she thinks?

---

### 22. current_work

**Preguntas/frases que dispara en español**

- actual
- trabaja ahora
- trabaja hoy
- donde trabaja
- dónde trabaja
- consultoria
- consultoría
- actualmente
- hoy trabaja
- delivery
- arquitectura
- qa
- banca digital
- corporate banking
- asistentes
- agentes

**Questions/phrases that trigger it in English**

- current
- works now
- where she works
- consulting
- currently
- delivery
- architecture
- qa
- digital banking
- corporate banking
- assistants
- agents

**Respuesta principal ES**

Hoy mi rol es bastante más amplio que “hacer producto”.

Trabajo en contextos complejos donde aparecen delivery, equipos, clientes, tecnología, UX, QA, arquitectura, dependencias, liderazgo y negocio al mismo tiempo.

También es el espacio donde estoy experimentando mucho más profundamente con IA aplicada al trabajo real: agentes, asistentes, generación de especificaciones, automatización de testing, nuevas formas de discovery y nuevas dinámicas de equipo.

Esa mezcla conecta con preguntas que hoy me interesan mucho: **cómo lideramos equipos aumentados por IA, qué dejamos de hacer manualmente y qué se vuelve todavía más humano cuando la máquina puede hacer más**.

**Main Response EN**

Today my role is broader than “doing product”. I work in complex contexts where delivery, teams, clients, technology, UX, QA, architecture, dependencies, leadership and business all appear at the same time. I am also experimenting with AI applied to real work: agents, assistants, specifications, testing automation and new team dynamics.

**Sugerencias siguientes ES**

- Agentes de IA
- Specs con IA
- QA desde origen

**Next Suggestions EN**

- AI agents
- AI specs
- Quality from the start

---

### 23. ai_product

**Preguntas/frases que dispara en español**

- ai
- ia
- inteligencia artificial
- agentes
- llm
- llms
- gpt
- notebooklm
- notebook llm
- copilot
- prompting
- automatizacion
- automatización
- machine learning
- humanos y algoritmos
- humanos ia
- algoritmos
- claude
- chatgpt
- openai
- gemini
- cursor
- claude code
- ia generativa
- generativa
- gen ai
- asistente ia
- herramienta ia
- integrar ia

**Questions/phrases that trigger it in English**

- ai
- artificial intelligence
- agents
- llm
- llms
- gpt
- notebooklm
- notebook llm
- copilot
- prompting
- automation
- machine learning
- humans and algorithms
- humans ai
- claude
- chatgpt
- openai
- gemini
- cursor
- generative ai
- ai assistant
- ai tool

**Respuesta principal ES**

“Humanos + IA” nace de una incomodidad.

Durante mucho tiempo hablamos de IA preguntando qué tareas puede hacer la máquina. A mí me interesa cada vez más la otra mitad:

**¿qué deberíamos hacer mejor nosotros ahora que la máquina puede hacer todo esto?**

Mejor contexto. Mejores preguntas. Mejor criterio. Más curiosidad. Más aprendizaje.

No pienso la IA como reemplazo del humano ni como copiloto mágico.

La pienso como una nueva pieza dentro del sistema de trabajo. Y cuando agregás una pieza tan potente, inevitablemente cambia el resto.

**Main Response EN**

“Humans + AI” starts from a discomfort. We have spent a lot of time asking what tasks the machine can do. I care about the other half: **what should we do better now that the machine can do all this?** Better context, better questions, better judgment, more curiosity and more learning.

**Sugerencias siguientes ES**

- ¿Cómo cambia el rol de PM?
- Agentes de IA
- ¿NotebookLM?

**Next Suggestions EN**

- How does AI change the PM role?
- AI agents
- NotebookLM?

---

### 24. leadership

**Preguntas/frases que dispara en español**

- liderazgo
- liderar
- lidera
- equipo
- equipos
- gestión
- gestion
- manage
- management
- cultura
- colaboracion
- colaboración
- squad
- squads
- pm
- product manager
- product owner
- po
- lider
- líder
- feedback
- empatia
- empatía
- mentoring
- comunicacion
- comunicación
- dirigir
- diversidad
- inclusion
- inclusión
- mujeres
- women in tech
- confianza
- entorno
- crecimiento profesional
- acompanamiento
- acompañamiento
- retro
- retrospectiva
- one on one
- 1 a 1

**Questions/phrases that trigger it in English**

- leadership
- lead
- team
- teams
- management
- culture
- collaboration
- squad
- pm
- product manager
- product owner
- leader
- feedback
- empathy
- mentoring
- communication
- diversity
- inclusion
- women in tech
- trust
- environment
- professional growth
- support
- retrospective
- one on one

**Respuesta principal ES**

Liderar me resultó bastante diferente de lo que imaginaba.

Pensaba que tenía que tener más respuestas. Terminé aprendiendo que muchas veces mi trabajo era **crear las condiciones para que otras personas pudieran encontrarlas**.

Para mí eso significa dar contexto, hacer visibles las tensiones, ayudar a priorizar, proteger foco, decir verdades incómodas temprano y generar suficiente confianza para que alguien pueda decir “esto no está funcionando”.

También implica conocer a las personas. No todos necesitan lo mismo para crecer.

Intento equilibrar dos cosas que viven en tensión:

**cuidar a las personas y cuidar el resultado.**

Creo que un buen liderazgo necesita ambas. ❤️

**Main Response EN**

Leadership turned out to be different from what I imagined. I thought I needed more answers. I ended up learning that often my job is **to create the conditions for other people to find them**. I try to balance **caring for people and caring for the result**. Good leadership needs both. ❤️

**Sugerencias siguientes ES**

- Mi equipo no está entregando
- ¿Cómo liderás ambigüedad?
- ¿Cómo equilibrás velocidad y calidad?

**Next Suggestions EN**

- My team is not delivering
- How do you lead ambiguity?
- How do you balance speed and quality?

---

### 25. methodology

**Preguntas/frases que dispara en español**

- discovery
- delivery
- roadmap
- priorizar
- priorización
- metodologia
- metodología
- proceso
- agile
- agil
- ágil
- scrum
- sprint
- iteracion
- iteración
- métricas
- metricas
- decisiones
- ambiguedad
- ambigüedad
- forma de trabajar
- backlog
- lean
- design thinking
- experimento
- hipotesis
- hipótesis
- funnel
- conversion
- conversión
- datos
- prioridad
- mejora continua
- ceremonias
- historias de usuario
- story mapping
- construye producto
- discovery o delivery
- bajar estrategia a ejecucion

**Questions/phrases that trigger it in English**

- discovery
- delivery
- roadmap
- prioritize
- methodology
- process
- agile
- scrum
- sprint
- metrics
- decisions
- work method
- backlog
- lean
- design thinking
- experiment
- hypothesis
- data
- priority
- ceremonies
- user story
- strategy to execution

**Respuesta principal ES**

No tengo demasiado apego a una metodología específica.

Tengo bastante apego a algunas preguntas: **qué problema estamos resolviendo, para quién, qué evidencia tenemos, qué estamos asumiendo, qué riesgo tomamos y cómo sabremos si funcionó**.

Después puedo usar discovery, story mapping, experimentos, métricas, Scrum, Kanban, prototipos, IA o una pizarra con post-its.

El framework es una herramienta. El objetivo es que el equipo consiga pasar de **incertidumbre → decisión → ejecución → aprendizaje**. Y hacerlo cada vez mejor.

**Main Response EN**

I am not very attached to one methodology. I am attached to questions: what problem are we solving, for whom, what evidence do we have, what are we assuming, what risk are we taking and how will we know if it worked? The framework is a tool. The goal is **uncertainty → decision → execution → learning**.

**Sugerencias siguientes ES**

- Tengo una idea de producto
- ¿Velocidad o calidad?
- ¿Qué métricas mirarías?

**Next Suggestions EN**

- I have a product idea
- Speed or quality?
- What metrics would you watch?

---

### 26. tools_stack

**Preguntas/frases que dispara en español**

- herramientas
- figma
- jira
- azure devops
- notion
- miro
- confluence
- amplitude
- mixpanel
- ga4
- gtm
- google tag manager
- hotjar
- looker
- metabase
- sql
- sheets
- slack
- linear
- asana
- trello
- stack
- software
- aplicaciones
- programas
- que usa
- qué usa
- analytics
- figjam
- github copilot
- cursor
- notebooklm
- claude

**Questions/phrases that trigger it in English**

- tools
- figma
- jira
- azure devops
- notion
- miro
- confluence
- amplitude
- mixpanel
- ga4
- gtm
- google tag manager
- hotjar
- looker
- metabase
- sql
- sheets
- slack
- linear
- asana
- trello
- stack
- apps
- analytics
- figjam
- github copilot
- cursor
- notebooklm
- claude

**Respuesta principal ES**

Mi stack cambia muchísimo según el contexto.

Para producto y colaboración suelo trabajar con **Jira/Azure DevOps, Confluence, Miro/FigJam, Figma y Google Workspace**. Para datos: **Analytics, Tag Manager, dashboards, Sheets y distintas plataformas de analytics**.

Hoy una parte enorme de mi exploración está en IA: **ChatGPT, Claude, Claude Code, NotebookLM, Gemini, Copilot y herramientas de desarrollo asistido por IA**.

Pero tengo una regla simple: **no me interesa coleccionar herramientas**. Me interesa qué capacidad nueva habilitan.

**Main Response EN**

My stack changes depending on context. I use product, collaboration, analytics and AI tools, but I have a simple rule: **I am not interested in collecting tools**. I care about the capability they enable.

**Sugerencias siguientes ES**

- ¿Metodología?
- ¿Cómo usa AI?
- ¿Ver proyectos?

**Next Suggestions EN**

- Methodology?
- How she uses AI?
- See projects?

---

### 27. fintech

**Preguntas/frases que dispara en español**

- fintech
- financiero
- pagos digitales
- transformacion digital
- transformación digital
- banca digital
- insurtech
- cobro digital
- bancario
- aseguradora
- medios de pago
- sector financiero
- onboarding digital
- compliance
- regulacion
- regulación

**Questions/phrases that trigger it in English**

- fintech
- financial
- digital payments
- digital transformation
- digital banking
- insurtech
- insurance
- banking sector
- payment methods
- financial sector
- digital onboarding
- compliance
- regulation

**Respuesta principal ES**

Trabajé varios años alrededor de banca, pagos, cobranzas, onboarding, insurtech y canales digitales.

Si tuviera que resumir qué hace diferente a estos productos diría: **la confianza forma parte de la UX**.

Seguridad, regulación, trazabilidad, disponibilidad y operación no son temas “de atrás”. El usuario los siente aunque nunca vea una arquitectura, una conciliación o una regla de compliance. Eso obliga a construir producto mirando el sistema completo.

**Main Response EN**

I worked for years around banking, payments, onboarding, insurtech and digital channels. What makes these products different is that **trust is part of the UX**. Security, regulation, traceability and operations are felt by users even when they never see them.

**Sugerencias siguientes ES**

- Experiencia en banca
- ¿Métricas?
- ¿Banca digital?

**Next Suggestions EN**

- Banking experience
- Metrics?
- Digital banking?

---

### 28. projects

**Preguntas/frases que dispara en español**

- proyectos
- casos
- ver
- portfolio
- portafolio
- case study
- case studies
- trabajo
- trabajos
- ejemplos
- que construyo
- qué construyó

**Questions/phrases that trigger it in English**

- projects
- cases
- see
- portfolio
- case study
- case studies
- work
- examples
- what she built

**Respuesta principal ES**

Hay proyectos muy distintos: **banca digital y corporate banking**, **e-commerce y growth**, **IA aplicada**, **transformación de equipos** e **ideas que terminaron en charlas**.

Lo que intento mostrar en cada caso no es solamente **qué construimos**, sino **qué problema había, qué decidimos y qué aprendí**.

**Main Response EN**

There are very different projects: digital banking, corporate banking, e-commerce and growth, applied AI, team transformation and ideas that became talks. What I try to show is not only what we built, but what problem existed, what we decided and what I learned.

**Sugerencias siguientes ES**

- ¿Qué aprendió en banca?
- E-commerce y growth
- IA aplicada

**Next Suggestions EN**

- What did she learn in banking?
- E-commerce and growth
- Applied AI

**Links de navegación**

- → Ver Proyectos / → See Projects: `/projects`

---

### 29. contact_cv

**Preguntas/frases que dispara en español**

- contacto
- contactar
- email
- mail
- cv
- curriculum
- descargar
- linkedin
- one sheet
- onesheet
- whatsapp
- llamar
- llamada
- escribirle
- escribirla
- reunion
- reunión
- hablar
- telefono
- teléfono
- mensaje
- como contactar

**Questions/phrases that trigger it in English**

- contact
- reach out
- email
- mail
- cv
- resume
- download
- linkedin
- one sheet
- whatsapp
- call
- meeting
- phone
- message
- how to contact

**Respuesta principal ES**

Si algo de lo que viste acá te disparó una conversación, escribime.

**LinkedIn:** Barbara Aceto  
**Email:** aceto.barbara@gmail.com  
**WhatsApp:** +54 9 11 6209 3765

Y un pedido: si me escribís, contame primero **qué problema estás intentando resolver**. Probablemente sea una conversación mucho más interesante. 🙂

**Main Response EN**

If something you saw here sparked a conversation, write to me. **LinkedIn:** Barbara Aceto. **Email:** aceto.barbara@gmail.com. **WhatsApp:** +54 9 11 6209 3765. If you write, tell me first what problem you are trying to solve.

**Sugerencias siguientes ES**

- ¿Cómo trabaja?
- ¿Ver proyectos?
- ¿Experiencia?

**Next Suggestions EN**

- How she works?
- See projects?
- Experience?

**Links de navegación**

- → Ver One Sheet / → See One Sheet: `/one-sheet`

---

### 30. motivation

**Preguntas/frases que dispara en español**

- motiva
- motivacion
- motivación
- te gusta
- le gusta
- disfruta
- por que hace
- por qué hace
- pasion
- pasión
- que le apasiona
- qué le apasiona

**Questions/phrases that trigger it in English**

- motivation
- motivates
- likes
- enjoys
- why she does it
- passion
- what she loves

**Respuesta principal ES**

Hay un momento del trabajo que me encanta: cuando algo que parecía un lío enorme empieza a tener forma.

Cuando el equipo entiende el problema. Cuando aparecen palabras comunes. Cuando una discusión eterna se convierte en una decisión. Cuando alguien que necesitaba pedir permiso para todo empieza a decidir solo.

Eso me motiva muchísimo.

Lo que me desgasta: **reuniones sin decisión, frameworks por inercia, política organizacional disfrazada de proceso y estrategia que nunca toca producción**.

**Main Response EN**

I love the moment when something messy starts taking shape: the team understands the problem, common language appears and an endless discussion becomes a decision. What drains me is meetings without decisions, frameworks by inertia and strategy that never reaches production.

**Sugerencias siguientes ES**

- ¿Cómo lidera?
- ¿Qué la distingue?
- ¿Desafío complejo?

**Next Suggestions EN**

- How she leads?
- What makes her different?
- Complex challenge?

---

### 31. ai_opinion

**Preguntas/frases que dispara en español**

- opinion
- opinión
- futuro
- robots
- reemplazar
- automatizacion
- automatización
- perder trabajo
- reemplaza
- ai reemplaza
- inteligencia artificial reemplaza
- que piensa
- qué piensa
- vision
- visión
- vision ai
- visión ai
- su vision
- su visión
- vision sobre

**Questions/phrases that trigger it in English**

- opinion
- future
- robots
- replace
- automation
- lose jobs
- ai replace
- artificial intelligence replace
- what she thinks
- vision
- ai vision

**Respuesta principal ES**

No creo que la discusión más interesante sea si “la IA va a reemplazar personas”.

La transformación ya empezó antes de resolver esa pregunta. Está cambiando cómo buscamos, escribimos, analizamos, programamos, diseñamos, documentamos, investigamos y aprendemos.

Para mí la pregunta relevante es: **¿qué hacemos con la capacidad que acaba de quedar liberada?**

Podemos usarla para producir diez veces más cosas. O podemos usarla para pensar mejor, probar más, entender antes y resolver problemas que antes eran demasiado caros.

Me interesa mucho más la segunda opción.

La IA amplifica capacidad. Y también amplifica mediocridad. Por eso el criterio humano importa más, no menos.

**Main Response EN**

I do not think the most interesting discussion is whether AI will replace people. The transformation has already started. For me, the relevant question is: **what do we do with the capacity that just got freed?** We can produce ten times more things, or think better, test more and solve problems that used to be too expensive.

**Sugerencias siguientes ES**

- IA y equipos
- Aprendizaje organizacional
- ¿Qué no automatizarías?

**Next Suggestions EN**

- AI and teams
- Organizational learning
- What would you not automate?

---

### 32. talks

**Preguntas/frases que dispara en español**

- talks
- charlas
- speaker
- conferencia
- conferencias
- cursos
- workshop
- workshops
- ensenar
- enseñar
- humanos y algoritmos
- agile summit
- agile summit uruguay
- agile despues del agile
- agile después del agile
- uruguay

**Questions/phrases that trigger it in English**

- talks
- speaker
- conference
- conferences
- courses
- workshop
- workshops
- teach
- humans and algorithms
- agile summit
- agile summit uruguay
- agile after agile
- uruguay

**Respuesta principal ES**

Mis charlas suelen empezar con algo que me está incomodando.

**Agile después del Agile**, por ejemplo, nació de una pregunta: si cambiaron la tecnología, los equipos, los productos y la velocidad del contexto, **¿por qué seguimos trabajando exactamente igual?**

Mi conclusión fue simple:

> Iteramos el producto.  
> Quizás también deberíamos iterar el sistema con el que lo construimos.

En **Humanos + Algoritmos** la pregunta es otra: si la IA puede hacer cada vez más, **¿qué necesitamos aprender nosotros?**

No me interesa demasiado dar charlas donde la gente salga diciendo “qué interesante”. Prefiero que salga pensando: **“mañana voy a cambiar algo”.**

**Main Response EN**

My talks usually start with something that is bothering me. **Agile After Agile** came from a question: if technology, teams, products and context speed have changed, why are we still working the same way? We iterate the product. Maybe we should also iterate the system we use to build it.

**Sugerencias siguientes ES**

- Agile después del Agile
- Humanos + IA
- ¿Podemos trabajar juntos?

**Next Suggestions EN**

- Agile After Agile
- Humans + AI
- Can we work together?

**Links de navegación**

- → Ver Notas / → See Notes: `/notes`

---

### 33. notes_press

**Preguntas/frases que dispara en español**

- notas
- nota
- articulos
- artículos
- articulo
- escribe
- escrito
- publica
- reflexiones
- contenido
- prensa
- noticias
- women in tech
- mujeres en tech
- mujeres
- diversidad
- claude code
- reinventandome
- reinventándome
- reinvencion
- reinvención
- product ops
- operaciones de producto
- data strategy
- estrategia de datos
- design systems
- scaling teams
- escalar equipos

**Questions/phrases that trigger it in English**

- notes
- note
- articles
- article
- writes
- written
- posts
- content
- reflections
- press
- news
- women in tech
- women
- diversity
- claude code
- reinventing
- reinvention
- product ops
- data strategy
- design systems
- scaling teams

**Respuesta principal ES**

Escribo principalmente para pensar.

Muchas notas empiezan con algo que viví, algo que salió mal, una conversación o una idea que todavía no tengo completamente resuelta.

Los temas se repiten bastante: **Producto. IA. Equipos. Liderazgo. Agile. Aprendizaje.**

Pero el hilo común probablemente sea otro: cómo seguimos construyendo cosas valiosas en un contexto que cambia cada vez más rápido.

No escribo desde un lugar de tener todas las respuestas. Escribo bastante desde el lugar de **estar tratando de encontrar mejores preguntas**.

**Main Response EN**

I write mostly to think. Many notes start with something I lived, something that went wrong, a conversation or an unresolved idea. The recurring topics are Product, AI, teams, leadership, Agile and learning. I write from trying to find better questions.

**Sugerencias siguientes ES**

- IA y futuro del trabajo
- ¿Cómo lidera equipos?
- ¿Cómo construye producto?

**Next Suggestions EN**

- AI and the future of work
- How she leads teams
- How she builds product

**Links de navegación**

- → Ver Notas / → See Notes: `/notes`

---

### 34. challenge

**Preguntas/frases que dispara en español**

- desafio
- desafío
- reto
- problema complejo
- dificil
- difícil
- mas complejo
- más complejo
- caso complejo
- situacion dificil
- situación difícil
- problema dificil
- problema difícil

**Questions/phrases that trigger it in English**

- challenge
- complex
- difficult
- hard problem
- toughest
- most complex
- hardest

**Respuesta principal ES**

Dale. Hagamos una cosa.

Antes de buscar soluciones, contame cinco cosas:

**1. ¿Qué está pasando?**  
**2. ¿Por qué es un problema ahora?**  
**3. ¿Quiénes están involucrados?**  
**4. ¿Qué intentaron?**  
**5. ¿Qué decisión está trabada?**

Después intento separar síntomas, causas, tensiones y restricciones. Normalmente el problema que llega escrito en la primera línea no termina siendo el verdadero problema. Esa es justamente la parte interesante.

**Main Response EN**

Let’s do one thing. Before looking for solutions, tell me five things: what is happening, why now, who is involved, what have you tried and which decision is stuck. Then we can separate symptoms, causes, tensions and constraints.

**Sugerencias siguientes ES**

- Stakeholders desalineados
- Productos financieros
- ¿Cómo piensa?

**Next Suggestions EN**

- Misaligned stakeholders
- Financial products
- How she thinks?

---

### 35. availability

**Preguntas/frases que dispara en español**

- disponible
- disponibilidad
- busca trabajo
- open to work
- contratar
- contratarla
- trabajo nuevo
- buscando trabajo
- oportunidad
- oportunidades
- entrevistar
- hablar con ella
- empleo
- oferta
- oferta laboral
- proyecto nuevo
- freelance
- consulting

**Questions/phrases that trigger it in English**

- available
- availability
- looking for work
- open to work
- hire
- hiring
- job opportunity
- new role
- new project
- reach out
- interview
- freelance
- consulting
- contract

**Respuesta principal ES**

Puede ser. 🙂

Me interesan especialmente proyectos donde haya que conectar varias piezas: **producto + negocio + tecnología + personas + IA**.

Puedo aportar desde liderazgo/producto, workshops, capacitación, diagnóstico de equipos, adopción de IA o desafíos concretos de producto y transformación.

Si querés conversar: **aceto.barbara@gmail.com**

Mandame contexto antes que un brief perfecto. Podemos construir el resto juntos.

**Main Response EN**

Maybe. 🙂 I am especially interested in projects that connect **product + business + technology + people + AI**. To talk: **aceto.barbara@gmail.com**. Send context before a perfect brief; we can build the rest together.

**Sugerencias siguientes ES**

- ¿Cómo trabaja?
- Tengo un desafío
- Ver One Sheet

**Next Suggestions EN**

- How she works?
- I have a challenge
- See One Sheet

**Links de navegación**

- → Ver One Sheet / → See One Sheet: `/one-sheet`

---

### 36. location_remote

**Preguntas/frases que dispara en español**

- donde vive
- dónde vive
- donde esta
- dónde está
- ubicacion
- ubicación
- pais
- país
- ciudad
- argentina
- buenos aires
- remoto
- hibrido
- híbrido
- presencial
- trabaja remoto
- zona horaria
- timezone
- idioma
- idiomas
- ingles
- inglés
- habla ingles
- bilingue
- bilingüe
- relocation
- remota
- trabaja desde
- italiano

**Questions/phrases that trigger it in English**

- where is she
- where she lives
- location
- country
- city
- argentina
- buenos aires
- remote
- hybrid
- in-person
- timezone
- language
- languages
- english
- speaks english
- bilingual
- based
- relocation
- work from
- italian

**Respuesta principal ES**

Barbi está en **Buenos Aires, Argentina (UTC-3)** y trabaja con equipos locales, regionales y distribuidos.

Puede trabajar remoto, híbrido o presencial según el proyecto.

Idiomas:

**Español:** nativo  
**Inglés:** profesional  
**Italiano:** en aprendizaje

Para proyectos internacionales, el remoto es totalmente natural.

**Main Response EN**

Barbi is in **Buenos Aires, Argentina (UTC-3)** and works with local, regional and distributed teams. She can work remote, hybrid or in person depending on the project. Spanish native, professional English and learning Italian.

**Sugerencias siguientes ES**

- ¿Podemos trabajar juntos?
- Contactarla
- ¿Cómo trabaja?

**Next Suggestions EN**

- Can we work together?
- Contact her
- How she works?

---

### 37. differentiator

**Preguntas/frases que dispara en español**

- diferencia
- diferenciador
- diferente
- unico
- único
- por que producto
- por qué producto
- que la hace distinta
- qué la hace distinta
- valor diferencial
- propuesta de valor
- fortaleza
- fortalezas
- distingue
- distinta

**Questions/phrases that trigger it in English**

- differentiator
- different
- unique
- why product
- what makes her different
- value proposition
- strength
- strengths
- stand out
- stands out
- sets her apart

**Respuesta principal ES**

Probablemente mi diferencial venga de haber estado muchas veces **en el medio**.

Entre negocio y tecnología. Entre estrategia y ejecución. Entre usuario y operación. Entre velocidad y calidad. Entre equipos y management. Y ahora, entre humanos y algoritmos.

Aprendí a traducir esos mundos sin simplificarlos demasiado.

Y hay algo más: **no me quedo demasiado cómoda en la teoría**.

Me gusta transformar conversaciones en decisiones y decisiones en algo que eventualmente llegue a producción. Mi lugar favorito suele ser ese: **cuando todavía hay bastante caos, pero ya podemos empezar a construir dirección**.

**Main Response EN**

My differentiator probably comes from having spent a lot of time **in the middle**: between business and technology, strategy and execution, users and operations, speed and quality, teams and management, and now humans and algorithms. I like turning conversations into decisions and decisions into something that reaches production.

**Sugerencias siguientes ES**

- Casos reales
- Tengo un desafío
- ¿Cómo piensa?

**Next Suggestions EN**

- Real cases
- I have a challenge
- How she thinks?

---

### 38. help_menu

**Preguntas/frases que dispara en español**

- menu
- que me podes contar
- que podes decirme
- que podes
- que podés
- opciones
- ayuda
- que preguntar
- temas
- lista
- que sabe
- qué sabe
- que temas
- qué temas

**Questions/phrases that trigger it in English**

- menu
- what can you tell
- what can you do
- what can you say
- options
- help
- what to ask
- what do you know
- topics
- list of topics
- what do you cover

**Respuesta principal ES**

Puedo hacer bastante más que contarte el CV de Barbi.

Probá alguna:

**👋 Conocerla** “¿Qué la hace diferente?”

**🚀 Producto** “Tengo una idea, ¿cómo la validarías?”

**👥 Equipos** “Mi equipo no está entregando.”

**🧩 Estrategia** “Todo es prioridad.”

**🤖 IA** “Quiero incorporar IA a mi empresa.”

**🎤 Ideas** “¿Qué significa Agile después del Agile?”

**🔥 Desafiarla** “Te cuento un problema y decime qué harías.”

Esta última suele ser la más interesante.

**Main Response EN**

I can do more than tell you Barbi’s CV. Try Product, teams, strategy, AI, ideas or a real challenge. The most interesting one is usually: tell me a problem and I will tell you how I would approach it.

**Sugerencias siguientes ES**

- Conocer a Barbi
- ¿Qué es Humanos + IA?
- Quiero aplicar IA, ¿por dónde empiezo?

**Next Suggestions EN**

- Get to know Barbi
- What is Humans + AI?
- I want to apply AI, where do I start?

---

### 39. short_ack

**Preguntas/frases que dispara en español**

- dale
- joya
- copado
- genial
- perfecto
- excelente
- gracias
- buenisimo
- buenísimo
- entendido
- listo
- okey

**Questions/phrases that trigger it in English**

- thanks
- thank you
- great
- perfect
- cool
- awesome
- got it
- nice
- understood
- sure

**Respuesta principal ES**

💛 Gracias. ¿Seguimos?

**Variantes ES**

**Variante 1:**

💛 Gracias. ¿Seguimos?

**Variante 2:**

Buenísimo. Ahora traeme el caso difícil. 😏

**Variante 3:**

Genial. ¿Querés conocer más de Barbi o ponerla a resolver algo?

**Main Response EN**

💛 Thanks. Shall we keep going?

**Variants EN**

**Variant 1:**

💛 Thanks. Shall we keep going?

**Variant 2:**

Great. Now bring me the hard case. 😏

**Variant 3:**

Nice. Do you want to know more about Barbi or put her to work on something?

**Sugerencias siguientes ES**

- Bajarlo a un caso
- ¿Qué evitar?
- ¿Qué validar primero?

**Next Suggestions EN**

- Apply it to a case
- What to avoid?
- What to validate first?

---

### 40. agile_after_agile

**Preguntas/frases que dispara en español**

- agile después del agile
- agile despues del agile
- agile summit
- nueva agilidad
- futuro de agile
- agile ya no sirve
- cambiar ceremonias
- iterar agile
- evolucionar agile

**Questions/phrases that trigger it in English**

- agile after agile
- agile summit
- new agility
- future of agile
- agile does not work
- change ceremonies
- iterate agile
- evolve agile

**Respuesta principal ES**

Agile resolvió un problema enorme: dejar de construir durante meses sin mirar la realidad.

Pero el contexto volvió a cambiar. Hoy tenemos IA, nuevos roles, equipos distribuidos, DevOps, Product, Design Systems, automatización, datos en tiempo real y una velocidad tecnológica completamente distinta.

Y, sin embargo, muchas organizaciones siguen ejecutando Agile casi exactamente como hace diez años.

Mi propuesta es bastante simple: **aplicar Agile sobre Agile**. Inspeccionar también nuestras ceremonias, roles, artefactos y formas de decidir.

La frase que resume la idea: **iteramos el producto, pero también tenemos que iterar el sistema con el que lo construimos**.

**Main Response EN**

Agile solved a huge problem: no more building for months without looking at reality. But the context changed again. My proposal is simple: **apply Agile to Agile**. Inspect our ceremonies, roles, artifacts and ways of deciding. We iterate the product; we should also iterate the system we use to build it.

**Sugerencias siguientes ES**

- ¿Qué no haría Barbi?
- ¿Cómo construye producto?
- Ver notas

**Next Suggestions EN**

- What would Barbi not do?
- How she builds product?
- See notes

**Links de navegación**

- → Ver Notas / → See Notes: `/notes`

---

### 41. spec_driven_ai

**Preguntas/frases que dispara en español**

- spec driven
- spec driven development
- especificaciones ia
- specs con ia
- historias de usuario con ia
- requirements ai
- ai delivery
- documentacion con ia
- documentación con ia
- agentes y especificaciones

**Questions/phrases that trigger it in English**

- spec driven
- spec driven development
- ai specifications
- specs with ai
- user stories with ai
- requirements ai
- ai delivery
- documentation with ai
- agents and specifications

**Respuesta principal ES**

Una de las cosas que más estoy explorando es cómo cambia el delivery cuando las especificaciones dejan de ser simplemente documentos para humanos y empiezan a convertirse también en **contexto operativo para agentes de IA**.

Specs más claras pueden alimentar: producto → desarrollo → testing → documentación → automatización.

Eso cambia incluso la conversación sobre historias de usuario. Quizás el futuro no sea escribirlas más rápido con IA. Quizás sea dejar de pensar el proceso como una cadena de documentos manuales.

Ahí hay una transformación mucho más interesante.

**Main Response EN**

I am exploring how delivery changes when specifications stop being just documents for humans and also become **operational context for AI agents**. Clearer specs can feed product, development, testing, documentation and automation.

**Sugerencias siguientes ES**

- Agentes de IA
- QA desde origen
- ¿Cómo cambia el rol de PM?

**Next Suggestions EN**

- AI agents
- Quality from the start
- How does AI change the PM role?

---

### 42. ai_agents

**Preguntas/frases que dispara en español**

- agentes
- agentes de ia
- ai agents
- agentes autonomos
- agentes autónomos
- agentic ai
- workflows con ia
- humano en el loop
- human in the loop

**Questions/phrases that trigger it in English**

- agents
- ai agents
- autonomous agents
- agentic ai
- workflows with ai
- human in the loop

**Respuesta principal ES**

Un agente no me interesa porque “hace cosas solo”. Me interesa cuando puede ocupar un lugar concreto dentro de un workflow.

Por ejemplo: leer contexto → interpretar una especificación → ejecutar una tarea → validar → devolver evidencia.

Estoy experimentando bastante con agentes alrededor de producto, especificaciones y testing.

El desafío más interesante no es construir el agente. Es diseñar: **qué puede decidir, qué contexto necesita, cuándo tiene que pedir ayuda y quién responde por el resultado**.

Curiosamente, son preguntas bastante parecidas a las que hacemos al diseñar equipos humanos.

**Main Response EN**

An agent does not interest me because it “does things alone”. It interests me when it can occupy a concrete place inside a workflow. The real design question is what it can decide, what context it needs, when it asks for help and who is accountable for the result.

**Sugerencias siguientes ES**

- Specs con IA
- QA desde origen
- Quiero aplicar IA

**Next Suggestions EN**

- AI specs
- Quality from the start
- I want to apply AI

---

### 43. three_amigos

**Preguntas/frases que dispara en español**

- three amigos
- tres amigos
- 3 amigos
- qa dev producto
- producto desarrollo qa
- refinamiento
- refinamiento tecnico
- refinamiento técnico
- refinamiento funcional
- definition ready
- ready to dev

**Questions/phrases that trigger it in English**

- three amigos
- 3 amigos
- qa dev product
- product development qa
- refinement
- technical refinement
- functional refinement
- definition ready
- ready to dev

**Respuesta principal ES**

Me gusta el concepto de **Three Amigos** porque resuelve un problema bastante frecuente: descubrir demasiado tarde que cada disciplina entendió una cosa distinta.

Antes de desarrollar, sentaría alrededor del mismo problema a **Producto/Negocio + Desarrollo + QA**. Y según el caso, UX.

No para hacer otra ceremonia. Para responder juntos qué esperamos, qué puede fallar, cómo lo vamos a construir y cómo sabremos que está bien.

Cuando QA descubre el comportamiento esperado al final, ya llegamos tarde.

**La calidad empieza antes del código.**

**Main Response EN**

I like **Three Amigos** because it solves a frequent problem: discovering too late that each discipline understood something different. Before development, I would bring Product/Business, Development and QA around the same problem. **Quality starts before code.**

**Sugerencias siguientes ES**

- QA desde origen
- Specs con IA
- ¿Velocidad o calidad?

**Next Suggestions EN**

- Quality from the start
- AI specs
- Speed or quality?

---

### 44. qa_product

**Preguntas/frases que dispara en español**

- qa
- calidad
- quality assurance
- testing
- casos de prueba
- casos qa
- qa ownership
- ambiente qa
- qa desde origen
- shift left testing
- calidad temprana

**Questions/phrases that trigger it in English**

- qa
- quality
- quality assurance
- testing
- test cases
- qa cases
- qa ownership
- qa environment
- shift left testing
- early quality

**Respuesta principal ES**

Durante mucho tiempo tratamos QA como una etapa. Cada vez creo más que hay que tratarlo como una **capacidad del equipo**.

Si los casos aparecen después de desarrollar, QA valida. Si aparecen mientras entendemos el problema, QA ayuda a diseñar.

Esa diferencia cambia muchísimo: requisitos, edge cases, retrabajo, automatización y velocidad.

Una historia verdaderamente Ready debería permitir que Producto, Desarrollo y QA entiendan qué comportamiento estamos construyendo antes de empezar.

**La calidad tardía es cara.**

**Main Response EN**

For a long time, we treated QA as a stage. I increasingly believe we should treat it as a **team capability**. If cases appear while we understand the problem, QA helps design. **Late quality is expensive.**

**Sugerencias siguientes ES**

- Three Amigos
- Specs con IA
- ¿Velocidad o calidad?

**Next Suggestions EN**

- Three Amigos
- AI specs
- Speed or quality?

---

### 45. speaker_story

**Preguntas/frases que dispara en español**

- speaker
- primera conferencia
- conferencia
- hablar en publico
- hablar en público
- agile summit uruguay
- uruguay
- como empezo a dar charlas
- cómo empezó a dar charlas

**Questions/phrases that trigger it in English**

- speaker
- first conference
- conference
- public speaking
- agile summit uruguay
- uruguay
- how she started speaking

**Respuesta principal ES**

Durante años construí productos y lideré conversaciones puertas adentro.

En 2026 pasó algo distinto: empecé a llevar algunas de esas preguntas afuera.

En Uruguay di mi primera conferencia internacional: **Agile después del Agile**. Era mi primera conferencia. En otro país.

Claramente empezar de a poco nunca fue demasiado lo mío. 😅

Pero descubrí algo que me encantó: convertir experiencias desordenadas en una idea que otra persona pueda llevarse y usar.

Probablemente por eso hoy disfruto tanto también enseñar y diseñar capacitaciones.

**Main Response EN**

For years I built products and led conversations inside organizations. In 2026 I started taking some of those questions outside. In Uruguay I gave my first international conference: **Agile After Agile**. Clearly, starting small was never exactly my thing. 😅

**Sugerencias siguientes ES**

- Agile después del Agile
- Ver notas
- ¿Podemos trabajar juntos?

**Next Suggestions EN**

- Agile After Agile
- See notes
- Can we work together?

**Links de navegación**

- → Ver Notas / → See Notes: `/notes`

---

