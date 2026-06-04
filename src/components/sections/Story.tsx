'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { timeline } from '@/content/timeline'
import { cn } from '@/lib/utils'

export default function Story() {
  const { ref: headRef, inView: headIn } = useInView()
  const spineRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = timelineRef.current
    const spine = spineRef.current
    if (!el || !spine) return

    function update() {
      const rect = el!.getBoundingClientRect()
      const frac = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - rect.top) / rect.height))
      spine!.style.height = frac * 100 + '%'
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section className="py-[120px] bg-[var(--bg2)]" id="story">
      <div className="max-w-[1180px] mx-auto px-10">

        {/* Head */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('reveal max-w-[700px] mb-16', headIn && 'in')}
        >
          <span className="block text-[12px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] font-mono mb-3.5">
            01 — Trajectory
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.025em] mb-4">
            From a strong engineering foundation to AI-native products.
          </h2>
          <p className="text-[16px] text-[var(--t2)] leading-[1.7]">
            Not a résumé — a build log. Each step compounded the last: rigorous fundamentals,
            real backend systems in production, and a shift toward intelligent software that reasons over data.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative flex flex-col pb-5">

          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--hair)] -translate-x-1/2 max-md:left-4">
            <span ref={spineRef} className="block w-full h-0 bg-gradient-to-b from-[#4d7cff] to-[#7c5cfc] transition-all duration-300" />
          </div>

          {timeline.map((m, i) => {
            const { ref, inView } = useInView()
            const isLeft = m.side === 'left'

            return (
              <div
                key={m.id}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={cn(
                  'reveal relative flex items-start gap-10 py-10',
                  'w-[calc(50%-32px)]',
                  isLeft ? 'mr-auto flex-row-reverse text-right' : 'ml-auto flex-row',
                  'max-md:w-full max-md:pl-11 max-md:flex-col max-md:text-left',
                  inView && 'in',
                  `[transition-delay:${i * 80}ms]`
                )}
              >
                {/* Node */}
                <div className={cn(
                  'absolute top-[50px] w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg2)] shadow-[0_0_14px_rgba(77,124,255,0.6)] transition-all duration-300 hover:scale-150 hover:shadow-[0_0_22px_rgba(77,124,255,0.9)]',
                  isLeft ? 'right-[-47px]' : 'left-[-47px]',
                  'max-md:left-[-36px] max-md:top-5'
                )} />

                <div className="flex-1">
                  <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--accent)] font-mono mb-2">
                    {m.year}
                  </div>
                  <h3 className="text-[20px] font-semibold mb-2.5">{m.title}</h3>
                  <p className="text-[15px] text-[var(--t2)] leading-[1.65]">{m.description}</p>
                  <div className="mt-3 text-[12px] text-[var(--t3)] font-mono">{m.place}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}