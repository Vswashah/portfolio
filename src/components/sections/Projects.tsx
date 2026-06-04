'use client'

import { useInView } from '@/hooks/useInView'
import { projects } from '@/content/projects'
import { cn } from '@/lib/utils'

export default function Projects() {
  const { ref: headRef, inView: headIn } = useInView()
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section className="py-[120px] bg-[var(--bg)]" id="projects">
      <div className="max-w-[1180px] mx-auto px-10">

        {/* Head */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('reveal max-w-[700px] mb-16', headIn && 'in')}
        >
          <span className="block text-[12px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] font-mono mb-3.5">
            04 — Selected Work
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.025em] mb-4">
            Products, not assignments.
          </h2>
          <p className="text-[16px] text-[var(--t2)] leading-[1.7]">
            Full pipelines — model to API to dashboard to cloud. Each one shipped with production-oriented architecture.
          </p>
        </div>

        <div className="flex flex-col gap-6">

          {/* Featured */}
          {featured && (() => {
            const { ref, inView } = useInView()
            return (
              <article
                ref={ref as React.RefObject<HTMLElement>}
                className={cn(
                  'reveal grid grid-cols-2 overflow-hidden rounded-[14px] bg-[var(--surface)] border border-[var(--hair)] min-h-[400px] transition-all duration-300 hover:border-[rgba(77,124,255,0.3)] hover:shadow-[0_8px_60px_rgba(77,124,255,0.1)]',
                  'max-md:grid-cols-1',
                  inView && 'in'
                )}
              >
                {/* Copy */}
                <div className="p-12 flex flex-col max-md:p-7">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--t3)] font-mono border border-[var(--hair)] rounded px-2 py-1 w-fit mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    Featured Project
                  </span>
                  <h3 className="text-[clamp(26px,3.5vw,38px)] font-bold tracking-[-0.02em] mb-2.5">
                    {featured.title}
                  </h3>
                  <p className="text-[15px] text-[var(--t2)] mb-3.5 leading-[1.6]">{featured.tagline}</p>
                  <p className="text-[14px] text-[var(--t2)] leading-[1.7] flex-1">{featured.description}</p>

                  {/* Metrics */}
                  <div className="flex gap-6 flex-wrap my-6">
                    {featured.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-[20px] font-bold bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] bg-clip-text text-transparent mb-0.5">
                          {m.value}
                        </div>
                        <div className="text-[12px] text-[var(--t3)]">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-5">
                    {featured.stack.map((s) => (
                      <span key={s} className="text-[12px] bg-white/5 border border-[var(--hair)] rounded-[5px] px-2.5 py-1 text-[var(--t2)] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="bg-black/30 border-l border-[var(--hair)] relative overflow-hidden max-md:hidden">
                  <div className="absolute inset-0 flex flex-col gap-3.5 p-7">
                    {/* Mock dashboard */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4d7cff] to-[#7c5cfc]" />
                        <span className="text-[13px] font-bold">Trackly</span>
                      </div>
                      <div className="flex gap-1.5">
                        {['Dashboard', 'Issues', 'AI'].map((t, i) => (
                          <span key={t} className={cn(
                            'text-[11px] px-2.5 py-1 rounded-md border',
                            i === 1
                              ? 'bg-[rgba(77,124,255,0.2)] border-[rgba(77,124,255,0.4)] text-[#4d7cff]'
                              : 'bg-white/5 border-white/7 text-[var(--t3)]'
                          )}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[['24', 'Open'], ['8', 'In Progress'], ['5', 'Resolved']].map(([n, l]) => (
                        <div key={l} className="bg-black/35 border border-white/7 rounded-lg p-3">
                          <div className="text-[20px] font-bold bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] bg-clip-text text-transparent">{n}</div>
                          <div className="text-[11px] text-[var(--t3)] mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                      {[
                        { id: 'TRK-042', title: 'RAG: handle long context chunking', status: 'In Progress', color: '#4d7cff' },
                        { id: 'TRK-041', title: 'Fix ticket assign race condition',   status: 'Review',      color: '#22d3a0' },
                        { id: 'TRK-040', title: 'AI summary for closed tickets',      status: 'Open',        color: '#ffc542' },
                      ].map((t) => (
                        <div key={t.id} className="flex items-center gap-2.5 bg-black/25 border border-white/6 rounded-lg px-3 py-2">
                          <span className="text-[10px] text-[var(--t3)] font-mono shrink-0">{t.id}</span>
                          <span className="text-[12px] text-[var(--t2)] flex-1 truncate">{t.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded shrink-0" style={{ background: `${t.color}22`, border: `1px solid ${t.color}44`, color: t.color }}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[rgba(124,92,252,0.1)] border border-[rgba(124,92,252,0.25)] rounded-lg px-3.5 py-2.5 flex items-center gap-2.5">
                      <span className="text-sm">✦</span>
                      <span className="text-[12px] text-[var(--t2)]">
                        <b className="text-[#a78bfa]">AI:</b> TRK-042 is similar to TRK-031. View suggested fix?
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })()}

          {/* Secondary row */}
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {rest.map((p, i) => {
              const { ref, inView } = useInView()
              return (
                <article
                  key={p.id}
                  ref={ref as React.RefObject<HTMLElement>}
                  className={cn(
                    'reveal p-9 rounded-[14px] bg-[var(--surface)] border border-[var(--hair)] overflow-hidden transition-all duration-300 hover:border-[rgba(77,124,255,0.25)] hover:shadow-[0_8px_40px_rgba(77,124,255,0.08)] hover:-translate-y-1',
                    'max-md:p-6',
                    inView && 'in',
                    `[transition-delay:${i * 100}ms]`
                  )}
                >
                  <span className="inline-flex text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--t3)] font-mono border border-[var(--hair)] rounded px-2 py-1 mb-5">
                    {p.tags.join(' · ')}
                  </span>
                  <h3 className="text-[clamp(22px,2.5vw,30px)] font-bold tracking-[-0.02em] mb-3.5">{p.title}</h3>
                  <p className="text-[14px] text-[var(--t2)] leading-[1.7] mb-5">{p.description}</p>

                  <div className="flex gap-6 flex-wrap mb-5">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-[18px] font-bold bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] bg-clip-text text-transparent mb-0.5">
                          {m.value}
                        </div>
                        <div className="text-[12px] text-[var(--t3)]">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[12px] bg-white/5 border border-[var(--hair)] rounded-[5px] px-2.5 py-1 text-[var(--t2)] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}