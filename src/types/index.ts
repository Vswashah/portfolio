export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  tags: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
  featured: boolean
  githubUrl?: string
  liveUrl?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  current: boolean
  bullets: string[]
}

export interface TimelineMilestone {
  id: string
  year: string
  title: string
  description: string
  place: string
  side: 'left' | 'right'
}

export interface Skill {
  name: string
  color: string
  cluster: 'Frontend' | 'Backend' | 'AI / ML' | 'Cloud / DevOps'
}

export interface Metric {
  value: number
  suffix: string
  label: string
}