import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'trackly',
    title: 'Trackly',
    tagline: 'A Jira alternative built around retrieval, not just tracking.',
    description:
      'A Jira alternative built around retrieval, not just tracking — a RAG pipeline over project history using LangChain and pgvector, with an observability layer surfacing pipeline health in real time.',
    tags: ['AI', 'RAG'],
    stack: ['LangChain', 'pgvector', 'PostgreSQL'],
    metrics: [],
    featured: false,
  },
  {
    id: 'fleet-telemetry',
    title: 'Fleet Telemetry',
    tagline: 'A real-time telemetry pipeline engineered for observability from the ground up.',
    description:
      'A real-time telemetry pipeline engineered for observability from the ground up — Kafka-driven ingestion, Kubernetes-orchestrated, instrumented end-to-end with Prometheus and Grafana, validated by a 79/79 passing test suite and shipped through GitHub Actions CI/CD.',
    tags: ['Observability', 'Systems'],
    stack: ['Kafka', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana', 'Kubernetes', 'GitHub Actions'],
    metrics: [{ value: '79/79', label: 'Tests passing' }],
    featured: false,
  },
  {
    id: 'phantom',
    title: 'Phantom',
    tagline: 'A multi-agent adversarial debate system.',
    description:
      'A multi-agent adversarial debate system — opposing LLM agents argue a claim under LangGraph orchestration, run locally via Ollama and LiteLLM. Built deliberately step-by-step as a deep dive into multi-agent architecture, not a black-box wrapper.',
    tags: ['Multi-Agent', 'AI'],
    stack: ['LangGraph', 'LiteLLM', 'Ollama', 'Python 3.11 (uv)'],
    metrics: [],
    featured: false,
  },
  {
    id: 'jobos',
    title: 'JobOS',
    tagline: 'A multi-agent system that automates the entire job-application pipeline.',
    description:
      "A multi-agent system that automates the entire job-application pipeline — parses a job description, scores your projects and experience against it by relevance, and generates a tailored resume in under 30 seconds. Built on LangGraph, FastAPI, React, PostgreSQL, and pgvector, with full CI/CD. Not a demo — it's actively generating resumes submitted to real companies, with discovery, visa filtering, and outreach automation next in the pipeline.",
    tags: ['AI', 'Automation'],
    stack: ['LangGraph', 'FastAPI', 'React', 'PostgreSQL', 'pgvector'],
    metrics: [{ value: '<30s', label: 'Per resume' }],
    featured: false,
  },
]
