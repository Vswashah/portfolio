'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import SheetStatement from '@/components/blueprint/SheetStatement'

const COMMANDS: Record<string, () => string[]> = {
  help: () => ['sys:Available commands:', 'out:  whoami       — About Vishwaa', 'out:  skills       — Tech stack summary', 'out:  experience   — Work history', 'out:  projects     — Selected projects', 'out:  education    — Academic background', 'out:  contact      — Get in touch', 'out:  status       — Current status', 'out:  clear        — Clear terminal', 'out:  easter-egg   — 🤫'],
  whoami: () => ['sys:Vishwaa Shah — AI Engineer & Software Builder', 'out:  Origin      : Surat, India → Dallas, TX', 'out:  Currently   : MS Computer Science @ UT Dallas', 'out:  Focus       : AI-native products, backend systems', 'out:  Philosophy  : Build with intent. Ship with precision.'],
  skills: () => ['sys:Tech stack:', 'out:  Frontend    : React, TypeScript, Tailwind, Next.js', 'out:  Backend     : Node.js, NestJS, Python, Flask', 'out:  Databases   : PostgreSQL, MySQL, Redis, pgvector', 'out:  AI / ML     : LangChain, RAG, Scikit-learn, OpenAI', 'out:  Cloud       : Azure, Docker, GitHub Actions, CI/CD'],
  experience: () => ['sys:Work history:', 'out:  [Jan–Apr 2025]  Software Developer Intern @ Palm Infotech', 'out:                  10+ REST APIs, ~30% efficiency gain', 'out:                  Real-time tracking at <250ms latency', 'out:', 'out:  [Sep 2025–Now]  CS Grader @ UT Dallas', 'out:                  80+ students mentored', 'out:                  300+ submissions evaluated per semester'],
  projects: () => ['sys:Selected projects:', 'out:  ★ Trackly            — RAG-based project & issue tracking', 'out:  ▲ Fleet Telemetry    — Kafka-driven real-time observability', 'out:  ◆ Phantom            — Multi-agent adversarial debate system', 'out:  ● JobOS              — Automated job-application pipeline', 'out:', 'out:  → Scroll up to the Projects section to see more.'],
  education: () => ['sys:Education:', 'out:  [2021–2025]  B.Tech Computer Engineering', 'out:               Sarvajanik College, Surat — GPA 3.94/4.0', 'out:', 'out:  [2025–2027]  MS Computer Science (in progress)', 'out:               UT Dallas, Richardson TX — Expected May 2027'],
  contact: () => ['sys:Get in touch:', 'out:  Email    : vishwaa.career@gmail.com', 'out:  LinkedIn : linkedin.com/in/vishwaa-shah', 'out:  GitHub   : github.com/Vswashah', 'out:', 'out:  Open to: AI engineering roles, internships, ambitious projects.'],
  status: () => ['sys:● ONLINE', 'out:  Pursuing MS CS @ UT Dallas', 'out:  Building AI-native products', 'out:  Open to new opportunities'],
  'easter-egg': () => ['warn:> Initialising self-aware portfolio module...', 'out:  ██████████████████████████████ 100%', 'sys:Hello, world. I am Vishwaa\'s portfolio.', 'out:  I think, therefore I deploy. 🚀', 'out:  My stack: curiosity + caffeine + clean abstractions.'],
}

type LineType = 'sys' | 'out' | 'warn' | 'err' | 'cmd'
interface Line { type: LineType; text: string }

const COLOR: Record<LineType, string> = {
  sys: 'text-[var(--green)]',
  out: 'text-[rgba(240,244,255,0.7)]',
  warn: 'text-[var(--amber)]',
  err: 'text-[var(--red)]',
  cmd: 'text-[#f0f4ff]',
}

const channels = [
  { label: 'Email', value: 'vishwaa.career@gmail.com', href: 'mailto:vishwaa.career@gmail.com', external: false },
  { label: 'LinkedIn', value: 'in/vishwaa-shah', href: 'https://www.linkedin.com/in/vishwaa-shah', external: true },
  { label: 'GitHub', value: 'github.com/Vswashah', href: 'https://github.com/Vswashah', external: true },
]

