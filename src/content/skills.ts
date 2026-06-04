import { Skill } from '@/types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React', color: '#61dafb', cluster: 'Frontend' },
  { name: 'TypeScript', color: '#3178c6', cluster: 'Frontend' },
  { name: 'Next.js', color: '#ffffff', cluster: 'Frontend' },
  { name: 'Tailwind CSS', color: '#38bdf8', cluster: 'Frontend' },
  { name: 'HTML / CSS', color: '#e34c26', cluster: 'Frontend' },

  // Backend
  { name: 'Node.js', color: '#68a063', cluster: 'Backend' },
  { name: 'NestJS', color: '#e0234e', cluster: 'Backend' },
  { name: 'Python', color: '#4b8bbe', cluster: 'Backend' },
  { name: 'Flask', color: '#22d3a0', cluster: 'Backend' },
  { name: 'PostgreSQL', color: '#336791', cluster: 'Backend' },
  { name: 'MySQL', color: '#00758f', cluster: 'Backend' },
  { name: 'Redis', color: '#dc382d', cluster: 'Backend' },

  // AI / ML
  { name: 'LangChain', color: '#7c5cfc', cluster: 'AI / ML' },
  { name: 'pgvector', color: '#336791', cluster: 'AI / ML' },
  { name: 'Scikit-learn', color: '#f89a36', cluster: 'AI / ML' },
  { name: 'RAG', color: '#4d7cff', cluster: 'AI / ML' },
  { name: 'OpenAI', color: '#74aa9c', cluster: 'AI / ML' },

  // Cloud / DevOps
  { name: 'Azure', color: '#0089d6', cluster: 'Cloud / DevOps' },
  { name: 'Docker', color: '#2496ed', cluster: 'Cloud / DevOps' },
  { name: 'GitHub Actions', color: '#2088ff', cluster: 'Cloud / DevOps' },
  { name: 'Git', color: '#f05033', cluster: 'Cloud / DevOps' },
]