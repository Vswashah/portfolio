'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { timeline } from '@/content/timeline'
import { experiences } from '@/content/experience'
import SheetStatement from '@/components/blueprint/SheetStatement'

const bulletsByTimelineId: Record<string, string[]> = {
  industry: experiences.find((e) => e.id === 'palm-infotech')?.bullets ?? [],
  graduate: experiences.find((e) => e.id === 'ut-dallas')?.bullets ?? [],
}

const elements = timeline.map((m, i) => ({
  id: m.id,
  mark: `S-${String(i + 1).padStart(2, '0')}`,
  label: m.year,
  title: m.title,
  meta: m.place,
  bullets: bulletsByTimelineId[m.id] ?? [m.description],
}))

function StructuralElement({ element }: { element: (typeof elements)[number] }) {
  return (
    <div
      data-reveal-item
      className="grid grid-cols-[minmax(0,220px)_1fr] gap-8 py-9 border-t max-md:grid-cols-1 max-md:gap-3"
      style={{ borderColor: 'var(--bp-slate-grid)' }}
    >
      <div>
        <span
          className="inline-flex items-center justify-center w-11 h-11 border text-[12px] font-semibold mb-3"
          style={{ borderColor: '#8a8880', color: 'var(--bp-slate-fg)', fontFamily: 'var(--ff-plex-mono)' }}
        >
          {element.mark}
        </span>
        <div
          className="text-[11px] tracking-[0.12em] uppercase"
          style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
        >
          {element.label}
        </div>
        <div className="text-[12px] mt-1" style={{ fontFamily: 'var(--ff-plex-mono)', color: '#6f6d66' }}>
          {element.meta}
        </div>
      </div>

      <div>
        <h3
          className="font-semibold mb-3"
          style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-slate-fg)', fontSize: 'clamp(19px, 2.2vw, 24px)' }}
        >
          {element.title}
        </h3>
        <ul className="flex flex-col gap-2">
          {element.bullets.map((b, j) => (
            <li
              key={j}
              className="relative text-[14.5px] leading-[1.65] pl-5"
              style={{ color: '#c9c6ba', fontFamily: 'var(--ff-plex-sans)' }}
            >
              <span className="absolute left-0 top-[10px] w-[5px] h-px" style={{ background: '#8a8880' }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const coverTargets = section.querySelectorAll('[data-reveal-cover]')
      gsap.set(coverTargets, { opacity: 0, y: 28 })
      gsap.to(coverTargets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section.querySelector('[data-cover]'),
          start: 'top 70%',
          once: true,
        },
      })

      const itemTargets = section.querySelectorAll('[data-reveal-item]')
      gsap.set(itemTargets, { opacity: 0, y: 24 })
      ScrollTrigger.batch(itemTargets, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          }),
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bp-slate-900)',
        backgroundImage:
          'linear-gradient(var(--bp-slate-grid) 1px, transparent 1px), linear-gradient(90deg, var(--bp-slate-grid) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Cover beat — sheet header + statement occupy their own viewport-ish pass */}
      <div data-cover className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        <div
          data-reveal-cover
          className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
        >
          Roles As Structural Elements — A-02
        </div>

        <div className="relative max-w-[900px] w-full mx-auto px-6 md:px-10">
          <div data-reveal-cover className="flex items-center gap-4 mb-4">
            <span
              className="text-[11px] tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--ff-plex-mono)', color: '#8a8880' }}
            >
              SHEET A-02
            </span>
            <span className="flex-1 h-px" style={{ background: 'var(--bp-slate-grid)' }} />
          </div>

          <SheetStatement data-reveal-cover className="leading-[1.1]" color="var(--bp-slate-fg)">
            Structural schedule — roles load-bearing to the build.
          </SheetStatement>
        </div>
      </div>

      {/* Content beat — role entries reveal individually as they scroll into view */}
      <div className="relative max-w-[900px] mx-auto px-6 md:px-10 pb-32">
        <div className="border-b" style={{ borderColor: 'var(--bp-slate-grid)' }}>
          {elements.map((el) => (
            <StructuralElement key={el.id} element={el} />
          ))}
        </div>
      </div>
    </section>
  )
}
