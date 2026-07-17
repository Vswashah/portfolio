'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { metrics } from '@/content/metrics'
import { cn } from '@/lib/utils'

interface SignalSheet {
  mark: string
  value: number
  suffix: string
  label: string
  caption: string
  crossRef?: { sheet: string; text: string; href: string }
}

const SIGNAL_SHEETS: SignalSheet[] = metrics.map((m, i) => ({
  ...m,
  mark: `A-${String(i + 4).padStart(2, '0')}`,
  caption: [
    'Palm Infotech — API response & query optimization',
    'Palm Infotech — NestJS & MySQL backend',
    'Palm Infotech — unit & integration test suite',
    'UT Dallas — Data Structures & Algorithm Analysis',
    'Real-time ingestion & monitoring, cross-project',
  ][i],
  ...(i === 4 ? { crossRef: { sheet: 'A-03', text: 'Fleet Telemetry', href: '#projects' } } : {}),
}))

export default function Signals() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])
  const indexRef = useRef(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const revealedRef = useRef(false)

  const [index, setIndexState] = useState(0)
  const [liveCount, setLiveCount] = useState(SIGNAL_SHEETS[0].value)

  // Runs the panel crossfade/slide and updates state — the single place that
  // actually changes which sheet is showing. Only ScrollTrigger's onUpdate
  // calls this directly; everything else (keyboard, buttons, dots) instead
  // moves the real scroll position via requestIndex, so scroll stays the one
  // source of truth for which sheet is active.
  function applyTransition(target: number) {
    const clamped = Math.max(0, Math.min(SIGNAL_SHEETS.length - 1, target))
    if (clamped === indexRef.current) return
    const direction = clamped > indexRef.current ? 1 : -1
    const outgoing = panelRefs.current[indexRef.current]
    const incoming = panelRefs.current[clamped]

    const tl = gsap.timeline()
    if (outgoing) {
      tl.to(outgoing, { opacity: 0, x: -40 * direction, duration: 0.35, ease: 'power2.in' })
    }
    if (incoming) {
      gsap.set(incoming, { x: 40 * direction })
      tl.to(incoming, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, outgoing ? '-=0.15' : 0)
    }

    indexRef.current = clamped
    setIndexState(clamped)
  }

  // Keyboard/button/dot navigation — scrolls the page to the point in the
  // pinned range that corresponds to the target sheet; ScrollTrigger's
  // onUpdate below picks up the resulting scroll and calls applyTransition.
  function requestIndex(target: number) {
    const st = scrollTriggerRef.current
    if (!st) return
    const clamped = Math.max(0, Math.min(SIGNAL_SHEETS.length - 1, target))
    const progress = clamped / (SIGNAL_SHEETS.length - 1)
    const scrollPos = st.start + progress * (st.end - st.start)
    window.scrollTo({ top: scrollPos, behavior: 'smooth' })
  }

  // Pin the section and map scroll progress through it directly to slide
  // index, snapping to each sheet — this is what makes scrolling (not just
  // arrow keys) change the slide.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const total = SIGNAL_SHEETS.length

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (total - 1)}`,
      pin: true,
      scrub: 0.3,
      snap: {
        snapTo: 1 / (total - 1),
        duration: 0.35,
        ease: 'power1.inOut',
      },
      onEnter: () => {
        if (revealedRef.current) return
        revealedRef.current = true
        const targets = section.querySelectorAll('[data-reveal-cover]')
        gsap.set(targets, { opacity: 0, y: 28 })
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        })
      },
      onUpdate: (self) => {
        const newIndex = Math.round(self.progress * (total - 1))
        if (newIndex !== indexRef.current) {
          applyTransition(newIndex)
        }
      },
    })

    scrollTriggerRef.current = st

    return () => {
      st.kill()
      scrollTriggerRef.current = null
    }
  }, [])

  // Count-up the active panel's number whenever the page changes
  useEffect(() => {
    const target = SIGNAL_SHEETS[index].value
    const proxy = { v: 0 }
    const tween = gsap.to(proxy, {
      v: target,
      duration: 1.1,
      ease: 'power3.out',
      onUpdate: () => setLiveCount(Math.round(proxy.v)),
    })
    return () => {
      tween.kill()
    }
  }, [index])

  // Keyboard navigation — left/right, only while the section is in view
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const st = scrollTriggerRef.current
      // GSAP's own `isActive` is strictly progress > 0 && < 1, so it reads
      // false exactly at the pin's start boundary — which is precisely where
      // a user lands after clicking the "Signals" nav link. Check the actual
      // scroll range instead so the boundary counts as "in this section".
      if (!st || window.scrollY < st.start || window.scrollY > st.end) return
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        requestIndex(indexRef.current + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        requestIndex(indexRef.current - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const current = SIGNAL_SHEETS[index]

  return (
    <section
      ref={sectionRef}
      id="signals"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{
        background: 'var(--bp-slate-900)',
        backgroundImage:
          'linear-gradient(var(--bp-slate-grid) 1px, transparent 1px), linear-gradient(90deg, var(--bp-slate-grid) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div
        data-reveal-cover
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
      >
        Signals As Load Data — A-04–A-08
      </div>

      <div className="relative max-w-[900px] w-full mx-auto px-6 md:px-10">
        <div data-reveal-cover className="flex items-center gap-4 mb-4">
          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
          >
            SHEET {current.mark}
          </span>
          <span className="flex-1 h-px" style={{ background: 'var(--bp-slate-grid)' }} />
          <span
            className="text-[11px] tracking-[0.1em]"
            style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(SIGNAL_SHEETS.length).padStart(2, '0')}
          </span>
        </div>

        <div data-reveal-cover className="relative min-h-[340px] md:min-h-[420px]">
          {SIGNAL_SHEETS.map((sheet, i) => (
            <div
              key={sheet.label}
              ref={(el) => {
                panelRefs.current[i] = el
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="tabular-nums font-semibold tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-slate-fg)', fontSize: 'clamp(80px, 14vw, 180px)' }}
                >
                  {i === index ? liveCount : sheet.value}
                </span>
                <span
                  className="font-semibold"
                  style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-slate-fg)', fontSize: 'clamp(36px, 6vw, 80px)' }}
                >
                  {sheet.suffix}
                </span>
              </div>

              <div
                className="text-[15px] md:text-[17px] tracking-[0.02em] uppercase mt-2"
                style={{ fontFamily: 'var(--ff-plex-mono)', color: '#c9c6ba' }}
              >
                {sheet.label}
              </div>

              <div
                className="text-[13px] mt-3"
                style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
              >
                {sheet.caption}
              </div>

              {sheet.crossRef && (
                <a
                  href={sheet.crossRef.href}
                  className="inline-flex items-center gap-2 mt-6 text-[12px] tracking-[0.08em] uppercase border px-3 py-1.5 transition-colors duration-200 hover:border-[#8a8880]"
                  style={{ fontFamily: 'var(--ff-plex-mono)', color: '#c9c6ba', borderColor: 'var(--bp-slate-grid)' }}
                >
                  → See {sheet.crossRef.sheet} · {sheet.crossRef.text}
                </a>
              )}
            </div>
          ))}
        </div>

        <div data-reveal-cover className="flex items-center gap-5 mt-10">
          <button
            type="button"
            onClick={() => requestIndex(index - 1)}
            disabled={index === 0}
            aria-label="Previous signal"
            className="w-9 h-9 flex items-center justify-center border text-[14px] transition-colors duration-200 disabled:opacity-30 hover:border-[#8a8880]"
            style={{ borderColor: 'var(--bp-slate-grid)', color: 'var(--bp-slate-fg)' }}
          >
            ←
          </button>

          <div className="flex gap-2">
            {SIGNAL_SHEETS.map((sheet, i) => (
              <button
                key={sheet.mark}
                type="button"
                onClick={() => requestIndex(i)}
                aria-label={`Go to sheet ${sheet.mark}`}
                className="w-2.5 h-2.5 transition-colors duration-200"
                style={{ background: i === index ? 'var(--bp-slate-fg)' : 'var(--bp-slate-grid)' }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => requestIndex(index + 1)}
            disabled={index === SIGNAL_SHEETS.length - 1}
            aria-label="Next signal"
            className="w-9 h-9 flex items-center justify-center border text-[14px] transition-colors duration-200 disabled:opacity-30 hover:border-[#8a8880]"
            style={{ borderColor: 'var(--bp-slate-grid)', color: 'var(--bp-slate-fg)' }}
          >
            →
          </button>

          <span
            className={cn('ml-auto text-[11px] tracking-[0.1em] uppercase hidden sm:block')}
            style={{ fontFamily: 'var(--ff-plex-mono)', color: '#6f6d66' }}
          >
            Scroll, or use ← →
          </span>
        </div>
      </div>
    </section>
  )
}
