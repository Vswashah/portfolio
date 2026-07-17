'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export default function Hero() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref: nameRef, inView: nameIn } = useInView()
  const { ref: lineRef, inView: lineIn } = useInView()
  const { ref: specRef, inView: specIn } = useInView()

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const paths = svg.querySelectorAll<SVGPathElement>('.bp-draw')
    paths.forEach((path) => {
      const len = path.getTotalLength()
      if (reduce) {
        path.style.strokeDasharray = 'none'
        path.style.strokeDashoffset = '0'
        return
      }
      path.style.strokeDasharray = `${len}`
      path.style.strokeDashoffset = `${len}`
      path.getBoundingClientRect()
      path.style.transition = 'stroke-dashoffset 1.6s var(--ease-out-expo)'
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0'
      })
    })
  }, [])

  return (
    <header
      className="relative min-h-svh flex flex-col overflow-hidden"
      style={{
        background: 'var(--bp-slate-900)',
        backgroundImage:
          'linear-gradient(var(--bp-slate-grid) 1px, transparent 1px), linear-gradient(90deg, var(--bp-slate-grid) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-6 md:px-10 py-24">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 420"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1300px] h-auto opacity-70 pointer-events-none"
          aria-hidden="true"
        >
          <rect
            className="bp-draw"
            x="120" y="60" width="960" height="300"
            fill="none" stroke="#8a8880" strokeWidth="1.2"
          />
          <path
            className="bp-draw"
            d="M120,210 L1080,210 M480,60 L480,360 M720,60 L720,360"
            fill="none" stroke="#6f6d66" strokeWidth="1"
          />
          <path
            className="bp-draw"
            d="M120,60 L60,20 M1080,60 L1140,20 M120,360 L60,400 M1080,360 L1140,400"
            fill="none" stroke="#6f6d66" strokeWidth="1"
          />
          <circle className="bp-draw" cx="600" cy="210" r="4" fill="#8a8880" />
        </svg>

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="flex-1 min-w-0">
            <h1
              ref={nameRef as React.RefObject<HTMLHeadingElement>}
              className={cn(
                'reveal font-semibold uppercase leading-[0.86] tracking-[-0.01em] whitespace-nowrap',
                nameIn && 'in'
              )}
              style={{
                fontFamily: 'var(--ff-plex-sans)',
                color: 'var(--bp-slate-fg)',
                fontSize: 'clamp(52px, 9vw, 132px)',
              }}
            >
              Vishwaa
              <br />
              Shah
            </h1>

            <div
              ref={lineRef as React.RefObject<HTMLDivElement>}
              className={cn('reveal mt-7 flex flex-col gap-3 [transition-delay:150ms]', lineIn && 'in')}
            >
              <p
                className="text-[15px] md:text-[17px] max-w-[520px]"
                style={{ fontFamily: 'var(--ff-plex-sans)', color: '#c9c6ba' }}
              >
                Systems, drafted before they&apos;re built.
              </p>
              <span
                className="text-[11px] tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
              >
                AI Engineer &amp; Software Developer — MSCS, UT Dallas
              </span>
            </div>
          </div>

          <div
            ref={specRef as React.RefObject<HTMLDivElement>}
            className={cn(
              'reveal w-full lg:w-[280px] shrink-0 p-6 [transition-delay:250ms]',
              specIn && 'in'
            )}
            style={{ background: 'var(--bp-paper)' }}
          >
            <div
              className="text-[10px] tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
            >
              Specifications
            </div>
            <dl className="flex flex-col gap-3" style={{ fontFamily: 'var(--ff-plex-mono)' }}>
              {[
                ['ROLE', 'AI ENGINEER'],
                ['STACK', '4 DOMAINS'],
                ['STATUS', 'ACTIVE — DALLAS, TX'],
                ['DRAFTED', '2026'],
              ].map(([k, v], i) => (
                <div key={k}>
                  {i > 0 && <div className="border-t mb-3" style={{ borderColor: 'var(--bp-paper-line)' }} />}
                  <dt className="text-[10px]" style={{ color: 'var(--bp-ink-500)' }}>{k}</dt>
                  <dd className="text-[14px] font-semibold" style={{ color: 'var(--bp-ink-900)' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-t"
        style={{ borderColor: 'var(--bp-slate-grid)', fontFamily: 'var(--ff-plex-mono)' }}
      >
        <span className="text-[11px] tracking-[0.1em] uppercase" style={{ color: '#8a8880' }}>
          Scroll / Sheet Set
        </span>
        <span className="text-[11px] tracking-[0.1em]" style={{ color: '#8a8880' }}>
          VS-SYS / 2026
        </span>
      </div>
    </header>
  )
}
