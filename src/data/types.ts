export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tech: string[]
  featured?: boolean
  images?: string[]
  links?: { demo?: string, repo?: string }
}

export type Note = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  content: string
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
