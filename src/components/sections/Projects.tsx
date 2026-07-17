'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { projects } from '@/content/projects'
import { cn } from '@/lib/utils'

interface DiagramSpec {
  nodes: string[]
  bidirectional?: number[]
}

const diagrams: Record<string, DiagramSpec> = {
  trackly: { nodes: ['Client', 'Server', 'RAG (LangChain)', 'Vector DB'] },
  'fleet-telemetry': { nodes: ['Simulator', 'Kafka', 'Consumer', 'Postgres / Anomaly', 'Grafana'] },
  phantom: { nodes: ['Agent A', 'Agent B', 'Judge', 'Local LLM'], bidirectional: [0] },
  jobos: { nodes: ['Job Description', 'Skill Extraction', 'Scoring / Ranking', 'PDF Generation'] },
}

function SystemDiagram({ projectId, spec }: { projectId: string; spec: DiagramSpec }) {
  const boxW = 108
  const boxH = 40
  const gap = 26
  const width = spec.nodes.length * boxW + (spec.nodes.length - 1) * gap
  const height = 64
  const y = (height - boxH) / 2
  const markerId = `arrow-${projectId}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={`${projectId} system diagram`}
    >
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--bp-ink-700)" />
        </marker>
      </defs>

      {spec.nodes.slice(0, -1).map((_, i) => {
        const x1 = i * (boxW + gap) + boxW
        const x2 = (i + 1) * (boxW + gap)
        const isBidi = spec.bidirectional?.includes(i)
        return (
          <line
            key={i}
            x1={x1 + 2}
            y1={height / 2}
            x2={x2 - 2}
            y2={height / 2}
            stroke="var(--bp-ink-700)"
            strokeWidth="1"
            markerEnd={`url(#${markerId})`}
            markerStart={isBidi ? `url(#${markerId})` : undefined}
          />
        )
      })}

      {spec.nodes.map((label, i) => {
        const x = i * (boxW + gap)
        return (
          <g key={label}>
            <rect x={x} y={y} width={boxW} height={boxH} fill="var(--bp-paper)" stroke="var(--bp-ink-500)" strokeWidth="1" />
            <foreignObject x={x} y={y} width={boxW} height={boxH}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontFamily: 'var(--ff-plex-mono)',
                  fontSize: '9px',
                  lineHeight: 1.25,
                  color: 'var(--bp-ink-900)',
                  padding: '0 4px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </foreignObject>
          </g>
        )
      })}
    </svg>
  )
}

function BracketPanel({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div
      {...rest}
      className={cn('relative p-8 max-md:p-6', className)}
      style={{ background: 'var(--bp-paper)', border: '1px solid var(--bp-paper-line)' }}
    >
      <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2" style={{ borderColor: 'var(--bp-ink-900)' }} />
      <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2" style={{ borderColor: 'var(--bp-ink-900)' }} />
      <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2" style={{ borderColor: 'var(--bp-ink-900)' }} />
      <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2" style={{ borderColor: 'var(--bp-ink-900)' }} />
      {children}
    </div>
  )
}

function ProjectPanel({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const spec = diagrams[project.id]

  return (
    <BracketPanel data-reveal className="flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[11px] tracking-[0.12em] uppercase"
          style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
        >
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <div className="flex gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.08em] uppercase px-2 py-1 border"
              style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-700)', borderColor: 'var(--bp-paper-line)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <h3
        className="font-semibold tracking-[-0.02em] mb-3"
        style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-ink-900)', fontSize: 'clamp(22px, 2.4vw, 28px)' }}
      >
        {project.title}
      </h3>

      <p
        className="text-[14.5px] leading-[1.7] mb-6"
        style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-ink-700)' }}
      >
        {project.description}
      </p>

      {spec && (
        <div className="mb-6 py-2 overflow-x-auto">
          <SystemDiagram projectId={project.id} spec={spec} />
        </div>
      )}

      {project.metrics.length > 0 && (
        <div className="flex gap-6 flex-wrap mb-6">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-[18px] font-semibold" style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-900)' }}>
                {m.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.08em]" style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2.5 py-1 border"
            style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-700)', borderColor: 'var(--bp-paper-line)' }}
          >
            {s}
          </span>
        ))}
      </div>
    </BracketPanel>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const targets = section.querySelectorAll('[data-reveal]')
      gsap.set(targets, { opacity: 0, y: 28 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'var(--bp-margin)',
        backgroundImage:
          'linear-gradient(var(--bp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--bp-grid-line) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div
        data-reveal
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
      >
        Projects As Systems — A-03
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <div data-reveal className="flex items-center gap-4 mb-4">
          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
          >
            SHEET A-03
          </span>
          <span className="flex-1 h-px" style={{ background: 'var(--bp-paper-line)' }} />
        </div>

        <h2
          data-reveal
          className="font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
          style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-ink-900)', fontSize: 'clamp(28px, 4vw, 44px)' }}
        >
          System diagrams — shipped, not sketched.
        </h2>
        <p
          data-reveal
          className="text-[16px] leading-[1.7] max-w-[560px] mb-16"
          style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-ink-700)' }}
        >
          Four systems, four architectures. Each panel is the real pipeline — not a screenshot standing in for one.
        </p>

        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
