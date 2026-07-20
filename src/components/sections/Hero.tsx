'use client'

import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/gsap'

const NAME_LINE_1 = 'VISHWAA'
const NAME_LINE_2 = 'SHAH'
const CENTER_SCALE = 1.5

const qualities: [string, string][] = [
  ['FULL-STACK', 'Ships frontend through infra'],
  ['AI-NATIVE', 'Real orchestration, not API wrappers'],
  ['PRODUCTION-MINDED', 'CI/CD, tested, real metrics'],
  ['ACCELERATOR', 'CometX Accelerator 2026 — UT Dallas x Harvard Business School Foundry | Top 20 / 181 Teams, Draper Pitch Competition'],
]

// Deterministic PRNG (mulberry32) so the ASCII texture's "random" layout is
// identical on server and client — Math.random() here would cause a
// hydration mismatch.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const ASCII_CHARS = ['·', '·', '·', '░', '░', '▒', '▓', '█', '0', '1']

const ASCII_CELL_COUNT = 140
const asciiRand = mulberry32(1337)
const asciiCells = Array.from({ length: ASCII_CELL_COUNT }, (_, i) => ({
  id: i,
  top: asciiRand() * 100,
  left: asciiRand() * 100,
  char: ASCII_CHARS[Math.floor(asciiRand() * ASCII_CHARS.length)],
}))

export default function Hero() {
  const headerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  // State 1: park the name dead-center (scaled up) before anything is
  // visible, then run the typewriter via SplitText. The h1 itself starts
  // opacity:0 (set server-side in the JSX below), so splitting/positioning
  // it before revealing causes no flash — nothing is visible until the
  // gsap.set calls below run synchronously in one pass.
  useEffect(() => {
    const header = headerRef.current
    const name = nameRef.current
    if (!header || !name) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const restTargets = document.querySelectorAll<HTMLElement>('[data-reveal-cover]')

    if (reduceMotion) {
      gsap.set(name, { x: 0, y: 0, scale: 1, opacity: 1 })
      gsap.set(restTargets, { opacity: 1, y: 0 })
      return
    }

    const split = new SplitText(name, { type: 'chars' })

    const nameRect = name.getBoundingClientRect()
    const headerRect = header.getBoundingClientRect()
    const deltaX = headerRect.left + headerRect.width / 2 - (nameRect.left + nameRect.width / 2)
    const deltaY = headerRect.top + headerRect.height / 2 - (nameRect.top + nameRect.height / 2)

    gsap.set(split.chars, { color: '#6f6d66', y: 4 })
    gsap.set(name, { x: deltaX, y: deltaY, scale: CENTER_SCALE, transformOrigin: '50% 50%', opacity: 1 })
    gsap.set(restTargets, { opacity: 0, y: 24 })

    // Hold the full name visibly grey for a beat before the typewriter
    // starts, then let each character's fill-to-white read clearly —
    // slower stagger/duration than a typical fade so the sweep is legible.
    const tl = gsap.timeline()
    tl.to(split.chars, { color: '#f0ece1', y: 0, duration: 0.4, ease: 'power1.inOut', stagger: 0.09 }, 0.5)

    return () => {
      tl.kill()
      split.revert()
    }
  }, [])

  // State 2: scroll-driven settle — the centered name scales/moves back to
  // its resting position while the rest of the Hero fades/slides in,
  // pinned for ~125vh so the transition reads as deliberate.
  useEffect(() => {
    const header = headerRef.current
    const name = nameRef.current
    if (!header || !name) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const restTargets = document.querySelectorAll<HTMLElement>('[data-reveal-cover]')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.25}`,
          scrub: true,
          pin: true,
        },
      })
      tl.to(name, { x: 0, y: 0, scale: 1, ease: 'none', duration: 1 }, 0)
      tl.to(restTargets, { opacity: 1, y: 0, ease: 'none', duration: 0.7, stagger: 0.08 }, 0.15)
    }, header)

    return () => ctx.revert()
  }, [])

  // Ambient ASCII/pixel-art texture behind the name — a sparse field of
  // block/binary characters that occasionally scramble to a new glyph via
  // ScrambleTextPlugin, reading as a living digital noise rather than a
  // fixed decoration. Static (no scrambling) under reduced motion.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cells = header.querySelectorAll<HTMLSpanElement>('[data-ascii-char]')
    if (!cells.length) return

    const interval = setInterval(() => {
      const batchSize = 6
      for (let i = 0; i < batchSize; i++) {
        const el = cells[Math.floor(Math.random() * cells.length)]
        const newChar = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
        gsap.to(el, {
          duration: 0.8,
          scrambleText: { text: newChar, chars: '01░▒▓█·', speed: 0.4 },
          opacity: 0.5,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.to(el, { opacity: 0.22, duration: 1.2, ease: 'power1.out' })
          },
        })
      }
    }, 1000)

    return () => clearInterval(interval)
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
      {/* Ambient ASCII/pixel-art texture — sparse, low-opacity, behind everything */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {asciiCells.map((cell) => (
          <span
            key={cell.id}
            data-ascii-char
            className="absolute"
            style={{
              top: `${cell.top}%`,
              left: `${cell.left}%`,
              fontFamily: 'var(--ff-plex-mono)',
              fontSize: '13px',
              lineHeight: 1,
              color: '#6f6d66',
              opacity: 0.22,
            }}
          >
            {cell.char}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-6 md:px-10 py-24">
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="flex-1 min-w-0">
            <h1
              ref={nameRef}
              className="w-fit font-semibold uppercase leading-[0.86] tracking-[-0.01em] whitespace-nowrap"
              style={{
                fontFamily: 'var(--ff-plex-sans)',
                color: 'var(--bp-slate-fg)',
                fontSize: 'clamp(52px, 9vw, 132px)',
                opacity: 0,
              }}
            >
              {NAME_LINE_1}{' '}
              <br />
              {NAME_LINE_2}
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
