'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function FoundingPrinciple() {
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
        duration: 0.9,
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
      id="principle"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{
        background: 'var(--bp-paper)',
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
        Founding Principle — A-01
      </div>

      <div className="relative max-w-[900px] mx-auto px-6 md:px-10">
        <div data-reveal className="flex items-center gap-4 mb-14">
          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
          >
            SHEET A-01
          </span>
          <span className="flex-1 h-px" style={{ background: 'var(--bp-paper-line)' }} />
        </div>

        <h2
          data-reveal
          className="font-semibold leading-[1.05] tracking-[-0.02em] mb-8"
          style={{
            fontFamily: 'var(--ff-plex-sans)',
            color: 'var(--bp-ink-900)',
            fontSize: 'clamp(34px, 5.2vw, 68px)',
          }}
        >
          Systems are drawings before they&apos;re software.
        </h2>

        <p
          data-reveal
          className="text-[16px] md:text-[18px] leading-[1.7] max-w-[600px]"
          style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-ink-700)' }}
        >
          Every project here starts on paper — constraints mapped, load-bearing
          decisions made, edge cases drafted — before a single line of
          production code exists. That discipline is the throughline across
          every sheet in this set.
        </p>
      </div>
    </section>
  )
}
