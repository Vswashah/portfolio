'use client'

import { useInView } from '@/hooks/useInView'
import { experiences } from '@/content/experience'
import { cn } from '@/lib/utils'

export default function Experience() {
  const { ref: headRef, inView: headIn } = useInView()

  return (
    <section className="py-20 bg-[var(--bg)]" id="work">
      <div className="max-w-[1180px] mx-auto px-10">

        {/* Head */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('reveal max-w-[700px] mb-16', headIn && 'in')}
        >
          <span className="block text-[12px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] font-mono mb-3.5">
            03 — Mission Log
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.025em]">
            Where the engineering met the real world.
          </h2>
        </div>

        {/* Experience list */}
        <div className="flex flex-col gap-6">
          {experiences.map((xp, i) => {
            const { ref, inView } = useInView()
            return (
              <div
                key={xp.id}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={cn(
                  'reveal grid grid-cols-[240px_1fr] gap-10 p-9 rounded-[14px] bg-[var(--surface)] border border-[var(--hair)] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(77,124,255,0.25)] hover:shadow-[0_0_40px_rgba(77,124,255,0.06)]',
                  'max-md:grid-cols-1 max-md:gap-5 max-md:p-6',
                  inView && 'in',
                  `[transition-delay:${i * 100}ms]`
                )}
              >
                {/* Left */}
                <div>
                  <div className="text-[12px] font-medium tracking-[0.1em] uppercase text-[var(--accent)] font-mono mb-1.5">
                    {xp.role}
                  </div>
                  <h3 className="text-[22px] font-bold mb-1">{xp.company}</h3>
                  <div className="text-[14px] text-[var(--t3)] mb-2.5">{xp.location}</div>
                  <div className="flex items-center gap-2">
                    {xp.current && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_var(--green)]" />
                    )}
                    <span className="text-[12px] text-[var(--t3)] font-mono">{xp.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2.5 pt-0.5">
                  {xp.bullets.map((b, j) => (
                    <li key={j} className="relative text-[14.5px] text-[var(--t2)] leading-[1.65] pl-5">
                      <span className="absolute left-0 top-[10px] w-[5px] h-px bg-[var(--accent)]" />
                      <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<b class="text-[var(--t1)] font-semibold">$1</b>') }} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}