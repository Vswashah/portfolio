'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Story', href: '#story' },
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
    <nav className={cn('fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 px-10 h-16 transition-all duration-300', scrolled && 'bg-[rgba(8,12,18,0.85)] border-b border-[var(--hair)] backdrop-blur-lg')}>
      <a href="#top" className="flex items-center gap-2.5 font-semibold text-[15px] text-[var(--t1)]">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4d7cff] to-[#7c5cfc] grid place-items-center text-[12px] font-bold text-white tracking-wider flex-shrink-0">VS</span>
        <span>Vishwaa Shah</span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-[14px] text-[var(--t2)] hover:text-[var(--t1)] transition-colors duration-200">{l.label}</a>
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-medium bg-[var(--surface)] border border-[var(--hair)] text-[var(--t2)] hover:text-[var(--t1)] transition-all duration-200">Resume</a>
        <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-medium text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cfc] hover:-translate-y-0.5 transition-all duration-200">Contact</a>
      </div>
    </nav>
  )
}
