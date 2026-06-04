import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'palm-infotech',
    role: 'Software Developer Intern',
    company: 'Palm Infotech',
    location: 'Surat, India',
    period: 'Jan 2025 — Apr 2025',
    current: false,
    bullets: [
      'Engineered backend services in NestJS & MySQL, building 10+ REST APIs for real-time data processing and monitoring.',
      'Improved system efficiency by ~30% by optimizing API response handling and database queries.',
      'Integrated third-party mapping APIs for real-time tracking at <250ms latency under ~300 concurrent users.',
      'Led end-to-end development across the Agile SDLC within a team of 4 engineers.',
      'Achieved 85%+ API test coverage with unit & integration tests, cutting regression issues at release.',
    ],
  },
  {
    id: 'ut-dallas',
    role: 'Computer Science Grader',
    company: 'UT Dallas',
    location: 'Richardson, TX',
    period: 'Sep 2025 — Present',
    current: true,
    bullets: [
      'Mentored 80+ students in Data Structures & Algorithm Analysis — trees, graphs, sorting, recursion & Big-O.',
      'Evaluated 300+ submissions per semester, setting quality benchmarks for technical assessment.',
      'Led one-on-one debugging sessions with personalized mentorship on algorithm design.',
      'Managed large-scale evaluation pipelines — demonstrating technical leadership at scale.',
    ],
  },
]