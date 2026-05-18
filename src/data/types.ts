export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tech: string[]
  featured?: boolean
  images?: string[]
  links?: { demo?: string, repo?: string, posts?: string[] }
  duration?: string
  roles?: {
    title: string
    period: string
    responsibilities: string[]
    focus: string
  }[]
  talks?: string[]
}

export type Note = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  content: string
  image?: string
  imagePosition?: string
  url?: string
}

export type PressItem = {
  slug: string
  featured?: boolean
  year: number
  outlet: string
  title: string
  date: string
  excerpt: string
  url?: string
  image?: string
}

export type Profile = {
  name: string
  headline: string
  location?: string
  email?: string
}
