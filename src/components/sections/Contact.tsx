'use client'

import { useState, useRef, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const COMMANDS: Record<string, () => string[]> = {
  help: () => ['sys:Available commands:', 'out:  whoami       — About Vishwaa', 'out:  skills       — Tech stack summary', 'out:  experience   — Work history', 'out:  projects     — Selected projects', 'out:  education    — Academic background', 'out:  contact      — Get in touch', 'out:  status       — Current status', 'out:  clear        — Clear terminal', 'out:  easter-egg   — 🤫'],
  whoami: () => ['sys:Vishwaa Shah — AI Engineer & Software Builder', 'out:  Origin      : Surat, India → Dallas, TX', 'out:  Currently   : MS Computer Science @ UT Dallas', 'out:  Focus       : AI-native products, backend systems', 'out:  Philosophy  : Build with intent. Ship with precision.'],
  skills: () => ['sys:Tech stack:', 'out:  Frontend    : React, TypeScript, Tailwind, Next.js', 'out:  Backend     : Node.js, NestJS, Python, Flask', 'out:  Databases   : PostgreSQL, MySQL, Redis, pgvector', 'out:  AI / ML     : LangChain, RAG, Scikit-learn, OpenAI', 'out:  Cloud       : Azure, Docker, GitHub Actions, CI/CD'],
  experience: () => ['sys:Work history:', 'out:  [Jan–Apr 2025]  Software Developer Intern @ Palm Infotech', 'out:                  10+ REST APIs, ~30% efficiency gain', 'out:                  Real-time tracking at <250ms latency', 'out:', 'out:  [Sep 2025–Now]  CS Grader @ UT Dallas', 'out:                  80+ students mentored', 'out:                  300+ submissions evaluated per semester'],
  projects: () => ['sys:Selected projects:', 'out:  ★ Trackly                — AI-native issue tracker (RAG + pgvector)', 'out:  ▲ Security Log Detector  — Isolation Forest, 10K+ logs/day, Azure', 'out:  ● Secure Relay Chat      — E2E encrypted, Diffie-Hellman, HMAC', 'out:', 'out:  → Scroll up to the Projects section to see more.'],
  education: () => ['sys:Education:', 'out:  [2021–2025]  B.Tech Computer Engineering', 'out:               Sarvajanik College, Surat — GPA 3.94/4.0', 'out:', 'out:  [2025–2027]  MS Computer Science (in progress)', 'out:               UT Dallas, Richardson TX — Expected May 2027'],
  contact: () => ['sys:Get in touch:', 'out:  Email    : vishwaa.career@gmail.com', 'out:  LinkedIn : linkedin.com/in/vishwaa-shah', 'out:  GitHub   : github.com/Vswashah', 'out:', 'out:  Open to: AI engineering roles, internships, ambitious projects.'],
  status: () => ['sys:● ONLINE', 'out:  Pursuing MS CS @ UT Dallas', 'out:  Building AI-native products', 'out:  Open to new opportunities'],
  'easter-egg': () => ['warn:> Initialising self-aware portfolio module...', 'out:  ██████████████████████████████ 100%', 'sys:Hello, world. I am Vishwaa\'s portfolio.', 'out:  I think, therefore I deploy. 🚀', 'out:  My stack: curiosity + caffeine + clean abstractions.'],
}

type LineType = 'sys' | 'out' | 'warn' | 'err' | 'cmd'
interface Line { type: LineType; text: string }

const COLOR: Record<LineType, string> = {
  sys: 'text-[var(--green)]',
  out: 'text-[var(--t2)]',
  warn: 'text-[var(--amber)]',
  err: 'text-[var(--red)]',
  cmd: 'text-[var(--t1)]',
}

const channels = [
  {
    label: 'Email',
    value: 'vishwaa.career@gmail.com',
    href: 'mailto:vishwaa.career@gmail.com',
    external: false,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="w-[18px] h-[18px]"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  },
  {
    label: 'LinkedIn',
    value: 'in/vishwaa-shah',
    href: 'https://www.linkedin.com/in/vishwaa-shah',
    external: true,
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" /></svg>,
  },
  {
    label: 'GitHub',
    value: 'github.com/Vswashah',
    href: 'https://github.com/Vswashah',
    external: true,
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg>,
  },
]

export default function Contact() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: channelsRef, inView: channelsIn } = useInView()
  const { ref: termRef, inView: termIn } = useInView()

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
    <section className="py-[120px] bg-[var(--bg)]" id="contact">
      <div className="max-w-[1180px] mx-auto px-10">
        <div ref={headRef as React.RefObject<HTMLDivElement>} className={cn('reveal max-w-[700px] mb-16', headIn && 'in')}>
          <span className="block text-[12px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] font-mono mb-3.5">07 — Direct Line</span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.025em] mb-4">Let's build something.</h2>
          <p className="text-[16px] text-[var(--t2)] leading-[1.7]">Open to AI engineering and software roles, internships, and ambitious side-projects. Reach out directly — or talk to the terminal.</p>
        </div>
        <div className="grid grid-cols-[1fr_1.4fr] gap-8 items-start max-md:grid-cols-1">
          <div ref={channelsRef as React.RefObject<HTMLDivElement>} className={cn('reveal flex flex-col gap-3', channelsIn && 'in')}>
            {channels.map((c) => (
              <a key={c.label} href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined} className="flex items-center gap-4 p-[18px] rounded-[8px] border border-[var(--hair)] bg-[var(--surface)] transition-all duration-200 hover:border-[rgba(77,124,255,0.3)] hover:bg-[rgba(77,124,255,0.06)] hover:translate-x-1">
                <span className="w-10 h-10 bg-white/5 border border-[var(--hair)] rounded-[9px] grid place-items-center shrink-0">{c.icon}</span>
                <span>
                  <span className="block text-[14px] font-semibold">{c.label}</span>
                  <span className="block text-[12px] text-[var(--t3)] font-mono">{c.value}</span>
                </span>
                <span className="ml-auto text-[var(--t3)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M7 17 17 7M7 7h10v10" /></svg>
                </span>
              </a>
            ))}
          </div>
          <div ref={termRef as React.RefObject<HTMLDivElement>} className={cn('reveal rounded-[14px] overflow-hidden border border-[var(--hair)] bg-black/50 font-mono text-[13px] flex flex-col min-h-[380px] [transition-delay:100ms]', termIn && 'in')} onClick={() => inputRef.current?.focus()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hair)] bg-white/3 shrink-0">
              <div className="flex gap-1.5">
                <i className="w-3 h-3 rounded-full bg-[#ff5f57] block" />
                <i className="w-3 h-3 rounded-full bg-[#febc2e] block" />
                <i className="w-3 h-3 rounded-full bg-[#28c840] block" />
              </div>
              <span className="text-[12px] text-[var(--t3)]">vishwaa@portfolio — zsh</span>
              <span className="w-[46px]" />
            </div>
            <div ref={bodyRef} className="flex-1 p-4 overflow-y-auto leading-[1.7] min-h-[280px]">
              {lines.map((l, i) => (
                <span key={i} className={cn('block', COLOR[l.type])}>{l.text}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 border-t border-[var(--hair)] bg-white/2 shrink-0">
              <span className="text-[var(--green)] text-[14px]">➜</span>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown} type="text" autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="type 'help' and hit enter…" className="flex-1 bg-transparent border-none outline-none text-[var(--t1)] font-mono text-[13px] caret-[var(--green)] placeholder:text-[var(--t3)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
