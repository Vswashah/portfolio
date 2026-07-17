'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Principle', href: '#principle' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Signals', href: '#signals' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 px-6 md:px-10 h-16 border-b transition-all duration-300',
        scrolled
          ? 'bg-[rgba(42,42,40,0.9)] border-[var(--bp-slate-grid)] backdrop-blur-lg'
          : 'bg-transparent border-transparent'
      )}
      style={{ fontFamily: 'var(--ff-plex-mono)' }}
    >
      <a href="#top" className="flex items-center gap-2.5 font-semibold text-[15px]" style={{ color: 'var(--bp-slate-fg)' }}>
        <span
          className="w-8 h-8 grid place-items-center text-[12px] font-bold tracking-wider flex-shrink-0 border"
          style={{ background: 'var(--bp-paper)', borderColor: 'var(--bp-paper-line)', color: 'var(--bp-ink-900)' }}
        >
          VS
        </span>
        <span style={{ fontFamily: 'var(--ff-plex-sans)' }}>Vishwaa Shah</span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[12px] tracking-[0.1em] uppercase text-[#8a8880] hover:text-[var(--bp-slate-fg)] transition-colors duration-200"
          >
            {l.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 text-[12px] tracking-[0.1em] uppercase border border-[var(--bp-slate-grid)] text-[#c9c6ba] hover:text-[var(--bp-slate-fg)] hover:border-[#8a8880] transition-all duration-200"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2 text-[12px] tracking-[0.1em] uppercase font-semibold bg-[var(--bp-paper)] text-[var(--bp-ink-900)] hover:bg-[var(--bp-margin)] transition-all duration-200"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
