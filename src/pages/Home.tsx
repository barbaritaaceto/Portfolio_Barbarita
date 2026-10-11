import { Helmet } from 'react-helmet-async';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import press from '../data/press';
import notesData from '../data/notes';
import HomeTour from '../components/HomeTour';
import SectionNav, { SectionIndex } from '../components/SectionNav';
import { useReveal } from '../hooks/useReveal';
import { track } from '../lib/analytics'
import { useScrollDepth } from '../hooks/useAnalytics'

const Trayectoria = lazy(() => import('./Trayectoria'))

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllIdeas, setShowAllIdeas] = useState(false);
  const [showAllLearnings, setShowAllLearnings] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSummitVideoPlaying, setIsSummitVideoPlaying] = useState(false);
  const [isEnglish, setIsEnglish] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('lang') === 'en';
  });
  useEffect(() => {
    const syncLanguage = () => {
      if (typeof window === 'undefined') return;
      setIsEnglish(window.localStorage.getItem('lang') === 'en');
    };

    window.addEventListener('storage', syncLanguage);
    window.addEventListener('app-language-change', syncLanguage as EventListener);
    return () => {
      window.removeEventListener('storage', syncLanguage);
      window.removeEventListener('app-language-change', syncLanguage as EventListener);
    };
  }, []);
  const scrollToEnd = () => {
    const endElement = document.getElementById('home-end');
    if (endElement) {
      endElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  const scrollToWhy = () => {
    const whyStartElement = document.getElementById('why-work-start');
    if (whyStartElement) {
      whyStartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // El guía del portfolio puede pedir que se abra el contacto
  useEffect(() => {
    const onOpenContact = () => setIsModalOpen(true)
    window.addEventListener('open-contact-modal', onOpenContact)
    return () => window.removeEventListener('open-contact-modal', onOpenContact)
  }, [])
  useEffect(() => {
    if (!isModalOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsModalOpen(false); track.closeContactModal() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isModalOpen])
  const scrollToTrayectoria = () => {
    const trayectoriaElement = document.getElementById('trayectoria-start');
    if (trayectoriaElement) {
      trayectoriaElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const scrollToNews = () => {
    const newsStartElement = document.getElementById('news-start');
    if (newsStartElement) {
      newsStartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // La flecha del inicio lleva al índice "En este portfolio"; en celular, donde no hay índice, va a Ideas
  const scrollPastHero = () => {
    const index = document.getElementById('home-section-index');
    if (index && index.offsetParent !== null) {
      const top = index.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
      track.clickScrollToSection('indice');
      return;
    }
    scrollToNews();
    track.clickScrollToSection('noticias');
  };

  useScrollDepth()

  useEffect(() => {
    track.heroView()
    track.sectionView('hero')

    const makeObserver = (id: string, onVisible: () => void) => {
      const el = document.getElementById(id)
      if (!el) return null
      let fired = false
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true
          onVisible()
          obs.disconnect()
        }
      }, { threshold: 0.4 })
      obs.observe(el)
      return obs
    }

    const observers = [
      makeObserver('why-work-start', () => {
        track.sectionView('porque_construyo')
        track.sectionView('como_trabajo')
        const steps = ['discovery', 'hypothesis', 'delivery', 'learning_loop'] as const
        steps.forEach(s => track.workStepView(s))
      }),
      makeObserver('news-start', () => track.sectionView('noticias')),
      makeObserver('trayectoria-start', () => track.sectionView('proyectos')),
    ].filter(Boolean) as IntersectionObserver[]

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  const homeText = isEnglish
    ? {
        whyTitle: 'Why I Build',
        whyStory: {
          lead: 'We are living through a unique moment.',
          intro: [
            'Artificial intelligence is transforming tools, processes and professions at a pace that is hard to grasp. Yet after years of building products, I learned that the most important challenge is still human.',
            'Organizations do not change because they adopt a new technology.',
          ],
          thesis: 'They change when they develop new capabilities to learn, decide and adapt.',
          after: 'That is why I care about products, but also about the teams, systems and ways of working that make them possible.',
          proofLead: 'Some things I learned along the way',
          proofIntro: 'I have worked across different industries, teams and challenges. From each experience I took something that is now part of how I work.',
          proof: [
            { emoji: '🔎', title: 'Small changes can create big results.', before: 'In SEO, one adjustment took a result from the second page to the top spot in just ', value: '24 hours', after: '. I learned that impact does not always depend on the size of the solution.' },
            { emoji: '🛍️', title: 'Building also means opening possibilities.', before: 'In e-commerce, we developed tools that brought digital marketing closer to sellers in Argentina, Mexico and Brazil. ', value: 'Three countries', after: ', different needs and one shared challenge: simplifying.' },
            { emoji: '🏦', title: 'Behind every product there are people.', before: 'In banking, I took part in solutions that today have an impact on ', value: 'more than 200,000 SMEs', after: '. That is where I understood that what we design on a screen has consequences in real life.' },
            { emoji: '🧱', title: 'Starting from scratch is a chance to rethink everything.', before: 'We built ', value: 'a digital bank from scratch', after: ' with a hybrid team. From the login to the APIs, the experience and every word. I learned that the product is in the details.' },
            { emoji: '❤️', title: 'Leading is not about having all the answers.', before: 'I supported teams of ', value: '15+ people', after: ', with different profiles and points of view. I learned that the best solutions appear when we make room for others to shine too.' },
            { emoji: '🎓', title: 'Teaching is also a way of learning.', before: 'I shared my experience in product, AI and leadership with teams from ', value: '5 industries', after: '. Every session reminded me that knowledge grows when it circulates.' },
            { emoji: '🎤', title: 'Saying ideas out loud is also building.', before: 'I took the stage at ', value: 'Agile Summit Uruguay', after: ' to talk about Agile After Agile. I learned that an idea gets better when it dares to leave your head and meet other people.' },
            { emoji: '🤖', title: 'Experimenting is the best way to keep learning.', before: 'I recently built an AI agent in ', value: 'under 40 minutes', after: '. Not because I had all the answers, but because I dared to try.' },
          ],
          proofClosingLead: 'And perhaps the most important lesson…',
          proofClosing: 'I did none of this alone. It was always with teams.',
          proofClosingText: 'Because products are built by people, together. And technology is a tool that makes possible what once seemed difficult.',
          turn: 'And that is why I do not start with the solution.',
          turnEmphasis: 'I start by understanding what is changing.',
          imageAlt: 'Barbara Aceto giving a talk, sitting on the edge of the stage',
        },
        newsTitle: 'Ideas From The Field',
        newsSubtitle: 'Reflections, experiments and lessons from building products, working with AI and supporting organizations in motion.',
        readArticle: 'Read the article →',
        noteLabel: 'NOTE',
        readNote: 'View on LinkedIn →',
        summitVideoEyebrow: 'FULL TALK',
        summitVideoTitle: 'In my own words…',
        summitVideoDescription: 'My talk, from the moment I am introduced and step on stage.',
        summitVideoLink: 'Open on YouTube →',
        playSummitVideo: 'Play talk',
        fieldNotesTitle: 'Product, AI and leadership in practice',
        fieldNotesSubtitle: 'Experiments, videos and reflections on how work changes when human judgment meets new tools.',
        watchVideo: 'Watch video →',
        viewPost: 'View post →',
        scrollWhyAria: 'Scroll to Why I Build',
        scrollTrayectoriaAria: 'Scroll to career path',
        scrollNewsAria: 'Continue down the page',
        showAllIdeas: 'See all ideas',
        showFewerIdeas: 'See fewer',
        showAllLearnings: 'See all eight lessons',
        showFewerLearnings: 'See fewer',
        closingTitle: 'Let’s talk',
        closingText: 'An idea, an opportunity, or just a conversation about product and AI.',
        closingWrite: 'Write to me',
        closingCv: 'My profile',
        closeModalAria: 'Close modal',
        modalTitle: "Let's build something meaningful.",
        modalSubtitle: "If you're building a product, leading a team or exploring how to apply AI in real contexts, I'd love to connect.",
        modalChip1: 'Digital product',
        modalChip2: 'Applied AI',
        modalChip3: 'Strategy & teams',
        modalWhatsApp: 'Message on WhatsApp',
        modalEmail: 'Send email',
        modalFooter: 'Also happy to connect if you want to share an idea, an opportunity, or just talk about product and AI.',
      }
    : {
        whyTitle: 'Por qué construyo',
        whyStory: {
          lead: 'Vivimos un momento único.',
          intro: [
            'La inteligencia artificial está transformando herramientas, procesos y profesiones a una velocidad difícil de dimensionar. Sin embargo, después de años construyendo productos, aprendí que el desafío más importante sigue siendo humano.',
            'Las organizaciones no cambian porque incorporan una nueva tecnología.',
          ],
          thesis: 'Cambian cuando desarrollan nuevas capacidades para aprender, decidir y adaptarse.',
          after: 'Por eso me interesan los productos, pero también los equipos, los sistemas y las formas de trabajo que los hacen posibles.',
          proofLead: 'Algunas cosas que aprendí en el camino',
          proofIntro: 'Pasé por distintas industrias, equipos y desafíos. Y de cada experiencia me llevé algo que hoy forma parte de mi manera de trabajar.',
          proof: [
            { emoji: '🔎', title: 'Que los pequeños cambios pueden generar grandes resultados.', before: 'En SEO, un ajuste llevó un resultado de la segunda página al primer puesto en apenas ', value: '24 horas', after: '. Aprendí que el impacto no siempre depende del tamaño de la solución.' },
            { emoji: '🛍️', title: 'Que construir también es abrir posibilidades.', before: 'En e-commerce, desarrollamos herramientas que acercaron el marketing digital a sellers de Argentina, México y Brasil. ', value: 'Tres países', after: ', distintas necesidades y un mismo desafío: simplificar.' },
            { emoji: '🏦', title: 'Que detrás de cada producto hay personas.', before: 'En banca, participé en soluciones que hoy impactan en ', value: 'más de 200 mil pymes', after: '. Ahí entendí que lo que diseñamos en una pantalla tiene consecuencias en la vida real.' },
            { emoji: '🧱', title: 'Que empezar de cero es una oportunidad para repensarlo todo.', before: 'Construimos ', value: 'un banco digital desde cero', after: ' con un equipo híbrido. Desde el login hasta las APIs, la experiencia y cada palabra. Aprendí que el producto está en los detalles.' },
            { emoji: '❤️', title: 'Que liderar no es tener todas las respuestas.', before: 'Acompañé equipos de ', value: '+15 personas', after: ', con perfiles y miradas diferentes. Aprendí que las mejores soluciones aparecen cuando generamos espacio para que otros también brillen.' },
            { emoji: '🎓', title: 'Que enseñar también es una forma de aprender.', before: 'Compartí experiencias sobre producto, IA y liderazgo con equipos de ', value: '5 industrias', after: '. Cada encuentro me recordó que el conocimiento crece cuando circula.' },
            { emoji: '🎤', title: 'Que decir las ideas en voz alta también es construir.', before: 'Subí al escenario de ', value: 'Agile Summit Uruguay', after: ' a hablar de Agile después del Agile. Aprendí que una idea mejora cuando se anima a salir de la cabeza y encontrarse con otros.' },
            { emoji: '🤖', title: 'Que experimentar es la mejor manera de seguir aprendiendo.', before: 'Hace poco construí un agente de IA en ', value: 'menos de 40 minutos', after: '. No porque tuviera todas las respuestas, sino porque me animé a probar.' },
          ],
          proofClosingLead: 'Y quizás el aprendizaje más importante…',
          proofClosing: 'Nada de esto lo hice sola. Siempre fue con equipos.',
          proofClosingText: 'Porque los productos los construimos entre personas. Y la tecnología es una herramienta para hacer posibles cosas que antes parecían difíciles.',
          turn: 'Y por eso no empiezo por la solución.',
          turnEmphasis: 'Empiezo por entender qué está cambiando.',
          imageAlt: 'Barbara Aceto dando una charla sentada al borde del escenario',
        },
        newsTitle: 'Ideas desde la trinchera',
        newsSubtitle: 'Reflexiones, experimentos y aprendizajes surgidos de construir productos, trabajar con IA y acompañar organizaciones en movimiento.',
        readArticle: 'Leer publicación →',
        noteLabel: 'NOTA',
        readNote: 'Ver en LinkedIn →',
        summitVideoEyebrow: 'CHARLA COMPLETA',
        summitVideoTitle: 'En primera persona…',
        summitVideoDescription: 'Mi participación desde el momento en que me presentan y subo al escenario.',
        summitVideoLink: 'Abrir en YouTube →',
        playSummitVideo: 'Reproducir charla',
        fieldNotesTitle: 'Producto, IA y liderazgo en práctica',
        fieldNotesSubtitle: 'Experimentos, videos y reflexiones sobre cómo cambia el trabajo cuando combinamos criterio humano y nuevas herramientas.',
        watchVideo: 'Ver video →',
        viewPost: 'Ver publicación →',
        scrollWhyAria: 'Ir a Por qué construyo',
        scrollTrayectoriaAria: 'Ir a la trayectoria',
        scrollNewsAria: 'Seguir bajando en la página',
        showAllIdeas: 'Ver todas las ideas',
        showFewerIdeas: 'Ver menos',
        showAllLearnings: 'Ver los ocho aprendizajes',
        showFewerLearnings: 'Ver menos',
        closingTitle: '¿Hablamos?',
        closingText: 'Una idea, una oportunidad o ganas de conversar sobre producto e IA.',
        closingWrite: 'Escribime',
        closingCv: 'Mi perfil',
        closeModalAria: 'Cerrar modal',
        modalTitle: 'Construyamos algo con sentido.',
        modalSubtitle: 'Si estás construyendo un producto, liderando un equipo o explorando cómo aplicar IA en contextos reales, me encantará conversar.',
        modalChip1: 'Producto digital',
        modalChip2: 'IA aplicada',
        modalChip3: 'Estrategia y equipos',
        modalWhatsApp: 'Escribirme por WhatsApp',
        modalEmail: 'Enviar email',
        modalFooter: 'También podés escribirme si querés compartir una idea, una oportunidad o simplemente conversar sobre producto e IA.',
      };

  const workSteps = isEnglish
    ? [
        {
          number: '01',
          label: 'CONTEXT',
          title: 'Understand before acting',
          description: 'Before defining a roadmap, I need to understand how business, technology, operations and users coexist.',
          highlight: false,
        },
        {
          number: '02',
          label: 'DIRECTION',
          title: 'Reduce uncertainty',
          description: 'I work with hypotheses, evidence and continuous learning. My goal is not to be right: it is to learn fast enough to move forward with confidence.',
          highlight: false,
        },
        {
          number: '03',
          label: 'EXECUTION',
          title: 'Build capabilities, not just deliverables',
          description: 'I aim to create systems, teams and dynamics that can sustain results even when conditions change.',
          highlight: false,
        },
        {
          number: '04',
          label: 'EVOLUTION',
          title: 'Learning as a competitive advantage',
          description: 'Adaptation is not a phase of the process. It is part of the work.',
          highlight: true,
        },
      ]
    : [
        {
          number: '01',
          label: 'CONTEXTO',
          title: 'Entender antes de actuar',
          description: 'Antes de definir un roadmap, necesito comprender cómo conviven negocio, tecnología, operación y usuarios.',
          highlight: false,
        },
        {
          number: '02',
          label: 'DIRECCIÓN',
          title: 'Reducir incertidumbre',
          description: 'Trabajo con hipótesis, evidencia y aprendizaje continuo. Mi objetivo no es tener razón: es aprender lo suficientemente rápido para avanzar con confianza.',
          highlight: false,
        },
        {
          number: '03',
          label: 'EJECUCIÓN',
          title: 'Construir capacidades, no solo entregables',
          description: 'Busco crear sistemas, equipos y dinámicas que puedan sostener resultados incluso cuando las condiciones cambian.',
          highlight: false,
        },
        {
          number: '04',
          label: 'EVOLUCIÓN',
          title: 'Aprender como ventaja competitiva',
          description: 'La adaptación no es una fase del proceso. Es parte del trabajo.',
          highlight: true,
        },
      ];

  const notebookLm = press.find((item) => item.slug === 'press-4');
  const agileSummit = notesData.find((item) => item.slug === 'agile-summit-uruguay');
  const claudeCode = notesData.find((item) => item.slug === 'claude-code');
  const womenInTech = notesData.find((item) => item.slug === 'women-in-tech');

  const featuredIdea = agileSummit
    ? {
        slug: agileSummit.slug,
        type: 'note' as const,
        label: isEnglish ? 'SPEAKER / AGILE SUMMIT URUGUAY' : 'SPEAKER / AGILE SUMMIT URUGUAY',
        title: isEnglish ? 'Agile After Agile' : agileSummit.title,
        description: isEnglish
          ? 'Reflections from Agile Summit Uruguay on redesigning ways of working when context, rules and the way we combine product, technology, data, UX, QA, people and business have changed.'
          : 'Reflexiones desde Agile Summit Uruguay sobre cómo rediseñar formas de trabajo cuando cambian el contexto, las reglas y la manera de combinar producto, tecnología, datos, UX, QA, personas y negocio.',
        url: agileSummit.url,
        image: agileSummit.image,
        deckUrl: agileSummit.deckUrl,
      }
    : null;

  const wideIdea = notebookLm
    ? {
        slug: notebookLm.slug,
        type: 'article' as const,
        label: isEnglish ? 'APPLIED AI' : 'IA APLICADA',
        title: isEnglish ? 'NotebookLM and the New Organizational Challenge' : notebookLm.title,
        description: isEnglish
          ? 'How AI can help teams transform scattered information into shared understanding, actionable learning and better decisions inside an organization.'
          : 'Cómo la IA puede ayudar a transformar información dispersa en entendimiento compartido, aprendizaje accionable y mejores decisiones dentro de una organización.',
        url: notebookLm.url,
        image: notebookLm.image,
      }
    : null;

  const agileSummitRelatedLinks = [
    {
      label: isEnglish ? 'TEAMWORK' : 'EQUIPOS',
      title: isEnglish ? 'Collaboration Is Not Doing Everyone Else’s Job' : 'Colaborar no es hacer el trabajo del otro',
      description: isEnglish
        ? 'A reflection on roles, trust and giving each discipline enough space to contribute from what it knows best.'
        : 'Una reflexión sobre roles, confianza y dar espacio para que cada disciplina aporte desde lo que mejor sabe hacer.',
      url: 'https://www.linkedin.com/feed/update/urn:li:activity:7489061689414443008/',
      isVideo: false,
    },
    {
      label: isEnglish ? 'LEADERSHIP' : 'LIDERAZGO',
      title: isEnglish ? 'Leadership Happens When You Are Not in the Room' : 'Liderar cuando no estás en la sala',
      description: isEnglish
        ? 'A story about autonomy, fear and the invisible systems leaders create when every decision has to wait for permission.'
        : 'Una historia sobre autonomía, miedo y los sistemas invisibles que construye el liderazgo cuando cada decisión necesita permiso.',
      url: 'https://www.linkedin.com/feed/update/urn:li:activity:7486384764505997312/',
      isVideo: false,
    },
    {
      label: isEnglish ? 'WORKSHOP CLIP' : 'FRAGMENTO DE WORKSHOP',
      title: isEnglish ? 'What Will We Build With the Time We Recover?' : '¿Qué vamos a construir con el tiempo que recuperamos?',
      description: isEnglish
        ? 'A clip from the intro of “The Last Manual User Story”, on using AI to imagine better products, ask better questions and make better decisions.'
        : 'Un fragmento de la intro del workshop “La Última Historia de Usuario Manual”, sobre usar IA para imaginar mejores productos, hacer mejores preguntas y tomar mejores decisiones.',
      url: 'https://www.linkedin.com/feed/update/urn:li:activity:7482074144654946304/',
      isVideo: true,
    },
  ];

  const fieldNotes = [
    {
      slug: 'figma-claude-code',
      label: isEnglish ? 'VIDEO · APPLIED AI' : 'VIDEO · IA APLICADA',
      title: isEnglish ? 'When Design and Development Stop Waiting for Each Other' : 'Cuando diseño y desarrollo dejan de esperarse',
      description: isEnglish
        ? 'How we combine Figma and Claude Code to shorten the path from design to first commit, so both can move forward in parallel without losing quality.'
        : 'Cómo combinamos Figma y Claude Code para acortar el camino entre el diseño y el primer commit, haciendo que ambos avancen en paralelo sin resignar calidad.',
      url: 'https://es.linkedin.com/posts/redbeestudios_redbee-ai-claudecode-activity-7499184702747111427-s4zw',
      image: '/design-development-video.webp',
      isVideo: true,
    },
    {
      slug: 'crear-el-camino',
      label: isEnglish ? 'LEADERSHIP · LEARNING' : 'LIDERAZGO · APRENDIZAJE',
      title: isEnglish ? 'When the Path Does Not Exist Yet' : 'Cuando el camino todavía no existe',
      description: isEnglish
        ? 'A reflection inspired by Forbes Power Women on inventing a professional path, learning and moving forward even without a map or close role models.'
        : 'Una reflexión inspirada en Forbes Power Women sobre inventar un camino profesional, aprender y avanzar incluso sin mapa ni referentes cercanos.',
      url: 'https://es.linkedin.com/posts/barbaraaceto_quiero-ser-astronauta-pero-no-activity-7510758263848857601-g-ZA',
      image: '/crear-el-camino.jpg',
      isVideo: false,
    },
    {
      slug: 'contexto-md',
      label: isEnglish ? 'VIDEO · APPLIED AI' : 'VIDEO · IA APLICADA',
      title: isEnglish ? 'Your Next Prompt Can Be Three Lines Long' : 'Tu próximo prompt puede tener tres líneas',
      description: isEnglish
        ? 'How a context.md file can preserve goals, decisions and constraints so ChatGPT, Gemini and Claude start each conversation with the context they need.'
        : 'Cómo un archivo contexto.md puede guardar objetivos, decisiones y restricciones para que ChatGPT, Gemini y Claude empiecen cada conversación con lo que necesitan saber.',
      url: 'https://es.linkedin.com/posts/barbaraaceto_tu-pr%C3%B3ximo-prompt-puede-tener-3-l%C3%ADneas-activity-7506458444640690176-At6_',
      image: '/contexto-md-video.jpg',
      isVideo: true,
    },
  ];

  const secondaryIdeas = [
    claudeCode && {
      slug: claudeCode.slug,
      type: 'note' as const,
      label: isEnglish ? 'EXPERIMENT' : 'EXPERIMENTO',
      title: isEnglish ? 'What I Learned Using Claude in the Last 72 Hours' : claudeCode.title,
      description: isEnglish
        ? 'A practical exploration of how AI-assisted coding changes product discovery, iteration and tool building.'
        : 'Una exploración práctica sobre cómo el desarrollo asistido por IA cambia la forma de descubrir, iterar y construir herramientas digitales.',
      url: claudeCode.url,
      image: claudeCode.image,
    },
    womenInTech && {
      slug: womenInTech.slug,
      type: 'note' as const,
      label: isEnglish ? 'LEADERSHIP' : 'LIDERAZGO',
      title: isEnglish ? 'Women in Tech · Product Management · redbee' : womenInTech.title,
      description: isEnglish
        ? 'A reflection on product leadership, representation and the capabilities teams need to keep building better technology.'
        : 'Una reflexión sobre liderazgo en producto, representación y las capacidades que los equipos necesitan para seguir construyendo mejor tecnología.',
      url: womenInTech.url,
      image: womenInTech.image,
    },
  ].filter(Boolean) as Array<{
    slug: string;
    type: 'article' | 'note';
    label: string;
    title: string;
    description: string;
    url?: string;
    image?: string;
    deckUrl?: string;
  }>;

  const refWhy      = useReveal<HTMLElement>()
  const refNews     = useReveal<HTMLElement>({ threshold: 0.08 })
  const refSecGrid  = useReveal<HTMLDivElement>({ threshold: 0.08 })
  const profileContent = isEnglish
    ? {
        heroLine1: 'Between humans and algorithms,',
        heroLine2: 'I lead products, teams and new ways of working.',
        summaryTitle: '10+ years turning ideas into digital products, supporting teams and connecting strategy with execution.',
        summaryBullets: [
          '🚀 Strategy that becomes products with impact',
          '❤️ Teams that grow with trust and autonomy',
          '🤖 AI applied to create, decide and learn better',
        ],
        role: 'Product & AI Leader',
        contactCta: 'Let’s talk',
      }
    : {
        heroLine1: 'Entre humanos y algoritmos,',
        heroLine2: 'lidero productos, equipos y nuevas formas de trabajar.',
        summaryTitle: '+10 años transformando ideas en productos digitales, acompañando equipos y conectando estrategia con ejecución.',
        summaryBullets: [
          '🚀 Estrategia que se convierte en productos con impacto',
          '❤️ Equipos que crecen con confianza y autonomía',
          '🤖 IA aplicada para crear, decidir y aprender mejor',
        ],
        role: 'Product & AI Leader',
        contactCta: '¿Hablamos?',
      };

  return (
    <>
      <HomeTour isEnglish={isEnglish} />
      <SectionNav isEnglish={isEnglish} />
      <Helmet>
        <title>Barbara Aceto | Product &amp; AI Leader</title>
        <meta
          name="description"
          content={isEnglish
            ? 'Between humans and algorithms, I lead products, teams and new ways of working. 10+ years turning ideas into digital products.'
            : 'Entre humanos y algoritmos, lidero productos, equipos y nuevas formas de trabajar. +10 años transformando ideas en productos digitales.'}
        />
      </Helmet>

      <div className="w-full relative" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/fodo limones.webp"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-45"
              style={{ objectPosition: 'center 76%', transform: 'scale(1.04)' }}
            />
          </div>

          <section className="relative w-full flex items-center justify-center pt-20 pb-32 px-4">
            <div className="relative z-20 max-w-3xl text-center">
              <div className="flex justify-center mt-8 mb-8">
                <div className="stationery-sep"></div>
              </div>
            </div>
          </section>

          <section className="w-full px-4 py-16 md:py-20 relative z-40 -mt-24 sm:-mt-40 md:-mt-64">
            <div className="max-w-6xl mx-auto">
              <div id="home-profile-card" className="card w-full max-w-3xl relative overflow-hidden mx-auto">
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-stretch">
                  <div className="relative sm:w-1/3 flex-shrink-0 -mx-6 -mt-6 sm:-m-6 sm:mr-0">
                    <img
                      src="/limones saco.webp"
                      alt="Barbara Aceto"
                      fetchPriority="high"
                      className="w-full h-80 sm:h-full sm:min-h-[280px] object-cover object-top sm:rounded-l-2xl"
                    />
                    <div className="absolute inset-x-0 bottom-4 md:bottom-6 flex justify-center">
                      <button
                        onClick={() => { setIsModalOpen(true); track.openContactModal('profile_card') }}
                        className="rounded-full bg-white font-semibold text-center whitespace-nowrap text-sm px-5 py-2 transition-transform duration-200 hover:-translate-y-0.5"
                        style={{ color: 'var(--accent-primary)', boxShadow: '0 6px 18px rgba(20,32,28,0.28)' }}
                      >
                        {profileContent.contactCta}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center text-left sm:py-2 sm:pr-2">
                    <div className="mb-4">
                      <h1 className="font-serif text-xl sm:text-lg md:text-xl leading-tight" style={{ color: '#1E2A38' }}>
                        {profileContent.heroLine1}<br />{profileContent.heroLine2}
                      </h1>
                      <div className="mt-3" style={{ color: '#4A5552' }}>
                        <p className="text-sm sm:text-xs md:text-sm leading-relaxed font-medium">{profileContent.summaryTitle}</p>
                        <ul className="mt-2 space-y-1.5">
                          {profileContent.summaryBullets.map((item) => (
                            <li key={item} className="pl-5 text-[13px] sm:text-xs md:text-xs leading-snug md:whitespace-nowrap">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="stationery-sep mb-4"></div>

                    <p className="text-base font-bold mb-0.5" style={{ color: 'var(--accent-primary)' }}>Barbara Aceto</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{profileContent.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full flex justify-center mt-2 mb-4 md:mb-5 relative z-50">
          <button
            type="button"
            onClick={scrollPastHero}
            className="w-11 h-11 rounded-full scroll-arrow flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-base)', boxShadow: '0 2px 8px rgba(30, 42, 56, 0.08)', color: 'var(--accent-primary)' }}
            aria-label={homeText.scrollNewsAria}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </button>
        </div>

        <SectionIndex isEnglish={isEnglish} />

        <div className="flex flex-col">
        {/* ════════════════════════════════════ */}
        {/* WHY I BUILD */}
        {/* ════════════════════════════════════ */}
        <div className="order-3">
        <section
          ref={refWhy}
          id="why-work-start"
          className="reveal w-full mt-0 pb-7 md:pb-10"
        >
          <div>
            <article
              className="rounded-3xl border p-6 md:p-8 lg:p-11 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-11 items-stretch"
              style={{ borderColor: 'var(--border-base)', backgroundColor: 'var(--card-bg)' }}
            >
              <figure className="relative m-0 lg:col-span-5 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[320px] rounded-2xl overflow-hidden">
                <img
                  src="/barbi-fuego-2x.jpg"
                  alt={homeText.whyStory.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '12% center' }}
                  loading="lazy"
                />
              </figure>

              <div className="lg:col-span-7 min-w-0 text-left">
                <span className="text-xs font-semibold uppercase" style={{ color: 'var(--accent-primary)', letterSpacing: '0.14em' }}>
                  {homeText.whyTitle}
                </span>
                <h2 id="home-why-title" className="text-3xl lg:text-4xl font-serif font-semibold leading-tight mt-2.5 mb-6" style={{ color: 'var(--text-primary)' }}>
                  {homeText.whyStory.lead}
                </h2>

                <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {homeText.whyStory.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="font-serif italic text-2xl lg:text-[1.75rem] leading-snug mt-2 mb-7" style={{ color: 'var(--accent-primary)' }}>
                  {homeText.whyStory.thesis}
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {homeText.whyStory.after}
                </p>

                <div className="rounded-2xl mt-8 px-5 py-6 md:px-7 md:py-7" style={{ backgroundColor: 'rgba(74,127,121,0.07)' }}>
                  <p className="font-serif font-semibold text-xl md:text-2xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {homeText.whyStory.proofLead}
                  </p>
                  <p className="text-sm leading-relaxed mt-2 mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {homeText.whyStory.proofIntro}
                  </p>
                  <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6">
                    {homeText.whyStory.proof.map((item, i) => (
                      <li key={item.value} className={i >= 4 && !showAllLearnings ? 'hidden sm:block' : ''}>
                        <p className="font-serif font-semibold text-base leading-snug" style={{ color: 'var(--text-primary)' }}>
                          <span aria-hidden="true" className="mr-1.5">{item.emoji}</span>
                          {item.title}
                        </p>
                        <p className="text-sm leading-relaxed mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                          {item.before}
                          <strong className="font-semibold" style={{ color: 'var(--accent-primary)' }}>{item.value}</strong>
                          {item.after}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <div className="sm:hidden flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAllLearnings(v => !v)}
                      aria-expanded={showAllLearnings}
                      className="btn-outline-accent text-sm"
                    >
                      {showAllLearnings ? homeText.showFewerLearnings : homeText.showAllLearnings} {showAllLearnings ? '↑' : '↓'}
                    </button>
                  </div>
                  <div className="mt-8 pt-7 text-center" style={{ borderTop: '1px solid rgba(74,127,121,0.2)' }}>
                    <p className="text-xs font-semibold uppercase" style={{ color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                      {homeText.whyStory.proofClosingLead}
                    </p>
                    <p className="font-serif italic text-xl md:text-2xl leading-snug mt-3" style={{ color: 'var(--text-primary)' }}>
                      {homeText.whyStory.proofClosing}
                    </p>
                    <p className="text-sm leading-relaxed mt-3 mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '80ch', textWrap: 'balance' }}>
                      {homeText.whyStory.proofClosingText}
                    </p>
                  </div>
                </div>

                <p className="font-serif text-xl lg:text-2xl leading-snug mt-10 mb-6" style={{ color: 'var(--text-primary)' }}>
                  {homeText.whyStory.turn}{' '}
                  <em style={{ color: 'var(--accent-primary)' }}>{homeText.whyStory.turnEmphasis}</em>
                </p>

                <ol className="list-none m-0 pl-8" style={{ borderLeft: '1.5px solid rgba(74,127,121,0.35)' }}>
                  {workSteps.map((step, i) => (
                    <li
                      key={step.number}
                      className={`relative ${i < workSteps.length - 1 ? 'pb-6' : ''}`}
                      onMouseEnter={() => {
                        const stepKeys = { '01': 'discovery', '02': 'hypothesis', '03': 'delivery', '04': 'learning_loop' } as const
                        const s = stepKeys[step.number as keyof typeof stepKeys]
                        if (s) track.workStepView(s)
                      }}
                    >
                      <span
                        className="absolute rounded-full"
                        aria-hidden="true"
                        style={{
                          left: '-38.5px',
                          top: '8px',
                          width: '11px',
                          height: '11px',
                          border: '2px solid var(--accent-primary)',
                          backgroundColor: i === workSteps.length - 1 ? 'var(--accent-primary)' : 'var(--card-bg)',
                        }}
                      />
                      <span className="text-xs font-semibold" style={{ color: 'var(--accent-primary)', letterSpacing: '0.12em' }}>
                        {step.number} · {step.label}
                      </span>
                      <h3 className="text-lg md:text-xl font-serif font-semibold leading-snug mt-0.5 mb-1.5" style={{ color: 'var(--text-primary)' }}>
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>

              </div>
            </article>
          </div>
        </section>
        </div>

        <div className="order-4 w-full flex justify-center mb-4 md:mb-5 relative z-50">
          <button
            type="button"
            onClick={() => { scrollToTrayectoria(); track.clickScrollToSection('proyectos') }}
            className="w-11 h-11 rounded-full scroll-arrow flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-base)', boxShadow: '0 2px 8px rgba(30, 42, 56, 0.08)', color: 'var(--accent-primary)' }}
            aria-label={homeText.scrollTrayectoriaAria}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </button>
        </div>

        {/* ════════════════════════════════════ */}
        {/* TRAYECTORIA */}
        {/* ════════════════════════════════════ */}
        <section id="trayectoria" className="order-5 w-full">
          <div id="trayectoria-start" style={{ scrollMarginTop: '12px' }} />
          <Suspense fallback={null}>
            <Trayectoria />
          </Suspense>
        </section>

        {/* ════════════════════════════════════ */}
        {/* CIERRE */}
        {/* ════════════════════════════════════ */}
        <section
          id="contacto"
          className="order-6 w-full mt-8 md:mt-12 mb-4 rounded-3xl px-6 py-10 md:py-14 text-center"
          style={{ backgroundColor: 'var(--accent-primary)' }}
          aria-labelledby="home-closing-title"
        >
          <h2 id="home-closing-title" className="font-serif font-semibold text-3xl md:text-4xl" style={{ color: '#FFFFFF' }}>
            {homeText.closingTitle}
          </h2>
          <p className="mt-3 text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.88)' }}>
            {homeText.closingText}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => { setIsModalOpen(true); track.openContactModal('closing') }}
              className="rounded-full bg-white font-semibold text-sm px-6 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ color: 'var(--accent-primary)' }}
            >
              {homeText.closingWrite}
            </button>
            <Link
              to="/one-sheet"
              onClick={() => track.clickDownloadCV('closing', 'one-sheet')}
              className="closing-link"
            >
              {homeText.closingCv}
            </Link>
            <a
              href="https://linkedin.com/in/barbaraaceto"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.clickExternalLink('LinkedIn', 'https://linkedin.com/in/barbaraaceto', 'closing')}
              className="closing-link"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* ════════════════════════════════════ */}
        {/* PENSAMIENTO */}
        {/* ════════════════════════════════════ */}
        <div className="order-1">
        <section ref={refNews} id="news-start" className="reveal order-1 w-full pt-7 pb-16 md:pt-10 md:pb-20 px-4">
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div id="home-ideas-header" className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {homeText.newsTitle}
              </h2>
              <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                {homeText.newsSubtitle}
              </p>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 mb-8 md:mb-10 items-stretch rounded-3xl border p-5 md:p-7"
              style={{
                borderColor: 'var(--border-base)',
                backgroundColor: 'var(--card-bg)',
                boxShadow: '0 16px 44px rgba(30,42,56,0.065)',
              }}
            >
            {featuredIdea && (
              <div className="lg:col-span-4 h-full">
                <article className="h-full">
                  <div className="h-full flex flex-col">
                    <div className="order-2 pt-5 flex flex-col justify-between flex-1">
                      <div>
                        <span
                          className="inline-block text-xs font-semibold mb-3"
                          style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                        >
                          {featuredIdea.label}
                        </span>
                        <h3 className="text-2xl font-serif font-semibold mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {featuredIdea.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed text-justify" style={{ color: 'var(--text-secondary)', hyphens: 'auto' }}>
                          {featuredIdea.description}
                        </p>
                      </div>
                    </div>
                    {featuredIdea.image && (
                      <div className="order-1 relative overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 9' }}>
                        <img
                          src={featuredIdea.image}
                          alt={featuredIdea.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ objectPosition: 'left center', filter: 'brightness(0.9) contrast(0.94) saturate(0.92)' }}
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: 'linear-gradient(to bottom, transparent 72%, rgba(255,255,255,0.16) 100%)' }}
                        />
                      </div>
                    )}
                  </div>
                </article>
              </div>
            )}

            {featuredIdea?.slug === 'agile-summit-uruguay' && (
              <section className="lg:col-span-6 flex flex-col" aria-labelledby="agile-summit-video-title">
                <div className="mb-7">
                  <div>
                    <p
                      className="text-xs font-semibold mb-2"
                      style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.72 }}
                    >
                      {homeText.summitVideoEyebrow}
                    </p>
                    <h3
                      id="agile-summit-video-title"
                      className="text-xl md:text-2xl font-serif font-semibold leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {homeText.summitVideoTitle}
                    </h3>
                    <p className="text-xs mt-1 lg:whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                      {homeText.summitVideoDescription}
                    </p>
                  </div>
                </div>
                <div
                  className="relative w-full overflow-hidden border"
                  style={{
                    aspectRatio: '16 / 9',
                    borderRadius: '16px',
                    borderColor: 'rgba(74,127,121,0.18)',
                    backgroundColor: '#171b1a',
                    boxShadow: '0 14px 38px rgba(30,42,56,0.08)',
                  }}
                >
                  {isSummitVideoPlaying ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/KnaG_BjSB8U?start=7350&rel=0&autoplay=1"
                      title={homeText.summitVideoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      className="absolute inset-0 w-full h-full group"
                      onClick={() => {
                        setIsSummitVideoPlaying(true)
                        track.clickExternalLink(homeText.playSummitVideo, 'https://www.youtube.com/watch?v=KnaG_BjSB8U&t=7350s', 'noticias')
                      }}
                      aria-label={homeText.playSummitVideo}
                    >
                      <img
                        src="/agile-summit-stage.jpg"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center"
                        aria-hidden="true"
                        style={{ backgroundColor: 'rgba(14,25,22,0.16)' }}
                      >
                        <span
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.94)',
                            color: 'var(--accent-primary)',
                            boxShadow: '0 6px 24px rgba(20,32,28,0.28)',
                          }}
                        >
                          <svg className="w-7 h-7 md:w-8 md:h-8 ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </section>
            )}
            {featuredIdea && (
              <div className="lg:col-span-10 flex flex-wrap items-center gap-x-8 gap-y-2 pt-5" style={{ borderTop: '1px solid var(--border-base)' }}>
                {featuredIdea.deckUrl && (
                  <a
                    href={featuredIdea.deckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium tap-target"
                    style={{ color: 'var(--accent-primary)' }}
                    onClick={() => track.clickExternalLink(isEnglish ? 'View presentation' : 'Ver presentación', featuredIdea.deckUrl ?? '', 'noticias')}
                  >
                    {isEnglish ? 'View presentation →' : 'Ver presentación →'}
                  </a>
                )}
                <a
                  href={featuredIdea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium tap-target"
                  style={{ color: 'var(--accent-primary)' }}
                  onClick={() => track.clickContentCard(featuredIdea.title, featuredIdea.type, featuredIdea.url ?? '', 'noticias')}
                >
                  {featuredIdea.slug === 'agile-summit-uruguay'
                    ? (isEnglish ? 'Read the reflection on LinkedIn →' : 'Leer la reflexión en LinkedIn →')
                    : (featuredIdea.type === 'note' ? homeText.readNote : homeText.readArticle)}
                </a>
                {featuredIdea.slug === 'agile-summit-uruguay' && (
                  <a
                    href="https://www.youtube.com/watch?v=KnaG_BjSB8U&t=7350s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium tap-target"
                    style={{ color: 'var(--accent-primary)' }}
                    onClick={() => track.clickExternalLink(homeText.summitVideoTitle, 'https://www.youtube.com/watch?v=KnaG_BjSB8U&t=7350s', 'noticias')}
                  >
                    {isEnglish ? 'Watch the full talk on YouTube →' : 'Ver la charla completa en YouTube →'}
                  </a>
                )}
              </div>
            )}
            </div>

            {featuredIdea?.slug === 'agile-summit-uruguay' && (
              <div className="mb-6 md:mb-8">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {homeText.fieldNotesTitle}
                  </h3>
                  <p className="text-sm mt-1 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                    {homeText.fieldNotesSubtitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {agileSummitRelatedLinks.map((link) => (
                    <article
                      key={link.url}
                      className="rounded-2xl border p-5 flex flex-col"
                      style={{
                        borderColor: 'rgba(74,127,121,0.16)',
                        backgroundColor: 'rgba(255,255,255,0.72)',
                        minHeight: '190px',
                      }}
                    >
                      <span
                        className="inline-block text-xs font-semibold mb-2.5"
                        style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                      >
                        {link.label}
                      </span>
                      <h3 className="text-lg font-serif font-semibold mb-3 leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {link.title}
                      </h3>
                      <p className="text-sm leading-relaxed flex-1 text-justify" style={{ color: 'var(--text-secondary)', hyphens: 'auto' }}>
                        {link.description}
                      </p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-xs font-medium tap-target"
                        style={{ color: 'var(--accent-primary)' }}
                        onClick={() => track.clickExternalLink(link.title, link.url, 'noticias')}
                      >
                        {link.isVideo ? homeText.watchVideo : homeText.readNote}
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <div id="home-more-ideas" className={showAllIdeas ? '' : 'hidden md:block'}>
            <div className="mb-6 md:mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {fieldNotes.map((item) => (
                  <article
                    key={item.slug}
                    className="border overflow-hidden flex flex-col"
                    style={{
                      borderColor: 'rgba(74,127,121,0.16)',
                      backgroundColor: 'rgba(255,255,255,0.72)',
                      borderRadius: '8px',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(30,42,56,0.09)'
                      e.currentTarget.style.borderColor = 'rgba(74,127,121,0.28)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = ''
                      e.currentTarget.style.boxShadow = ''
                      e.currentTarget.style.borderColor = 'rgba(74,127,121,0.16)'
                    }}
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden"
                      style={{ height: '172px', backgroundColor: '#eef1ed' }}
                      onClick={() => track.clickExternalLink(item.title, item.url, 'noticias')}
                      aria-label={`${item.isVideo ? homeText.watchVideo : homeText.viewPost}: ${item.title}`}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition:
                            item.slug === 'crear-el-camino'
                              ? 'center center'
                              : item.slug === 'figma-claude-code'
                                ? 'center 24%'
                                : item.slug === 'contexto-md'
                                  ? 'center 42%'
                                : 'center top',
                          filter: 'saturate(0.9) contrast(0.96) brightness(0.96)',
                          transition: 'transform 0.35s ease',
                        }}
                        loading="lazy"
                      />
                      {item.isVideo && (
                        <span
                          className="absolute inset-0 flex items-center justify-center"
                          aria-hidden="true"
                          style={{ backgroundColor: 'rgba(22,39,35,0.12)' }}
                        >
                          <span
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(255,255,255,0.94)', color: 'var(--accent-primary)', boxShadow: '0 4px 18px rgba(30,42,56,0.18)' }}
                          >
                            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      )}
                    </a>
                    <div className="p-5 flex flex-col flex-1">
                      <span
                        className="inline-block text-xs font-semibold mb-2.5"
                        style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.72 }}
                      >
                        {item.label}
                      </span>
                      <h3 className="text-lg font-serif font-semibold mb-3 leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed flex-1 text-justify" style={{ color: 'var(--text-secondary)', hyphens: 'auto' }}>
                        {item.description}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-xs font-medium tap-target"
                        style={{ color: 'var(--accent-primary)' }}
                        onClick={() => track.clickExternalLink(item.title, item.url, 'noticias')}
                      >
                        {item.isVideo ? homeText.watchVideo : homeText.viewPost}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {wideIdea && (
              <div className="block mb-6 md:mb-8">
                <article
                  className="rounded-3xl border overflow-hidden"
                  style={{
                    borderColor: 'var(--border-base)',
                    backgroundColor: 'var(--card-bg)',
                    boxShadow: '0 16px 44px rgba(30,42,56,0.055)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 20px 54px rgba(30,42,56,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(58,125,107,0.32)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = ''
                    e.currentTarget.style.boxShadow = '0 16px 44px rgba(30,42,56,0.055)'
                    e.currentTarget.style.borderColor = 'var(--border-base)'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-7 p-7 md:p-10 flex flex-col justify-between" style={{ minHeight: '300px' }}>
                      <div>
                        <span
                          className="inline-block text-xs font-semibold mb-3"
                          style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                        >
                          {wideIdea.label}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {wideIdea.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '56ch' }}>
                          {wideIdea.description}
                        </p>
                      </div>
                      <a
                        href={wideIdea.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 text-sm font-medium tap-target"
                        style={{ color: 'var(--accent-primary)' }}
                        onClick={() => track.clickContentCard(wideIdea.title, wideIdea.type, wideIdea.url ?? '', 'noticias')}
                      >
                        {homeText.readArticle}
                      </a>
                    </div>
                    {wideIdea.image && (
                      <div className="md:col-span-5 relative" style={{ minHeight: '240px' }}>
                        <img
                          src={wideIdea.image}
                          alt={isEnglish
                            ? 'Quote by Barbi Aceto: NotebookLM’s design favors a disciplined, results-oriented use. The tool does not replace professional judgment: it amplifies it.'
                            : 'Cita de Barbi Aceto: El diseño de NotebookLM favorece un uso disciplinado y orientado a resultados. La herramienta no reemplaza el criterio profesional: lo amplifica.'}
                          className="absolute inset-0 w-full h-full object-contain p-4 md:p-6"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </article>
              </div>
            )}

            {secondaryIdeas.length > 0 && (
              <div ref={refSecGrid} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-5 md:mb-6">
                {secondaryIdeas.map((item) => (
                  <div key={item.slug} className="block">
                    <article
                      className={`h-full rounded-2xl border overflow-hidden ${item.slug === 'women-in-tech' ? 'md:grid md:grid-cols-[42%_58%]' : 'flex flex-col'}`}
                      style={{
                        borderColor: 'rgba(74,127,121,0.16)',
                        backgroundColor: 'rgba(255,255,255,0.72)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.transform = 'translateY(-2px)'
                        el.style.boxShadow = '0 8px 28px rgba(30,42,56,0.09)'
                        el.style.borderColor = 'rgba(74,127,121,0.25)'
                        const img = el.querySelector('img') as HTMLImageElement | null
                        if (img) img.style.transform = 'scale(1.015)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.transform = ''
                        el.style.boxShadow = ''
                        el.style.borderColor = 'var(--border-base)'
                      }}
                    >
                      {item.image && (
                        <div
                          className={`w-full overflow-hidden ${item.slug === 'women-in-tech' ? 'h-72 md:h-full md:min-h-[330px]' : ''}`}
                          style={{
                            height: item.slug === 'women-in-tech' ? undefined : item.slug === 'agile-summit-uruguay' ? '180px' : '132px',
                            backgroundColor: item.slug === 'agile-summit-uruguay' ? '#111' : item.slug === 'women-in-tech' ? '#fff' : 'transparent',
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`w-full h-full ${item.slug === 'women-in-tech' ? 'object-contain md:object-cover' : ''}`}
                            style={{
                              objectFit: item.slug === 'women-in-tech' ? undefined : item.slug === 'agile-summit-uruguay' ? 'contain' : 'cover',
                              objectPosition: 'center top',
                              filter: 'saturate(0.9) contrast(0.96) brightness(0.98)',
                              transition: 'transform 0.35s ease',
                            }}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block flex-1"
                          onClick={() => track.clickContentCard(item.title, item.type, item.url ?? '', 'noticias')}
                        >
                          <span
                            className="inline-block text-xs font-semibold mb-2.5"
                            style={{ color: 'var(--accent-primary)', letterSpacing: '0.13em', opacity: 0.65 }}
                          >
                            {item.label}
                          </span>
                          <h3 className="text-lg font-serif font-semibold mb-3 leading-snug" style={{ color: 'var(--text-primary)' }}>
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {item.description}
                          </p>
                        </a>
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-medium tap-target"
                            style={{ color: 'var(--accent-primary)' }}
                            onClick={() => track.clickContentCard(item.title, item.type, item.url ?? '', 'noticias')}
                          >
                            {item.type === 'note' ? homeText.readNote : homeText.readArticle}
                          </a>
                          {item.deckUrl && (
                            <a
                              href={item.deckUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-xs font-medium tap-target"
                              style={{ color: 'var(--accent-primary)' }}
                              onClick={() => track.clickExternalLink(isEnglish ? 'View presentation' : 'Ver presentación', item.deckUrl ?? '', 'noticias')}
                            >
                              {isEnglish ? 'View presentation' : 'Ver presentación'}
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            )}
            </div>

            <div className="md:hidden flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllIdeas(v => !v)}
                aria-expanded={showAllIdeas}
                aria-controls="home-more-ideas"
                className="btn-outline-accent text-sm"
              >
                {showAllIdeas ? homeText.showFewerIdeas : homeText.showAllIdeas} {showAllIdeas ? '↑' : '↓'}
              </button>
            </div>


          </div>
        </section>
        </div>

        <div className="order-2 w-full flex justify-center my-4 md:my-5 relative z-50">
          <button
            type="button"
            onClick={() => { scrollToWhy(); track.clickScrollToSection('porque_construyo') }}
            className="w-11 h-11 rounded-full scroll-arrow flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-base)', boxShadow: '0 2px 8px rgba(30, 42, 56, 0.08)', color: 'var(--accent-primary)' }}
            aria-label={homeText.scrollWhyAria}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </button>
        </div>
        </div>

        {/* CONTACT MODAL */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            style={{ backgroundColor: 'rgba(20,32,28,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={e => { if (e.target === e.currentTarget) { setIsModalOpen(false); track.closeContactModal() } }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="home-contact-title"
              className="w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border-base)',
                animation: 'slideUp 0.28s cubic-bezier(0.16,1,0.3,1)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header stripe */}
              <div className="px-6 pt-6 pb-5" style={{ borderBottom: '1px solid var(--border-base)' }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 id="home-contact-title" className="font-serif font-semibold text-xl md:text-2xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {homeText.modalTitle}
                  </h2>
                  <button
                    onClick={() => { setIsModalOpen(false); track.closeContactModal() }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors mt-0.5"
                    style={{ backgroundColor: 'var(--border-base)', color: 'var(--text-muted)' }}
                    aria-label={homeText.closeModalAria}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--accent-primary)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--border-base)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {homeText.modalSubtitle}
                </p>
              </div>

              {/* Contact rows */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border-base)' }}>
                <div className="space-y-2">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/5491162093765"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track.clickContactOption('whatsapp', 'contact_modal')}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,127,121,0.4)'; e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.backgroundColor = 'var(--card-bg)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,127,121,0.12)' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>WhatsApp</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>+54 9 11 6209 3765</p>
                    </div>
                    <svg className="w-4 h-4 flex-shrink-0 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  {/* Email */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,127,121,0.12)' }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Email</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>aceto.barbara@gmail.com</p>
                    </div>
                    <button
                      onClick={() => { navigator.clipboard.writeText('aceto.barbara@gmail.com'); setEmailCopied(true); setTimeout(() => setEmailCopied(false), 2000); track.clickContactOption('email', 'contact_modal') }}
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      title="Copiar email"
                      onMouseEnter={e => { if (!emailCopied) { e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.10)'; e.currentTarget.style.color = 'var(--accent-primary)' } }}
                      onMouseLeave={e => { if (!emailCopied) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' } }}
                      style={{ color: emailCopied ? 'var(--accent-primary)' : 'var(--text-muted)', backgroundColor: emailCopied ? 'rgba(74,127,121,0.10)' : 'transparent' }}
                    >
                      {emailCopied ? (
                        <span className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>¡Copiado!</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/barbaraaceto"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track.clickContactOption('linkedin', 'contact_modal')}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-base)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,127,121,0.4)'; e.currentTarget.style.backgroundColor = 'rgba(74,127,121,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-base)'; e.currentTarget.style.backgroundColor = 'var(--card-bg)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(74,127,121,0.12)' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>LinkedIn</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>linkedin.com/in/barbaraaceto</p>
                    </div>
                    <svg className="w-4 h-4 flex-shrink-0 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>


            </div>
          </div>
        )}

        <div id="home-end" aria-hidden="true" />
      </div>
    </>
  );
}
