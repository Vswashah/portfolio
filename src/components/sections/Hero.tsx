'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const NAME_LINE_1 = 'VISHWAA'
const NAME_LINE_2 = 'SHAH'

const qualities: [string, string][] = [
  ['FULL-STACK', 'Ships frontend through infra'],
  ['AI-NATIVE', 'Real orchestration, not API wrappers'],
  ['PRODUCTION-MINDED', 'CI/CD, tested, real metrics'],
  ['BUILDER & MENTOR', 'Co-founder while mentoring 80+ students'],
]

export default function Hero() {
  const headerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  // Typewriter name reveal, then stagger in the rest of the Hero
  useEffect(() => {
    const header = headerRef.current
    const name = nameRef.current
    if (!header || !name) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = name.querySelectorAll<HTMLSpanElement>('[data-char]')
    const restTargets = header.querySelectorAll<HTMLElement>('[data-reveal-cover]')

    if (reduceMotion) {
      gsap.set(chars, { opacity: 1 })
      gsap.set(restTargets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(chars, { opacity: 0, y: 6 })
    gsap.set(restTargets, { opacity: 0, y: 24 })

    const tl = gsap.timeline()
    tl.to(chars, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', stagger: 0.035 })
    tl.to(restTargets, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, '+=0.1')

    return () => {
      tl.kill()
    }
  }, [])

  // Scroll-driven "push through" zoom — pins the Hero, scales + fades its
  // content as the next section scrolls up underneath it
  useEffect(() => {
    const header = headerRef.current
    const content = contentRef.current
    if (!header || !content) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          pin: true,
        },
      })
      // Fade completes at 60% of the scroll range while scale keeps going to
      // 100%, so the text never has to stay legible at the largest scale.
      tl.to(content, { scale: 1.25, ease: 'none', duration: 1 }, 0)
      tl.to(content, { opacity: 0, ease: 'none', duration: 0.6 }, 0)
    }, header)

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className="relative min-h-svh flex flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--bp-slate-900)',
        backgroundImage: [
          'radial-gradient(ellipse 80% 60% at 50% 45%, #363430 0%, transparent 70%)',
          'linear-gradient(rgba(61,61,58,0.5) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(61,61,58,0.5) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: 'auto, 32px 32px, 32px 32px',
      }}
    >
      <div ref={contentRef} className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-6 md:px-10 py-24">
        {/* Minimal architectural elevation — a real structure, not decoration */}
        <svg
          viewBox="0 0 1200 420"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1300px] h-auto pointer-events-none"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        >
          {/* Gable roofline */}
          <path d="M650,120 L820,40 L990,120" fill="none" stroke="#8a8880" strokeWidth="1" />
          {/* Structural verticals — two walls, one interior column */}
          <path d="M650,120 L650,340 M990,120 L990,340 M820,180 L820,340" fill="none" stroke="#8a8880" strokeWidth="1" />
          {/* Grade line */}
          <path d="M600,340 L1040,340" fill="none" stroke="#8a8880" strokeWidth="1" />
          {/* Dimension line with extension ticks */}
          <path d="M650,368 L650,388 M990,368 L990,388 M650,378 L990,378" fill="none" stroke="#8a8880" strokeWidth="1" />
          <text
            x="820"
            y="404"
            textAnchor="middle"
            fill="#8a8880"
            style={{ fontFamily: 'var(--ff-plex-mono)', fontSize: '13px', letterSpacing: '0.05em' }}
          >
            24&apos;-0&quot;
          </text>
          {/* Sheet register marks */}
          <path
            d="M120,60 L60,20 M1080,60 L1140,20 M120,360 L60,400 M1080,360 L1140,400"
            fill="none" stroke="#6f6d66" strokeWidth="1"
          />
        </svg>

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="flex-1 min-w-0">
            <h1
              ref={nameRef}
              className="font-semibold uppercase leading-[0.86] tracking-[-0.01em] whitespace-nowrap"
              style={{
                fontFamily: 'var(--ff-plex-sans)',
                color: 'var(--bp-slate-fg)',
                fontSize: 'clamp(52px, 9vw, 132px)',
              }}
            >
              <span aria-hidden="true">
                {NAME_LINE_1.split('').map((ch, i) => (
                  <span key={`l1-${i}`} data-char className="inline-block" style={{ opacity: 0 }}>{ch}</span>
                ))}
              </span>
              <br />
              <span aria-hidden="true">
                {NAME_LINE_2.split('').map((ch, i) => (
                  <span key={`l2-${i}`} data-char className="inline-block" style={{ opacity: 0 }}>{ch}</span>
                ))}
              </span>
              <span className="sr-only">{NAME_LINE_1} {NAME_LINE_2}</span>
            </h1>

            <div data-reveal-cover className="mt-7 flex flex-col gap-3" style={{ opacity: 0 }}>
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
            data-reveal-cover
            className="w-full lg:w-[280px] shrink-0 p-6"
            style={{ background: 'var(--bp-paper)', opacity: 0 }}
          >
            <div
              className="text-[10px] tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
            >
              Qualities
            </div>
            <dl className="flex flex-col gap-3" style={{ fontFamily: 'var(--ff-plex-mono)' }}>
              {qualities.map(([k, v], i) => (
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
        data-reveal-cover
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-t"
        style={{ borderColor: 'var(--bp-slate-grid)', fontFamily: 'var(--ff-plex-mono)', opacity: 0 }}
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