const titleBlockFields = [
  { label: 'Drawn by', value: 'Vishwaa Shah' },
  { label: 'Rev', value: '1.0' },
  { label: 'Date', value: '2026' },
  { label: 'Sheet', value: 'Cover + A-01–A-09' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  const [lines, setLines] = useState<Line[]>([
    { type: 'sys', text: 'vishwaa@portfolio:~ — portfolio terminal v1.0' },
    { type: 'out', text: "Type 'help' to explore. Try 'whoami', 'projects', or 'contact'." },
    { type: 'out', text: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const targets = section.querySelectorAll('[data-reveal-cover]')
      gsap.set(targets, { opacity: 0, y: 28 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  function exec(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory(h => [raw.trim(), ...h])
    setHistIdx(-1)
    const newLines: Line[] = [{ type: 'cmd', text: `➜  ${raw.trim()}` }]
    if (cmd === 'clear') { setLines([]); return }
    if (COMMANDS[cmd]) {
      COMMANDS[cmd]().forEach(l => {
        const [type, ...rest] = l.split(':')
        newLines.push({ type: type as LineType, text: rest.join(':') })
      })
    } else {
      newLines.push({ type: 'err', text: `Command not found: ${cmd}` })
      newLines.push({ type: 'out', text: "Type 'help' for available commands." })
    }
    setLines(prev => [...prev, ...newLines])
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { exec(input); setInput('') }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(i => { const next = Math.min(i + 1, history.length - 1); setInput(history[next] ?? ''); return next })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(i => { const next = Math.max(i - 1, -1); setInput(next === -1 ? '' : history[next]); return next })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bp-paper)',
        backgroundImage:
          'linear-gradient(var(--bp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--bp-grid-line) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div
        data-reveal-cover
        className="hidden md:block absolute left-6 top-[220px] -rotate-90 origin-top-left text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
      >
        Contact As Title Block — A-09
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40">
        <div data-reveal-cover className="flex items-center gap-4 mb-4">
          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
          >
            SHEET A-09
          </span>
          <span className="flex-1 h-px" style={{ background: 'var(--bp-paper-line)' }} />
        </div>

        <SheetStatement data-reveal-cover className="mb-4" color="var(--bp-ink-900)">
          Let&apos;s build something.
        </SheetStatement>

        <p
          data-reveal-cover
          className="text-[16px] leading-[1.7] max-w-[560px] mb-16"
          style={{ fontFamily: 'var(--ff-plex-sans)', color: 'var(--bp-ink-700)' }}
        >
          Open to AI engineering and software roles, internships, and ambitious side-projects. Reach out directly — or talk to the terminal.
        </p>

        <div className="grid grid-cols-[1fr_1.3fr] gap-8 items-start max-md:grid-cols-1">
          <div data-reveal-cover className="flex flex-col" style={{ border: '1px solid var(--bp-paper-line)' }}>
            {channels.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex items-center justify-between px-6 py-5 transition-colors duration-200 hover:bg-[rgba(26,26,26,0.03)]',
                  i > 0 && 'border-t'
                )}
                style={{ borderColor: 'var(--bp-paper-line)' }}
              >
                <span>
                  <span
                    className="block text-[10px] tracking-[0.12em] uppercase mb-1"
                    style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-500)' }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="block text-[14px]"
                    style={{ fontFamily: 'var(--ff-plex-mono)', color: 'var(--bp-ink-900)' }}
                  >
                    {c.value}
                  </span>
                </span>
                <span style={{ color: 'var(--bp-ink-500)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17 17 7M7 7h10v10" /></svg>
                </span>
              </a>
            ))}
          </div>

          <div
            data-reveal-cover
            className="overflow-hidden font-mono text-[13px] flex flex-col min-h-[340px]"
            style={{ border: '1px solid var(--bp-ink-900)', background: '#0b0e14' }}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03] shrink-0">
              <div className="flex gap-1.5">
                <i className="w-3 h-3 rounded-full bg-[#ff5f57] block" />
                <i className="w-3 h-3 rounded-full bg-[#febc2e] block" />
                <i className="w-3 h-3 rounded-full bg-[#28c840] block" />
              </div>
              <span className="text-[12px]" style={{ color: 'rgba(240,244,255,0.4)' }}>vishwaa@portfolio — zsh</span>
              <span className="w-[46px]" />
            </div>
            <div ref={bodyRef} className="flex-1 p-4 overflow-y-auto leading-[1.7] min-h-[240px]">
              {lines.map((l, i) => (
                <span key={i} className={cn('block', COLOR[l.type])}>{l.text}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10 bg-white/[0.02] shrink-0">
              <span className="text-[var(--green)] text-[14px]">➜</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="type 'help' and hit enter…"
                className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] caret-[var(--green)]"
                style={{ color: '#f0f4ff' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-reveal-cover
        className="relative border-t"
        style={{ borderColor: 'var(--bp-ink-900)', fontFamily: 'var(--ff-plex-mono)' }}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {titleBlockFields.map((f, i) => (
            <div
              key={f.label}
              className={cn('px-5 py-4 max-md:border-t', i > 0 && 'md:border-l')}
              style={{ borderColor: 'var(--bp-paper-line)' }}
            >
              <div
                className="text-[9px] tracking-[0.15em] uppercase mb-1"
                style={{ color: 'var(--bp-ink-500)' }}
              >
                {f.label}
              </div>
              <div className="text-[13px] font-semibold" style={{ color: 'var(--bp-ink-900)' }}>
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
