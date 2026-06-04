import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'trackly',
    title: 'Trackly',
    tagline: 'AI-native project & issue tracking — a Jira alternative for fast-moving teams.',
    description:
      'React frontend and Node.js REST backend with a full ticket lifecycle — create, assign, prioritize, track — over a normalized PostgreSQL schema. A RAG pipeline on LangChain + pgvector powers the intelligence: auto-suggest similar past issues, smart ticket summaries, and context-aware resolution hints that cut duplicates and triage time.',
    tags: ['Featured Project'],
    stack: ['React', 'Node.js', 'PostgreSQL', 'LangChain', 'pgvector', 'RAG', 'Docker', 'GitHub Actions'],
    metrics: [
      { value: 'RAG', label: 'LangChain + pgvector' },
      { value: 'Full', label: 'Ticket lifecycle' },
      { value: '↓ Triage', label: 'Duplicate reduction' },
    ],
    featured: true,
    githubUrl: 'https://github.com/Vswashah',
  },
  {
    id: 'anomaly-detector',
    title: 'Security Log Anomaly Detector',
    tagline: 'AI · Security',
    description:
      'An Isolation Forest engine that flags brute-force attempts and request spikes from live log streams — full pipeline from model to dashboard, deployed to Azure with zero-touch CI/CD.',
    tags: ['AI', 'Security'],
    stack: ['Python', 'Flask', 'Scikit-learn', 'Isolation Forest', 'Azure', 'GitHub Actions'],
    metrics: [
      { value: '10K+', label: 'Logs / day' },
      { value: 'Real-time', label: 'Detection' },
    ],
    featured: false,
    githubUrl: 'https://github.com/Vswashah',
  },
  {
    id: 'secure-relay',
    title: 'Secure Relay Chat System',
    tagline: 'Cryptography · Systems',
    description:
      'A multi-client, socket-based chat with end-to-end encryption. Ephemeral Diffie-Hellman gives forward secrecy; HMAC + nonce validation blocks replay and tampering.',
    tags: ['Cryptography', 'Systems'],
    stack: ['Python', 'RSA', 'Diffie-Hellman', 'HMAC-SHA256', 'OpenSSL'],
    metrics: [
      { value: '100+', label: 'Sessions tested' },
      { value: 'E2E', label: 'Encrypted' },
    ],
    featured: false,
    githubUrl: 'https://github.com/Vswashah',
  },
]