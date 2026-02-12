import { Project } from './types'

const projects: Project[] = [
  {
    slug: 'ai-product-platform',
    title: 'AI Product Platform',
    summary: 'Scaling model-driven features across products.',
    description: 'End-to-end platform enabling product teams to ship model-backed features.',
    tech: ['Python','TypeScript','React','Kubernetes'],
    featured: true,
    images: ['/placeholder.png'],
    links: { demo: '#', repo: '#' }
  },
  {
    slug: 'analytics-revamp',
    title: 'Analytics Revamp',
    summary: 'Redesigned metrics and reporting for leadership.',
    description: 'Built new event schema and dashboards to align strategy with outcomes.',
    tech: ['SQL','Looker','ETL'],
    images: ['/placeholder.png']
  },
  {
    slug: 'search-experience',
    title: 'Search Experience',
    summary: 'Improved relevance and discovery with hybrid retrieval.',
    description: 'Hybrid search combining embeddings and lexical signals.',
    tech: ['TypeScript','React','VectorDB'],
    images: ['/placeholder.png']
  },
  {
    slug: 'recommendation-engine',
    title: 'Recommendation Engine',
    summary: 'Personalized recommendations at scale.',
    description: 'Feature-store backed recommendations with offline evaluation.',
    tech: ['Python','Spark','Kafka'],
    images: ['/placeholder.png']
  },
  {
    slug: 'mobile-launch',
    title: 'Mobile Launch',
    summary: 'Led cross-functional product launch for mobile app.',
    description: 'Coordinated design, engineering and data for launch.',
    tech: ['iOS','Android','Product'],
    images: ['/placeholder.png']
  },
  {
    slug: 'ops-automation',
    title: 'Ops Automation',
    summary: 'Automated release and incident workflows.',
    description: 'Reduced toil and improved reliability.',
    tech: ['Terraform','Go','AWS'],
    images: ['/placeholder.png']
  }
]

export default projects
